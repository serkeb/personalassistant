/**
 * APP.TSX - PUNTO DE ENTRADA DE LA APLICACIÓN
 *
 * Este es el archivo principal que React Native ejecuta al iniciar la app.
 * Acá configuramos:
 * - El NavigationContainer (contenedor de toda la navegación)
 * - Escuchamos cambios en el estado de autenticación
 * - Manejamos la navegación automática según el estado del usuario
 */

import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import RootNavigator from './src/navigation/RootNavigator';
import { supabase } from './src/config/supabase';

export default function App() {
  /**
   * Estado para saber si la app ya terminó de cargar
   */
  const [isReady, setIsReady] = useState(false);

  /**
   * useEffect se ejecuta cuando el componente se monta
   * Acá configuramos el listener de autenticación
   */
  useEffect(() => {
    // Escuchamos cambios en el estado de autenticación
    // Esto se ejecuta cuando el usuario hace login o logout
    const { data: authListener } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        console.log('Auth event:', event);

        // Eventos posibles:
        // - SIGNED_IN: El usuario hizo login
        // - SIGNED_OUT: El usuario hizo logout
        // - TOKEN_REFRESHED: Se renovó el token de sesión
        // - USER_UPDATED: Se actualizaron los datos del usuario

        if (event === 'SIGNED_IN') {
          console.log('Usuario logueado:', session?.user?.email);
        }

        if (event === 'SIGNED_OUT') {
          console.log('Usuario deslogueado');
        }
      }
    );

    // Marcamos la app como lista
    setIsReady(true);

    // Cleanup: cuando el componente se desmonta, dejamos de escuchar
    return () => {
      authListener?.subscription.unsubscribe();
    };
  }, []);

  /**
   * Mientras la app no esté lista, no mostramos nada
   * (en una app real, podrías mostrar un splash screen)
   */
  if (!isReady) {
    return null;
  }

  return (
    <>
      {/* StatusBar controla la barra de estado del teléfono (hora, batería, etc) */}
      <StatusBar style="dark" />

      {/* NavigationContainer es el contenedor de toda la navegación */}
      <NavigationContainer>
        <RootNavigator />
      </NavigationContainer>
    </>
  );
}

/**
 * EXPLICACIÓN SIMPLE:
 *
 * Este archivo es como el "director" de la app:
 *
 * 1. Arranca la app
 * 2. Configura la navegación (qué pantallas existen y cómo moverse entre ellas)
 * 3. Escucha cuando el usuario hace login/logout
 * 4. Automáticamente navega a la pantalla correcta
 *
 * Es el primer archivo que se ejecuta, y permanece activo
 * durante toda la vida de la app.
 *
 * FLUJO:
 * App.tsx → RootNavigator → Splash/Login/Main → Pantallas individuales
 */
