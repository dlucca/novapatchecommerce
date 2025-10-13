import LocalizedClientLink from "@modules/common/components/localized-client-link"

const EmptyCartMessage = () => {
  return (
    <div className="min-h-[60vh] flex flex-col justify-center items-center px-4" data-testid="empty-cart-message">
      <div className="text-center max-w-md">
        {/* Icono de carrito vacío */}
        <div className="mb-6">
          <svg
            className="w-24 h-24 mx-auto text-gray-300"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.5}
              d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-1.5 6M7 13l-1.5 6m0 0h9"
            />
          </svg>
        </div>

        <h1 className="text-3xl font-bold text-gray-900 mb-4">
          Tu carrito está vacío
        </h1>

        <p className="text-gray-600 mb-8">
          Aún no has agregado productos a tu carrito. Explora nuestra tienda y encuentra los parches perfectos para ti.
        </p>

        <LocalizedClientLink
          href="/store"
          className="inline-block bg-[#00BCD4] hover:bg-[#00ACC1] text-white font-bold py-3 px-8 rounded-lg transition-colors shadow-md hover:shadow-lg"
        >
          Explorar productos
        </LocalizedClientLink>
      </div>
    </div>
  )
}

export default EmptyCartMessage
