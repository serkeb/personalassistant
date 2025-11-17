/**
 * NAVEGACIÓN DE TABS (PESTAÑAS INFERIORES)
 *
 * Esta es la navegación principal de la app.
 * Tiene 4 tabs en la parte inferior:
 * - Chat 💬
 * - Finanzas 💰
 * - Tareas ✅
 * - Perfil 👤
 */

import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { MainTabParamList } from '../types';

// Importamos las pantallas
import ChatScreen from '../screens/ChatScreen';
import FinancesScreen from '../screens/FinancesScreen';
import TasksScreen from '../screens/TasksScreen';
import ProfileScreen from '../screens/ProfileScreen';

// Creamos el navegador de tabs
const Tab = createBottomTabNavigator<MainTabParamList>();

export default function MainTabNavigator() {
  return (
    <Tab.Navigator
      screenOptions={{
        // Opciones generales para todas las tabs
        headerShown: true, // Mostramos el header (título) en la parte superior
        tabBarActiveTintColor: '#6200ea', // Color del ícono cuando está activo (morado)
        tabBarInactiveTintColor: '#999999', // Color cuando no está activo (gris)
        tabBarStyle: {
          backgroundColor: '#ffffff', // Fondo blanco
          borderTopWidth: 1,
          borderTopColor: '#e0e0e0',
          paddingBottom: 5,
          paddingTop: 5,
          height: 60,
        },
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: '600',
        },
      }}
    >
      {/* Tab de Chat */}
      <Tab.Screen
        name="Chat"
        component={ChatScreen}
        options={{
          title: 'Chat',
          tabBarLabel: 'Chat',
          // Por ahora usamos emojis como íconos
          // En Fase 2 podemos usar react-native-vector-icons
          tabBarIcon: ({ color }) => <span style={{ fontSize: 24 }}>💬</span>,
        }}
      />

      {/* Tab de Finanzas */}
      <Tab.Screen
        name="Finances"
        component={FinancesScreen}
        options={{
          title: 'Finanzas',
          tabBarLabel: 'Finanzas',
          tabBarIcon: ({ color }) => <span style={{ fontSize: 24 }}>💰</span>,
        }}
      />

      {/* Tab de Tareas */}
      <Tab.Screen
        name="Tasks"
        component={TasksScreen}
        options={{
          title: 'Tareas',
          tabBarLabel: 'Tareas',
          tabBarIcon: ({ color }) => <span style={{ fontSize: 24 }}>✅</span>,
        }}
      />

      {/* Tab de Perfil */}
      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          title: 'Perfil',
          tabBarLabel: 'Perfil',
          tabBarIcon: ({ color }) => <span style={{ fontSize: 24 }}>👤</span>,
        }}
      />
    </Tab.Navigator>
  );
}

/**
 * EXPLICACIÓN SIMPLE:
 *
 * Este componente crea las pestañas que ves abajo en apps como
 * Instagram, WhatsApp, etc.
 *
 * Cada Tab.Screen es una pestaña. Cuando tocás una, se muestra
 * la pantalla correspondiente (component={...}).
 *
 * Las opciones (options) definen:
 * - title: Título que aparece arriba
 * - tabBarLabel: Texto que aparece en la pestaña
 * - tabBarIcon: Ícono de la pestaña
 */
