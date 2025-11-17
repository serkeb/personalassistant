/**
 * CONFIGURACIÓN DE SUPABASE
 *
 * Este archivo conecta nuestra app con Supabase (el backend).
 * Supabase nos da:
 * - Base de datos (PostgreSQL)
 * - Autenticación (login/registro)
 * - Storage (guardar archivos)
 * - Edge Functions (funciones serverless)
 */

import { createClient } from '@supabase/supabase-js';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Intentamos importar el polyfill, pero si falla (ej: en Expo Snack), continuamos
try {
  require('react-native-url-polyfill/auto');
} catch (error) {
  console.warn('react-native-url-polyfill no está disponible. Esto puede causar problemas con Supabase.');
}

// ========================================
// CONFIGURACIÓN DE CREDENCIALES
// ========================================

// OPCIÓN 1: Variables de entorno (para Expo Go local)
// Las variables vienen del archivo .env
let SUPABASE_URL = process.env.SUPABASE_URL || '';
let SUPABASE_ANON_KEY = process.env.SUPABASE_ANON_KEY || '';

// OPCIÓN 2: Valores hardcodeados (para Expo Snack)
// Si las variables de entorno están vacías, podés poner tus credenciales acá:
// ⚠️ SOLO para testing en Snack. NUNCA hagas esto en producción.

if (!SUPABASE_URL || !SUPABASE_ANON_KEY) {
  // Descomentá y reemplazá con tus credenciales reales para usar en Snack:
  // SUPABASE_URL = 'https://tuproyecto.supabase.co';
  // SUPABASE_ANON_KEY = 'eyJhbGc...tu-key-completa-aqui';

  console.warn(
    '⚠️ Credenciales de Supabase no configuradas.\n' +
    'Para Expo Go local: Creá un archivo .env con tus credenciales.\n' +
    'Para Expo Snack: Descomentá y editá las líneas en src/config/supabase.ts'
  );
}

/**
 * Cliente de Supabase
 *
 * Este es el objeto que usamos para:
 * - Hacer login/registro: supabase.auth.signIn()
 * - Guardar datos: supabase.from('tabla').insert()
 * - Leer datos: supabase.from('tabla').select()
 * - etc.
 */
export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
  auth: {
    // Usamos AsyncStorage para guardar la sesión del usuario
    // Así el usuario no tiene que hacer login cada vez que abre la app
    storage: AsyncStorage,

    // Si el token expira, lo renovamos automáticamente
    autoRefreshToken: true,

    // Detectamos cuando el usuario vuelve a la app para renovar el token
    detectSessionInUrl: false,

    // Guardamos la sesión para que persista entre reinicios de la app
    persistSession: true,
  },
});

/**
 * EXPLICACIÓN SIMPLE:
 *
 * Imaginá que Supabase es como un Excel en la nube.
 * Este archivo es como el "cable de internet" que conecta
 * tu celular con ese Excel.
 *
 * Las claves (URL y ANON_KEY) son como el "usuario y contraseña"
 * para acceder a tu Excel en la nube.
 */
