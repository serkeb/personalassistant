/**
 * PANTALLA DE TAREAS
 *
 * Lista de to-dos del usuario con:
 * - Estado (pendiente, completada, cancelada)
 * - Prioridad (baja, media, alta)
 * - Fecha de vencimiento
 *
 * NOTA: Placeholder por ahora.
 */

import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function TasksScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.emoji}>✅</Text>
      <Text style={styles.title}>Mis Tareas</Text>
      <Text style={styles.description}>
        Organizá tus pendientes y cumplí tus objetivos.
      </Text>
      <Text style={styles.description}>
        Próximamente: Recordatorios inteligentes ⏰
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
