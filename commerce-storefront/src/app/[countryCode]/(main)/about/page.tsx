import { Metadata } from "next"
import AboutTemplate from "@modules/about/pages/about-template"

export const metadata: Metadata = {
  title: "Sobre NovaPatch - Nuestra Historia",
  description: "Descubre la ciencia detrás de los parches de vitaminas NovaPatch: una solución sin pastillas, de alta absorción para nutrientes esenciales.",
}

export default function AboutPage() {
  return <AboutTemplate />
}
