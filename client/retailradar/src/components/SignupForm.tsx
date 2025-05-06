import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useState } from 'react'
import { Eye, EyeOff } from 'lucide-react'
import { signUp } from "@/services/Landing"

export function SignupForm({
  setState,
  className,
  ...props
}: React.ComponentPropsWithoutRef<"form">) {
  const [businessName, setBusinessName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [passwordError, setPasswordError] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (password !== confirmPassword) {
      setPasswordError('Passwords do not match!')
      return
    }
    
    setIsLoading(true)
    setError('')
    setPasswordError('')

    try {
      await signUp(businessName, email, password)
      setState(true) 
    } catch (err) {
      setError('Signup failed. Please try again.')
      console.error('Signup error:', err)
    } finally {
      setIsLoading(false)
    }
  }

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword)
  }

  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword)
  }

  return (
    <form className={cn("flex flex-col gap-6", className)} onSubmit={handleSubmit} {...props}>
      <div className="flex flex-col items-center gap-2 text-center">
        <h1 className="text-2xl font-bold">Boost Your Sales<br></br>Sign Up Free</h1>
        <p className="text-balance text-sm text-muted-foreground ">
            Get full access to AI-powered retail analytics.
        </p>
      </div>
      <div className="grid gap-6">
        {error && (
          <div className="text-red-500 text-sm text-center">
            {error}
          </div>
        )}
        
        <div className="grid gap-2">
          <Label>Business Name</Label>
          <Input 
            id="name" 
            placeholder="Daraz" 
            required 
            value={businessName}
            onChange={(e) => setBusinessName(e.target.value)}
          />
        </div>
        
        <div className="grid gap-2">
          <Label htmlFor="email">Email</Label>
          <Input 
            id="email" 
            type="email" 
            placeholder="sample@daraz.com" 
            required 
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        
        <div className="grid gap-2">
          <div className="flex items-center justify-between">
            <Label htmlFor="password">Password</Label>
            <button
              type="button"
              className="text-sm text-muted-foreground hover:text-primary flex items-center gap-1"
              onClick={togglePasswordVisibility}
            >
              {showPassword ? (
                <>
                  <EyeOff className="h-4 w-4" />
                  <span>Hide</span>
                </>
              ) : (
                <>
                  <Eye className="h-4 w-4" />
                  <span>Show</span>
                </>
              )}
            </button>
          </div>
          <Input 
            id="password" 
            type={showPassword ? "text" : "password"} 
            required 
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          
          <div className="flex items-center justify-between">
            <Label htmlFor="confirmPassword">Confirm Password</Label>
            <button
              type="button"
              className="text-sm text-muted-foreground hover:text-primary flex items-center gap-1"
              onClick={toggleConfirmPasswordVisibility}
            >
              {showConfirmPassword ? (
                <>
                  <EyeOff className="h-4 w-4" />
                  <span>Hide</span>
                </>
              ) : (
                <>
                  <Eye className="h-4 w-4" />
                  <span>Show</span>
                </>
              )}
            </button>
          </div>
          <Input 
            id="confirmPassword" 
            type={showConfirmPassword ? "text" : "password"} 
            required 
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
          {passwordError && (
            <div className="text-red-500 text-sm">
              {passwordError}
            </div>
          )}
        </div>
        
        <Button 
          type="submit" 
          className="w-full bg-[#0718c4]" 
          disabled={isLoading}
        >
          {isLoading ? 'Creating Account...' : 'Create Account'}
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
