import Image from "next/image"
import LocalizedClientLink from "@modules/common/components/localized-client-link"

// Íconos de características
const productFeatures = [
  {
    src: "/assets/features/not_sugar-cropped.svg",
    alt: "Sin azúcar",
    width: 60,
    height: 60
  },
  {
    src: "/assets/features/vegan-cropped.svg",
    alt: "100% vegano",
    width: 75,
    height: 75
  },
  {
    src: "/assets/features/gluten_free-cropped.svg",
    alt: "Libre de gluten",
    width: 60,
    height: 60
  },
  {
    src: "/assets/features/water_proo-cropped.svg",
    alt: "Resistente al agua",
    width: 60,
    height: 60
  },
  {
    src: "/assets/features/latex-free.svg",
    alt: "Sin látex",
    width: 60,
    height: 60
  },
  {
    src: "/assets/features/minutes-cropped.svg",
    alt: "Efecto en minutos",
    width: 60,
    height: 60
  }
]

// Sobres de producto mostrados en el hero
const heroProductImages = [
  {
    src: "/assets/products/ZenCore-Patch.webp",
    alt: "Parche Novapatch Zen Core",
    width: 125,
    height: 250,
    className: "drop-shadow-[0_20px_35px_rgba(33,71,133,0.32)]",
    wrapperClassName: ""
  },
  {
    src: "/assets/products/Woman-Patch.webp",
    alt: "Parche Novapatch Woman",
    width: 120,
    height: 210,
    className: "drop-shadow-[0_16px_28px_rgba(210,116,177,0.28)]",
    wrapperClassName: "-ml-16"
  },
  {
    src: "/assets/products/Energy-Patch.webp",
    alt: "Parche Novapatch Energy",
    width: 115,
    height: 202,
    className: "drop-shadow-[0_16px_28px_rgba(46,142,219,0.25)]",
    wrapperClassName: "-ml-16"
  },
  {
    src: "/assets/products/Glow-Patch.webp",
    alt: "Parche Novapatch Glow",
    width: 110,
    height: 198,
    className: "drop-shadow-[0_16px_28px_rgba(236,121,69,0.26)]",
    wrapperClassName: "-ml-16"
  },
  {
    src: "/assets/products/Daily-shield-Patch.webp",
    alt: "Parche Novapatch Daily Shield",
    width: 105,
    height: 190,
    className: "drop-shadow-[0_16px_28px_rgba(214,100,60,0.26)]",
    wrapperClassName: "-ml-16"
  },
  {
    src: "/assets/products/DeepRest-Patch.webp",
    alt: "Parche Novapatch Deep Rest",
    width: 100,
    height: 188,
    className: "drop-shadow-[0_16px_28px_rgba(37,120,176,0.25)]",
    wrapperClassName: "-ml-16"
  }
]

