import { Metadata } from "next"

export const metadata: Metadata = {
    title: "Aviso de Privacidad",
}

export default function PrivacidadPage() {
    return (
        <div className="max-w-3xl mx-auto px-6 py-16">
            <h1 className="text-3xl font-bold text-novapatch-title mb-2">Aviso de Privacidad</h1>
            <p className="text-sm text-gray-500 mb-10">Fecha de última actualización: 20/03/2026</p>

            <section className="prose prose-gray max-w-none space-y-8 text-gray-700 leading-relaxed">

                <div>
                    <h2 className="text-xl font-semibold text-novapatch-title mb-3">1. Identidad y datos de contacto del responsable</h2>
                    <p>NOVAPATCH (SOCIEDAD ANÓNIMA PROMOTORA DE INVERSIÓN DE CAPITAL VARIABLE), en lo sucesivo "Novapatch", con domicilio en PRIVADA LAGO BOLSENA 22, COLONIA MODELO PENSIL, C.P. 11450, ALCALDÍA MIGUEL HIDALGO, CIUDAD DE MÉXICO, es el responsable del tratamiento de los datos personales que recopila a través del sitio web www.novapatch.care.</p>
                    <p className="mt-2">Para cualquier asunto relacionado con el tratamiento de tus datos personales puedes contactarnos en: <a href="mailto:info@novapatch.care" className="text-blue-600 underline">info@novapatch.care</a> · Teléfono: 55 4545 1328</p>
                </div>

                <div>
                    <h2 className="text-xl font-semibold text-novapatch-title mb-3">2. Datos personales que recopilamos</h2>
                    <p>Podemos recopilar las siguientes categorías de datos personales cuando navegas por el Sitio, creas una cuenta, realizas una compra, te suscribes a nuestro newsletter o te comunicas con nosotros:</p>
                    <ul className="list-disc list-inside mt-2 space-y-1">
                        <li><strong>Datos de identificación y contacto:</strong> nombre, apellidos, correo electrónico, número de teléfono, dirección de envío y facturación.</li>
                        <li><strong>Datos de cuenta:</strong> usuario, contraseña, historial de compras, preferencias, suscripciones activas.</li>
                        <li><strong>Datos de pago:</strong> tipo de tarjeta y últimos dígitos, método de pago. Los datos completos son procesados por nuestros proveedores de pago y no se almacenan en nuestros servidores.</li>
                        <li><strong>Datos de navegación:</strong> dirección IP, tipo de navegador, páginas visitadas, cookies.</li>
                        <li><strong>Datos de comunicaciones:</strong> mensajes que nos envías por chat, correo o formularios de contacto.</li>
                    </ul>
                </div>

                <div>
                    <h2 className="text-xl font-semibold text-novapatch-title mb-3">3. Finalidades del tratamiento</h2>
                    <p><strong>Finalidades primarias (necesarias para la prestación del servicio):</strong></p>
                    <ul className="list-disc list-inside mt-2 space-y-1">
                        <li>Procesar y gestionar tus pedidos, pagos, envíos y devoluciones.</li>
                        <li>Crear, administrar y mantener tu cuenta de usuario.</li>
                        <li>Gestionar tu suscripción y envíos recurrentes.</li>
                        <li>Atender consultas, reclamaciones y ejercicio de derechos.</li>
                        <li>Cumplir con obligaciones legales y fiscales aplicables.</li>
                    </ul>
                    <p className="mt-3"><strong>Finalidades secundarias (sujetas a consentimiento):</strong></p>
                    <ul className="list-disc list-inside mt-2 space-y-1">
                        <li>Enviarte comunicaciones comerciales y promociones.</li>
                        <li>Realizar encuestas de satisfacción.</li>
                        <li>Mejorar nuestros productos y servicios mediante análisis de uso.</li>
                    </ul>
                </div>

                <div>
                    <h2 className="text-xl font-semibold text-novapatch-title mb-3">4. Base legal del tratamiento</h2>
                    <p>El tratamiento de tus datos se basa en: (a) la ejecución del contrato de compraventa; (b) el cumplimiento de obligaciones legales; (c) tu consentimiento para finalidades secundarias; y (d) nuestro interés legítimo en mejorar nuestros servicios.</p>
                </div>

                <div>
                    <h2 className="text-xl font-semibold text-novapatch-title mb-3">5. Transferencia de datos a terceros</h2>
                    <p>Podemos compartir tus datos con proveedores de servicios que actúan en nuestro nombre (procesadores de pago, empresas de logística, plataformas de email marketing, servicios de análisis web). Estos proveedores están obligados a tratar tus datos únicamente según nuestras instrucciones y a mantener su confidencialidad.</p>
                    <p className="mt-2">No vendemos tus datos personales a terceros.</p>
                </div>

                <div>
                    <h2 className="text-xl font-semibold text-novapatch-title mb-3">6. Cookies y tecnologías similares</h2>
                    <p>Utilizamos cookies propias y de terceros para el funcionamiento del Sitio, análisis de uso y personalización. Puedes configurar o deshabilitar las cookies desde la configuración de tu navegador, aunque esto puede afectar algunas funcionalidades del Sitio.</p>
                </div>

                <div>
                    <h2 className="text-xl font-semibold text-novapatch-title mb-3">7. Tus derechos (ARCO)</h2>
                    <p>Conforme a la Ley Federal de Protección de Datos Personales en Posesión de los Particulares, tienes derecho a <strong>Acceder, Rectificar, Cancelar u Oponerte</strong> al tratamiento de tus datos personales. Para ejercer estos derechos, envía tu solicitud a <a href="mailto:info@novapatch.care" className="text-blue-600 underline">info@novapatch.care</a> indicando tu nombre completo, descripción del derecho que deseas ejercer y cualquier documento que facilite la localización de tus datos.</p>
                </div>

                <div>
                    <h2 className="text-xl font-semibold text-novapatch-title mb-3">8. Seguridad de los datos</h2>
                    <p>Implementamos medidas técnicas y organizativas para proteger tus datos contra acceso no autorizado, pérdida, alteración o divulgación. Sin embargo, ningún sistema de transmisión por internet es 100% seguro.</p>
                </div>

                <div>
                    <h2 className="text-xl font-semibold text-novapatch-title mb-3">9. Cambios a este aviso</h2>
                    <p>Podemos actualizar este Aviso de Privacidad periódicamente. Te notificaremos de cambios significativos a través del Sitio o por correo electrónico. El uso continuado del Sitio tras la publicación de cambios implica tu aceptación.</p>
                </div>

                <div>
                    <h2 className="text-xl font-semibold text-novapatch-title mb-3">10. Contacto</h2>
                    <p>Para cualquier pregunta sobre este Aviso de Privacidad, contáctanos en <a href="mailto:info@novapatch.care" className="text-blue-600 underline">info@novapatch.care</a> o al teléfono 55 4545 1328.</p>
                </div>

            </section>
        </div>
    )
}