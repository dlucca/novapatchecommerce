import Image from "next/image"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import { Button } from "@medusajs/ui"

const ProductPatchesSection = () => {
  // Restaurar la definición original de productos con las letras
  const products = [
    { className: "nova-product-teal", name: "Sleep", letter: "S", img: "sleep.svg" },
    { className: "nova-product-blue", name: "Zen", letter: "Z", img: "zen.svg" },
    { className: "nova-product-red", name: "Glow", letter: "G", img: "glow.svg" },
    { className: "nova-product-yellow", name: "Shield", letter: "S", img: "shield.svg" },
    { className: "nova-product-purple", name: "Energy", letter: "E", img: "energy.svg" },
    { className: "nova-product-pink", name: "Woman", letter: "W", img: "woman.svg" }
  ]

  return (
    <section className="relative overflow-visible mt-44 md:mt-45 mb-16 w-full">
      {/* Container principal con el fondo con formas - siguiendo estructura del HTML proporcionado */}
      <div className="w-full">

        {/* Header section con la forma curva - equivalente a .header */}
        <div className="flex w-full" style={{ height: "300px" }}>
          {/* Lado izquierdo con contenido completo - equivalente a .image-header */}
          <div className="h-full w-1/2 flex items-center justify-start pl-8 md:pl-16 lg:pl-24" 
               style={{ backgroundColor: "#EFF6FF", borderTopRightRadius: '50px' }}>  {/* Usando un azul muy claro como en la imagen */}
            <div className="w-full pr-4 md:pr-8 lg:pr-12">
              <h2 className="text-2xl md:text-5xl lg:text-5xl mb-6 leading-tight" style={{ color: '#3d6a96' }}>
                Elegí el <span className="font-bold">parche</span> que<br />
                tu <span className="font-bold">cuerpo necesita</span>
              </h2>
              <p className="text-sm md:text-base text-gray-700 mb-6 md:mb-6">
                Cada uno está formulado para activar un aspecto diferente de tu bienestar natural.
              </p>
              <button className="text-white font-medium rounded-lg px-4 py-2 text-sm shadow-md hover:opacity-90 transition-opacity" style={{ backgroundColor: '#4e83bb' }}>
                Suscríbete y ahorra
              </button>
            </div>
          </div>

          {/* Lado derecho con curva interna - equivalente a .blank-header */}
          <div className="h-full w-1/2 relative" style={{ backgroundColor: "#EFF6FF" }}>
            {/* Curva interna - equivalente a .curve - con radio más pronunciado */}
            <div className="h-full w-full bg-white" style={{ borderBottomLeftRadius: '120px' }}></div>
          </div>
        </div>

        {/* Sección de contenido principal - equivalente a .images */}
        <div className="py-8 md:py-12 w-full" style={{ backgroundColor: "#EFF6FF", borderBottomLeftRadius: '120px' }}>
          <div className="w-full px-8 md:px-16 lg:px-24 py-8 md:py-12">
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
