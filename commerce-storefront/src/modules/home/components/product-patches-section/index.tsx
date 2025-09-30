import Image from "next/image"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import { Button } from "@medusajs/ui"

const ProductPatchesSection = () => {
  const products = [
    { className: "nova-product-teal", name: "Sleep", letter: "S", img: "sleep.svg" },
    { className: "nova-product-blue", name: "Zen", letter: "Z", img: "zen.svg" },
    { className: "nova-product-red", name: "Glow", letter: "G", img: "glow.svg" },
    { className: "nova-product-yellow", name: "Shield", letter: "S", img: "shield.svg" },
    { className: "nova-product-purple", name: "Energy", letter: "E", img: "energy.svg" },
    { className: "nova-product-pink", name: "Woman", letter: "W", img: "woman.svg" }
  ]

  return (
    <section className="relative overflow-hidden py-20 mt-44 md:mt-32 mb-16">
      {/* Container principal con el fondo con formas */}
      <div className="w-full">

        {/* Header section con la forma curva */}
        <div className="flex h-90 w-full">
          {/* Lado izquierdo con contenido completo - image-header */}
          <div className="h-full w-1/2 bg-blue-200 flex items-center justify-start rounded-tr-3xl pl-6">
            <div className="text-red max-w-md">
              <h2 className="text-2xl md:text-4xl mb-4 leading-tight" style={{ color: '#3d6a96' }}>
                Elegí el <span className="font-bold" >parche</span> que<br />
                <span>tu </span>
                <span className="font-bold">cuerpo necesita</span>
              </h2>
              <p className="text-base md:text-lg text-black mb-6">
                Cada uno está formulado para activar un aspecto diferente de tu bienestar natural.
              </p>
              <button className="text-white font-medium rounded-lg px-4 py-2 text-sm shadow-md hover:opacity-90 transition-opacity" style={{ backgroundColor: '#4e83bb' }}>
                Suscribete y Ahorra
              </button>
            </div>
          </div>

          {/* Lado derecho con curva interna - blank-header */}
          <div className="h-full w-1/2 bg-blue-200 relative">
            {/* Curva interna */}
            <div className="h-full w-full rounded-bl-3xl"></div>
          </div>
        </div>

        {/* Sección de contenido principal - solo productos */}
        <div className="bg-blue-200 rounded-bl-3xl">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            {/* Grid de productos */}
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
              {products.map((product, index) => (
                <div key={index} className="relative group">
                  {/* Placeholder para imagen del parche */}
                  <div className={`${product.className} rounded-xl p-6 h-36 flex items-center justify-center transform transition-all duration-300 group-hover:scale-105 group-hover:shadow-lg`}>
                    <span className="text-white font-bold text-3xl">{product.letter}</span>
                  </div>
                  {/* Etiqueta del producto */}
                  <div className="absolute -bottom-3 left-1/2 transform -translate-x-1/2 bg-white rounded-full px-4 py-2 shadow-lg border border-gray-200">
                    <span className="text-sm font-semibold text-gray-800">{product.name}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default ProductPatchesSection
