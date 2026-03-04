"use client"

import { Table, Text, clx } from "@medusajs/ui"
import { updateLineItem } from "@lib/data/cart"
import { getSubscriptionPlans } from "@lib/data/subscriptions"
import { HttpTypes } from "@medusajs/types"
import CartItemSelect from "@modules/cart/components/cart-item-select"
import ErrorMessage from "@modules/checkout/components/error-message"
import DeleteButton from "@/components/ui/delete-button"
import LineItemOptions from "@modules/common/components/line-item-options"
import LineItemPrice from "@modules/common/components/line-item-price"
import LineItemUnitPrice from "@modules/common/components/line-item-unit-price"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import Spinner from "@modules/common/icons/spinner"
import Thumbnail from "@modules/products/components/thumbnail"
import { useTranslations } from "next-intl"
import { useEffect, useState } from "react"

let subscriptionPlansPromise: ReturnType<typeof getSubscriptionPlans> | null = null

const fetchSubscriptionPlans = async () => {
  if (!subscriptionPlansPromise) {
    subscriptionPlansPromise = getSubscriptionPlans()
  }

  return subscriptionPlansPromise
}

type ItemProps = {
  item: HttpTypes.StoreCartLineItem
  type?: "full" | "preview"
  currencyCode: string
}

const Item = ({ item, type = "full", currencyCode }: ItemProps) => {
  const tMyCart = useTranslations("myCart")
  const [updating, setUpdating] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [fallbackIntervalDays, setFallbackIntervalDays] = useState<number | null>(null)

  const changeQuantity = async (quantity: number) => {
    setError(null)
    setUpdating(true)

    await updateLineItem({
      lineId: item.id,
      quantity,
    })
      .catch((err) => {
        setError(err.message)
      })
      .finally(() => {
        setUpdating(false)
      })
  }

  // TODO: Update this to grab the actual max inventory
  const maxQtyFromInventory = 10
  const maxQuantity = item.variant?.manage_inventory ? 10 : maxQtyFromInventory

  // Calcular precio con descuento de suscripción si aplica
  const getItemWithDiscount = () => {
    if (!item.metadata?.is_subscription || !item.metadata?.subscription_discount) {
      return item
    }

    const discount = item.metadata.subscription_discount as number
    const originalUnitPrice = item.unit_price || 0
    const discountedUnitPrice = Math.round(originalUnitPrice * (1 - discount / 100))
    const discountedTotal = discountedUnitPrice * item.quantity

    return {
      ...item,
      unit_price: discountedUnitPrice,
      total: discountedTotal,
      original_unit_price: originalUnitPrice,
      original_total: originalUnitPrice * item.quantity,
    }
  }

  const itemWithDiscount = getItemWithDiscount()
  const subscriptionIntervalDays = Number(item.metadata?.subscription_interval_days)
  const hasValidSubscriptionInterval = Number.isFinite(subscriptionIntervalDays) && subscriptionIntervalDays > 0
  const resolvedIntervalDays = hasValidSubscriptionInterval
    ? subscriptionIntervalDays
    : fallbackIntervalDays
  const hasSubscriptionEveryDaysTranslation = tMyCart.has("subscriptionEveryDays")
  const hasSubscriptionPlanLabelTranslation = tMyCart.has("subscriptionPlanLabel")
  const subscriptionPlanPrefix = hasSubscriptionPlanLabelTranslation
    ? tMyCart("subscriptionPlanLabel")
    : "Plan"
  const subscriptionPlanLabel = resolvedIntervalDays
    ? hasSubscriptionEveryDaysTranslation
      ? tMyCart("subscriptionEveryDays", { days: resolvedIntervalDays })
      : `Cada ${resolvedIntervalDays} días`
    : item.metadata?.subscription_plan
      ? String(item.metadata.subscription_plan)
      : null

  useEffect(() => {
    const resolveIntervalDays = async () => {
      if (!item.metadata?.is_subscription || !item.metadata?.subscription_plan || hasValidSubscriptionInterval) {
        return
      }

      try {
        const { subscription_plans } = await fetchSubscriptionPlans()
        const planCode = String(item.metadata.subscription_plan)
        const matchedPlan = subscription_plans.find((plan) => plan.code === planCode)

        if (matchedPlan?.interval_days) {
          setFallbackIntervalDays(matchedPlan.interval_days)
        }
      } catch (error) {
        console.error("Error resolving subscription interval days:", error)
      }
    }

    resolveIntervalDays()
  }, [item.metadata, hasValidSubscriptionInterval])

  return (
    <Table.Row className="w-full" data-testid="product-row">
      <Table.Cell className="!pl-0 p-4 w-24">
        <LocalizedClientLink
          href={`/products/${item.product_handle}`}
          className={clx("flex", {
            "w-16": type === "preview",
            "small:w-24 w-12": type === "full",
          })}
        >
          <Thumbnail
            thumbnail={item.thumbnail}
            images={item.variant?.product?.images}
            size="square"
          />
        </LocalizedClientLink>
      </Table.Cell>

      <Table.Cell className="text-left align-middle">
        <div className="flex flex-col justify-center h-full">
          <Text
            className="txt-medium-plus text-ui-fg-base"
            data-testid="product-title"
          >
            {item.product_title}
          </Text>
          <LineItemOptions variant={item.variant} data-testid="product-variant" />

          {Boolean(item.metadata?.is_subscription) && (
            <div className="mt-1">
              {Boolean(subscriptionPlanLabel) && (
                <span className="block w-full min-h-4 text-xs text-gray-600 whitespace-nowrap overflow-hidden text-ellipsis">
                  {subscriptionPlanPrefix}: {subscriptionPlanLabel}
                  {Boolean(item.metadata?.subscription_discount) &&
                    ` (${String(item.metadata?.subscription_discount)}% OFF)`}
                </span>
              )}
            </div>
          )}
        </div>
      </Table.Cell>

      {type === "full" && (
        <Table.Cell>
          <div className="flex gap-2 items-center w-28">
            <DeleteButton id={item.id} data-testid="product-delete-button" />
            <CartItemSelect
              value={item.quantity}
              onChange={(value) => changeQuantity(parseInt(value.target.value))}
              className="w-14 h-10 p-4"
              data-testid="product-select-button"
            >
              {/* TODO: Update this with the v2 way of managing inventory */}
              {Array.from(
                {
                  length: Math.min(maxQuantity, 10),
                },
                (_, i) => (
                  <option value={i + 1} key={i}>
                    {i + 1}
                  </option>
                )
              )}

              <option value={1} key={1}>
                1
              </option>
            </CartItemSelect>
            {updating && <Spinner />}
          </div>
          <ErrorMessage error={error} data-testid="product-error-message" />
        </Table.Cell>
      )}

      {type === "full" && (
        <Table.Cell className="hidden small:table-cell w-32 text-right align-middle">
          <div className="flex justify-end items-center h-full w-full">
            <LineItemUnitPrice
              item={itemWithDiscount}
              style="tight"
              currencyCode={currencyCode}
            />
          </div>
        </Table.Cell>
      )}

      <Table.Cell className="w-32 !pr-0 align-middle text-right">
        <span
          className={clx("!pr-0", {
            "flex flex-col items-end h-full justify-center": type === "full",
            "flex flex-col items-end h-full justify-start pt-0.5":
              type === "preview",
          })}
        >
          {type === "preview" && (
            <span className="flex gap-x-1 ">
              <Text className="text-ui-fg-muted">{item.quantity}x </Text>
            </span>
          )}
          <LineItemPrice
            item={itemWithDiscount}
            style="tight"
            currencyCode={currencyCode}
          />
        </span>
      </Table.Cell>
    </Table.Row>
  )
}

export default Item
