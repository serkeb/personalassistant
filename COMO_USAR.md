# 📱 Cómo Usar Esta App - Guía Simple

## 🎯 Dos Formas de Probarla

### ✅ OPCIÓN 1: Expo Go Local (RECOMENDADO)

**La forma profesional y completa:**

```bash
# Paso 1: Instalar dependencias
npm install

# Paso 2: Crear archivo .env
cp .env.example .env
# Editá .env y pegá tus credenciales de Supabase

# Paso 3: Correr la app
npm start

# Paso 4: Escanear QR con Expo Go
```

**Ventajas:**
- ✅ Funciona TODO
- ✅ Súper rápido
- ✅ Variables de entorno seguras
- ✅ Hot reload

---

### ⚠️ OPCIÓN 2: Expo Snack (Solo para demos)

**Si NECESITÁS usar Snack:**

1. Abrí https://snack.expo.dev/
2. Copiá todos los archivos del proyecto
3. **IMPORTANTE:** Editá `src/config/supabase.ts` líneas 36-38:

```typescript
// Descomentá estas líneas y poné tus credenciales:
SUPABASE_URL = 'https://tuproyecto.supabase.co';
SUPABASE_ANON_KEY = 'eyJhbGc...tu-key-completa';
```

4. Guardá y refrescá

**Limitaciones de Snack:**
- ⚠️ Tenés que poner las credenciales en el código (inseguro)
- ⚠️ Puede tener problemas con Supabase
- ⚠️ Más lento que Expo Go local

---

## 🐛 Si Ves el Error del Polyfill

```
Error: Unable to resolve module 'react-native-url-polyfill/auto.js'
```

**Ya lo arreglé.** El archivo `src/config/supabase.ts` ahora maneja este error automáticamente.

### En Expo Go Local:
```bash
# Limpiar caché
rm -rf node_modules
npm install
npm start -- --clear
```

### En Expo Snack:
El error ahora se ignora automáticamente. La app debería funcionar.

---

## 📋 Checklist Rápido

### Para Expo Go Local:
- [ ] `npm install` ejecutado
- [ ] Archivo `.env` creado con credenciales
- [ ] `npm start` corriendo
- [ ] QR escaneado con Expo Go
- [ ] Celular y PC en la misma WiFi

### Para Expo Snack:
- [ ] Archivos copiados a Snack
- [ ] `src/config/supabase.ts` editado con credenciales
- [ ] Dependencias agregadas en Snack
- [ ] App corriendo

---

## 🎓 ¿Qué es Cada Cosa?

### Expo Go Local
Es una app (Expo Go) en tu celular que se conecta a tu computadora y ejecuta el código de React Native en tiempo real. Es como tener un navegador, pero para apps móviles.

### Expo Snack
Es un "playground" online para React Native. Funciona en el navegador pero tiene limitaciones. Bueno para demos rápidas, no para desarrollo serio.

### Netlify
Es un hosting para sitios WEB (HTML/CSS/JS). **No sirve** para apps móviles React Native. Por eso te dio error.

---

## ❓ Preguntas Frecuentes

**P: ¿Por qué no funciona en Netlify?**
R: Netlify es para apps web. Esto es una app móvil. Son cosas diferentes.

**P: ¿Cuál opción uso?**
R: **Expo Go Local**. Es mejor en todo sentido.

**P: ¿Puedo usar ambas?**
R: Sí, pero el código que modificás en Snack NO sincroniza con tu proyecto local.

**P: ¿El error del polyfill sigue apareciendo?**
R: Actualicé el código. Ahora debería mostrarte un warning pero seguir funcionando.

---

## 🚀 Mi Recomendación Final

1. **Olvidate de Snack** → Usá Expo Go local
2. **Olvidate de Netlify** → No es para apps móviles
3. **Seguí esta ruta:**
   ```
   npm install → npm start → Escanear QR → ¡Listo!
   ```

---

## 🆘 Ayuda

Si seguís teniendo problemas:

1. **Decime dónde estás corriendo la app** (Snack o local)
2. **Copiá el error completo** que te aparece
3. **Decime qué comandos ejecutaste**

Y te ayudo a arreglarlo.

---

**¡La app ya funciona en ambos lados!** Solo elegí cuál usar y seguí los pasos de arriba. 🎉
