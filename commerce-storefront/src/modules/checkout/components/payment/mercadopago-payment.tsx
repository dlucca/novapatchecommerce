"use client"

import { HttpTypes } from "@medusajs/types"

type MercadoPagoPaymentProps = {
    cart: HttpTypes.StoreCart
    session: HttpTypes.StorePaymentSession
    onPaymentCompleted: () => void
}

export default function MercadoPagoPayment({
    cart,
    session,
    onPaymentCompleted,
}: MercadoPagoPaymentProps) {
    return (
        <div className="w-full p-6 bg-blue-50 border border-blue-200 rounded-lg">
            <div className="flex items-start gap-3">
                <svg className="w-6 h-6 text-blue-600 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                </svg>
                <div className="flex-1">
                    <h3 className="font-semibold text-blue-900 text-lg mb-2">Mercado Pago Selecionado</h3>
                    <p className="text-blue-800 text-sm mb-3">
                        Após confirmar seu pedido, você será redirecionado para o Mercado Pago para completar o pagamento de forma segura com o método de sua preferência.
                    </p>
                    <div className="bg-white p-3 rounded-md border border-blue-100">
                        <p className="text-sm text-gray-700 mb-2">
                            <span className="font-semibold">Total:</span>{" "}
                            {new Intl.NumberFormat('pt-BR', { 
                                style: 'currency', 
                                currency: cart.currency_code || 'BRL' 
                            }).format((cart.total || 0) / 100)}
                        </p>
                        <p className="text-xs text-gray-600">
                            ✓ Cartão de crédito • Débito • Pix • Boleto
                        </p>
                    </div>
                </div>
            </div>
        </div>
    )
}
