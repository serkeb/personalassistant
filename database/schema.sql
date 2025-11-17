-- ========================================
-- SCHEMA DE BASE DE DATOS PARA SUPABASE
-- ========================================
-- Este archivo crea todas las tablas necesarias para la app.
-- Ejecutálo en Supabase: SQL Editor > New Query > Copiar y pegar > Run

-- IMPORTANTE: Supabase ya tiene una tabla llamada "auth.users"
-- que maneja la autenticación básica (email, password, etc).
-- Nosotros solo agregamos tablas adicionales para el perfil
-- y los datos de la app.

-- ========================================
-- 1. TABLA DE PERFILES DE USUARIO
-- ========================================
-- Información extendida del usuario (más allá del login básico)

CREATE TABLE IF NOT EXISTS user_profiles (
  -- ID del usuario (referencia a auth.users de Supabase)
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,

  -- Datos personales
  full_name TEXT,
  age INTEGER CHECK (age >= 0 AND age <= 150),
  occupation TEXT,
  location TEXT,

  -- Configuración de monedas
  currency_primary TEXT DEFAULT 'USD', -- Moneda principal (ej: 'USD', 'ARS', 'EUR')
  currency_secondary TEXT, -- Moneda secundaria opcional

  -- Personalidad del asistente IA
  assistant_personality TEXT DEFAULT 'casual' CHECK (assistant_personality IN ('casual', 'formal', 'motivational')),
  assistant_proactivity TEXT DEFAULT 'medium' CHECK (assistant_proactivity IN ('high', 'medium', 'low')),

  -- Objetivos del usuario
  financial_goals JSONB, -- Formato: [{"type": "savings", "target": 5000, "deadline": "2024-12-31"}]
  personal_goals TEXT[], -- Array de strings: ["Aprender inglés", "Hacer ejercicio"]

  -- Metadatos
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Índice para búsquedas rápidas por ID
CREATE INDEX IF NOT EXISTS idx_user_profiles_id ON user_profiles(id);

-- ========================================
-- 2. TABLA DE CATEGORÍAS
-- ========================================
-- Categorías para clasificar gastos e ingresos
-- Pueden ser:
-- - Por defecto (is_default = TRUE, user_id = NULL): para todos los usuarios
-- - Personalizadas (is_default = FALSE, user_id = UUID): específicas de un usuario

CREATE TABLE IF NOT EXISTS categories (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),

  -- Si user_id es NULL, es una categoría por defecto para todos
  user_id UUID REFERENCES user_profiles(id) ON DELETE CASCADE,

  -- Información de la categoría
  name TEXT NOT NULL,
  icon TEXT, -- Nombre del ícono (ej: 'food', 'car', 'home')
  color TEXT, -- Color en hexadecimal (ej: '#FF5733')
  type TEXT NOT NULL CHECK (type IN ('expense', 'income')), -- Gasto o ingreso

  is_default BOOLEAN DEFAULT FALSE, -- Si es una categoría predefinida

  -- Metadatos
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Índices para búsquedas rápidas
CREATE INDEX IF NOT EXISTS idx_categories_user_id ON categories(user_id);
CREATE INDEX IF NOT EXISTS idx_categories_type ON categories(type);
CREATE INDEX IF NOT EXISTS idx_categories_is_default ON categories(is_default);

-- ========================================
-- 3. TABLA DE TRANSACCIONES FINANCIERAS
-- ========================================
-- Registro de todos los gastos e ingresos del usuario

CREATE TABLE IF NOT EXISTS transactions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES user_profiles(id) ON DELETE CASCADE,

  -- Información financiera
  amount DECIMAL(12,2) NOT NULL CHECK (amount > 0), -- Monto (siempre positivo)
  currency TEXT NOT NULL, -- Moneda (ej: 'USD', 'ARS')
  category_id UUID REFERENCES categories(id) ON DELETE SET NULL, -- Categoría (opcional)

  -- Detalles de la transacción
  description TEXT, -- Descripción opcional (ej: "Compra en supermercado")
  date DATE NOT NULL, -- Fecha de la transacción
  type TEXT NOT NULL CHECK (type IN ('income', 'expense')), -- Ingreso o gasto

  -- Metadatos
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Índices para consultas rápidas
CREATE INDEX IF NOT EXISTS idx_transactions_user_id ON transactions(user_id);
CREATE INDEX IF NOT EXISTS idx_transactions_user_date ON transactions(user_id, date DESC);
CREATE INDEX IF NOT EXISTS idx_transactions_type ON transactions(type);
CREATE INDEX IF NOT EXISTS idx_transactions_category_id ON transactions(category_id);

-- ========================================
-- 4. TABLA DE TAREAS
-- ========================================
-- To-dos y tareas del usuario

CREATE TABLE IF NOT EXISTS tasks (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES user_profiles(id) ON DELETE CASCADE,

  -- Información de la tarea
  title TEXT NOT NULL, -- Título corto
  description TEXT, -- Descripción detallada (opcional)

  -- Estado y prioridad
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'completed', 'cancelled')),
  priority TEXT DEFAULT 'medium' CHECK (priority IN ('low', 'medium', 'high')),

  -- Fechas
  due_date DATE, -- Fecha de vencimiento (opcional)
  completed_at TIMESTAMPTZ, -- Fecha de completado (se setea automáticamente)

  -- Metadatos
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Índices para consultas rápidas
CREATE INDEX IF NOT EXISTS idx_tasks_user_id ON tasks(user_id);
CREATE INDEX IF NOT EXISTS idx_tasks_user_status ON tasks(user_id, status);
CREATE INDEX IF NOT EXISTS idx_tasks_user_due_date ON tasks(user_id, due_date);
CREATE INDEX IF NOT EXISTS idx_tasks_priority ON tasks(priority);

