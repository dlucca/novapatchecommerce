import { MedusaModule } from "@medusajs/framework/modules-sdk"

async function listRegions() {
  const regionModule = MedusaModule.getModuleInstance("region")
  
  const regions = await regionModule.listRegions({}, {
    relations: ["countries", "payment_providers", "fulfillment_providers"]
  })

  console.log("\n=== CONFIGURED REGIONS ===\n")
  
  if (regions.length === 0) {
    console.log("No regions found in database!")
    return
  }

  regions.forEach((region: any) => {
    console.log(`Region: ${region.name}`)
    console.log(`  ID: ${region.id}`)
    console.log(`  Currency: ${region.currency_code}`)
    console.log(`  Countries: ${region.countries?.map((c: any) => `${c.name} (${c.iso_2})`).join(", ") || "None"}`)
    console.log(`  Payment Providers: ${region.payment_providers?.map((p: any) => p.id).join(", ") || "None"}`)
    console.log(`  Fulfillment Providers: ${region.fulfillment_providers?.map((f: any) => f.id).join(", ") || "None"}`)
    console.log("")
  })

  console.log("=".repeat(50))
}

listRegions()
  .then(() => {
    console.log("✅ Regions listed successfully")
    process.exit(0)
  })
  .catch((error) => {
    console.error("❌ Error listing regions:", error)
    process.exit(1)
  })
