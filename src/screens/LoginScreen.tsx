/**
 * PANTALLA DE LOGIN
 *
 * Permite al usuario iniciar sesión con:
 * - Email y contraseña
 * - Google (OAuth)
 *
 * NOTA: En esta versión inicial, solo tiene placeholders.
 * En Tarea 3 vamos a implementar la lógica completa.
 */

import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { supabase } from '../config/supabase';

interface Props {
  navigation: any;
}

export default function LoginScreen({ navigation }: Props) {
  // Estados para almacenar el email y password que el usuario escribe
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  /**
   * Maneja el login con email/password
   */
  const handleEmailLogin = async () => {
    // Validaciones básicas
    if (!email || !password) {
      Alert.alert('Error', 'Por favor completá todos los campos');
      return;
    }

    setLoading(true);

    try {
      // Intenta hacer login con Supabase
      const { data, error } = await supabase.auth.signInWithPassword({
        email: email.trim(),
        password: password,
      });

      if (error) throw error;

      // Si llegamos acá, el login fue exitoso
      // La navegación se maneja automáticamente en App.tsx
      console.log('Login exitoso:', data.user?.email);
    } catch (error: any) {
      console.error('Error en login:', error);
      Alert.alert('Error', error.message || 'No se pudo iniciar sesión');
    } finally {
      setLoading(false);
    }
  };

  /**
   * Maneja el login con Google
   * NOTA: Requiere configuración adicional en Supabase
   */
  const handleGoogleLogin = async () => {
    Alert.alert(
      'Google Login',
      'Esta función se implementará en Tarea 3.\n\n' +
        'Requiere configurar OAuth en Supabase y el redirect URL.'
    );

    // TODO: Implementar en Tarea 3
    // const { data, error } = await supabase.auth.signInWithOAuth({
    //   provider: 'google',
    // });
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.logo}>🤖</Text>
        <Text style={styles.title}>Bienvenido</Text>
        <Text style={styles.subtitle}>Iniciá sesión para continuar</Text>
      </View>

      {/* Formulario */}
      <View style={styles.form}>
        {/* Input de Email */}
        <TextInput
          style={styles.input}
          placeholder="Email"
          placeholderTextColor="#999"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
          autoCorrect={false}
        />

        {/* Input de Password */}
        <TextInput
          style={styles.input}
          placeholder="Contraseña"
          placeholderTextColor="#999"
          value={password}
          onChangeText={setPassword}
          secureTextEntry // Oculta la contraseña
          autoCapitalize="none"
        />

        {/* Botón de Login */}
        <TouchableOpacity
          style={[styles.button, styles.buttonPrimary]}
          onPress={handleEmailLogin}
          disabled={loading}
        >
          <Text style={styles.buttonText}>
            {loading ? 'Iniciando sesión...' : 'Iniciar Sesión'}
          </Text>
        </TouchableOpacity>

        {/* Divisor */}
        <View style={styles.divider}>
          <View style={styles.dividerLine} />
          <Text style={styles.dividerText}>o</Text>
          <View style={styles.dividerLine} />
        </View>

        {/* Botón de Google */}
        <TouchableOpacity
          style={[styles.button, styles.buttonGoogle]}
          onPress={handleGoogleLogin}
          disabled={loading}
        >
          <Text style={styles.buttonText}>Continuar con Google</Text>
        </TouchableOpacity>

        {/* Link a Registro */}
        <TouchableOpacity
          style={styles.linkContainer}
          onPress={() => navigation.navigate('Register')}
        >
          <Text style={styles.linkText}>
            ¿No tenés cuenta? <Text style={styles.linkBold}>Registrate</Text>
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  header: {
    alignItems: 'center',
    marginTop: 80,
    marginBottom: 40,
  },
  logo: {
    fontSize: 60,
    marginBottom: 10,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
  },
  form: {
    paddingHorizontal: 30,
  },
  input: {
    backgroundColor: '#f5f5f5',
    borderRadius: 10,
    padding: 15,
    fontSize: 16,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: '#e0e0e0',
  },
  button: {
    borderRadius: 10,
    padding: 15,
    alignItems: 'center',
    marginBottom: 15,
  },
  buttonPrimary: {
    backgroundColor: '#6200ea',
  },
  buttonGoogle: {
    backgroundColor: '#4285F4',
  },
  buttonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '600',
  },
  divider: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 20,
  },
  dividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: '#e0e0e0',
  },
  dividerText: {
    marginHorizontal: 10,
    color: '#999',
    fontSize: 14,
  },
  linkContainer: {
    alignItems: 'center',
    marginTop: 20,
  },
  linkText: {
    color: '#666',
    fontSize: 14,
  },
  linkBold: {
    color: '#6200ea',
    fontWeight: '600',
  },
});
