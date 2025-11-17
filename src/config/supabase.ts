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
import 'react-native-url-polyfill/auto'; // Necesario para que funcione en React Native

// Estas variables vienen del archivo .env que vas a crear
// NUNCA pongas las claves directamente acá (usá siempre .env)
const SUPABASE_URL = process.env.SUPABASE_URL || '';
const SUPABASE_ANON_KEY = process.env.SUPABASE_ANON_KEY || '';

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
