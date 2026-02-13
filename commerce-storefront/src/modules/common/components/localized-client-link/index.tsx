"use client"

import Link from "next/link"
import { useParams } from "next/navigation"
import React from "react"

/**
 * Use this component to create a Next.js `<Link />` that persists the current country code in the url,
 * without having to explicitly pass it as a prop.
 */
type LocalizedClientLinkProps = Omit<
  React.ComponentProps<typeof Link>,
  "href"
> & {
  href: string
  children?: React.ReactNode
}

const LocalizedClientLink = ({
  children,
  href,
  ...props
}: LocalizedClientLinkProps) => {
  const { countryCode } = useParams() as { countryCode?: string }
  const localizedHref = countryCode ? `/${countryCode}${href}` : href

  return (
    <Link href={localizedHref} {...props}>
      {children}
    </Link>
  )
}

export default LocalizedClientLink
