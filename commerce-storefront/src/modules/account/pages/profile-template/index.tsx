import ProfileDeleteAccount from "@modules/account/components/profile-delete-account"
import { Heading, Text } from "@medusajs/ui"

type ProfileTemplateProps = {
  email: string
  firstName: string
  lastName: string
  phone: string
}

export default function ProfileTemplate({
  email,
  firstName,
  lastName,
  phone,
}: ProfileTemplateProps) {
  return (
    <div className="w-full" data-testid="profile-page-wrapper">
      <div className="mb-8 flex flex-col gap-y-4">
        <h1 className="text-2xl-semi">Mi Cuenta</h1>
        <p className="text-base-regular">
          Ver y actualizar tu información de perfil.
        </p>
      </div>

      <div className="flex flex-col gap-y-8 w-full">
        {/* Nombre */}
        <div className="flex flex-col gap-y-4">
          <Heading level="h2" className="text-lg font-semibold">Nombre</Heading>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Text className="text-sm text-gray-600 mb-1">Nombre</Text>
              <Text className="text-base">{firstName || 'No especificado'}</Text>
            </div>
            <div>
              <Text className="text-sm text-gray-600 mb-1">Apellido</Text>
              <Text className="text-base">{lastName || 'No especificado'}</Text>
            </div>
          </div>
        </div>

        <Divider />

        {/* Email */}
        <div className="flex flex-col gap-y-4">
          <Heading level="h2" className="text-lg font-semibold">Email</Heading>
          <Text className="text-base">{email}</Text>
        </div>

        <Divider />

        {/* Teléfono */}
        <div className="flex flex-col gap-y-4">
          <Heading level="h2" className="text-lg font-semibold">Teléfono</Heading>
          <Text className="text-base">{phone || 'No especificado'}</Text>
        </div>

        <Divider />

        {/* Eliminar Cuenta */}
        <ProfileDeleteAccount />
      </div>
    </div>
  )
}

const Divider = () => {
  return <div className="w-full h-px bg-gray-200" />
}

