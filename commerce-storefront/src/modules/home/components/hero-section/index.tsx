import Image from "next/image"
import LocalizedClientLink from "@modules/common/components/localized-client-link"

const HeroSection = () => {
  return (
    <section className="nova-hero relative overflow-hidden h-[500px] md:h-[550px]">
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
        <div className="hidden md:block absolute right-16 bottom-8">
          <div className="relative">
            {/* Form SVG */}
            <Image 
              src="/images/hero/form.svg" 
              alt="Novapatch products" 
              width={360} 
              height={200} 
              priority
              className="z-20"
            />
          </div>
        </div>
      </div>
    </section>
  )
}

export default HeroSection
