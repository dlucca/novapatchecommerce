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
    wrapperClassName: "-ml-24"
  },
  {
    src: "/assets/products/Energy-Patch.webp",
    alt: "Parche Novapatch Energy",
    width: 115,
    height: 202,
    className: "drop-shadow-[0_16px_28px_rgba(46,142,219,0.25)]",
    wrapperClassName: "-ml-24"
  },
  {
    src: "/assets/products/Glow-Patch.webp",
    alt: "Parche Novapatch Glow",
    width: 110,
    height: 198,
    className: "drop-shadow-[0_16px_28px_rgba(236,121,69,0.26)]",
    wrapperClassName: "-ml-24"
  },
  {
    src: "/assets/products/Daily-shield-Patch.webp",
    alt: "Parche Novapatch Daily Shield",
    width: 105,
    height: 190,
    className: "drop-shadow-[0_16px_28px_rgba(214,100,60,0.26)]",
    wrapperClassName: "-ml-24"
  },
  {
    src: "/assets/products/DeepRest-Patch.webp",
    alt: "Parche Novapatch Deep Rest",
    width: 100,
    height: 188,
    className: "drop-shadow-[0_16px_28px_rgba(37,120,176,0.25)]",
    wrapperClassName: "-ml-24"
  }
]

const HeroSection = () => {
  return (
    <section className="relative overflow-visible h-screen min-h-[600px]">
      {/* Background image */}
      <div className="absolute inset-0">
        <Image
          // src="/assets/hero/women.webp"
          src="/assets/hero/Girls.svg"

          alt="Mujeres disfrutando con Novapatch"
          fill
          style={{ objectFit: 'cover', objectPosition: '65% center' }}
          priority
        />
        {/* Overlay gradient */}
        <div className="absolute inset-y-0 left-0 bg-gradient-to-r from-white/85 via-white/60 to-transparent w-full sm:w-[85%] md:w-[65%] lg:w-[58%] xl:w-[52%]"></div>
      </div>

      {/* Content */}
      <div className="relative z-20 h-full flex items-start md:items-center pt-24 md:pt-0">
        <div className="w-full px-12 sm:px-16 md:px-24 lg:px-32 xl:px-40">
          <div className="max-w-2xl">
            <h1 className="font-bold leading-tight text-novapatch-title" style={{ fontSize: 'clamp(2.25rem, 3.5vw + 0.875rem, 4rem)', marginBottom: 'clamp(1rem, 2vw, 1.5rem)' }}>
              Activa tu <br/>
              <span>bienestar</span> sin <br/>
              complicaciones
            </h1>

            <p className="text-black leading-relaxed" style={{ fontSize: 'clamp(0.875rem, 1vw + 0.5rem, 1.125rem)', marginBottom: 'clamp(1.5rem, 2vw, 2rem)', maxWidth: 'clamp(280px, 50vw, 500px)' }}>
              Olvídate de pastillas o polvos. Nuestros parches trabajan mientras tú vives tu día... literalmente haciendo cualquier otra cosa.
            </p>

            <LocalizedClientLink href="/store/zencore-patch">
              <button className="text-white font-medium rounded-lg shadow-md hover:opacity-90 transition-opacity bg-novapatch-button" style={{ padding: 'clamp(0.625rem, 1vw, 0.75rem) clamp(1.5rem, 2vw, 2rem)', fontSize: 'clamp(0.875rem, 1vw, 1rem)' }}>
                Comprar ahora
              </button>
            </LocalizedClientLink>
          </div>
        </div>

        {/* Product display */}
        <div className="hidden md:block absolute" style={{ right: '6%', bottom: '10%' }}>
          <div className="relative" style={{ width: 'clamp(40rem, 50vw, 50rem)', height: 'clamp(30rem, 22vw, 26rem)' }}>
            <Image
              src="/assets/hero/form.svg"
              alt="Forma decorativa Novapatch"
              fill
              className="object-contain"
              priority
            />
            <div className="absolute inset-0 flex items-end justify-end" style={{ paddingBottom: 'clamp(1rem, 2.5vw, 3rem)', paddingRight: 'clamp(2rem, 1vw, 1rem)' }}>
              <div className="flex items-end" style={{ gap: 'clamp(0.25rem, 0.3vw, 0.5rem)' }}>
                {heroProductImages.map((product, index) => (
                  <div
                    key={product.src}
                    className={`relative ${product.wrapperClassName}`}
                    style={{
                      zIndex: 50 - (index * 10)
                    }}
                  >
                    <Image
                      src={product.src}
                      alt={product.alt}
                      width={product.width * 1.5}
                      height={product.height * 1.5}
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

      {/* Banda azul - Posicionada justo debajo del hero */}
      <div className="absolute left-0 right-0 w-full z-30 overflow-visible" style={{ bottom: 'clamp(-8rem, -6rem - 3vw, -13rem)' }}>
        <svg
          viewBox="0 0 1501 212"
          className="w-full"
          preserveAspectRatio="none"
          style={{ display: 'block', height: 'clamp(8rem, 6rem + 3vw, 13rem)' }}
        >
          <path
            fill="#83b5f4"
            d="m1500.19 211.5v-211.62h-16.75c-0.03 6.68-3.27 13.26-9.39 17.5-3.96 2.75-8.65 4.2-13.55 4.2-7.3 0-14.23-3.33-18.54-8.89-1.61-2.09-2.81-4.38-3.55-6.82-0.61-1.98-2.52-3.34-4.69-3.34h-0.01c-1.77 0.01-3.37 0.92-4.22 2.32-1.21 4.86-4.18 9.35-8.76 12.53q-2.65 1.83-5.65 2.87c-2.57 0.93-5.31 1.41-8.12 1.41-7.3 0-14.23-3.33-18.54-8.9-1.91-2.47-3.19-5.2-3.86-8.01-0.87-1.35-2.44-2.22-4.16-2.22h-0.02c-2.18 0.01-4.08 1.38-4.68 3.36-1.4 4.67-4.34 8.67-8.51 11.56-3.97 2.75-8.65 4.21-13.56 4.21-7.3 0-14.23-3.33-18.54-8.9-3-3.88-4.43-8.4-4.42-12.88h-1329.94v211.62z"
          />
        </svg>

        {/* Íconos de características posicionados sobre la banda azul */}
        <div className="absolute left-0 right-0 w-full z-40 top-1/2 -translate-y-1/2 overflow-visible">
          <div className="absolute left-[8%] bottom-[25%] z-50">
            <Image
              src="/assets/features/flower.svg"
              alt="Decoración floral"
              width={60}
              height={60}
              className="w-[clamp(50px,6vw,80px)] h-[clamp(50px,6vw,80px)]"
              style={{ opacity: 0.5 }}
            />
          </div>

          <div className="max-w-7xl mx-auto relative px-~3/4">
            <div className="flex justify-center">
              <div className="flex gap-8 md:gap-12 lg:gap-16">
                {productFeatures.map((feature, index) => (
                  <div
                    key={index}
                    className="flex flex-col items-center flex-shrink-0"
                  >
                    <div className="flex items-center justify-center h-[clamp(48px,6vw,64px)] w-[clamp(48px,6vw,64px)]">
                      <Image
                        src={feature.src}
                        alt={feature.alt}
                        width={feature.width}
                        height={feature.height}
                        style={{ objectFit: 'contain' }}
                        className="filter brightness-0 invert w-full h-full"
                      />
                    </div>
                    <p className="text-white font-bold text-[clamp(9px,1.2vw,12px)] text-center mt-~1.5/2 whitespace-nowrap">
                      {feature.alt}
                    </p>
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