-- ========================================
-- 5. TABLA DE MENSAJES DEL CHAT
-- ========================================
-- Historial de conversación con el asistente IA

CREATE TABLE IF NOT EXISTS chat_messages (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES user_profiles(id) ON DELETE CASCADE,

  -- Información del mensaje
  role TEXT NOT NULL CHECK (role IN ('user', 'assistant')), -- Quién envió el mensaje
  content TEXT NOT NULL, -- Contenido del mensaje

  -- Metadata para el contexto de IA
  tokens_used INTEGER, -- Cantidad de tokens usados (para tracking de costos)
  model_used TEXT, -- Modelo de IA usado (ej: 'gemini-1.5-flash')

  -- Metadatos
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Índices para consultas rápidas
CREATE INDEX IF NOT EXISTS idx_chat_user_id ON chat_messages(user_id);
CREATE INDEX IF NOT EXISTS idx_chat_user_created ON chat_messages(user_id, created_at DESC);
CREATE INDEX IF NOT EXISTS idx_chat_role ON chat_messages(role);

-- ========================================
-- TRIGGERS (Funciones automáticas)
-- ========================================

-- Trigger para actualizar "updated_at" automáticamente
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Aplicar el trigger a user_profiles
DROP TRIGGER IF EXISTS update_user_profiles_updated_at ON user_profiles;
CREATE TRIGGER update_user_profiles_updated_at
  BEFORE UPDATE ON user_profiles
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- Aplicar el trigger a tasks
DROP TRIGGER IF EXISTS update_tasks_updated_at ON tasks;
CREATE TRIGGER update_tasks_updated_at
  BEFORE UPDATE ON tasks
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- Trigger para setear completed_at cuando una tarea se completa
CREATE OR REPLACE FUNCTION set_task_completed_at()
RETURNS TRIGGER AS $$
BEGIN
  IF NEW.status = 'completed' AND OLD.status != 'completed' THEN
    NEW.completed_at = NOW();
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS set_task_completed_at_trigger ON tasks;
CREATE TRIGGER set_task_completed_at_trigger
  BEFORE UPDATE ON tasks
  FOR EACH ROW
  EXECUTE FUNCTION set_task_completed_at();

-- ========================================
-- POLÍTICAS DE SEGURIDAD (ROW LEVEL SECURITY)
-- ========================================
-- Esto asegura que cada usuario solo pueda ver/editar sus propios datos

-- Habilitar RLS en todas las tablas
ALTER TABLE user_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE transactions ENABLE ROW LEVEL SECURITY;
ALTER TABLE tasks ENABLE ROW LEVEL SECURITY;
ALTER TABLE chat_messages ENABLE ROW LEVEL SECURITY;

-- Políticas para user_profiles
CREATE POLICY "Los usuarios pueden ver su propio perfil"
  ON user_profiles FOR SELECT
  USING (auth.uid() = id);

CREATE POLICY "Los usuarios pueden actualizar su propio perfil"
  ON user_profiles FOR UPDATE
  USING (auth.uid() = id);

CREATE POLICY "Los usuarios pueden insertar su propio perfil"
  ON user_profiles FOR INSERT
  WITH CHECK (auth.uid() = id);

-- Políticas para categories
CREATE POLICY "Los usuarios pueden ver categorías por defecto y las suyas"
  ON categories FOR SELECT
  USING (is_default = TRUE OR user_id = auth.uid());

CREATE POLICY "Los usuarios pueden crear sus propias categorías"
  ON categories FOR INSERT
  WITH CHECK (user_id = auth.uid());

CREATE POLICY "Los usuarios pueden actualizar sus propias categorías"
  ON categories FOR UPDATE
  USING (user_id = auth.uid());

CREATE POLICY "Los usuarios pueden eliminar sus propias categorías"
  ON categories FOR DELETE
  USING (user_id = auth.uid());

-- Políticas para transactions
CREATE POLICY "Los usuarios pueden ver sus propias transacciones"
  ON transactions FOR SELECT
  USING (user_id = auth.uid());

CREATE POLICY "Los usuarios pueden crear sus propias transacciones"
  ON transactions FOR INSERT
  WITH CHECK (user_id = auth.uid());

CREATE POLICY "Los usuarios pueden actualizar sus propias transacciones"
  ON transactions FOR UPDATE
  USING (user_id = auth.uid());

CREATE POLICY "Los usuarios pueden eliminar sus propias transacciones"
  ON transactions FOR DELETE
  USING (user_id = auth.uid());

-- Políticas para tasks
CREATE POLICY "Los usuarios pueden ver sus propias tareas"
  ON tasks FOR SELECT
  USING (user_id = auth.uid());

CREATE POLICY "Los usuarios pueden crear sus propias tareas"
  ON tasks FOR INSERT
  WITH CHECK (user_id = auth.uid());

CREATE POLICY "Los usuarios pueden actualizar sus propias tareas"
  ON tasks FOR UPDATE
  USING (user_id = auth.uid());

CREATE POLICY "Los usuarios pueden eliminar sus propias tareas"
  ON tasks FOR DELETE
  USING (user_id = auth.uid());

-- Políticas para chat_messages
CREATE POLICY "Los usuarios pueden ver sus propios mensajes"
  ON chat_messages FOR SELECT
  USING (user_id = auth.uid());

CREATE POLICY "Los usuarios pueden crear sus propios mensajes"
  ON chat_messages FOR INSERT
  WITH CHECK (user_id = auth.uid());

-- ========================================
-- FUNCIONES ÚTILES (OPCIONAL)
-- ========================================

-- Función para obtener el balance total de un usuario
CREATE OR REPLACE FUNCTION get_user_balance(
  p_user_id UUID,
  p_currency TEXT DEFAULT 'USD'
)
RETURNS DECIMAL AS $$
DECLARE
  total_income DECIMAL;
  total_expense DECIMAL;
BEGIN
  -- Sumar ingresos
  SELECT COALESCE(SUM(amount), 0) INTO total_income
  FROM transactions
  WHERE user_id = p_user_id
    AND type = 'income'
    AND currency = p_currency;

  -- Sumar gastos
  SELECT COALESCE(SUM(amount), 0) INTO total_expense
  FROM transactions
  WHERE user_id = p_user_id
    AND type = 'expense'
    AND currency = p_currency;

  -- Retornar balance
  RETURN total_income - total_expense;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- ========================================
-- FIN DEL SCHEMA
-- ========================================

-- NOTA: Después de ejecutar este script, ejecutá seed.sql
-- para insertar las categorías por defecto.
