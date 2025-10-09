import Image from "next/image"

const HowItWorksSection = () => {

  return (
    <section className="py-12 md:py-20 bg-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="flex flex-col lg:flex-row items-center justify-center gap-8 lg:gap-16">
          {/* Imagen izquierda */}
          <div className="flex-1 flex justify-center items-center">
            <div className="w-full max-w-lg">
              <Image
                src="/assets/work/howwork.svg"
                alt="Cómo funciona - Parches inteligentes"
                width={500}
                height={400}
                className="w-full h-auto"
              />
            </div>
          </div>

          {/* Contenido derecho */}
          <div className="flex-1 text-center lg:text-left">
            <div className="max-w-xl mx-auto lg:mx-0">
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-3" style={{ color: '#4e83bb' }}>
                Cómo funciona
              </h2>
              <p className="text-lg md:text-xl font-medium mb-6" style={{ color: '#4e83bb' }}>
                Parches inteligentes, absorción natural
              </p>
              <p className="text-gray-700 text-base md:text-lg leading-relaxed mb-8">
                Nuestros parches liberan vitaminas y minerales a través de la piel, sin pasar por el sistema digestivo. Esto permite una absorción más directa, rápida y sin interferencias.
              </p>
              <div className="text-center lg:text-left">
                <button
                  className="text-white font-semibold py-3 px-8 rounded-lg transition-colors duration-200 hover:opacity-90"
                  style={{ backgroundColor: '#4e83bb' }}
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
