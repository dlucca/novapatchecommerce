import { Metadata } from "next"

export const metadata: Metadata = {
    title: "Términos y Condiciones de Uso",
}

export default function TerminosPage() {
    return (
        <div className="max-w-3xl mx-auto px-6 py-16">
            <h1 className="text-3xl font-bold text-novapatch-title mb-2">Términos y Condiciones de Uso</h1>
            <p className="text-sm text-gray-500 mb-10">Fecha de última actualización: 20/03/2026</p>

            <section className="prose prose-gray max-w-none space-y-8 text-gray-700 leading-relaxed">

                <div>
                    <h2 className="text-xl font-semibold text-novapatch-title mb-3">1. Objeto</h2>
                    <p>Los presentes Términos y Condiciones regulan el acceso y uso del sitio web <strong>www.novapatch.care</strong>, así como la compra de productos y la utilización de los servicios ofrecidos por NOVAPATCH (SOCIEDAD ANÓNIMA PROMOTORA DE INVERSIÓN DE CAPITAL VARIABLE).</p>
                    <p className="mt-2">Al acceder al Sitio, crear una cuenta o realizar una compra, aceptas quedar vinculado por estos Términos y Condiciones.</p>
                </div>

                <div>
                    <h2 className="text-xl font-semibold text-novapatch-title mb-3">2. Identidad del titular del sitio</h2>
                    <p>El Sitio es propiedad de NOVAPATCH (SAPI DE CV), con domicilio en PRIVADA LAGO BOLSENA 22, COLONIA MODELO PENSIL, C.P. 11450, ALCALDÍA MIGUEL HIDALGO, CIUDAD DE MÉXICO.</p>
                    <p className="mt-2">Contacto: <a href="mailto:info@novapatch.care" className="text-blue-600 underline">info@novapatch.care</a> · Teléfono: 55 4545 1328</p>
                </div>

                <div>
                    <h2 className="text-xl font-semibold text-novapatch-title mb-3">3. Registro de usuario y cuenta</h2>
                    <p>Para realizar compras es posible que debas registrarte y crear una cuenta proporcionando información veraz y actualizada. Eres responsable de mantener la confidencialidad de tus credenciales y de toda actividad realizada desde tu cuenta.</p>
                </div>

                <div>
                    <h2 className="text-xl font-semibold text-novapatch-title mb-3">4. Productos y disponibilidad</h2>
                    <p>Los productos ofrecidos consisten en parches de bienestar, suplementos y productos relacionados con el cuidado personal. La disponibilidad está sujeta a existencias. Novapatch se reserva el derecho de modificar la oferta de productos, precios y características sin previo aviso.</p>
                </div>

                <div>
                    <h2 className="text-xl font-semibold text-novapatch-title mb-3">5. Precios, impuestos y facturación</h2>
                    <p>Todos los precios incluyen los impuestos aplicables conforme a la legislación mexicana, salvo indicación contraria. Los gastos de envío se informarán antes de completar la compra. Si requieres factura, deberás proporcionar tus datos fiscales al momento de la compra.</p>
                </div>

                <div>
                    <h2 className="text-xl font-semibold text-novapatch-title mb-3">6. Proceso de compra</h2>
                    <p>Para realizar una compra deberás: (a) seleccionar los productos y añadirlos al carrito; (b) revisar el pedido; (c) proporcionar datos de envío y facturación; (d) seleccionar el método de pago; (e) confirmar y pagar. Al finalizar recibirás una confirmación al correo proporcionado.</p>
                </div>

                <div>
                    <h2 className="text-xl font-semibold text-novapatch-title mb-3">7. Métodos de pago</h2>
                    <p>Aceptamos tarjetas de crédito y débito, así como otros métodos de pago que se mostrarán disponibles al momento de la compra. Los pagos son procesados de forma segura a través de <strong>Openpay</strong>, pasarela de pago certificada bajo estándar PCI DSS, que garantiza la protección de los datos financieros del usuario durante toda la transacción. Novapatch no almacena, ni tiene acceso directo, a los datos completos de tarjetas bancarias de sus clientes, ya que dicha información es gestionada de manera exclusiva por Openpay conforme a sus políticas de seguridad y privacidad.</p>
                </div>

                <div>
                    <h2 className="text-xl font-semibold text-novapatch-title mb-3">8. Envíos y entregas</h2>
                    <p>Los plazos y costos de envío se indicarán en el proceso de compra. Novapatch no es responsable de retrasos causados por la empresa de mensajería o por causas de fuerza mayor. El riesgo de pérdida o daño se transfiere al cliente al momento de la entrega.</p>
                </div>

                <div>
                    <h2 className="text-xl font-semibold text-novapatch-title mb-3">9. Devoluciones y reembolsos</h2>
                    <p>Puedes solicitar la devolución de productos dentro del plazo indicado en nuestra Política de Devoluciones, siempre que el producto no haya sido abierto o utilizado. Para iniciar una devolución contacta a <a href="mailto:info@novapatch.care" className="text-blue-600 underline">info@novapatch.care</a>.</p>
                </div>

                <div>
                    <h2 className="text-xl font-semibold text-novapatch-title mb-3">10. Suscripciones</h2>
                    <p>Al contratar una suscripción aceptas recibir envíos periódicos con la frecuencia seleccionada. Puedes pausar, modificar o cancelar tu suscripción en cualquier momento desde tu cuenta o contactando a nuestro equipo de soporte.</p>
                </div>

                <div>
                    <h2 className="text-xl font-semibold text-novapatch-title mb-3">11. Propiedad intelectual</h2>
                    <p>Todos los contenidos del Sitio (textos, imágenes, logotipos, diseños, código) son propiedad de Novapatch o de sus licenciantes y están protegidos por la legislación aplicable en materia de propiedad intelectual. Queda prohibida su reproducción sin autorización expresa.</p>
                </div>

                <div>
                    <h2 className="text-xl font-semibold text-novapatch-title mb-3">12. Limitación de responsabilidad</h2>
                    <p>Novapatch no será responsable de daños indirectos, incidentales o consecuentes derivados del uso del Sitio o de los productos, en la medida permitida por la legislación aplicable.</p>
                </div>

                <div>
                    <h2 className="text-xl font-semibold text-novapatch-title mb-3">13. Legislación aplicable y jurisdicción</h2>
                    <p>Los presentes Términos y Condiciones se rigen por la legislación mexicana. Para cualquier controversia, las partes se someten a la jurisdicción de los tribunales competentes de la Ciudad de México, renunciando a cualquier otro fuero.</p>
                </div>

                <div>
                    <h2 className="text-xl font-semibold text-novapatch-title mb-3">14. Contacto</h2>
                    <p>Para cualquier consulta sobre estos Términos y Condiciones, contáctanos en <a href="mailto:info@novapatch.care" className="text-blue-600 underline">info@novapatch.care</a> o al teléfono 55 4545 1328.</p>
                </div>

            </section>
        </div>
    )
}