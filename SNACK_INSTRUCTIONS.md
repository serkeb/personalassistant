# 📱 Cómo Probar en Expo Snack

Expo Snack es genial para demos rápidos, pero tiene limitaciones con este proyecto.

## ⚠️ Limitaciones de Snack

Snack **NO soporta**:
- ❌ Variables de entorno (archivos `.env`)
- ❌ El paquete `react-native-url-polyfill`
- ❌ Algunos paquetes de Supabase
- ❌ `react-native-dotenv`

## 🎯 Dos Opciones

### Opción A: Probar Localmente con Expo Go (RECOMENDADO)

Esta es la mejor forma de probar la app completa:

```bash
# 1. Instalar dependencias
cd /home/user/personalassistant
npm install

# 2. Iniciar el servidor
npm start

# 3. Escanear el QR con Expo Go en tu celular
```

**Ventajas:**
- ✅ Funciona TODO (Supabase, login, etc.)
- ✅ Más rápido
- ✅ Podés usar variables de entorno
- ✅ Hot reload instantáneo

---

### Opción B: Versión Demo en Snack (Solo UI)

Si **necesitás** usar Snack (por ejemplo, para compartir un demo visual), seguí estos pasos:

#### 1. Crear Nuevo Snack

Andá a https://snack.expo.dev/ y creá un nuevo proyecto.

#### 2. Reemplazar Archivos

Copiá **solo estos archivos** a Snack (uno por uno):

```
/src/types/index.ts
/src/screens/ChatScreen.tsx
/src/screens/FinancesScreen.tsx
/src/screens/TasksScreen.tsx
/src/screens/ProfileScreen.tsx
/src/navigation/MainTabNavigator.tsx
```

#### 3. Crear App.tsx Simplificado

En lugar del App.tsx original, usá este código simplificado:

```typescript
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import MainTabNavigator from './src/navigation/MainTabNavigator';

export default function App() {
  return (
    <>
      <StatusBar style="dark" />
      <NavigationContainer>
        <MainTabNavigator />
      </NavigationContainer>
    </>
  );
}
```

#### 4. Dependencias en Snack

En Snack, agregá estas dependencias (botón "+" en el panel izquierdo):

```
@react-navigation/native
@react-navigation/bottom-tabs
react-native-screens
react-native-safe-area-context
```

#### 5. Limitaciones de la Demo

Esta versión de Snack:
- ✅ Muestra la UI y navegación
- ❌ No tiene login real
- ❌ No conecta con Supabase
- ❌ Los botones no hacen nada

**Es solo para mostrar cómo se VE la app, no cómo FUNCIONA.**

---

## 🚀 Mejor Alternativa: Compartir con Expo Go

Si querés que **otros prueben la app funcionando**, hacé esto:

```bash
# 1. Iniciar en modo tunnel (público)
npm start

# 2. Presionar 't' en la terminal para activar tunnel

# 3. Compartir el link que aparece
# Ejemplo: exp://u.expo.dev/xxxxxxxx
```

Otras personas pueden:
1. Instalar Expo Go
2. Abrir el link
3. Probar la app completa funcionando

---

## 🐛 Arreglando el Error de Snack

Si querés forzar que funcione en Snack con Supabase, seguí estos pasos:

### Paso 1: Usar la versión Snack de Supabase

En todos los archivos que importan Supabase, cambiá:

**Antes:**
```typescript
import { supabase } from '../config/supabase';
```

**Después:**
```typescript
import { supabase } from '../config/supabase.snack';
```

### Paso 2: Editar supabase.snack.ts

1. Abrí `/src/config/supabase.snack.ts`
2. Reemplazá con tus credenciales reales:

```typescript
const SUPABASE_URL = 'https://tuproyecto.supabase.co'; // Tu URL
const SUPABASE_ANON_KEY = 'eyJhbG...'; // Tu anon key
```

### Paso 3: Actualizar imports

Actualizá estos archivos para usar `supabase.snack.ts`:
- `src/screens/SplashScreen.tsx`
- `src/screens/LoginScreen.tsx`
- `src/screens/RegisterScreen.tsx`
- `src/screens/ProfileScreen.tsx`

---

## 📊 Comparación

| Característica | Expo Go Local | Expo Snack | Expo Go Tunnel |
|----------------|---------------|------------|----------------|
| Velocidad | ⚡⚡⚡ | ⚡⚡ | ⚡ |
| Funcionalidades | ✅ Todo | ❌ Limitado | ✅ Todo |
| Compartir | ⚠️ Misma red | ✅ URL pública | ✅ URL pública |
| Setup | 5 min | 0 min | 5 min |
| Supabase | ✅ Funciona | ⚠️ Complejo | ✅ Funciona |

---

## 🎯 Mi Recomendación

1. **Para desarrollo**: Usá Expo Go local (`npm start`)
2. **Para compartir**: Usá modo tunnel (`npm start` + presioná 't')
3. **Para demo visual**: Usá Snack con versión simplificada

---

## ❓ Preguntas Frecuentes

**P: ¿Por qué no funciona en Snack?**
R: Snack es para proyectos simples. Esta app usa Supabase y varias dependencias que Snack no soporta bien.

**P: ¿Puedo hacer que funcione 100% en Snack?**
R: Técnicamente sí, pero requiere muchas modificaciones y perderías funcionalidades.

**P: ¿Cómo comparto la app para que otros la prueben?**
R: Usá `npm start` y presioná 't' para modo tunnel. Te da un link público.

**P: ¿Necesito Netlify o algún hosting?**
R: No. Esta es una app móvil, no web. No necesitás hosting. Supabase es el backend.

---

## 🆘 Necesitás Ayuda?

Si seguís teniendo problemas con Snack, avisame y te ayudo a:
- Configurar Expo Go local
- Crear una versión simplificada para Snack
- Compartir la app en modo tunnel

---

**Resumen:** Olvidate de Snack para esta app. Usá Expo Go local, es mucho mejor. 🚀
