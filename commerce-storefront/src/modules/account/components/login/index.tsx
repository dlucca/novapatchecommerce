/**
 * DISABLED - Medusa Native Login Component
 *
 * This component is disabled because the project uses Clerk for authentication.
 * See /sign-in for login with Clerk.
 *
 * To reactivate, uncomment this code and the login() function in @lib/data/customer
 */

import { LOGIN_VIEW } from "@modules/account/pages/login-template"
import { useTranslations } from "next-intl"

type Props = {
  setCurrentView: (view: LOGIN_VIEW) => void
}

const Login = ({ setCurrentView }: Props) => {
  const t = useTranslations("auth")
  return (
    <div
      className="max-w-sm w-full flex flex-col items-center"
      data-testid="login-page"
    >
      <h1 className="text-large-semi uppercase mb-6">{t("disabledTitle")}</h1>
      <p className="text-center text-base-regular text-ui-fg-base mb-8">
        {t("disabledDescription")}
      </p>
      <a
        href="/sign-in"
        className="w-full mt-6 bg-blue-600 text-white py-2 px-4 rounded text-center hover:bg-blue-700"
      >
        {t("goToSignIn")}
      </a>
    </div>
  )

}

export default Login
