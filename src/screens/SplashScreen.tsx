/**
 * SPLASH SCREEN (Pantalla de carga inicial)
 *
 * Esta es la primera pantalla que ve el usuario cuando abre la app.
 * Muestra un logo y verifica si el usuario ya está logueado.
 *
 * ¿Qué hace?
 * 1. Muestra el logo de la app
 * 2. Verifica si hay una sesión activa (usuario logueado)
 * 3. Redirige a Login o a Main según corresponda
 */

import React, { useEffect } from 'react';
import { View, Text, StyleSheet, ActivityIndicator } from 'react-native';
import { supabase } from '../config/supabase';

interface Props {
  // "navigation" es un objeto que nos permite cambiar de pantalla
  navigation: any;
}

export default function SplashScreen({ navigation }: Props) {
  /**
   * useEffect se ejecuta cuando la pantalla carga
   * Acá verificamos si el usuario ya está logueado
   */
  useEffect(() => {
    checkAuthStatus();
  }, []);

  /**
   * Verifica si hay una sesión activa
   */
  const checkAuthStatus = async () => {
    try {
      // Esperamos 1 segundo para mostrar el logo (opcional, para UX)
      await new Promise(resolve => setTimeout(resolve, 1000));

      // Obtenemos la sesión actual de Supabase
      const {
        data: { session },
      } = await supabase.auth.getSession();

      // Si hay sesión, el usuario está logueado
      if (session) {
        // TODO: Verificar si completó el onboarding
        // Por ahora, enviamos directo a Main
        navigation.replace('Main');
      } else {
        // No hay sesión, enviamos a Login
        navigation.replace('Login');
      }
    } catch (error) {
      console.error('Error verificando sesión:', error);
      // Si hay error, enviamos a Login por seguridad
      navigation.replace('Login');
    }
  };

  return (
    <View style={styles.container}>
      {/* Logo de la app */}
      <Text style={styles.logo}>🤖</Text>
      <Text style={styles.title}>Personal Assistant</Text>

      {/* Indicador de carga (spinner) */}
      <ActivityIndicator size="large" color="#6200ea" style={styles.loader} />

      <Text style={styles.subtitle}>Cargando...</Text>
    </View>
  );
}

/**
 * ESTILOS
 * Define cómo se ve cada elemento en la pantalla
 */
const styles = StyleSheet.create({
  container: {
    flex: 1, // Ocupa toda la pantalla
    backgroundColor: '#ffffff',
    justifyContent: 'center', // Centra verticalmente
    alignItems: 'center', // Centra horizontalmente
  },
  logo: {
    fontSize: 80, // Tamaño del emoji
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333333',
    marginBottom: 40,
  },
  loader: {
    marginBottom: 20,
  },
  subtitle: {
    fontSize: 16,
    color: '#666666',
  },
});
