import { isEqual, pick } from "lodash"
import { HttpTypes } from "@medusajs/types"

type Address = HttpTypes.StoreCartAddress | HttpTypes.StoreCustomerAddress | {
  first_name?: string
  last_name?: string
  address_1?: string
  company?: string
  postal_code?: string
  city?: string
  country_code?: string
  province?: string
  phone?: string
}

const ADDRESS_FIELDS = [
  "first_name",
  "last_name",
  "address_1",
  "company",
  "postal_code",
  "city",
  "country_code",
  "province",
  "phone",
] as const

export default function compareAddresses(
  address1: Address,
  address2: Address
): boolean {
  return isEqual(
    pick(address1, ADDRESS_FIELDS),
    pick(address2, ADDRESS_FIELDS)
  )
}
