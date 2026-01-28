"use client"

import { HttpTypes } from "@medusajs/types"
import { useState } from "react"
import { handleOpenpayPayment } from "@/lib/data/openpay"

type OpenpayPaymentProps = {
    cart: HttpTypes.StoreCart
    session: HttpTypes.StorePaymentSession
    onPaymentCompleted: () => void
}

export default function OpenpayPayment({
    cart,
    session,
    onPaymentCompleted,
}: OpenpayPaymentProps) {
    const [showForm, setShowForm] = useState(false)
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)
    const [formData, setFormData] = useState({
        cardNumber: "",
        cardName: "",
        expiryMonth: "",
        expiryYear: "",
        cvv: "",
    })

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target
        setFormData(prev => ({
            ...prev,
            [name]: value
        }))
    }

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        setLoading(true)
        setError(null)

        try {
            // Tokenize the card with Openpay.js
            // @ts-ignore - Openpay is injected by script
            if (!window.Openpay) {
                throw new Error("Openpay SDK no cargó correctamente")
            }

            // @ts-ignore
            Openpay.setProductionReady(false) // Using sandbox
            
            // Get Openpay public key from environment
            const publicKey = process.env.NEXT_PUBLIC_OPENPAY_PUBLIC_KEY
            if (!publicKey) {
                throw new Error("Public key de Openpay no configurada")
            }

            // @ts-ignore
            Openpay.setId(publicKey.split('_')[1] || '') // Extract merchant ID from public key
            // @ts-ignore
            Openpay.setApiKey(publicKey)

            // Create token from card data
            // @ts-ignore
            Openpay.token.create({
                card_number: formData.cardNumber.replace(/\s/g, ''),
                holder_name: formData.cardName,
                expiration_month: formData.expiryMonth,
                expiration_year: formData.expiryYear,
                cvv2: formData.cvv,
            }, (response: any) => {
                if (response.data?.id) {
                    // Token created successfully, now process payment
                    const preferenceId = session.data && typeof session.data === 'object' && 'preferenceId' in session.data 
                        ? (session.data as any).preferenceId 
                        : `order-${Date.now()}`
                    
                    handleOpenpayPayment({
                        tokenId: response.data.id,
                        preferenceId,
                        amount: (cart.total || 0) / 100, // Convert from cents to MXN
                        description: `Pedido Novapatch - ${cart.id}`,
                    }).then(() => {
                        setShowForm(false)
                        onPaymentCompleted()
                    }).catch((err: any) => {
                        setError(err.message)
                    }).finally(() => {
                        setLoading(false)
                    })
                } else {
                    setError(response.error?.description || "Error al tokenizar la tarjeta")
                    setLoading(false)
                }
            })
        } catch (err: any) {
            setError(err.message || "Error procesando el pago")
            setLoading(false)
        }
    }

    return (
        <div className="w-full p-6 bg-green-50 border border-green-200 rounded-lg">
            <div className="flex items-start gap-3">
                <svg className="w-6 h-6 text-green-600 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                </svg>
                <div className="flex-1">
                    <h3 className="font-semibold text-green-900 text-lg mb-2">Openpay Seleccionado</h3>
                    
                    {!showForm ? (
                        <>
                            <p className="text-green-800 text-sm mb-3">
                                Ingresa los detalles de tu tarjeta de crédito para procesar el pago de forma segura.
                            </p>
                            <div className="bg-white p-3 rounded-md border border-green-100 mb-4">
                                <p className="text-sm text-gray-700 mb-2">
                                    <span className="font-semibold">Total:</span>{" "}
                                    {new Intl.NumberFormat('es-MX', { 
                                        style: 'currency', 
                                        currency: cart.currency_code || 'MXN' 
                                    }).format((cart.total || 0) / 100)}
                                </p>
                                <p className="text-xs text-gray-600">
                                    ✓ Conexión segura con Openpay
                                </p>
                            </div>
                            <button
                                type="button"
                                onClick={() => setShowForm(true)}
                                className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-2 rounded-md transition-colors"
                            >
                                Ingresar Datos de Pago
                            </button>
                        </>
                    ) : (
                        <form onSubmit={handleSubmit} className="space-y-4">
                            {error && (
                                <div className="p-3 bg-red-100 border border-red-300 text-red-800 rounded-md text-sm">
                                    {error}
                                </div>
                            )}
                            
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Número de Tarjeta
                                </label>
                                <input
                                    type="text"
                                    name="cardNumber"
                                    placeholder="1234 5678 9012 3456"
                                    value={formData.cardNumber}
                                    onChange={handleInputChange}
                                    maxLength={19}
                                    required
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Titular de la Tarjeta
                                </label>
                                <input
                                    type="text"
                                    name="cardName"
                                    placeholder="Juan Pérez"
                                    value={formData.cardName}
                                    onChange={handleInputChange}
                                    required
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                                />
                            </div>

                            <div className="grid grid-cols-3 gap-3">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Mes
                                    </label>
                                    <input
                                        type="text"
                                        name="expiryMonth"
                                        placeholder="MM"
                                        value={formData.expiryMonth}
                                        onChange={handleInputChange}
                                        maxLength={2}
                                        required
                                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Año
                                    </label>
                                    <input
                                        type="text"
                                        name="expiryYear"
                                        placeholder="YY"
                                        value={formData.expiryYear}
                                        onChange={handleInputChange}
                                        maxLength={2}
                                        required
                                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        CVV
                                    </label>
                                    <input
                                        type="text"
                                        name="cvv"
                                        placeholder="123"
                                        value={formData.cvv}
                                        onChange={handleInputChange}
                                        maxLength={3}
                                        required
                                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                                    />
                                </div>
                            </div>

                            <div className="flex gap-3">
                                <button
                                    type="button"
                                    onClick={() => setShowForm(false)}
                                    disabled={loading}
                                    className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 transition-colors disabled:opacity-50"
                                >
                                    Cancelar
                                </button>
                                <button
                                    type="submit"
                                    disabled={loading}
                                    className="flex-1 px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-md transition-colors disabled:opacity-50"
                                >
                                    {loading ? "Procesando..." : "Pagar"}
                                </button>
                            </div>
                        </form>
                    )}
                </div>
            </div>
        </div>
    )
}

