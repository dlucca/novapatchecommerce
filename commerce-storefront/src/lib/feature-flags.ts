// Sistema de Feature Flags para MVP por fases
export const featureFlags = {
  // Semana 1: Solo autenticación
  ENABLE_CART: process.env.NEXT_PUBLIC_ENABLE_CART === 'true',
  ENABLE_STORE: process.env.NEXT_PUBLIC_ENABLE_STORE === 'true',
  ENABLE_COLLECTIONS: process.env.NEXT_PUBLIC_ENABLE_COLLECTIONS === 'true',
  ENABLE_PRODUCTS: process.env.NEXT_PUBLIC_ENABLE_PRODUCTS === 'true',
  ENABLE_ORDERS: process.env.NEXT_PUBLIC_ENABLE_ORDERS === 'true',
  ENABLE_COUNTRY_SELECTOR: process.env.NEXT_PUBLIC_ENABLE_COUNTRY_SELECTOR === 'true',
  
  // Semana 2: Catálogo básico
  ENABLE_PRODUCT_CATALOG: process.env.NEXT_PUBLIC_ENABLE_PRODUCT_CATALOG === 'true',
  
  // Semana 3: Pagos
  ENABLE_PAYMENTS: process.env.NEXT_PUBLIC_ENABLE_PAYMENTS === 'true',
  
  // Semana 4: Suscripciones
  ENABLE_SUBSCRIPTIONS: process.env.NEXT_PUBLIC_ENABLE_SUBSCRIPTIONS === 'true',
  
  // Configuración de región fija para MVP
  USE_FIXED_REGION: process.env.NEXT_PUBLIC_USE_FIXED_REGION !== 'false',
  FIXED_REGION: process.env.NEXT_PUBLIC_DEFAULT_REGION || 'mx',
} as const

// Helper functions
export const isFeatureEnabled = (feature: keyof typeof featureFlags): boolean => {
  return featureFlags[feature] as boolean
}

export const getFixedRegion = (): string => {
  return featureFlags.FIXED_REGION
}

// Función para verificar si estamos en modo MVP
export const isMVPMode = (): boolean => {
  return !featureFlags.ENABLE_CART && 
         !featureFlags.ENABLE_STORE && 
         !featureFlags.ENABLE_COLLECTIONS
}
