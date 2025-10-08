"use client"

import Image from "next/image"
import { useEffect, useRef, useState } from "react"

const ProductPatchesSection = () => {
  const [isVisible, setIsVisible] = useState(false)
  const sectionRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
        }
      },
      { threshold: 0.2 }
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current)
      }
    }
  }, [])

  const products = [
    {
      className: "nova-product-teal",
      letter: "S",
      img: "/assets/products/DeepRest-Patch.webp",
    },
    {
      className: "nova-product-blue",
      letter: "Z",
      img: "/assets/products/ZenCore-Patch.webp",
    },
    {
      className: "nova-product-red",
      letter: "G",
      img: "/assets/products/Glow-Patch.webp",
    },
    {
      className: "nova-product-yellow",
      letter: "S",
      img: "/assets/products/Daily-shield-Patch.webp",
    },
    {
      className: "nova-product-purple",
      letter: "E",
      img: "/assets/products/Energy-Patch.webp",
    },
    {
      className: "nova-product-pink",
      letter: "W",
      img: "/assets/products/Woman-Patch.webp",
    },
  ]

  return (
    <section className="relative overflow-visible mt-44 md:mt-45 mb-16 w-full">
      <div className="w-full">
        <div className="flex w-full" style={{ height: "300px" }}>
          <div
            className="h-full w-1/2 flex items-center justify-start pl-8 md:pl-16 lg:pl-24"
            style={{ backgroundColor: "#EFF6FF", borderTopRightRadius: "50px" }}
          >
            <div className="w-full pr-4 md:pr-8 lg:pr-12">
              <h2
                className="text-2xl md:text-4xl lg:text-4xl mb-4 leading-tight"
                style={{ color: "#3d6a96" }}
              >
                Elegí el <span className="font-bold">parche</span> que
                <br />
                tu <span className="font-bold">cuerpo necesita</span>
              </h2>
              <p className="text-sm md:text-base text-gray-700 mb-4 md:mb-4">
                Cada uno está formulado para activar un aspecto diferente de tu
                bienestar natural.
              </p>
              <button
                className="text-white font-medium rounded-lg px-4 py-2 text-sm shadow-md hover:opacity-90 transition-opacity"
                style={{ backgroundColor: "#4e83bb" }}
              >
                Suscríbete y ahorra
              </button>
            </div>
          </div>

          {/* Lado derecho con curva interna */}
          <div
            className="h-full w-1/2 relative"
            style={{ backgroundColor: "#EFF6FF" }}
          >
            {/* Curva interna */}
            <div
              className="h-full w-full bg-white"
              style={{ borderBottomLeftRadius: "120px" }}
            ></div>
          </div>
        </div>

        <div
          className="pt-4 md:pt-6 pb-8 md:pb-12 w-full relative"
          style={{
            backgroundColor: "#EFF6FF",
            borderBottomLeftRadius: "120px",
          }}
        >
          {/* Círculos decorativos blancos */}
            <div className="absolute -top-5 md:right-3 flex items-center z-10">
            <div className="h-6 w-6 md:h-9 md:w-9 bg-white rounded-full mr-1"></div>
            <div className="h-6 w-6 md:h-9 md:w-9 bg-white rounded-full mr-1"></div>
            <div className="h-6 w-6 md:h-9 md:w-9 bg-white rounded-full"></div>
          </div>
          <div className="w-full px-8 md:px-16 lg:px-24" ref={sectionRef}>
            <div className="flex justify-center items-center">
              {products.map((product, index) => {
                const verticalOffset = index % 2 === 0 ? 0 : 60
                const stackOrder = products.length - index

                return (
                  <div
                    key={index}
                    className={`relative transition-all duration-1000 ease-out ${
                      isVisible 
                        ? 'opacity-100 translate-y-0' 
                        : 'opacity-0 translate-y-8'
                    }`}
                    style={{
                      marginLeft: index === 0 ? "0" : "-40px",
                      marginTop: `${verticalOffset}px`,
                      zIndex: stackOrder,
                      transitionDelay: `${index * 150}ms`
                    }}
                  >
                    <div className="overflow-hidden">
                      <Image
                        src={product.img}
                        alt={`Patch`}
                        width={200}
                        height={200}
                        className="w-32 md:w-40 lg:w-48 h-auto object-cover"
                      />
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default ProductPatchesSection
