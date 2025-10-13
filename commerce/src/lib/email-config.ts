/**
 * Config emails for Resend service
 * https://resend.com/docs
 */

export type EmailType = 'default' | 'orders' | 'welcome' | 'support' | 'marketing'

export function getFromEmail(type: EmailType = 'default'): string {
  const emailMap: Record<EmailType, string | undefined> = {
    default: process.env.RESEND_FROM_EMAIL_DEFAULT,
    orders: process.env.RESEND_FROM_EMAIL_ORDERS,
    welcome: process.env.RESEND_FROM_EMAIL_WELCOME,
    support: process.env.RESEND_FROM_EMAIL_SUPPORT,
    marketing: process.env.RESEND_FROM_EMAIL_MARKETING,
  }

  const email = emailMap[type] || emailMap.default || 'onboarding@resend.dev'
  
  return email
}

export function getEmailConfig() {
  return {
    apiKey: process.env.RESEND_API_KEY,
    from: {
      default: getFromEmail('default'),
      orders: getFromEmail('orders'),
      welcome: getFromEmail('welcome'),
      support: getFromEmail('support'),
      marketing: getFromEmail('marketing'),
    }
  }
}
