/**
 * PANTALLA DE FINANZAS
 *
 * Aquí el usuario va a poder:
 * - Ver un resumen de sus gastos e ingresos
 * - Agregar nuevas transacciones
 * - Ver gráficos y estadísticas
 *
 * NOTA: Placeholder por ahora.
 */

import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function FinancesScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.emoji}>💰</Text>
      <Text style={styles.title}>Finanzas Personales</Text>
      <Text style={styles.description}>
        Gestioná tus gastos e ingresos en múltiples monedas.
      </Text>
      <Text style={styles.description}>
        Próximamente: Gráficos, categorías y análisis 📊
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
