import { SignInForm } from "@/components/form/sign-in-form"

export default function SignInPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="bg-card p-8 rounded-lg shadow-md w-full max-w-md border">
        <h1 className="text-2xl font-bold text-center mb-6 text-foreground">
          Iniciar Sesión
        </h1>

        <SignInForm />
      </div>
    </div>
  )
}
