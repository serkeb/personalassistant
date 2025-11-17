# 🚀 Guía Rápida de Setup (5 minutos)

Esta es la versión corta. Para instrucciones detalladas, leé [README.md](./README.md).

## 📋 Pre-requisitos

- Node.js 16+ instalado
- Git instalado
- Expo Go en tu celular

## ⚡ Setup en 5 Pasos

### 1️⃣ Instalar Dependencias

```bash
npm install
```

### 2️⃣ Crear Archivo .env

```bash
# Windows
copy .env.example .env

# Mac/Linux
cp .env.example .env
```

### 3️⃣ Configurar Supabase

1. Andá a https://supabase.com y creá un proyecto
2. Copiá la URL y ANON_KEY desde Settings > API
3. Pegálos en tu archivo `.env`
4. En Supabase, andá a SQL Editor
5. Ejecutá el contenido de `database/schema.sql`
6. Ejecutá el contenido de `database/seed.sql`

### 4️⃣ Iniciar la App

```bash
npm start
```

### 5️⃣ Probar en tu Celular

1. Abrí Expo Go
2. Escaneá el QR
3. ¡Listo! 🎉

## 🐛 Si algo falla

```bash
# Limpiá el caché y reiniciá
rm -rf node_modules
npm install
npm start -- --clear
```

## ✅ Verificá que todo esté OK

- [ ] `npm start` corre sin errores
- [ ] Ves un QR en la terminal
- [ ] Expo Go puede escanear el QR
- [ ] La app se abre en tu celular
- [ ] Podés registrarte con email/password

## 📚 Próximos Pasos

Una vez que todo funcione, seguí con:

1. **Tarea 3**: Mejorar autenticación (agregar Google login)
2. **Tarea 4**: Crear onboarding (3 pasos)
3. **Tarea 5**: Implementar funcionalidad de cada pantalla

## 🆘 Ayuda

Si algo no funciona, chequeá [README.md](./README.md) sección "Problemas Comunes".

---

**Tiempo estimado de setup**: 5-10 minutos (primera vez)
