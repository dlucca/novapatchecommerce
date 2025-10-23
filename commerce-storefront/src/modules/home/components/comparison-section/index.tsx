import Image from "next/image"

const ComparisonSection = () => {
  const features = [
    {
      name: "Alta tasa de absorción",
      novapatch: true,
      pills: false,
      gummies: false,
    },
    {
      name: "Sin pastillas difíciles de tragar",
      novapatch: true,
      pills: false,
      gummies: true,
    },
    {
      name: "Sin azúcar ni calorías",
      novapatch: true,
      pills: true,
      gummies: false,
    },
    {
      name: "Sin colorantes ni rellenos artificiales",
      novapatch: true,
      pills: false,
      gummies: false,
    },
    {
      name: "No afecta tu sistema digestivo",
      novapatch: true,
      pills: false,
      gummies: false,
    },
  ]

  // TODO: CAMBIAR ICONOS DE CHECK Y X
  const CheckIcon = ({ isCheck }: { isCheck: boolean }) => (
    <span
      className={`text-2xl font-bold ${
        isCheck ? "text-teal-500" : "text-gray-400"
      }`}
    >
      {isCheck ? "✓" : "✗"}
    </span>
  )

  return (
    <section>
      <div className="">
        <div className="text-center mb-12">
          <h2
            className="font-normal leading-tight text-novapatch-title"
            style={{ color: "#3d6a96" }}
          >
            La forma más <span className="font-bold">limpia</span> y{" "}
            <span className="font-bold">práctica</span>
          </h2>
          <h2
            className="font-normal leading-tight text-novapatch-title"
            style={{ color: "#3d6a96" }}
          >
            de <span className="font-bold">tomar vitaminas</span>
          </h2>
        </div>
        {/* El fondo cubre todos los bordes */}
        <div
          className="py-12 md:py-16 w-full relative"
          style={{ backgroundColor: "#f7edeb" }}
        >
          {/* Círculos decorativos blancos */}
          <div className="absolute -top-7 left-5 flex items-center">
            <div className="h-10 w-10 md:h-14 md:w-14 bg-white rounded-full mr-1"></div>
            <div className="h-10 w-10 md:h-14 md:w-14 bg-white rounded-full mr-1"></div>
            <div className="h-10 w-10 md:h-14 md:w-14 bg-white rounded-full"></div>
          </div>
          {/* Tabla para pantallas grandes */}
          <div className="hidden md:block overflow-x-auto">
            <div className="shadow-lg overflow-hidden">
              <table className="mx-auto border-collapse">
                <thead>
                  <tr>
                    <th
                      className="text-left py-6 px-4 font-normal text-3xl"
                      style={{ color: "#3d6a96", minWidth: 200 }}
                    >
                      Característica
                    </th>
                    <th className="text-center py-6 px-6">
                      <div className="flex flex-col items-center gap-3">
                        <div className="h-12 flex items-center justify-center">
                          <Image
                            src="/assets/nav/LOGO-1.svg"
                            width={120}
                            height={48}
                            alt="Novapatch"
                            className="object-contain"
                          />
                        </div>
                        <span
                          className="text-sm font-medium whitespace-nowrap"
                          style={{ color: "#3d6a96" }}
                        >
                          Nuestros parches
                        </span>
                      </div>
                    </th>
                    <th className="text-center py-6 px-6">
                      <div className="flex flex-col items-center gap-3">
                        <div className="h-12 flex items-center justify-center">
                          <Image
                            src="/assets/comparison/parche.svg"
                            width={40}
                            height={48}
                            alt="Parche"
                            className="object-contain"
                          />
                        </div>
                        <span
                          className="text-sm font-medium whitespace-nowrap"
                          style={{ color: "#3d6a96" }}
                        >
                          Cápsulas comunes
                        </span>
                      </div>
                    </th>
                    <th className="text-center py-6 px-6">
                      <div className="flex flex-col items-center gap-3">
                        <div className="h-12 flex items-center justify-center">
                          <Image
                            src="/assets/comparison/bear.svg"
                            width={30}
                            height={48}
                            alt="Osito"
                            className="object-contain"
                          />
                        </div>
                        <span
                          className="text-sm font-medium whitespace-nowrap"
                          style={{ color: "#3d6a96" }}
                        >
                          Gomitas comunes
                        </span>
                      </div>
                    </th>
                  </tr>
                  <tr>
                    <td
                      colSpan={4}
                      style={{ borderBottom: "1px solid #000000ff" }}
                    ></td>
                  </tr>
                </thead>
                <tbody>
                  {features.map((feature, index) => (
                    <tr
                      key={index}
                      style={{ borderBottom: "1px solid #000000ff" }}
                    >
                      <td
                        className="py-4 px-4 font-medium text-sm"
                        style={{ color: "#3d6a96" }}
                      >
                        {feature.name}
                      </td>
                      <td className="py-4 px-6 text-center">
                        <CheckIcon isCheck={feature.novapatch} />
                      </td>
                      <td className="py-4 px-6 text-center">
                        <CheckIcon isCheck={feature.pills} />
                      </td>
                      <td className="py-4 px-6 text-center">
                        <CheckIcon isCheck={feature.gummies} />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            {/* Flor decorativa en la esquina izquierda */}
            <div className="absolute -right-12 -top-28 z-10">
              <Image
                src="/assets/features/flower.svg"
                alt="Decoración floral"
                width={215}
                height={215}
                className=""
              />
            </div>
          </div>

          {/* Versión para móvil */}
          <div className="md:hidden px-4">
            <div className="shadow-lg overflow-hidden">
              <table className="w-full border-collapse">
                <thead>
                  <tr>
                    <th
                      className="text-left py-4 px-2 font-normal text-sm"
                      style={{ color: "#3d6a96" }}
                    >
                      Característica
                    </th>
                    <th className="text-center py-4 px-1 w-16">
                      <div className="flex flex-col items-center gap-1">
                        <div className="h-8 flex items-center justify-center">
                          <Image
                            src="/assets/nav/LOGO-1.svg"
                            width={40}
                            height={32}
                            alt="Novapatch"
                            className="object-contain"
                          />
                        </div>
                      </div>
                    </th>
                    <th className="text-center py-4 px-1 w-16">
                      <div className="flex flex-col items-center gap-1">
                        <div className="h-8 flex items-center justify-center">
                          <Image
                            src="/assets/comparison/parche.svg"
                            width={20}
                            height={32}
                            alt="Parche"
                            className="object-contain"
                          />
                        </div>
                      </div>
                    </th>
                    <th className="text-center py-4 px-1 w-16">
                      <div className="flex flex-col items-center gap-1">
                        <div className="h-8 flex items-center justify-center">
                          <Image
                            src="/assets/comparison/bear.svg"
                            width={16}
                            height={32}
                            alt="Osito"
                            className="object-contain"
                          />
                        </div>
                      </div>
                    </th>
                  </tr>
                  <tr>
                    <td
                      colSpan={4}
                      style={{ borderBottom: "1px solid #000000ff" }}
                    ></td>
                  </tr>
                </thead>
                <tbody>
                  {features.map((feature, index) => (
                    <tr
                      key={index}
                      style={{ borderBottom: "1px solid #000000ff" }}
                    >
                      <td
                        className="py-3 px-2 font-medium text-xs"
                        style={{ color: "#3d6a96" }}
                      >
                        {feature.name}
                      </td>
                      <td className="py-3 px-1 text-center">
                        <CheckIcon isCheck={feature.novapatch} />
                      </td>
                      <td className="py-3 px-1 text-center">
                        <CheckIcon isCheck={feature.pills} />
                      </td>
                      <td className="py-3 px-1 text-center">
                        <CheckIcon isCheck={feature.gummies} />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default ComparisonSection
