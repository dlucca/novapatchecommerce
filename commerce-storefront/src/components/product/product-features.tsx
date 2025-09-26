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
      src: "/images/features/not_latex-cropped.svg",
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
    <section className="py-3 md:py-4 px-0 relative overflow-hidden" style={{ backgroundColor: '#82b5f4' }}>
      {/* Flor decorativa en la esquina izquierda */}
      <div className="absolute left-1 top-0 -translate-y-1/4">
        <Image 
          src="/images/features/flower.svg" 
          alt="Decoración floral" 
          width={40} 
          height={40} 
          className="opacity-25 filter brightness-200"
        />
      </div>
      
      {/* Círculos decorativos en la esquina derecha */}
      <div className="absolute right-0 top-0 flex">
        <div className="w-3.5 h-3.5 rounded-full bg-white opacity-20 mr-1"></div>
        <div className="w-3.5 h-3.5 rounded-full bg-white opacity-20 mr-1 mt-0.5"></div>
        <div className="w-3.5 h-3.5 rounded-full bg-white opacity-20 mt-1"></div>
      </div>
      
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="flex justify-center">
          <div className="flex justify-between w-full max-w-6xl mx-auto">
            {features.map((feature, index) => (
              <div key={index} className="flex flex-col items-center px-0.5">
                <div className="flex items-center justify-center h-[40px]">
                  <Image
                    src={feature.src}
                    alt={feature.alt}
                    width={feature.width}
                    height={feature.height}
                    style={{ objectFit: 'contain' }}
                    className="filter brightness-0 invert" /* Hace que los SVG sean blancos */
                  />
                </div>
                <p className="text-white text-[9px] md:text-[11px] text-center mt-2.5">{feature.alt}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export default ProductFeatures
