import { Heading, Text } from "@medusajs/ui"
import { Award, Heart, Leaf, Shield, Users, Zap } from "lucide-react"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import TestimonialsSection from "@modules/home/components/testimonials-section"
export const metadata = {
  title: "Sobre NovaPatch - Nuestra Historia",
  description: "Descubre la ciencia detrás de los parches de vitaminas NovaPatch: una solución sin pastillas, de alta absorción para nutrientes esenciales.",
}

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <div className="bg-gradient-to-br from-novapatch-bg-light via-blue-50 to-white py-20">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <Heading level="h1" className="text-4xl md:text-5xl font-bold text-novapatch-title mb-6">
            La Ciencia Detrás de NovaPatch
          </Heading>
          <Text className="text-xl text-gray-700 leading-relaxed">
            Descubre por qué los parches son el futuro de la suplementación: 
            una solución sin pastillas, de alta absorción para nutrientes esenciales sin rellenos.
          </Text>
        </div>
      </div>

      {/* Why Patches Section */}
      <div className="max-w-6xl mx-auto px-4 py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-20">
          <div>
            <Heading level="h2" className="text-3xl md:text-4xl font-bold text-novapatch-title mb-6">
              ¿Por Qué Parches?
            </Heading>
            <Text className="text-lg text-gray-700 mb-6 leading-relaxed">
              ¿Sabías que la mayoría de los suplementos vitamínicos contienen ingredientes que tu cuerpo no necesita? 
              Eso es difícil de tragar, así que estamos eliminando las pastillas (y las gomitas) de la ecuación 
              y solucionando el problema con parches.
            </Text>
            <Text className="text-lg text-gray-700 leading-relaxed">
              Nuestros parches transdérmicos ofrecen una alternativa revolucionaria a las vitaminas tradicionales, 
              proporcionando una absorción directa y eficiente sin pasar por el sistema digestivo.
            </Text>
          </div>
          
          <div className="bg-novapatch-bg-light rounded-2xl p-8">
            <div className="grid grid-cols-2 gap-6">
              <div className="bg-white rounded-xl p-6 text-center shadow-sm">
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
                  <Leaf className="w-6 h-6 text-green-600" />
                </div>
                <Text className="font-semibold text-novapatch-title">Sin Rellenos</Text>
              </div>
              <div className="bg-white rounded-xl p-6 text-center shadow-sm">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
                  <Heart className="w-6 h-6 text-blue-600" />
                </div>
                <Text className="font-semibold text-novapatch-title">Vegano</Text>
              </div>
              <div className="bg-white rounded-xl p-6 text-center shadow-sm">
                <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-3">
                  <Shield className="w-6 h-6 text-purple-600" />
                </div>
                <Text className="font-semibold text-novapatch-title">Sin Gluten</Text>
              </div>
              <div className="bg-white rounded-xl p-6 text-center shadow-sm">
                <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-3">
                  <Zap className="w-6 h-6 text-orange-600" />
                </div>
                <Text className="font-semibold text-novapatch-title">Acción Rápida</Text>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* How to Use Section */}
      <div className="bg-novapatch-bg-cream py-20">
        <div className="max-w-6xl mx-auto px-4">
          <Heading level="h2" className="text-3xl md:text-4xl font-bold text-novapatch-title mb-12 text-center">
            ¡Solo Despega, Pega y Disfruta!
          </Heading>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white rounded-2xl p-8 shadow-lg text-center">
              <div className="w-20 h-20 bg-novapatch-bg-light rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-4xl font-bold text-novapatch-button">1</span>
              </div>
              <Heading level="h3" className="text-xl font-semibold text-novapatch-title mb-4">
                Despega
              </Heading>
              <Text className="text-gray-600 leading-relaxed">
                Retira el protector del parche con cuidado. Asegúrate de que tu piel esté limpia y seca.
              </Text>
            </div>

            <div className="bg-white rounded-2xl p-8 shadow-lg text-center">
              <div className="w-20 h-20 bg-novapatch-bg-light rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-4xl font-bold text-novapatch-button">2</span>
              </div>
              <Heading level="h3" className="text-xl font-semibold text-novapatch-title mb-4">
                Pega
              </Heading>
              <Text className="text-gray-600 leading-relaxed">
                Aplica el parche en un área sin vello, como el brazo, hombro o espalda. Presiona firmemente.
              </Text>
            </div>

            <div className="bg-white rounded-2xl p-8 shadow-lg text-center">
              <div className="w-20 h-20 bg-novapatch-bg-light rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-4xl font-bold text-novapatch-button">3</span>
              </div>
              <Heading level="h3" className="text-xl font-semibold text-novapatch-title mb-4">
                Disfruta
              </Heading>
              <Text className="text-gray-600 leading-relaxed">
                Deja actuar durante 8-12 horas. Sigue con tu día normalmente, ¡es resistente al agua!
              </Text>
            </div>
          </div>
        </div>
      </div>

      {/* Our Values Section */}
      <div className="max-w-6xl mx-auto px-4 py-20">
        <Heading level="h2" className="text-3xl md:text-4xl font-bold text-novapatch-title mb-12 text-center">
          Nuestros Valores
        </Heading>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div className="text-center">
            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Award className="w-8 h-8 text-novapatch-button" />
            </div>
            <Heading level="h3" className="text-xl font-semibold text-novapatch-title mb-3">
              Calidad Premium
            </Heading>
            <Text className="text-gray-600">
              Utilizamos solo ingredientes de la más alta calidad, clínicamente probados y certificados.
            </Text>
          </div>

          <div className="text-center">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Leaf className="w-8 h-8 text-green-600" />
            </div>
            <Heading level="h3" className="text-xl font-semibold text-novapatch-title mb-3">
              Sostenibilidad
            </Heading>
            <Text className="text-gray-600">
              Comprometidos con el medio ambiente, usando materiales reciclables y procesos eco-friendly.
            </Text>
          </div>

          <div className="text-center">
            <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Users className="w-8 h-8 text-purple-600" />
            </div>
            <Heading level="h3" className="text-xl font-semibold text-novapatch-title mb-3">
              Comunidad
            </Heading>
            <Text className="text-gray-600">
              Construimos una comunidad de bienestar donde cada persona importa y es escuchada.
            </Text>
          </div>

          <div className="text-center">
            <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Zap className="w-8 h-8 text-orange-600" />
            </div>
            <Heading level="h3" className="text-xl font-semibold text-novapatch-title mb-3">
              Innovación
            </Heading>
            <Text className="text-gray-600">
              Constantemente investigamos y desarrollamos nuevas fórmulas para mejorar tu bienestar.
            </Text>
          </div>

          <div className="text-center">
            <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Heart className="w-8 h-8 text-red-600" />
            </div>
            <Heading level="h3" className="text-xl font-semibold text-novapatch-title mb-3">
              Transparencia
            </Heading>
            <Text className="text-gray-600">
              Somos honestos sobre nuestros ingredientes, procesos y resultados. Sin secretos.
            </Text>
          </div>

          <div className="text-center">
            <div className="w-16 h-16 bg-indigo-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Shield className="w-8 h-8 text-indigo-600" />
            </div>
            <Heading level="h3" className="text-xl font-semibold text-novapatch-title mb-3">
              Seguridad
            </Heading>
            <Text className="text-gray-600">
              Todos nuestros productos pasan rigurosas pruebas de seguridad y calidad antes de llegar a ti.
            </Text>
          </div>
        </div>
      </div>

     

      {/* Our Story Section */}
      <div className="max-w-4xl mx-auto px-4 py-20">
        <Heading level="h2" className="text-3xl md:text-4xl font-bold text-novapatch-title mb-8 text-center">
          Nuestra Historia
        </Heading>
        
        <div className="space-y-6 text-lg text-gray-700 leading-relaxed">
          <Text>
            NovaPatch nació de una simple pregunta: ¿Por qué seguimos tomando vitaminas de la misma manera 
            que hace 50 años? En un mundo donde la tecnología avanza constantemente, la suplementación 
            se había quedado atrás.
          </Text>
          
          <Text>
            Nuestro equipo de científicos, médicos y diseñadores se unió con una misión clara: crear una 
            forma más eficiente, conveniente y efectiva de obtener los nutrientes que nuestro cuerpo necesita. 
            Después de años de investigación y desarrollo, nacieron los parches NovaPatch.
          </Text>
          
          <Text>
            Hoy, miles de personas en todo el mundo confían en NovaPatch para su bienestar diario. 
            No somos solo una empresa de suplementos; somos una comunidad comprometida con revolucionar 
            la forma en que cuidamos nuestra salud.
          </Text>
        </div>
      </div>
      <TestimonialsSection />
    </div>
  )
}
