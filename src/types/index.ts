/**
 * TIPOS DE TYPESCRIPT
 *
 * Este archivo define la "forma" de nuestros datos.
 * TypeScript nos ayuda a evitar errores asegurándonos de que
 * los datos tengan la estructura correcta.
 *
 * Por ejemplo: si definimos que un "Usuario" tiene un "nombre",
 * TypeScript no nos dejará crear un usuario sin nombre.
 */

// ========================================
// PERFIL DE USUARIO
// ========================================

/**
 * Personalidad del asistente IA
 * - casual: "Che, ¿cómo andás?"
 * - formal: "Buenos días, ¿en qué puedo ayudarle?"
 * - motivational: "¡Vamos que vos podés!"
 */
export type AssistantPersonality = 'casual' | 'formal' | 'motivational';

/**
 * Nivel de proactividad del asistente
 * - high: Te molesta seguido con recordatorios
 * - medium: Te avisa cosas importantes
 * - low: Solo responde cuando le hablás
 */
export type AssistantProactivity = 'high' | 'medium' | 'low';

/**
 * Meta financiera del usuario
 */
export interface FinancialGoal {
  type: 'savings' | 'investment' | 'reduce_expenses'; // Tipo de meta
  target: number; // Monto objetivo (ej: 5000)
  deadline?: string; // Fecha límite (ej: '2024-12-31')
  description?: string; // Descripción opcional
}

/**
 * Perfil completo del usuario
 * Coincide con la tabla "user_profiles" en Supabase
 */
export interface UserProfile {
  id: string; // ID único del usuario (UUID)
  full_name?: string; // Nombre completo
  age?: number; // Edad
  occupation?: string; // Profesión/ocupación
  location?: string; // Ciudad/país
  currency_primary: string; // Moneda principal (ej: 'USD', 'ARS')
  currency_secondary?: string; // Moneda secundaria (opcional)
  assistant_personality: AssistantPersonality; // Cómo habla el asistente
  assistant_proactivity: AssistantProactivity; // Qué tan molesto es
  financial_goals?: FinancialGoal[]; // Metas financieras
  personal_goals?: string[]; // Objetivos personales
  created_at: string; // Fecha de creación
}

// ========================================
// CATEGORÍAS
// ========================================

/**
 * Tipo de categoría
 */
export type CategoryType = 'expense' | 'income';

/**
 * Categoría para gastos o ingresos
 * Ejemplo: "Alimentación", "Salario", etc.
 */
export interface Category {
  id: string;
  user_id?: string; // Si es null, es una categoría por defecto
  name: string; // Nombre de la categoría
  icon?: string; // Nombre del ícono (ej: 'food', 'car')
  color?: string; // Color en hexadecimal (ej: '#FF5733')
  type: CategoryType; // 'expense' o 'income'
  is_default: boolean; // Si es una categoría por defecto
  created_at: string;
}

// ========================================
// TRANSACCIONES FINANCIERAS
// ========================================

/**
 * Tipo de transacción
 */
export type TransactionType = 'income' | 'expense';

/**
 * Transacción financiera (gasto o ingreso)
 */
export interface Transaction {
  id: string;
  user_id: string;
  amount: number; // Monto (ej: 150.50)
  currency: string; // Moneda (ej: 'USD', 'ARS')
  category_id?: string; // ID de la categoría (opcional)
  category?: Category; // Objeto de categoría (para cuando traemos los datos)
  description?: string; // Descripción (ej: "Compra en supermercado")
  date: string; // Fecha de la transacción (ej: '2024-01-15')
  type: TransactionType; // 'income' o 'expense'
  created_at: string;
}

// ========================================
// TAREAS
// ========================================

/**
 * Estado de una tarea
 */
export type TaskStatus = 'pending' | 'completed' | 'cancelled';

/**
 * Prioridad de una tarea
 */
export type TaskPriority = 'low' | 'medium' | 'high';

/**
 * Tarea o to-do
 */
export interface Task {
  id: string;
  user_id: string;
  title: string; // Título de la tarea
  description?: string; // Descripción detallada (opcional)
  status: TaskStatus; // Estado actual
  priority: TaskPriority; // Prioridad
  created_at: string;
  due_date?: string; // Fecha de vencimiento (opcional)
}

// ========================================
// MENSAJES DEL CHAT
// ========================================

/**
 * Rol del mensaje
 */
export type MessageRole = 'user' | 'assistant';

/**
 * Mensaje en el chat con el asistente IA
 */
export interface ChatMessage {
  id: string;
  user_id: string;
  role: MessageRole; // Quién envió el mensaje
  content: string; // Contenido del mensaje
  created_at: string;
}

// ========================================
// NAVEGACIÓN
// ========================================

/**
 * Parámetros de las rutas de navegación
 * Define qué parámetros recibe cada pantalla
 */
export type RootStackParamList = {
  Splash: undefined; // No recibe parámetros
  Login: undefined;
  Register: undefined;
  Onboarding: undefined;
  Main: undefined; // Navegación de tabs
};

/**
 * Tabs de la navegación principal
 */
export type MainTabParamList = {
  Chat: undefined;
  Finances: undefined;
  Tasks: undefined;
  Profile: undefined;
};

/**
 * EXPLICACIÓN SIMPLE:
 *
 * Los tipos son como "moldes" para nuestros datos.
 *
 * Si decimos que un "Transaction" tiene un "amount" (monto),
 * TypeScript no nos va a dejar crear una transacción sin monto.
 *
 * Es como tener un formulario con campos obligatorios:
 * si no los llenás, no podés guardar.
 */
