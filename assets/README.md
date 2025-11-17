# Assets de la App

Esta carpeta debería contener las imágenes necesarias para la app de Expo.

## Imágenes Requeridas

Cuando configures un proyecto Expo nuevo, necesitás:

1. **icon.png** (1024x1024 px)
   - Ícono de la app que aparece en el home screen

2. **splash.png** (1284x2778 px)
   - Imagen que aparece cuando la app está cargando

3. **adaptive-icon.png** (1024x1024 px - solo Android)
   - Ícono adaptativo para Android

4. **favicon.png** (48x48 px - solo Web)
   - Favicon para versión web

## Cómo Generar los Assets

### Opción 1: Usar Herramientas Online (Gratis)

1. **Icon Kitchen**: https://icon.kitchen/
   - Subí un logo simple
   - Descargá todos los tamaños necesarios

2. **Figma**: https://figma.com
   - Creá un diseño simple
   - Exportá en los tamaños necesarios

### Opción 2: Usar Expo Asset Generator

```bash
npx expo-generate-app-icons
```

### Opción 3: Placeholder Simple (Para empezar)

Por ahora, podés usar un emoji como placeholder:

1. Andá a https://emojipedia.org/robot
2. Hacé screenshot del emoji 🤖
3. Usá https://www.iloveimg.com/resize-image para redimensionar
4. Guardá como `icon.png`

## Por Ahora

Mientras no tengas los assets, Expo va a usar placeholders automáticos.
La app va a funcionar igual, solo se va a ver un poco "genérica".

## Tips de Diseño

- **Colores principales sugeridos**:
  - Primario: #6200ea (morado)
  - Secundario: #00c853 (verde)
  - Fondo: #ffffff (blanco)

- **Estilo sugerido**: Minimalista, moderno, limpio

- **Ícono**: Algo relacionado con IA, asistente, o chat
  - Ejemplos: 🤖 💬 ✨ 🧠

## Próximos Pasos

En Fase 2, podés contratar un diseñador en Fiverr o 99designs
para crear assets profesionales (costo aprox: $30-50 USD).
