import Image from 'next/image'

// Componente que usa los archivos SVG disponibles
const ProductFeatures = () => {
  // Usamos los archivos SVG que ya existen en la carpeta con tamaños personalizados
  const features = [
    {
      src: "/images/features/not_sugar-cropped.svg",
      alt: "Sin azúcar",
      width: 60,
      height: 60
    },
    {
      src: "/images/features/vegan-cropped.svg",
      alt: "100% vegano",
      width: 75, // Hacemos este icono más grande porque parece ser pequeño
      height: 75
    },
    {
      src: "/images/features/gluten_free-cropped.svg",
      alt: "Libre de gluten",
      width: 60,
      height: 60
    },
    {
      src: "/images/features/water_proo-cropped.svg",
      alt: "Resistente al agua",
      width: 60,
      height: 60
    },
    {
      src: "/images/features/latex-free.svg",
      alt: "Sin látex",
      width: 60,
      height: 60
    },
    {
      src: "/images/features/minutes-cropped.svg",
      alt: "Efecto en minutos",
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
            src="/images/features/flower.svg" 
            alt="Decoración floral" 
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
                      alt={feature.alt}
                      width={feature.width}
                      height={feature.height}
                      style={{ objectFit: 'contain' }}
                      className="" /* Hace que los SVG sean blancos */
                    />
                  </div>
                  <p className="text-white font-bold text-[9px] md:text-[12px] text-center mt-3">{feature.alt}</p>
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
