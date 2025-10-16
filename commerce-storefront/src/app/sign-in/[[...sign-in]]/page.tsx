import { SignIn } from '@clerk/nextjs'
import Image from 'next/image'

export const metadata = {
  title: "Iniciar Sesión - NovaPatch",
  description: "Inicia sesión en tu cuenta de NovaPatch para acceder a productos exclusivos y suscripciones.",
}

export default function Page() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-novapatch-bg-light to-blue-50 flex items-center justify-center py-12 px-4">
      <div className="w-full max-w-md">
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
        </div>

        <SignIn 
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
            ¿Problemas para iniciar sesión?{' '}
            <a href="/info" className="text-novapatch-button hover:text-novapatch-footer font-medium">
              Contáctanos
            </a>
          </p>
        </div>
      </div>
    </div>
  )
}
