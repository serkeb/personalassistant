# ⚡ Quick Start - Personal Assistant App

## 🎯 La Forma MÁS RÁPIDA de probar la app

### Requisitos (solo la primera vez)
1. Node.js instalado → https://nodejs.org/
2. Expo Go en tu celular → https://expo.dev/go

### Pasos (5 minutos)

```bash
# 1. Instalar dependencias (solo una vez)
npm install

# 2. Iniciar la app
npm start

# 3. Escanear el QR con Expo Go
```

**¡Listo!** Ya estás probando la app en tu celular.

---

## 🔧 Configurar Supabase (Opcional - para que funcione el login)

Si querés que el login/registro funcione de verdad:

### 1. Crear proyecto Supabase
- Andá a https://supabase.com
- Creá un proyecto gratis
- Anotá la URL y ANON_KEY

### 2. Configurar .env
```bash
# Copiar template
cp .env.example .env

# Editar .env y pegar tus credenciales
```

### 3. Crear tablas
En Supabase SQL Editor, ejecutá:
1. `database/schema.sql` (crea las tablas)
2. `database/seed.sql` (agrega categorías)

### 4. Reiniciar
```bash
npm start
```

---

## ❌ NO USES Expo Snack

Snack **no funciona** con esta app porque:
- No soporta el polyfill de Supabase
- No tiene variables de entorno
- Limitaciones de dependencias

**Usá Expo Go local** → Es más fácil y funciona todo.

---

## 📱 Compartir con Otros

Si querés que otros prueben tu app:

```bash
npm start
# Presioná 't' para modo tunnel
# Compartí el link que aparece
```

Otros pueden:
1. Instalar Expo Go
2. Abrir el link
3. Probar tu app

---

## 🐛 Problemas Comunes

### Error: "Unable to resolve module"
```bash
rm -rf node_modules
npm install
```

### Error: "Network request failed"
- Verificá que `.env` tenga las credenciales correctas
- Celular y PC en la misma WiFi

### QR no funciona
```bash
npm start
# Presioná 't' para tunnel
```

---

## 📚 Más Info

- **Instrucciones completas**: Leé [README.md](./README.md)
- **Problemas con Snack**: Leé [SNACK_INSTRUCTIONS.md](./SNACK_INSTRUCTIONS.md)

---

**¿Dudas?** Avisame y te ayudo.
