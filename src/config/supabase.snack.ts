/**
 * CONFIGURACIÓN DE SUPABASE PARA EXPO SNACK
 *
 * Esta es una versión simplificada que funciona en Expo Snack.
 * Para la versión completa (con el polyfill), usá src/config/supabase.ts
 */

import { createClient } from '@supabase/supabase-js';
import AsyncStorage from '@react-native-async-storage/async-storage';

// IMPORTANTE: En Snack, estas variables van a ser undefined
// Tenés que reemplazarlas con tus valores reales:
const SUPABASE_URL = 'https://tuproyecto.supabase.co'; // Reemplazá esto
const SUPABASE_ANON_KEY = 'tu-anon-key-aqui'; // Reemplazá esto

/**
 * Cliente de Supabase para Snack
 *
 * NOTA: En Snack no podemos usar variables de entorno (.env)
 * así que las claves van hardcodeadas acá (solo para testing)
 */
export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
  auth: {
    storage: AsyncStorage,
    autoRefreshToken: true,
    detectSessionInUrl: false,
    persistSession: true,
  },
});

/**
 * INSTRUCCIONES PARA USAR EN SNACK:
 *
 * 1. Reemplazá SUPABASE_URL con tu URL real de Supabase
 * 2. Reemplazá SUPABASE_ANON_KEY con tu anon key real
 * 3. Guardá el archivo
 * 4. La app debería funcionar
 *
 * ⚠️ ADVERTENCIA: No compartas este código con las claves reales
 * porque cualquiera que vea el Snack puede verlas.
 */
