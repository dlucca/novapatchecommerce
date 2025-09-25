import Link from 'next/link'

interface ComingSoonProps {
  title: string
  description: string
  week: number
  icon?: string
}

export default function ComingSoon({ 
  title, 
  description, 
  week, 
  icon = "🚧" 
}: ComingSoonProps) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="text-center max-w-md mx-auto p-8">
        <div className="text-6xl mb-6">{icon}</div>
        <h1 className="text-3xl font-bold mb-4 text-gray-900">
          {title}
        </h1>
        <p className="text-lg text-gray-600 mb-6">
          {description}
        </p>
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-8">
          <p className="text-blue-700 font-medium">
            Próximamente - Semana {week}
          </p>
          <p className="text-blue-600 text-sm mt-1">
            Esta funcionalidad estará disponible según nuestro plan de desarrollo
          </p>
        </div>
        <Link 
          href="/" 
          className="inline-flex items-center text-blue-600 hover:text-blue-700 font-medium"
        >
          ← Volver al inicio
        </Link>
      </div>
    </div>
  )
}
