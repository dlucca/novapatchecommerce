import { SignUp } from '@clerk/nextjs'
import Image from 'next/image'

export const metadata = {
  title: "Crear Cuenta - NovaPatch",
  description: "Únete a NovaPatch y descubre los parches médicos más innovadores. Crea tu cuenta para acceder a productos exclusivos.",
}

export default function Page() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-novapatch-bg-light to-blue-50 flex items-center justify-center py-12 px-4">
      <div className="w-full max-w-md">
        {/* Header with Logo */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Image 
              src="/assets/nav/Logo.svg" 
              alt="Logo de NovaPatch" 
              width={60} 
              height={60}
              priority
            />
            <h1 className="text-4xl font-bold text-novapatch-title">
              NovaPatch
            </h1>
          </div>
          <p className="text-gray-600">Únete a la revolución de los parches médicos</p>
        </div>

        {/* Clerk SignUp Component */}
        <SignUp 
          appearance={{
            elements: {
              formButtonPrimary: 'bg-novapatch-button hover:bg-novapatch-footer text-white font-medium transition-colors duration-200 rounded-lg',
              card: 'bg-white shadow-xl border border-gray-200 rounded-lg',
              headerTitle: 'text-novapatch-title font-bold text-xl',
              headerSubtitle: 'text-gray-600',
              socialButtonsBlockButton: 'border border-gray-300 hover:bg-gray-50 transition-colors duration-200',
              formFieldInput: 'border border-gray-300 rounded-lg focus:border-novapatch-button focus:ring-novapatch-button',
              footerActionLink: 'text-novapatch-button hover:text-novapatch-footer',
            },
            variables: {
              colorPrimary: '#4e83bb',
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
            Al crear una cuenta, aceptas nuestros{' '}
            <a href="/info" className="text-novapatch-button hover:text-novapatch-footer font-medium">
              Términos y Condiciones
            </a>
            {' '}y{' '}
            <a href="/info" className="text-novapatch-button hover:text-novapatch-footer font-medium">
              Política de Privacidad
            </a>
          </p>
        </div>
      </div>
    </div>
  )
}
