import Image from 'next/image'

import { useTranslations } from "next-intl"

// Componente que usa los archivos SVG disponibles
const ProductFeatures = () => {
  const tFeatures = useTranslations("features")
  const tCommon = useTranslations("common")
  // Usamos los archivos SVG que ya existen en la carpeta con tamaños personalizados
  const features = [
    {
      src: "/assets/features/not_sugar-cropped.svg",
      key: "sugarFree",
      width: 60,
      height: 60
    },
    {
      src: "/assets/features/vegan-cropped.svg",
      key: "vegan",
      width: 75, // Hacemos este icono más grande porque parece ser pequeño
      height: 75
    },
    {
      src: "/assets/features/gluten_free-cropped.svg",
      key: "glutenFree",
      width: 60,
      height: 60
    },
    {
      src: "/assets/features/water_proo-cropped.svg",
      key: "waterResistant",
      width: 60,
      height: 60
    },
    {
      src: "/assets/features/latex-free.svg",
      key: "latexFree",
      width: 60,
      height: 60
    },
    {
      src: "/assets/features/minutes-cropped.svg",
      key: "fastEffect",
      width: 60,
      height: 60
    }
  ];
  
  return (
    <section className="relative z-20 -mt-[10px] md:-mt-[40px]">
      <div className="py-5 md:py-6">
        {/* Flor decorativa en la esquina izquierda */}
        <div className="absolute left-1 top-0">
          <Image 
            src="/assets/features/flower.svg" 
            alt={tCommon("decorativeFloralAlt")} 
            width={30} 
            height={30} 
            className=""
          />
        </div>
      
        <div className="max-w-5xl mx-auto relative">
          <div className="flex justify-center">
            <div className="flex justify-between w-full max-w-6xl mx-auto px-4">
              {features.map((feature, index) => (
                <div key={index} className="flex flex-col items-center px-0.5">
                  <div className="flex items-center justify-center h-[40px]">
                    <Image
                      src={feature.src}
                      alt={tFeatures(feature.key)}
                      width={feature.width}
                      height={feature.height}
                      style={{ objectFit: 'contain' }}
                      className="" /* Hace que los SVG sean blancos */
                    />
                  </div>
                  <p className="text-white font-bold text-[9px] md:text-[12px] text-center mt-3">{tFeatures(feature.key)}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default ProductFeatures
