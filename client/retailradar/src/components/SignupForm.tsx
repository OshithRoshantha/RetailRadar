import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export function SignupForm({
  setState,
  className,
  ...props
}: React.ComponentPropsWithoutRef<"form">) {
  return (
    <form className={cn("flex flex-col gap-6", className)} {...props}>
      <div className="flex flex-col items-center gap-2 text-center">
        <h1 className="text-2xl font-bold">Boost Your Sales<br></br>Sign Up Free</h1>
        <p className="text-balance text-sm text-muted-foreground ">
            Get full access to AI-powered retail analytics.
        </p>
      </div>
      <div className="grid gap-6">
        <div className="grid gap-2">
          <Label>Business Name</Label>
          <Input id="name" placeholder="Daraz" required />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="email">Email</Label>
          <Input id="email" type="email" placeholder="sample@daraz.com" required />
        </div>
        <div className="grid gap-2">
          <div className="flex items-center">
            <Label htmlFor="password">Password</Label>
          </div>
          <Input id="password" type="password" required />
          <div className="flex items-center">
            <Label htmlFor="password">Confirm Password</Label>
          </div>
          <Input id="password" type="password" required />
        </div>
        <Button type="submit" className="w-full bg-[#0718c4]">
          Create Account
        </Button>
      </div>
      <div className="text-center text-sm">
      Already have an account?{" "}
        <a className="underline underline-offset-4 font-bold text-[#0718c4] cursor-pointer" onClick={() => setState(true)}>
          Sign in
        </a>
      </div>
    </form>
  )
}