const HeroSection = () => {
  return (
    <section className="nova-hero relative overflow-visible h-[520px] sm:h-[560px] md:h-[620px] lg:h-[700px] xl:h-[760px]">
      {/* Full background image */}
      <div className="absolute inset-0 w-full h-full">
        <Image 
          src="/assets/hero/Girls.svg" 
          alt="Mujeres disfrutando con Novapatch" 
          fill 
          style={{ objectFit: 'cover', objectPosition: '50% 55%' }} 
          priority 
          className="z-0"
        />
        {/* Overlay gradient for better text visibility - responsive width */}
        <div className="absolute inset-y-0 left-0 bg-gradient-to-r from-white/80 via-white/50 to-transparent z-10 w-[82%] sm:w-[70%] md:w-[60%] lg:w-[55%]"></div>
      </div>
      
      {/* Content positioned over the background */}
      <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px- lg:px-4 h-full flex items-center">
        <div className="max-w-md mt-5 ml-14 sm:ml-16 md:ml-20">
          <h1 className="text-2xl md:text-4xl lg:text-4xl mb-4 font-bold" style={{ color: '#3d6a96' }}>
            Activa tu <br/>
            <span className="">bienestar</span> sin <br/>
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
        <div className="hidden md:block absolute md:right-[4%] lg:right-[6%] xl:right-[2%] md:bottom-[10%] lg:bottom-[12%]">
  
            <div className="relative md:w-[420px] md:h-[260px] lg:w-[500px] lg:h-[300px] xl:w-[520px] xl:h-[320px] md:scale-95 lg:scale-100">
            <Image
              src="/assets/hero/form.svg"
              alt="Forma decorativa Novapatch"
              fill
              sizes="520px"
              className="object-contain"
              priority
            />
            <div className="absolute inset-0 flex items-end justify-center pb-12">
              <div className="flex items-end relative">
                {heroProductImages.map((product, index) => (
                  <div
                    key={product.src}
                    className={`relative ${product.wrapperClassName}`}
                    style={{ zIndex: 50 - (index * 10) }}
                  >
                    <Image
                      src={product.src}
                      alt={product.alt}
                      width={product.width}
                      height={product.height}
                      className={`object-contain ${product.className}`}
                      priority={index === 0}
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Banda azul en la parte inferior - menos alta y a ancho completo */}
      <div className="absolute -bottom-8 sm:-bottom-10 md:-bottom-12 lg:-bottom-16 left-0 right-0 w-full z-30 overflow-visible">
        <svg 
          viewBox="0 0 1501 212" 
          className="w-full"
          preserveAspectRatio="none"
          style={{ display: 'block', height: '150px' }}
        >
          <path 
            fill="#83b5f4" 
            d="m1500.19 211.5v-211.62h-16.75c-0.03 6.68-3.27 13.26-9.39 17.5-3.96 2.75-8.65 4.2-13.55 4.2-7.3 0-14.23-3.33-18.54-8.89-1.61-2.09-2.81-4.38-3.55-6.82-0.61-1.98-2.52-3.34-4.69-3.34h-0.01c-1.77 0.01-3.37 0.92-4.22 2.32-1.21 4.86-4.18 9.35-8.76 12.53q-2.65 1.83-5.65 2.87c-2.57 0.93-5.31 1.41-8.12 1.41-7.3 0-14.23-3.33-18.54-8.9-1.91-2.47-3.19-5.2-3.86-8.01-0.87-1.35-2.44-2.22-4.16-2.22h-0.02c-2.18 0.01-4.08 1.38-4.68 3.36-1.4 4.67-4.34 8.67-8.51 11.56-3.97 2.75-8.65 4.21-13.56 4.21-7.3 0-14.23-3.33-18.54-8.9-3-3.88-4.43-8.4-4.42-12.88h-1329.94v211.62z"
          />
        </svg>
        
        {/* Íconos de características posicionados sobre la banda azul */}
        <div className="absolute left-0 right-0 w-full z-40 top-[52%] -translate-y-1/2 overflow-hidden">
          {/* Flor decorativa en la esquina izquierda */}
          <div className="absolute left-5 bottom-14 md:bottom-16 z-50">
            <Image 
              src="/assets/features/flower.svg" 
              alt="Decoración floral" 
              width={40} 
              height={40} 
              style={{ opacity: 0.5 }}
            />
          </div>
        
          <div className="max-w-7xl mx-auto relative">
            <div className="flex justify-center overflow-hidden">
              {/* Contenedor con animación de scroll infinito */}
              <div className="flex animate-scroll-features gap-0">
                {/* Duplicamos el array para crear el efecto infinito */}
                {[...productFeatures, ...productFeatures].map((feature, index) => (
                  <div key={index} className="flex flex-col items-center px-6 md:px-10 lg:px-12 flex-shrink-0">
                    <div className="flex items-center justify-center h-[52px] w-[52px] md:h-[60px] md:w-[60px] lg:h-[64px] lg:w-[64px]">
                      <Image
                        src={feature.src}
                        alt={feature.alt}
                        width={feature.width}
                        height={feature.height}
                        style={{ objectFit: 'contain' }}
                        className="filter brightness-0 invert" 
                      />
                    </div>
                    <p className="text-white font-bold text-[9px] md:text-[12px] text-center mt-2 whitespace-nowrap">{feature.alt}</p>
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
