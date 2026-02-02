import { ExecArgs } from "@medusajs/framework/types"
import { Modules } from "@medusajs/framework/utils"

export default async function registerOpenpayProvider({ container }: ExecArgs) {
  console.log("\n=== REGISTERING OPENPAY PAYMENT PROVIDER ===\n")

  const paymentModule = container.resolve(Modules.PAYMENT)
  const regionModule = container.resolve(Modules.REGION)

  try {
    // Check if Openpay provider already exists
    const existingProviders = await paymentModule.listPaymentProviders({
      id: "pp_openpay_openpay"
    })

    if (existingProviders.length > 0) {
      console.log("�u2705 Openpay payment provider already exists")
      console.log(`   Provider ID: ${existingProviders[0].id}`)
      return
    }

    console.log("\u26a0\ufe0f  Openpay provider not found in database.")
    console.log("   Payment providers should be registered via plugin configuration.")
    console.log("   Make sure Openpay is properly configured in medusa-config.ts")

    // Get Mexico region
    const regions = await regionModule.listRegions({
      currency_code: "mxn"
    })

    if (regions.length === 0) {
      console.log("\n⚠️  Mexico region not found. Please create it first.")
      return
    }

    const mexicoRegion = regions[0]
    console.log(`\n📍 Found Mexico region: ${mexicoRegion.name} (${mexicoRegion.id})`)

    console.log("\n✅ Setup complete!")
    console.log("\n📝 NEXT STEPS:")
    console.log("   1. Go to Medusa Admin: http://localhost:9000/app")
    console.log("   2. Navigate to Settings → Regions → Mexico")
    console.log("   3. In 'Payment Providers' section, select 'Openpay'")
    console.log("   4. Save the region")
    console.log("   5. Test checkout at /mx/checkout")
    console.log("")

  } catch (error: any) {
    console.error("❌ Error registering Openpay provider:", error.message)
    throw error
  }
}
