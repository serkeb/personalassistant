# 🤖 Personal Assistant - App Móvil

Una app de asistente personal con IA para gestionar finanzas, tareas y chat inteligente.

## 📱 Stack Tecnológico

- **Frontend**: Expo (React Native) con TypeScript
- **Backend**: Supabase (Auth, Database, Storage)
- **IA**: Gemini API 1.5 Flash
- **100% Gratuito** 🎉

---

## 🚀 Instalación Rápida (Primeros Pasos)

### 1. Requisitos Previos

Antes de empezar, necesitás tener instalado:

- **Node.js** (versión 16 o superior)
  - Descargalo en: https://nodejs.org/
  - Para verificar si ya lo tenés: abrí una terminal y escribí `node --version`

- **Git** (para clonar el repositorio)
  - Descargalo en: https://git-scm.com/
  - Para verificar: `git --version`

- **Expo Go** en tu celular
  - Android: https://play.google.com/store/apps/details?id=host.exp.exponent
  - iOS: https://apps.apple.com/app/expo-go/id982107779

### 2. Descargar el Proyecto

Abrí una terminal (en Windows: CMD o PowerShell, en Mac/Linux: Terminal) y ejecutá:

```bash
# Clonar el repositorio (si aún no lo hiciste)
git clone <URL_DEL_REPOSITORIO>

# Entrar a la carpeta del proyecto
cd personalassistant
```

### 3. Instalar Dependencias

Esto descarga todas las librerías que la app necesita:

```bash
npm install
```

**Importante**: Este paso puede tardar varios minutos la primera vez.

### 4. Configurar Variables de Entorno

Las variables de entorno son como "contraseñas" que la app necesita para conectarse a Supabase.

1. **Copiá el archivo de ejemplo**:
   ```bash
   # En Windows:
   copy .env.example .env

   # En Mac/Linux:
   cp .env.example .env
   ```

2. **Abrí el archivo `.env`** con cualquier editor de texto (Notepad, VSCode, etc.)

3. **Completá los valores** (te explico abajo cómo conseguirlos)

---

## 🔐 Configurar Supabase

Supabase es nuestro "backend en la nube". Hace el trabajo pesado de manejar usuarios, base de datos, etc.

### Paso 1: Crear Proyecto en Supabase

1. Andá a https://supabase.com
2. Hacé clic en "Start your project"
3. Iniciá sesión con GitHub o Google
4. Hacé clic en "New project"
5. Completá:
   - **Name**: `personal-assistant` (o el nombre que quieras)
   - **Database Password**: Generá una contraseña fuerte (guardala!)
   - **Region**: Elegí el más cercano (ej: South America)
   - **Pricing Plan**: Free (0 USD/month)
6. Hacé clic en "Create new project"
7. **Esperá 2-3 minutos** mientras Supabase crea tu proyecto

### Paso 2: Obtener las Credenciales

1. En el dashboard de Supabase, andá a **Settings** (⚙️) en el menú izquierdo
2. Hacé clic en **API**
3. Vas a ver dos valores importantes:
   - **Project URL**: Algo como `https://xxxxx.supabase.co`
   - **anon public key**: Una clave larga que empieza con `eyJ...`

4. Copiá estos valores y pegálos en tu archivo `.env`:
   ```
   SUPABASE_URL=https://xxxxx.supabase.co
   SUPABASE_ANON_KEY=eyJ...tu-clave-aqui
   ```

### Paso 3: Crear las Tablas de la Base de Datos

Ahora vamos a crear las tablas donde se guardan los datos (usuarios, transacciones, tareas, etc).

1. En Supabase, andá a **SQL Editor** en el menú izquierdo
2. Hacé clic en **+ New query**
3. Abrí el archivo `database/schema.sql` de este proyecto
4. **Copiá TODO el contenido** del archivo
5. **Pegalo** en el editor SQL de Supabase
6. Hacé clic en **Run** (▶️)
7. Deberías ver un mensaje de éxito: "Success. No rows returned"

