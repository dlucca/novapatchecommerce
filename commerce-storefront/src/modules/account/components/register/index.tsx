/**
 * DISABLED - Medusa Native Registration Component
 *
 * This component is disabled because the project uses Clerk for authentication.
 * See /sign-up for registration with Clerk.
 *
 * To reactivate, uncomment this code and the signup() function in @lib/data/customer
 */

"use client"

import { LOGIN_VIEW } from "@modules/account/pages/login-template"
import { useTranslations } from "next-intl"

type Props = {
  setCurrentView: (view: LOGIN_VIEW) => void
}

const Register = ({ setCurrentView }: Props) => {
  const t = useTranslations("auth")

  return (
    <div
      className="max-w-sm flex flex-col items-center"
      data-testid="register-page"
    >
      <h1 className="text-large-semi uppercase mb-6">{t("disabledTitle")}</h1>
      <p className="text-center text-base-regular text-ui-fg-base mb-4">
        {t("disabledDescriptionSignUp")}
      </p>
      <a
        href="/sign-up"
        className="w-full mt-6 bg-blue-600 text-white py-2 px-4 rounded text-center hover:bg-blue-700"
      >
        {t("goToSignUp")}
      </a>
    </div>
  )

  //     <span className="text-center text-ui-fg-base text-small-regular mt-6">
  //       Already a member?{" "}
  //       <button
  //         onClick={() => setCurrentView(LOGIN_VIEW.SIGN_IN)}
  //         className="underline"
  //       >
  //         Sign in
  //       </button>
  //       .
  //     </span>
  //   </div>
  // )
}

export default Register
