import React, { useEffect, useState } from 'react'
import { Label } from '../components/ui/label'
import { Input } from '../components/ui/input'
import { Button } from '../components/ui/button'
import { BsEye, BsEyeSlash } from 'react-icons/bs';
//import { login } from '../utils/auth'
import { useAuth } from '../hooks/useAuth'

const Login = ({ setAction }) => {

    const { login, isLoading, isAuthenticated } = useAuth();
    const [error, setError] = useState()
    const [email, setEmail] = useState()
    const [password, setPassword] = useState()
    //const [isLoading, setIsLoading] = useState(false)
    const [showpassword, setShowpassword] = useState(false);

    const toggleShowpassword = () => {
        setShowpassword(!showpassword)
    }

    useEffect(() => {
        if (isAuthenticated) {
            window.location.href = "/dashboard";
        }
    }, [isAuthenticated]);

    const validateForm = () => {
        if (!email.trim()) {
            setError("Email is required");
            return false;
        }
        
        if (!password.trim()) {
            setError("Password is required");
            return false;
        }
        
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            setError("Please enter a valid email address");
            return false;
        }
        
        return true;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        //setLoginError("");
        setError("");
        
        if (!validateForm()) {
            return;
        }

        try {
            await login(email, password);
            window.location.href = "/dashboard";
        } catch (err) {
            const errorMessage = err instanceof Error 
                ? err.message 
                : "Invalid email or password. Please try again.";
            setError(errorMessage);
        }
    };

    return (
        <div className="flex flex-col items-center justify-center">
            <div className="w-full max-w-md">
                <div className="mb-2">
                    <h1 className="text-3xl text-brand mb-1">Sign In</h1>
                    <p className="text-muted-foreground">Enter your credentials to sign in</p>
                </div>
                {/* Error Message */}
                {error && (
                    <div className="mb-2 p-3 bg-destructive/10 border border-destructive/20 rounded-lg">
                        <p className="text-sm text-destructive flex items-center gap-2">
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            {error}
                        </p>
                    </div>
                )}
                {/* Form */}
                <form onSubmit={handleSubmit} className="space-y-4">
                    {/* Email input */}
                    <div className="space-y-1">
                        <Label htmlFor="email" className="text-sm font-medium text-foreground">
                            Email
                        </Label>
                        <Input
                            id="email"
                            type="email"
                            placeholder="you@example.com"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="h-11 bg-input border-border rounded-lg focus:ring-2 focus:ring-primary/30 focus:border-primary transition"
                            required
                        />
                    </div>

                    {/* Password input */}
                    <div className="space-y-2">
                        <Label htmlFor="password" className="text-sm font-medium text-foreground">
                        Password
                        </Label>
                        <div className='w-full flex items-center'>
                            <Input
                                id="password"
                                type={showpassword ? 'type' : 'password'}
                                placeholder="••••••••"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="h-11 bg-input border-border rounded-l-lg rounded-r-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition"
                                required
                            />
                            <div className='h-11 p-4 bg-input rounded-r-lg'>
                            {
                                showpassword ?
                                <BsEye 
                                    className='cursor-pointer' 
                                    onClick={() => toggleShowpassword()}
                                />
                                : 
                                <BsEyeSlash 
                                    className='cursor-pointer' 
                                    onClick={() => toggleShowpassword()}
                                />
                            }
                            </div>
                        </div>
                    </div>

                    {/* Sign in button */}
                    <Button
                        type="submit"
                        disabled={isLoading}
                        className="w-full h-11 bg-secondary hover:bg-secondary/80 text-black font-semibold rounded-lg transition disabled:opacity-70"
                    >
                        {isLoading ? (
                        <span className="flex items-center gap-2">
                            <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                            </svg>
                            Signing up...
                        </span>
                        ) : (
                        "Sign in"
                        )}
                    </Button>
                </form>

                {/* Sign up link */}
                <div className="flex justify-center items-center gap-1 my-4 text-center text-sm text-muted-foreground mx-auto">
                    <span>You don't have an account?</span>
                    <span 
                        onClick={() => setAction('register')}
                        className="font-semibold text-primary hover:text-primary/80 transition cursor-pointer"
                    >
                        Sign up
                    </span>
                </div>

                {/* Footer text */}
                <p className="text-center text-xs text-muted-foreground mt-6">
                By signing in, you agree to our{" "}
                <a href="#" className="hover:text-foreground transition">
                    Terms of Service
                </a>{" "}
                and{" "}
                <a href="#" className="hover:text-foreground transition">
                    Privacy Policy
                </a>
                </p>
            </div>
        </div>
    )
}

export default Login