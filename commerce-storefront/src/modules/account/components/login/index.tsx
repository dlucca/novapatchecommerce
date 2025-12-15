/**
 * ⚠️ DISABLED - Medusa Native Login Component
 *
 * This component is disabled because the project uses Clerk for authentication.
 * See /sign-in for login with Clerk.
 *
 * To reactivate, uncomment this code and the login() function in @lib/data/customer
 */

// import { login } from "@lib/data/customer"
import { LOGIN_VIEW } from "@modules/account/pages/login-template"
// import ErrorMessage from "@modules/checkout/components/error-message"
// import { SubmitButton } from "@modules/checkout/components/submit-button"
// import Input from "@/components/ui/input"
// import { useActionState } from "react"

type Props = {
  setCurrentView: (view: LOGIN_VIEW) => void
}

const Login = ({ setCurrentView }: Props) => {
  // const [message, formAction] = useActionState(login, null)

  return (
    <div
      className="max-w-sm w-full flex flex-col items-center"
      data-testid="login-page"
    >
      <h1 className="text-large-semi uppercase mb-6">Autenticación Deshabilitada</h1>
      <p className="text-center text-base-regular text-ui-fg-base mb-8">
        Este proyecto usa Clerk para autenticación. Por favor, ve a /sign-in para iniciar sesión.
      </p>
      <a
        href="/sign-in"
        className="w-full mt-6 bg-blue-600 text-white py-2 px-4 rounded text-center hover:bg-blue-700"
      >
        Ir a Sign In
      </a>
    </div>
  )

  // CÓDIGO ORIGINAL COMENTADO:
  // return (
  //   <div
  //     className="max-w-sm w-full flex flex-col items-center"
  //     data-testid="login-page"
  //   >
  //     <h1 className="text-large-semi uppercase mb-6">Welcome back</h1>
  //     <p className="text-center text-base-regular text-ui-fg-base mb-8">
  //       Sign in to access an enhanced shopping experience.
  //     </p>
  //     <form className="w-full" action={formAction}>
  //       <div className="flex flex-col w-full gap-y-2">
  //         <Input
  //           label="Email"
  //           name="email"
  //           type="email"
  //           title="Enter a valid email address."
  //           autoComplete="email"
  //           required
  //           data-testid="email-input"
  //         />
  //         <Input
  //           label="Password"
  //           name="password"
  //           type="password"
  //           autoComplete="current-password"
  //           required
  //           data-testid="password-input"
  //         />
  //       </div>
  //       <ErrorMessage error={message} data-testid="login-error-message" />
  //       <SubmitButton data-testid="sign-in-button" className="w-full mt-6">
  //         Sign in
  //       </SubmitButton>
  //     </form>
  //     <span className="text-center text-ui-fg-base text-small-regular mt-6">
  //       Not a member?{" "}
  //       <button
  //         onClick={() => setCurrentView(LOGIN_VIEW.REGISTER)}
  //         className="underline"
  //         data-testid="register-button"
  //       >
  //         Join us
  //       </button>
  //       .
  //     </span>
  //   </div>
  // )
}

export default Login