### Paso 4: Insertar Categorías por Defecto

1. En el mismo SQL Editor, hacé **+ New query**
2. Abrí el archivo `database/seed.sql` de este proyecto
3. **Copiá y pegá** el contenido
4. Hacé clic en **Run**

¡Listo! Ahora tenés todas las tablas y categorías creadas.

### Paso 5: Configurar Autenticación (Opcional - Para Google Login)

Si querés que los usuarios puedan hacer login con Google:

1. En Supabase, andá a **Authentication** > **Providers**
2. Buscá **Google** y habilitalo
3. Necesitás crear credenciales en Google Cloud Console (te explico en `docs/google-auth.md`)

**Por ahora, podés saltearte este paso** y usar solo email/password.

---

## ▶️ Correr la App

Una vez que configuraste todo, ya podés correr la app:

```bash
npm start
```

Esto va a:
1. Iniciar el servidor de desarrollo de Expo
2. Mostrar un código QR en la terminal

### Ver la App en tu Celular

1. **Abrí Expo Go** en tu celular
2. **Escaneá el código QR**:
   - Android: Usá el lector de QR dentro de Expo Go
   - iOS: Usá la cámara del celular (te va a sugerir abrir con Expo Go)
3. **Esperá** a que cargue la app (puede tardar 1-2 minutos la primera vez)
4. ¡Listo! Ya podés probar la app 🎉

### Comandos Útiles

```bash
# Iniciar el servidor (opción recomendada)
npm start

# Iniciar y abrir en Android
npm run android

# Iniciar y abrir en iOS (solo en Mac)
npm run ios

# Ver en el navegador web
npm run web
```

---

## 📁 Estructura del Proyecto

```
personalassistant/
├── App.tsx                  # Punto de entrada de la app
├── app.json                 # Configuración de Expo
├── package.json             # Dependencias del proyecto
├── tsconfig.json            # Configuración de TypeScript
├── babel.config.js          # Configuración de Babel
├── .env                     # Variables de entorno (NO SUBIR A GIT)
├── .env.example             # Template de variables de entorno
│
├── src/
│   ├── config/
│   │   └── supabase.ts      # Configuración de Supabase
│   │
│   ├── screens/             # Pantallas de la app
│   │   ├── SplashScreen.tsx
│   │   ├── LoginScreen.tsx
│   │   ├── RegisterScreen.tsx
│   │   ├── ChatScreen.tsx
│   │   ├── FinancesScreen.tsx
│   │   ├── TasksScreen.tsx
│   │   └── ProfileScreen.tsx
│   │
│   ├── navigation/          # Configuración de navegación
│   │   ├── RootNavigator.tsx
│   │   └── MainTabNavigator.tsx
│   │
│   ├── components/          # Componentes reutilizables (próximamente)
│   ├── services/            # Llamadas a APIs (próximamente)
│   └── types/               # Tipos de TypeScript
│       └── index.ts
│
└── database/                # Scripts SQL para Supabase
    ├── schema.sql           # Estructura de tablas
    └── seed.sql             # Datos iniciales (categorías)
```

---

## 🗄️ Base de Datos (Tablas en Supabase)

La app usa estas tablas:

### `user_profiles`
Información extendida del usuario (perfil, preferencias, objetivos).

### `categories`
Categorías para gastos e ingresos (ej: "Alimentación", "Salario").

### `transactions`
Todas las transacciones financieras (gastos e ingresos).

### `tasks`
Lista de tareas/to-dos del usuario.

### `chat_messages`
Historial del chat con el asistente IA.

**Ver detalle completo** en `database/schema.sql`

---

## 🔧 Dependencias Principales

Acá te explico qué hace cada librería importante:

### Frontend y Navegación
- **expo**: Framework para crear apps React Native fácilmente
- **react-native**: Framework para apps móviles nativas
- **@react-navigation/native**: Maneja la navegación entre pantallas
- **@react-navigation/stack**: Navegación tipo "pila" (Login → Register)
- **@react-navigation/bottom-tabs**: Tabs en la parte inferior (Chat, Finanzas, etc)

