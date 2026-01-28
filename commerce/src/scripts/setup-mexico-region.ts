import { MedusaModule } from "@medusajs/framework/modules-sdk"

async function setupMexicoRegion() {
  console.log("\n=== SETTING UP MEXICO REGION ===\n")
  
  const regionModule = MedusaModule.getModuleInstance("region")
  
  // Check if Mexico region already exists
  const existingRegions = await regionModule.listRegions({
    currency_code: "mxn"
  }, {
    relations: ["countries"]
  })

  if (existingRegions.length > 0) {
    console.log("✅ Mexico region already exists:")
    existingRegions.forEach((region: any) => {
      console.log(`  - ${region.name} (${region.currency_code})`)
      console.log(`    Countries: ${region.countries?.map((c: any) => c.iso_2).join(", ")}`)
    })
    return
  }

  console.log("Creating Mexico region with MXN currency...")

  // Create Mexico region
  const region = await regionModule.createRegions({
    name: "Mexico",
    currency_code: "mxn",
    countries: ["mx"],
    payment_providers: [],
    automatic_taxes: false,
  })

  console.log("✅ Mexico region created successfully!")
  console.log(`  Region ID: ${region.id}`)
  console.log(`  Currency: ${region.currency_code}`)
  console.log(`  Countries: mx`)
  console.log("")
  console.log("⚠️  IMPORTANT: You need to:")
  console.log("   1. Configure shipping options for Mexico in the Medusa Admin")
  console.log("   2. Set up tax rates if needed")
  console.log("   3. Ensure products have prices in MXN currency")
  console.log("")
}

setupMexicoRegion()
  .then(() => {
    console.log("✅ Setup completed")
    process.exit(0)
  })
  .catch((error) => {
    console.error("❌ Error setting up Mexico region:", error)
    process.exit(1)
  })
