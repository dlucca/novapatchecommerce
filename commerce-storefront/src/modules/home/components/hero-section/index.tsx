import Image from "next/image"
import LocalizedClientLink from "@modules/common/components/localized-client-link"

// Íconos de características
const productFeatures = [
  {
    src: "/images/features/not_sugar-cropped.svg",
    alt: "Sin azúcar",
    width: 60,
    height: 60
  },
  {
    src: "/images/features/vegan-cropped.svg",
    alt: "100% vegano",
    width: 75,
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
]

const HeroSection = () => {
  return (
    <section className="nova-hero relative overflow-visible h-[650px] md:h-[700px]">
      {/* Full background image */}
      <div className="absolute inset-0 w-full h-full">
        <Image 
          src="/images/hero/Girls.svg" 
          alt="Mujeres disfrutando con Novapatch" 
          fill 
          style={{objectFit: 'cover'}} 
          priority 
          className="z-0"
        />
        {/* Overlay gradient for better text visibility - extends further across the image */}
        <div className="absolute inset-0 bg-gradient-to-r from-white/80 via-white/50 to-transparent z-10" style={{ width: '65%' }}></div>
      </div>
      
      {/* Content positioned over the background */}
      <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex items-center">
        <div className="max-w-md mt-5 ml-14 sm:ml-16 md:ml-20">
          <h1 className="text-blue-800 text-3xl sm:text-4xl md:text-5xl font-bold mb-2 md:mb-3">
            Activa tu <br/>
            <span className="text-blue-800">bienestar</span> sin <br/>
            complicaciones
          </h1>
          <p className="text-sm sm:text-base text-black mb-4 md:mb-5 max-w-sm">
            Olvídate de pastillas o polvos. Nuestros parches trabajan mientras tú vives tu día... literalmente haciendo cualquier otra cosa.
          </p>
          <div>
            <LocalizedClientLink href="/store">
              <button className="text-white font-medium rounded-lg px-4 py-2 text-sm shadow-md hover:opacity-90 transition-opacity" style={{ backgroundColor: '#4e83bb' }}>
                Comprar ahora
              </button>
            </LocalizedClientLink>
          </div>
        </div>

        {/* Product display on the right */}
        <div className="hidden md:block absolute right-[8%] bottom-[16%]">
  
            <div className="relative">
            {/* Form SVG */}
            <Image 
              src="/images/hero/form.svg" 
              alt="Novapatch products" 
              width={500} 
              height={250} 
              priority
              className="z-20"
            />
          </div>
        </div>
      </div>

      {/* Banda azul en la parte inferior */}
      <div className="absolute -bottom-32 md:-bottom-38 left-0 right-0 w-full z-10">
        <Image 
          src="/images/features/blue.svg" 
          alt="Banda azul decorativa" 
          width={1500}
          height={250}
          className="w-full"
          priority
        />
        
        {/* Íconos de características posicionados sobre la banda azul */}
        <div className="absolute top-[50%] left-0 right-0 w-full z-20" style={{ transform: 'translateY(-50%)' }}>
          {/* Flor decorativa en la esquina izquierda */}
          <div className="absolute left-5 bottom-20">
            <Image 
              src="/images/features/flower.svg" 
              alt="Decoración floral" 
              width={40} 
              height={40} 
            />
          </div>
        
          <div className="max-w-5xl mx-auto relative">
            <div className="flex justify-center">
              <div className="flex justify-between w-full max-w-6xl mx-auto px-6 sm:px-12">
                {productFeatures.map((feature, index) => (
                  <div key={index} className="flex flex-col items-center px-1 sm:px-2">
                    <div className="flex items-center justify-center h-[60px] w-[60px]">
                      <Image
                        src={feature.src}
                        alt={feature.alt}
                        width={feature.width}
                        height={feature.height}
                        style={{ objectFit: 'contain' }}
                        className="filter brightness-0 invert" 
                      />
                    </div>
                    <p className="text-white font-bold text-[9px] md:text-[12px] text-center mt-2">{feature.alt}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default HeroSection
