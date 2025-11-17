# 🔧 Fix: Unable to resolve module 'react-native-url-polyfill/auto.js'

Este error aparece en dos escenarios:

## 📍 Escenario 1: Estás en Expo Snack

**Snack NO soporta** `react-native-url-polyfill`.

### Solución: Usar versión simplificada

1. Abrí `src/config/supabase.ts` en Snack
2. Reemplazá TODO el archivo con:

```typescript
import { createClient } from '@supabase/supabase-js';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Reemplazá con tus credenciales reales
const SUPABASE_URL = 'https://tuproyecto.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGc...tu-key-aqui';

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
  auth: {
    storage: AsyncStorage,
    autoRefreshToken: true,
    detectSessionInUrl: false,
    persistSession: true,
  },
});
```

3. Guardá y refrescá Snack

**Nota:** Recordá poner tus credenciales reales de Supabase.

---

## 📍 Escenario 2: Estás corriendo localmente con npm start

Si estás en tu terminal con `npm start`, el problema es que las dependencias no se instalaron.

### Solución: Reinstalar y limpiar caché

```bash
# 1. Detener el servidor (Ctrl+C)

# 2. Eliminar node_modules y reinstalar
rm -rf node_modules
npm install

# 3. Limpiar caché de Metro
npm start -- --clear

# Alternativa en Windows:
# rmdir /s /q node_modules
# npm install
# npm start -- --clear
```

### Si sigue sin funcionar:

```bash
# Limpiar TODOS los cachés
rm -rf node_modules
rm -rf .expo
rm package-lock.json
npm install
npm start -- --clear
```

---

## ⚠️ Verificar que el paquete esté instalado

Chequeá que `react-native-url-polyfill` esté en `package.json`:

```json
{
  "dependencies": {
    "react-native-url-polyfill": "^2.0.0"
  }
}
```

Si no está, instalalo:

```bash
npm install react-native-url-polyfill
```

---

## 🎯 ¿Cuál usar?

| Dónde estás | Qué hacer |
|-------------|-----------|
| Expo Snack | Usar versión sin polyfill (código de arriba) |
| Expo Go Local | Reinstalar dependencias + limpiar caché |
| Dispositivo físico | Asegurate que tu PC y celular estén en la misma WiFi |

---

## 🔄 Si cambias de Snack a Local

Si estabas en Snack y ahora querés correr local:

1. **NO copies** el código modificado de Snack
2. Usá el código original del repositorio
3. Ejecutá `npm install`
4. Ejecutá `npm start`

El código original con el polyfill **SÍ funciona** en Expo Go local.

---

## 🆘 Última opción: Crear proyecto desde cero

Si nada funciona, podemos crear un proyecto nuevo:

```bash
# Crear proyecto Expo nuevo
npx create-expo-app@latest mi-app-nueva --template blank-typescript

# Copiar nuestro código al nuevo proyecto
# Instalar dependencias
npm install
npm start
```

---

**¿Sigues teniendo el error?** Decime:
1. ¿Estás en Snack o en tu computadora?
2. ¿Ya corriste `npm install`?
3. ¿Qué sistema operativo tenés? (Windows/Mac/Linux)
