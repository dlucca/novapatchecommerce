import { Metadata } from "next"
import { redirect } from "next/navigation"
import { currentUser } from "@clerk/nextjs/server"
import ProfileTemplate from "@modules/account/pages/profile-template"

export const metadata: Metadata = {
  title: "Mi Cuenta",
  description: "Ver y editar tu perfil de NovaPatch.",
}

export default async function ProfilePage() {
  const user = await currentUser()

  if (!user) {
    redirect('/sign-in')
  }

  const email = user.emailAddresses[0]?.emailAddress || ''
  const firstName = user.firstName || ''
  const lastName = user.lastName || ''
  const phone = user.phoneNumbers[0]?.phoneNumber || ''

  return (
    <ProfileTemplate
      email={email}
      firstName={firstName}
      lastName={lastName}
      phone={phone}
    />
  )
}

