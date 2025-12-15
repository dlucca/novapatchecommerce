import repeat from "@lib/util/repeat"
import { HttpTypes } from "@medusajs/types"
import { Table } from "@medusajs/ui"
import { useTranslations } from "next-intl"

import Item from "@modules/cart/components/item"
import SkeletonLineItem from "@/components/ui/skeletons/skeleton-line-item"

type ItemsTemplateProps = {
  cart?: HttpTypes.StoreCart
}

const ItemsTemplate = ({ cart }: ItemsTemplateProps) => {
  const items = cart?.items
  const t = useTranslations("cart")
  return (
    <div>
      <div className="pb-4 flex items-center">
        <h2 className="text-2xl font-bold text-gray-900">{t("products")}</h2>
      </div>
      <Table>
        <Table.Header className="border-t-0">
          <Table.Row className="text-gray-600 text-sm font-medium">
            <Table.HeaderCell className="!pl-0">{t("product")}</Table.HeaderCell>
            <Table.HeaderCell></Table.HeaderCell>
            <Table.HeaderCell>{t("quantity")}</Table.HeaderCell>
            <Table.HeaderCell className="hidden small:table-cell">
              {t("price")}
            </Table.HeaderCell>
            <Table.HeaderCell className="!pr-0 text-right">
              {t("total")}
            </Table.HeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {items
            ? items
                .sort((a, b) => {
                  return (a.created_at ?? "") > (b.created_at ?? "") ? -1 : 1
                })
                .map((item) => {
                  return (
                    <Item
                      key={item.id}
                      item={item}
                      currencyCode={cart?.currency_code}
                    />
                  )
                })
            : repeat(5).map((i) => {
                return <SkeletonLineItem key={i} />
              })}
        </Table.Body>
      </Table>
    </div>
  )
}

export default ItemsTemplate
