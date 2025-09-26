import Image from "next/image"

const ComparisonSection = () => {
  const features = [
    {
      name: "Alta tasa de absorción",
      novapatch: true,
      pills: false,
      gummies: false
    },
    {
      name: "Sin pastillas difíciles de tragar",
      novapatch: true,
      pills: false,
      gummies: true
    },
    {
      name: "Sin azúcar ni calorías",
      novapatch: true,
      pills: true,
      gummies: false
    },
    {
      name: "Sin colorantes ni rellenos artificiales",
      novapatch: true,
      pills: false,
      gummies: false
    },
    {
      name: "No afecta tu sistema digestivo",
      novapatch: true,
      pills: false,
      gummies: false
    }
  ]

  // TODO: CAMBIAR ICONOS DE CHECK Y X
  const CheckIcon = ({ isCheck }: { isCheck: boolean }) => (
    <span className={`text-2xl font-bold ${isCheck ? 'text-teal-500' : 'text-gray-400'}`}>
      {isCheck ? '✓' : '✗'}
    </span>
  )

  return (
    <section>
      <div className="">
      <div className="text-center mb-12">
        <h2 className="text-3xl md:text-4xl lg:text-5xl mb-2" style={{ color: '#3d6a96' }}>
        La forma más <span className="font-bold">limpia</span> y <span className="font-bold">práctica</span>
        </h2>
        <h2 className="text-3xl md:text-4xl lg:text-5xl mb-2" style={{ color: '#3d6a96' }}>
        de <span className="font-bold">tomar vitaminas</span>
        </h2>
      </div>
      {/* El fondo cubre todos los bordes */}
      <div className="py-12 md:py-16 w-full" style={{ backgroundColor: '#f7edeb' }} >
        {/* Tabla para pantallas grandes */}
        <div className="hidden md:block overflow-x-auto">
        <div className="shadow-lg overflow-hidden">
          <table className="mx-auto border-collapse">
            <thead>
              <tr>
                <th className="text-left py-6 px-4 font-bold text-2xl" style={{ color: '#3d6a96', minWidth: 200 }}>
                  Característica
                </th>
                <th className="text-center py-6 px-6">
                  <div className="flex flex-col items-center gap-1">
                    <Image src="/images/comparison/namelogo.svg" width={100} height={32} alt="Novapatch" />
                    <span className="text-lg font-bold" style={{ color: '#3d6a96' }}>Nuestros parches</span>
                  </div>
                </th>
                <th className="text-center py-6 px-6">
                  <div className="flex flex-col items-center gap-1">
                    <Image src="/images/comparison/parche.svg" width={32} height={32} alt="Parche" />
                    <span className="text-lg font-bold" style={{ color: '#3d6a96' }}>Cápsulas comunes</span>
                  </div>
                </th>
                <th className="text-center py-6 px-6">
                  <div className="flex flex-col items-center gap-1">
                    <Image src="/images/comparison/bear.svg" width={32} height={32} alt="Osito" />
                    <span className="text-lg font-bold" style={{ color: '#3d6a96' }}>Gomitas comunes</span>
                  </div>
                </th>
              </tr>
            </thead>
            <tbody>
              {features.map((feature, index) => (
                <tr key={index} style={{ borderBottom: '1px solid #e0e0e0' }}>
                  <td className="py-4 px-4 font-bold text-lg" style={{ color: '#3d6a96' }}>{feature.name}</td>
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
        </div>

          {/* Versión para móvil */}
          <div className="md:hidden">
            <div className="rounded-lg shadow-lg overflow-hidden bg-white">
                <div className="p-4 bg-gray-50 border-b border-gray-200">
                  <div className="grid grid-cols-4 items-center text-center">
                    <div className="font-bold text-left" style={{ color: '#3d6a96' }}>Comparativa</div>
                    <div className="flex justify-center">
                      <Image src="/images/comparison/namelogo.svg" width={80} height={24} alt="Novapatch" />
                    </div>
                    <div className="flex justify-center">
                      <Image src="/images/comparison/parche.svg" width={24} height={24} alt="Parche" />
                    </div>
                    <div className="flex justify-center">
                      <Image src="/images/comparison/bear.svg" width={24} height={24} alt="Osito" />
                    </div>
                  </div>
                </div>

              <div className="divide-y divide-gray-200">
                {features.map((feature, index) => (
                  <div key={index} className="p-4">
                    <h4 className="font-medium mb-3" style={{ color: '#3d6a96' }}>{feature.name}</h4>
                    <div className="grid grid-cols-4 items-center text-center">
                      <div><CheckIcon isCheck={feature.novapatch} /></div>
                      <div><CheckIcon isCheck={feature.pills} /></div>
                      <div><CheckIcon isCheck={feature.gummies} /></div>
                    </div>
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

export default ComparisonSection