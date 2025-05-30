import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useState } from 'react'
import { Eye, EyeOff } from 'lucide-react'
import { signIn } from "@/services/Landing"

export function LoginForm({
    setState,
    className,
    ...props
}: React.ComponentPropsWithoutRef<"form">) {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState('')
    const [isLoading, setIsLoading] = useState(false)
    const [showPassword, setShowPassword] = useState(false)

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setIsLoading(true)
        setError('')
        
        try {
            const response = await signIn(email, password)
            
            if (response === "Invalid") {
                setError('Incorrect email or password.')
            } else {
                sessionStorage.setItem('jwtToken', response.token)
                sessionStorage.setItem('email', response.email)
                sessionStorage.setItem('company', response.company)
                window.location.href = '/dashboard'
            }
        } catch (err) {
            setError('An error occurred during login')
            console.error('Login error:', err)
        } finally {
            setIsLoading(false)
        }
    }

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword)
    }

    return (
        <form className={cn("flex flex-col gap-6", className)} onSubmit={handleSubmit} {...props}>
            <div className="flex flex-col items-center gap-2 text-center">
                <h1 className="text-2xl font-bold">Welcome Back!</h1>
                <p className="text-balance text-sm text-muted-foreground">
                    Sign in to access your retail analytics dashboard.
                </p>
            </div>
            <div className="grid gap-6">
                {error && (
                    <div className="text-red-500 text-sm text-center">
                        {error}
                    </div>
                )}
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
                    <div className="relative">
                        <Input 
                            id="password" 
                            type={showPassword ? "text" : "password"} 
                            required 
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>
                </div>
                <Button 
                    type="submit" 
                    className="w-full bg-[#0718c4]" 
                    disabled={isLoading}
                >
                    {isLoading ? 'Logging in...' : 'Login'}
                </Button>
                <div className="relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t after:border-border">
                    <span className="relative z-10 bg-background px-2 text-muted-foreground">
                        Or continue with
                    </span>
                </div>
                <Button variant="outline" className="w-full" type="button">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" width="50px" height="50px">
                        <path fill="#4285F4" d="M23.49 12.3c3.7 0 6.13 1.6 7.55 2.94L35.9 9.55C33.11 7 28.84 5 23.49 5 14.52 5 6.97 10.56 3.7 18.02l6.84 5.31c1.88-5.74 7.1-11.03 12.95-11.03Z"/>
                        <path fill="#34A853" d="M41.88 20H24v8h10.23c-.63 3.18-2.52 5.78-5.19 7.57l6.36 5.04c4.29-3.91 6.99-9.66 6.99-16.61 0-1.2-.1-2.36-.31-3.5Z"/>
                        <path fill="#FBBC05" d="M10.54 28.57c-1.17-3.47-1.17-7.27 0-10.74L3.7 12.51c-2.69 5.38-2.69 11.72 0 17.1l6.84-5.04Z"/>
                        <path fill="#EA4335" d="M23.49 43c5.21 0 9.63-1.69 12.91-4.56l-6.36-5.04c-1.78 1.22-4.05 1.94-6.55 1.94-5.84 0-11.06-5.29-12.95-11.03l-6.84 5.31c3.27 7.46 10.82 13.02 19.79 13.02Z"/>
                    </svg>
                    Login with Google
                </Button>
            </div>
            <div className="text-center text-sm">
                New to RetailRadar?{" "}
                <a className="underline underline-offset-4 font-bold text-[#0718c4] cursor-pointer" onClick={() => setState(false)}>
                    Sign up
                </a>
            </div>
        </form>
    )
}