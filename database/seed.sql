-- ========================================
-- DATOS INICIALES (SEED DATA)
-- ========================================
-- Este archivo inserta las categorías por defecto en la base de datos.
-- Ejecutálo DESPUÉS de schema.sql

-- IMPORTANTE: Ejecutá esto solo UNA vez.
-- Si lo ejecutás de nuevo, va a crear categorías duplicadas.

-- ========================================
-- CATEGORÍAS DE GASTOS (EXPENSES)
-- ========================================

INSERT INTO categories (name, icon, color, type, is_default, user_id)
VALUES
  -- Alimentación
  ('Alimentación', 'food', '#FF6B6B', 'expense', TRUE, NULL),

  -- Transporte
  ('Transporte', 'car', '#4ECDC4', 'expense', TRUE, NULL),

  -- Servicios (luz, agua, internet, etc.)
  ('Servicios', 'lightbulb', '#FFE66D', 'expense', TRUE, NULL),

  -- Entretenimiento (cine, streaming, salidas)
  ('Entretenimiento', 'movie', '#A8E6CF', 'expense', TRUE, NULL),

  -- Salud (farmacia, médico, gimnasio)
  ('Salud', 'heart', '#FF8B94', 'expense', TRUE, NULL),

  -- Educación (cursos, libros, universidad)
  ('Educación', 'book', '#C7CEEA', 'expense', TRUE, NULL),

  -- Vivienda (alquiler, mantenimiento)
  ('Vivienda', 'home', '#FFDAC1', 'expense', TRUE, NULL),

  -- Ropa (ropa, zapatos, accesorios)
  ('Ropa', 'shirt', '#B5EAD7', 'expense', TRUE, NULL),

  -- Tecnología (celular, computadora, gadgets)
  ('Tecnología', 'laptop', '#9FA4C4', 'expense', TRUE, NULL),

  -- Mascotas (comida, veterinario, accesorios)
  ('Mascotas', 'paw', '#E2F0CB', 'expense', TRUE, NULL),

  -- Regalos
  ('Regalos', 'gift', '#FFABAB', 'expense', TRUE, NULL),

  -- Otros gastos
  ('Otros Gastos', 'more', '#D5AAFF', 'expense', TRUE, NULL)

ON CONFLICT DO NOTHING; -- Si ya existen, no hacer nada

-- ========================================
-- CATEGORÍAS DE INGRESOS (INCOME)
-- ========================================

INSERT INTO categories (name, icon, color, type, is_default, user_id)
VALUES
  -- Salario mensual
  ('Salario', 'money', '#4CAF50', 'income', TRUE, NULL),

  -- Trabajos freelance
  ('Freelance', 'briefcase', '#8BC34A', 'income', TRUE, NULL),

  -- Inversiones (acciones, crypto, etc.)
  ('Inversiones', 'chart', '#00BCD4', 'income', TRUE, NULL),

  -- Ventas (Mercado Libre, etc.)
  ('Ventas', 'shopping', '#009688', 'income', TRUE, NULL),

  -- Otros ingresos
  ('Otros Ingresos', 'more', '#66BB6A', 'income', TRUE, NULL)

ON CONFLICT DO NOTHING;

-- ========================================
-- VERIFICACIÓN
-- ========================================

-- Verificá que se hayan insertado correctamente
-- Deberías ver 17 categorías (12 gastos + 5 ingresos)

SELECT
  type,
  COUNT(*) as cantidad
FROM categories
WHERE is_default = TRUE
GROUP BY type;

-- Para ver todas las categorías insertadas:
-- SELECT * FROM categories WHERE is_default = TRUE ORDER BY type, name;

-- ========================================
-- NOTAS IMPORTANTES
-- ========================================

-- 1. Los íconos son solo nombres de referencia.
--    En la app, vas a necesitar mapearlos a íconos reales
--    usando una librería como react-native-vector-icons.

-- 2. Los colores están en formato hexadecimal (#RRGGBB).
--    Podés cambiarlos como quieras.

-- 3. Las categorías por defecto (is_default = TRUE, user_id = NULL)
--    son visibles para TODOS los usuarios.

-- 4. Los usuarios pueden crear sus propias categorías personalizadas
--    (is_default = FALSE, user_id = su UUID).

-- 5. Si querés agregar más categorías después, simplemente
--    ejecutá otro INSERT con los mismos campos.

-- ========================================
-- EJEMPLO: AGREGAR UNA CATEGORÍA PERSONALIZADA
-- ========================================

-- Para agregar una categoría personalizada para un usuario específico:
--
-- INSERT INTO categories (name, icon, color, type, is_default, user_id)
-- VALUES (
--   'Café', -- Nombre
--   'coffee', -- Ícono
--   '#8D6E63', -- Color (marrón)
--   'expense', -- Tipo
--   FALSE, -- No es por defecto
--   'UUID-DEL-USUARIO-AQUI' -- UUID del usuario
-- );

-- ========================================
-- FIN DEL SEED
-- ========================================
