import { LoginForm } from "@/components/LoginForm";
import { GalleryVerticalEnd } from "lucide-react"
import mainLogo from '../assets/logo/logo1.png'
import './css/SignIn.css'

export default function SignIn() {
  return (
    <div className="grid min-h-svh lg:grid-cols-2">
      <div className="flex flex-col gap-4 p-6 md:p-10">
        <div className="flex justify-center gap-2 md:justify-start">
          <div className="flex items-center gap-2 font-medium">
            <div className="flex h-6 w-6 items-center justify-center rounded-md bg-primary text-primary-foreground">
            </div>
                <img
                src={mainLogo}
                alt="Image"
                className="main-logo"
                />
          </div>
        </div>
        <div className="flex flex-1 items-center justify-center">
          <div className="w-full max-w-xs">
            <LoginForm />
          </div>
        </div>
      </div>
      <div className="relative hidden bg-muted lg:block">

      </div>
    </div>
  )
}
