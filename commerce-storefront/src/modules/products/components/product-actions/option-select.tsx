import { HttpTypes } from "@medusajs/types"
import { clx } from "@medusajs/ui"
import Image from "next/image"
import React from "react"
import { transformMediaUrl } from "@lib/util/transform-url"

type OptionSelectProps = {
  option: HttpTypes.StoreProductOption
  current: string | undefined
  updateOption: (title: string, value: string) => void
  title: string
  disabled: boolean
  variants?: HttpTypes.StoreProductVariant[] | null | undefined
  optionId?: string
  "data-testid"?: string
}

const OptionSelect: React.FC<OptionSelectProps> = ({
  option,
  current,
  updateOption,
  title,
  "data-testid": dataTestId,
  disabled,
  variants,
  optionId,
}) => {
  const filteredOptions = (option.values ?? []).map((v) => v.value)

  // Helper function to get variant image for an option value
  const getVariantImage = (optionValue: string) => {
    if (!variants || variants.length === 0) return null

    const variant = variants.find((v) => {
      const variantOption = v.options?.find((opt) => opt.option_id === option.id)
      return variantOption?.value === optionValue
    })

    return variant?.product?.images?.[0]?.url || variant?.product?.thumbnail || null
  }

  return (
    <div className="flex flex-col gap-y-3">
      <span className="text-sm">Select {title}</span>
      <div
        className="flex flex-wrap justify-between gap-2"
        data-testid={dataTestId}
      >
        {filteredOptions.map((v, index) => {
          const variantImage = getVariantImage(v)
          const imageUrl = variantImage ? transformMediaUrl(variantImage) : null
          const isSelected = v === current

          return (
            <button
              onClick={() => updateOption(option.id, v)}
              key={v}
              className={clx(
                "border-2 rounded-lg p-2 flex-1 flex flex-col items-center justify-center gap-2 transition-all duration-150 min-h-[100px]",
                {
                  "border-blue-500 bg-blue-50": isSelected,
                  "border-gray-300 bg-white hover:border-gray-400": !isSelected,
                }
              )}
              disabled={disabled}
              data-testid="option-button"
            >
              {imageUrl ? (
                <div className="relative w-16 h-16">
                  <Image
                    src={imageUrl}
                    alt={v}
                    fill
                    className="object-contain"
                    sizes="64px"
                    priority={index < 2}
                    loading={index >= 2 ? "lazy" : undefined}
                  />
                </div>
              ) : null}
              <span className="text-xs font-medium text-center">{v}</span>
            </button>
          )
        })}
      </div>
    </div>
  )
}

export default OptionSelect
