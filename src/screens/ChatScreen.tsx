/**
 * PANTALLA DE CHAT
 *
 * Esta es la pantalla principal de la app.
 * Aquí el usuario chatea con el asistente IA.
 *
 * NOTA: Por ahora es un placeholder. La implementación completa
 * viene en Fase 1 - Tareas posteriores.
 */

import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function ChatScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.emoji}>💬</Text>
      <Text style={styles.title}>Chat con IA</Text>
      <Text style={styles.description}>
        Aquí vas a poder hablar con tu asistente personal.
      </Text>
      <Text style={styles.description}>
        Próximamente: Integración con Gemini API 🚀
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  emoji: {
    fontSize: 80,
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
  },
  description: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    marginTop: 5,
  },
});
