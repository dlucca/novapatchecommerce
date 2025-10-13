import { SubscriberArgs, SubscriberConfig } from "@medusajs/framework"
import { Modules } from "@medusajs/framework/utils"
import { Resend } from "resend"
import { getFromEmail } from "../lib/email-config"

export default async function orderPlacedHandler({ 
  event: { data },
  container,
}: SubscriberArgs<{ id: string }>) {
  const orderModuleService = container.resolve(Modules.ORDER)
  
  // TODO
  const order = await orderModuleService.retrieveOrder(data.id, {
    relations: ["items", "items.product", "shipping_address"]
  })
  
  console.log(`📧 Enviando confirmación de pedido: ${order.display_id}`)

  const resend = new Resend(process.env.RESEND_API_KEY)

  const total = new Intl.NumberFormat('es-MX', {
    style: 'currency',
    currency: order.currency_code?.toUpperCase() || 'MXN',
  }).format(Number(order.total || 0) / 100)

  try {
    const { data: emailData, error } = await resend.emails.send({
      from: getFromEmail('orders'), // Usa el email de pedidos según el ambiente
      to: order.email || 'customer@example.com',
      subject: `Confirmación de Pedido #${order.display_id} - NovaPatch`,
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
                background: linear-gradient(135deg, #10B981 0%, #059669 100%);
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
              .order-summary {
                background: white;
                padding: 20px;
                border-radius: 8px;
                margin: 20px 0;
              }
              .item {
                border-bottom: 1px solid #e5e7eb;
                padding: 10px 0;
              }
              .item:last-child {
                border-bottom: none;
              }
              .total {
                font-size: 24px;
                font-weight: bold;
                color: #10B981;
                text-align: right;
                margin-top: 20px;
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
              <h1>✅ ¡Pedido Confirmado!</h1>
              <p>Pedido #${order.display_id}</p>
            </div>
            <div class="content">
              <p>Hola,</p>
              
              <p>¡Gracias por tu pedido! Hemos recibido tu compra y está siendo procesada.</p>
              
              <div class="order-summary">
                <h2>Resumen del Pedido</h2>
                ${order.items?.map(item => `
                  <div class="item">
                    <strong>${item.title}</strong><br>
                    Cantidad: ${item.quantity} x ${new Intl.NumberFormat('es-MX', {
                      style: 'currency',
                      currency: order.currency_code?.toUpperCase() || 'MXN',
                    }).format((item.unit_price || 0) / 100)}
                  </div>
                `).join('') || '<p>Sin items</p>'}
                
                <div class="total">
                  Total: ${total}
                </div>
              </div>
              
              ${order.shipping_address ? `
                <h3>Dirección de Envío</h3>
                <p>
                  ${order.shipping_address.address_1 || ''}<br>
                  ${order.shipping_address.city || ''}, ${order.shipping_address.province || ''}<br>
                  ${order.shipping_address.postal_code || ''}<br>
                  ${order.shipping_address.country_code?.toUpperCase() || ''}
                </p>
              ` : ''}
              
              <p>Te notificaremos cuando tu pedido sea enviado.</p>
              
              <p>Saludos,<br>
              <strong>El equipo de NovaPatch</strong></p>
            </div>
            <div class="footer">
              <p>&copy; ${new Date().getFullYear()} NovaPatch. Todos los derechos reservados.</p>
            </div>
          </body>
        </html>
      `,
    })

    if (error) {
      console.error('❌ Error al enviar confirmación de pedido:', error)
      return
    }

    console.log('✅ Confirmación de pedido enviada:', emailData)
  } catch (error) {
    console.error('❌ Error al enviar confirmación de pedido:', error)
  }
}

export const config: SubscriberConfig = {
  event: "order.placed",
}
