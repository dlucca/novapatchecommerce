import { ExecArgs } from "@medusajs/framework/types"
import { Modules } from "@medusajs/framework/utils"

export default async function diagnoseShipping({ container }: ExecArgs) {
  console.log("\n=== SHIPPING DIAGNOSIS ===\n")

  const regionModule = container.resolve(Modules.REGION)
  const fulfillmentModule = container.resolve(Modules.FULFILLMENT)
  const locationModule = container.resolve(Modules.STOCK_LOCATION)

  // 1. Check Regions
  console.log("📍 REGIONS:")
  const regions = await regionModule.listRegions({}, {
    relations: ["countries"]
  })
  
  if (regions.length === 0) {
    console.log("❌ No regions found!")
    return
  }

  regions.forEach((region: any) => {
    console.log(`\n  Region: ${region.name}`)
    console.log(`    ID: ${region.id}`)
    console.log(`    Currency: ${region.currency_code}`)
    console.log(`    Countries: ${region.countries?.map((c: any) => c.iso_2).join(", ") || "None"}`)
  })

  // 2. Check Stock Locations
  console.log("\n\n📦 STOCK LOCATIONS:")
  const locations = await locationModule.listStockLocations({})
  
  if (locations.length === 0) {
    console.log("❌ No stock locations found!")
  } else {
    locations.forEach((location: any) => {
      console.log(`\n  Location: ${location.name}`)
      console.log(`    ID: ${location.id}`)
      console.log(`    Address: ${location.address?.address_1 || "N/A"}`)
    })
  }

  // 3. Check Fulfillment Sets (shipping options)
  console.log("\n\n🚚 FULFILLMENT SETS & SHIPPING OPTIONS:")
  
  try {
    const fulfillmentSets = await fulfillmentModule.listFulfillmentSets({}, {
      relations: ["service_zones", "service_zones.shipping_options"]
    })

    if (fulfillmentSets.length === 0) {
      console.log("❌ No fulfillment sets found!")
    } else {
      fulfillmentSets.forEach((set: any) => {
        console.log(`\n  Fulfillment Set: ${set.name}`)
        console.log(`    ID: ${set.id}`)
        console.log(`    Type: ${set.type}`)
        
        if (set.service_zones && set.service_zones.length > 0) {
          set.service_zones.forEach((zone: any) => {
            console.log(`\n    Service Zone: ${zone.name}`)
            console.log(`      ID: ${zone.id}`)
            
            if (zone.shipping_options && zone.shipping_options.length > 0) {
              zone.shipping_options.forEach((option: any) => {
                console.log(`\n      📦 Shipping Option: ${option.name}`)
                console.log(`         ID: ${option.id}`)
                console.log(`         Provider: ${option.provider_id}`)
                console.log(`         Type: ${option.shipping_option_type_id}`)
                console.log(`         Price Type: ${option.price_type}`)
                console.log(`         Amount: ${option.amount || "N/A"}`)
              })
            } else {
              console.log(`      ⚠️  No shipping options in this zone`)
            }
          })
        } else {
          console.log(`    ⚠️  No service zones in this set`)
        }
      })
    }
  } catch (error: any) {
    console.error(`\n❌ Error fetching fulfillment sets: ${error.message}`)
  }

  // 4. Summary and Recommendations
  console.log("\n\n=== SUMMARY ===")
  
  const mexicoRegion = regions.find((r: any) => 
    r.countries?.some((c: any) => c.iso_2 === "mx")
  )
  const brazilRegion = regions.find((r: any) => 
    r.countries?.some((c: any) => c.iso_2 === "br")
  )

  if (!mexicoRegion) {
    console.log("❌ Mexico region not found! Run: npm run util:setup-mexico-region")
  } else {
    console.log(`✅ Mexico region exists (ID: ${mexicoRegion.id}, Currency: ${mexicoRegion.currency_code})`)
  }

  if (!brazilRegion) {
    console.log("❌ Brazil region not found!")
  } else {
    console.log(`✅ Brazil region exists (ID: ${brazilRegion.id}, Currency: ${brazilRegion.currency_code})`)
  }

  if (locations.length === 0) {
    console.log("❌ No stock locations - shipping won't work!")
    console.log("   Create a location in Medusa Admin: Settings → Locations")
  } else {
    console.log(`✅ ${locations.length} stock location(s) found`)
  }

  console.log("\n=".repeat(60))
  console.log("\n💡 NEXT STEPS:")
  console.log("   1. Ensure Mexico region exists with MXN currency")
  console.log("   2. Create shipping options in Admin → Settings → Locations → [Location] → Shipping")
  console.log("   3. Assign products to a shipping profile")
  console.log("   4. Test checkout at /mx/checkout?step=delivery")
  console.log("\n")
}

