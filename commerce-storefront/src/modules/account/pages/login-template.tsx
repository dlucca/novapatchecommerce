/**
 * DISABLED - Medusa Native Login/Registration Template
 *
 * This template is disabled because the project uses Clerk for authentication.
 * See /sign-in and /sign-up for authentication pages with Clerk.
 *
 * To reactivate:
 * 1. Uncomment this code
 * 2. Uncomment the signup() and login() functions in @lib/data/customer
 * 3. Uncomment the Login and Register components
 * 4. Create a route that uses this template
 */

"use client"

import { useState } from "react"

import Register from "@modules/account/components/register"
import Login from "@modules/account/components/login"

export enum LOGIN_VIEW {
  SIGN_IN = "sign-in",
  REGISTER = "register",
}

const LoginTemplate = () => {
  const [currentView, setCurrentView] = useState("sign-in")

  return (
    <div className="w-full flex justify-start px-8 py-8">
      {currentView === "sign-in" ? (
        <Login setCurrentView={setCurrentView} />
      ) : (
        <Register setCurrentView={setCurrentView} />
      )}
    </div>
  )
}

export default LoginTemplate
