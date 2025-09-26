import { SignIn } from '@clerk/nextjs'

export const metadata = {
  title: "Iniciar Sesión - NovaPatch",
  description: "Inicia sesión en tu cuenta de NovaPatch para acceder a productos exclusivos y suscripciones.",
}

export default function Page() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-green-50 flex items-center justify-center py-12 px-4">
      <div className="w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-blue-600 mb-2">NovaPatch</h1>
        </div>

        {/* Clerk SignIn Component */}
        <SignIn
          appearance={{
            elements: {
              formButtonPrimary: 'bg-blue-600 hover:bg-blue-700 text-white font-medium transition-colors duration-200 rounded-lg',
              card: 'bg-white shadow-xl border border-gray-200 rounded-lg',
              headerTitle: 'text-blue-600 font-bold text-xl',
              headerSubtitle: 'text-gray-600',
              socialButtonsBlockButton: 'border border-gray-300 hover:bg-gray-50 transition-colors duration-200',
              formFieldInput: 'border border-gray-300 rounded-lg focus:border-blue-500 focus:ring-blue-500',
              footerActionLink: 'text-blue-600 hover:text-blue-700',
            },
            variables: {
              colorPrimary: '#2563eb',
              colorBackground: '#ffffff',
              colorInputBackground: '#ffffff',
              colorInputText: '#374151',
              borderRadius: '0.5rem',
            },
          }}
        />

        {/* Footer */}
        <div className="text-center mt-8">
          <p className="text-sm text-gray-500">
            ¿Problemas para iniciar sesión?{' '}
            <a href="/info" className="text-blue-600 hover:text-blue-700 font-medium">
              Contáctanos
            </a>
          </p>
        </div>
      </div>
    </div>
  )
}
