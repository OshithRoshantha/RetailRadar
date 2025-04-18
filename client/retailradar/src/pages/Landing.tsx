import { LoginForm } from '@/components/LoginForm';
import mainLogo from '../assets/logo/logo1.png';
import landingImg from '../assets/img/landing.png';
import './css/SignIn.css'
import { SignupForm } from "@/components/SignupForm";
import { useState } from 'react';

export default function Landing() {
    const [state, setState] = useState<boolean>(true);
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
            {state ? (
              <LoginForm setState={setState} />
            ) : (
              <SignupForm setState={setState} />
            )}
          </div>
        </div>
      </div>
      <div className="relative hidden lg:block">
        <img
          src={landingImg}
          alt="Image"
          className='absolute inset-0 h-full w-full object-cover ml-[-17%]'
        />
      </div>
    </div>
  )
}
