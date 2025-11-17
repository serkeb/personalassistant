/**
 * NAVEGACIÓN PRINCIPAL (ROOT NAVIGATOR)
 *
 * Este es el navegador que controla todas las pantallas de la app:
 * - Splash (pantalla de carga)
 * - Login
 * - Register
 * - Main (las tabs: Chat, Finanzas, Tareas, Perfil)
 *
 * Usa Stack Navigation: las pantallas se apilan una sobre otra,
 * como una pila de cartas.
 */

import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { RootStackParamList } from '../types';

// Importamos las pantallas
import SplashScreen from '../screens/SplashScreen';
import LoginScreen from '../screens/LoginScreen';
import RegisterScreen from '../screens/RegisterScreen';
import MainTabNavigator from './MainTabNavigator';

// Creamos el navegador de stack
const Stack = createStackNavigator<RootStackParamList>();

export default function RootNavigator() {
  return (
    <Stack.Navigator
      // La primera pantalla que se muestra
      initialRouteName="Splash"
      screenOptions={{
        // Opciones por defecto para todas las pantallas
        headerShown: false, // Ocultamos el header por defecto
        gestureEnabled: true, // Permitimos gestos para volver atrás
        cardStyle: { backgroundColor: '#ffffff' }, // Fondo blanco
      }}
    >
      {/* Pantalla de Splash (carga inicial) */}
      <Stack.Screen name="Splash" component={SplashScreen} />

      {/* Pantalla de Login */}
      <Stack.Screen
        name="Login"
        component={LoginScreen}
        options={{
          // Esta pantalla no se puede cerrar con el botón "atrás"
          gestureEnabled: false,
        }}
      />

      {/* Pantalla de Registro */}
      <Stack.Screen
        name="Register"
        component={RegisterScreen}
        options={{
          // Mostramos el header solo en esta pantalla para poder volver
          headerShown: true,
          title: 'Registro',
          headerBackTitleVisible: false, // Oculta el texto "Back" (iOS)
        }}
      />

      {/* Navegación Principal (Tabs) */}
      <Stack.Screen
        name="Main"
        component={MainTabNavigator}
        options={{
          // Esta pantalla no se puede cerrar con el botón "atrás"
          // (el usuario debe hacer logout desde el perfil)
          gestureEnabled: false,
        }}
      />

      {/* TODO: Agregar pantalla de Onboarding en Tarea 4 */}
    </Stack.Navigator>
  );
}

/**
 * EXPLICACIÓN SIMPLE:
 *
 * Stack Navigation funciona como una pila de pantallas:
 *
 * 1. Abrís la app → Muestra SPLASH
 * 2. Splash verifica sesión → Navega a LOGIN o MAIN
 * 3. En Login tocás "Registro" → Apila REGISTER encima
 * 4. Volvés atrás → Quita REGISTER de la pila, volvés a LOGIN
 *
 * Es como tener una pila de cartas: podés poner cartas encima
 * (navigate) o sacar la de arriba (goBack).
 */