### Backend y Auth
- **@supabase/supabase-js**: Cliente para conectarse a Supabase
- **@react-native-async-storage/async-storage**: Guarda datos localmente (sesión del usuario)

### Interfaz de Usuario
- **react-native-paper**: Componentes de UI bonitos (botones, inputs, etc)
- **react-native-vector-icons**: Íconos (opcional, por ahora usamos emojis)

### Autenticación
- **expo-auth-session**: Maneja el login con Google/OAuth
- **expo-web-browser**: Abre el navegador para OAuth

### Utilidades
- **react-native-url-polyfill**: Hace que Supabase funcione en React Native
- **react-native-dotenv**: Lee las variables del archivo .env

---

## 🐛 Problemas Comunes y Soluciones

### Error: "Cannot find module 'expo'"
**Solución**: Ejecutá `npm install` de nuevo.

### Error: "Network request failed" al hacer login
**Solución**:
1. Verificá que copiaste bien las credenciales de Supabase en `.env`
2. Asegurate de que tu celular esté en la misma red WiFi que tu computadora
3. Reiniciá el servidor con `npm start`

### El código QR no funciona
**Solución**:
1. Asegurate de tener Expo Go instalado
2. Fijate que tu celular esté en la misma red WiFi
3. Probá usar el modo tunnel: `npm start` y luego presioná "t" en la terminal

### Error: "Error: error:0308010C:digital envelope routines::unsupported"
**Solución**: Tu versión de Node.js es muy antigua o muy nueva. Instalá Node.js 16 o 18.

### La app se cierra sola al abrir
**Solución**:
1. Mirá los errores en la terminal (en tu computadora)
2. Verificá que el archivo `.env` exista y tenga valores correctos
3. Reiniciá Expo Go y volé a escanear el QR

---

## 📚 Próximos Pasos

Una vez que la app esté corriendo:

### Tarea 3: Pantallas de Autenticación Completas
- Implementar login con Google funcionando
- Mejorar la UI con React Native Paper
- Agregar validaciones de formulario

### Tarea 4: Onboarding (3 pasos)
- Pantalla 1: Datos personales
- Pantalla 2: Objetivos
- Pantalla 3: Personalidad del asistente

### Tarea 5: Funcionalidad del Chat
- Integrar Gemini API
- Enviar/recibir mensajes
- Guardar historial en Supabase

---

## 🆘 ¿Necesitás Ayuda?

- **Documentación de Expo**: https://docs.expo.dev/
- **Documentación de Supabase**: https://supabase.com/docs
- **React Navigation**: https://reactnavigation.org/docs/getting-started

---

## 📝 Notas Importantes

1. **NUNCA subas el archivo `.env` a GitHub**
   - Tiene tus credenciales secretas
   - Ya está en `.gitignore` para protegerlo

2. **El plan Free de Supabase incluye**:
   - 500 MB de base de datos
   - 50,000 usuarios autenticados
   - 1 GB de almacenamiento
   - Es más que suficiente para validar tu idea

3. **Gemini API es gratis**:
   - 60 requests por minuto
   - Perfecto para testing

---

## ✅ Checklist de Configuración

Antes de empezar a codear, verificá que tengas todo:

- [ ] Node.js instalado (`node --version`)
- [ ] Proyecto clonado y dependencias instaladas (`npm install`)
- [ ] Archivo `.env` creado con credenciales de Supabase
- [ ] Tablas creadas en Supabase (ejecutaste `schema.sql`)
- [ ] Categorías insertadas (ejecutaste `seed.sql`)
- [ ] Expo Go instalado en tu celular
- [ ] Servidor corriendo (`npm start`)
- [ ] App abierta en tu celular

Si completaste todo, ¡estás listo para desarrollar! 🚀

---

**Creado con ❤️ para validar ideas rápido**
