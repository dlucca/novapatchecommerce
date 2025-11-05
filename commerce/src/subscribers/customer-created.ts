import { SubscriberArgs, SubscriberConfig } from "@medusajs/framework"
import { Modules } from "@medusajs/framework/utils"
import { Resend } from "resend"
import { getFromEmail } from "../lib/email-config"

export default async function customerCreatedHandler({
  event: { data, name },
  container,
}: SubscriberArgs<{ id: string }>) {

  const customerModuleService = container.resolve(Modules.CUSTOMER)

  try {
    const customer = await customerModuleService.retrieveCustomer(data.id)

    const resend = new Resend(process.env.RESEND_API_KEY)

    const { data: emailData, error } = await resend.emails.send({
      from: getFromEmail('welcome'),
      to: customer.email,
      subject: '¡Bienvenido a NovaPatch! 🎉',
      html: `
        <!DOCTYPE html>
        <html>
          <head>
            <meta charset="utf-8">
            <style>
              body {
                font-family: Arial, sans-serif;
                line-height: 1.6;
                color: #333;
                max-width: 600px;
                margin: 0 auto;
                padding: 20px;
              }
              .header {
                background: linear-gradient(135deg, #8B5CF6 0%, #3B82F6 100%);
                color: white;
                padding: 30px;
                text-align: center;
                border-radius: 10px 10px 0 0;
              }
              .content {
                background: #f9fafb;
                padding: 30px;
                border-radius: 0 0 10px 10px;
              }
              .button {
                display: inline-block;
                padding: 12px 30px;
                background: #8B5CF6;
                color: white;
                text-decoration: none;
                border-radius: 5px;
                margin: 20px 0;
              }
              .footer {
                text-align: center;
                margin-top: 30px;
                color: #666;
                font-size: 14px;
              }
            </style>
          </head>
          <body>
            <div class="header">
              <h1>¡Bienvenido a NovaPatch!</h1>
            </div>
            <div class="content">
              <p>Hola <strong>${customer.first_name || 'Nuevo cliente'}</strong>,</p>

              <p>¡Estamos emocionados de tenerte con nosotros! Gracias por registrarte en NovaPatch, tu tienda de confianza para parches innovadores.</p>

              <p>Con NovaPatch podrás:</p>
              <ul>
                <li>✅ Acceder a nuestra gama completa de parches, mira nuestros productos <a href="${process.env.STORE_CORS?.split(',')[0] || 'http://localhost:8000'}">aquí</a></li>
                <li>✅ Realizar pedidos de forma rápida y segura</li>
                <li>✅ Seguir el estado de tus envíos en tiempo real</li>
                <li>✅ Recibir ofertas exclusivas y novedades</li>
              </ul>

              <p style="text-align: center;">
                <a href="${process.env.STORE_CORS?.split(',')[0] || 'http://localhost:8000'}" class="button">
                  Explorar Productos
                </a>
              </p>

              <p>Si tienes alguna pregunta, no dudes en contactarnos. ¡Estamos aquí para ayudarte!</p>

              <p>Saludos,<br>
              <strong>El equipo de NovaPatch</strong></p>
            </div>
            <div class="footer">
              <p>Este es un correo automático, por favor no responder.</p>
              <p>&copy; ${new Date().getFullYear()} NovaPatch. Todos los derechos reservados.</p>
            </div>
          </body>
        </html>
      `,
    })

    if (error) {
      console.error('❌ Error al enviar email:', error)
      return
    }

    await customerModuleService.updateCustomers(customer.id, {
      metadata: {
        ...customer.metadata,
        welcome_email_sent: true,
        welcome_email_sent_at: new Date().toISOString()
      }
    })

  } catch (error) {
    console.error('❌ Error al enviar email de bienvenida:', error)
  }
}

export const config: SubscriberConfig = {
  event: "customer.created",
}
