import Image from "next/image"

const HowItWorksSection = () => {

  return (
    <section className="bg-white" style={{ paddingTop: 'clamp(3rem, 5vw, 5rem)', paddingBottom: 'clamp(3rem, 5vw, 5rem)' }}>
      <div className="max-w-7xl mx-auto" style={{ paddingLeft: 'clamp(1rem, 2vw, 2rem)', paddingRight: 'clamp(1rem, 2vw, 2rem)' }}>
        <div className="flex flex-col lg:flex-row items-center justify-center" style={{ gap: 'clamp(2rem, 4vw, 4rem)' }}>
          <div className="flex-1 flex justify-center items-center w-full">
            <div className="w-full max-w-[280px] sm:max-w-sm md:max-w-md lg:max-w-lg xl:max-w-xl">
              <Image
                src="/assets/work/howwork.svg"
                alt="Cómo funciona - Parches inteligentes"
                width={500}
                height={400}
                className="w-full h-auto"
                priority
              />
            </div>
          </div>

          <div className="flex-1 text-center lg:text-left w-full">
            <div className="max-w-xl mx-auto lg:mx-0">
              <h2
                className="font-bold leading-tight text-novapatch-title"
                style={{ fontSize: 'clamp(1.25rem, 2.5vw + 0.5rem, 2.25rem)', marginBottom: 'clamp(0.75rem, 1vw, 1rem)' }}
              >
                Cómo funciona
              </h2>

              <p
                className="font-medium text-novapatch-title"
                style={{ fontSize: 'clamp(1.125rem, 1.5vw + 0.25rem, 1.25rem)', marginBottom: 'clamp(1.25rem, 1.5vw, 1.5rem)' }}
              >
                Parches inteligentes, absorción natural
              </p>

              <p className="text-gray-700 leading-relaxed" style={{ fontSize: 'clamp(1rem, 1.25vw, 1.125rem)', marginBottom: 'clamp(1.75rem, 2vw, 2rem)' }}>
                Nuestros parches liberan vitaminas y minerales a través de la piel, sin pasar por el sistema digestivo. Esto permite una absorción más directa, rápida y sin interferencias.
              </p>

              <div className="text-center lg:text-left">
                <button
                  className="text-white font-semibold rounded-lg transition-colors duration-200 hover:opacity-90 shadow-md bg-novapatch-button"
                  style={{ padding: 'clamp(0.625rem, 0.75vw, 0.75rem) clamp(1.5rem, 2vw, 2rem)', fontSize: 'clamp(0.875rem, 1vw, 1rem)' }}
                >
                  Ver ahora
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default HowItWorksSection
