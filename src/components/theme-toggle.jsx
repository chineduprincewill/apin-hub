import React, { useEffect, useState } from 'react'
import { Button } from './ui/button'
import { LogOut, MailIcon, Moon, PhoneCallIcon, Sun, UserCircle } from 'lucide-react'
import { useAuth } from '../hooks/useAuth'
import { Dialog, DialogContent, DialogTitle, DialogTrigger } from '../components/ui/dialog'
import Login from '../public/login'
import SignUp from '../public/sign-up'

const ThemeToggle = () => {

    const [action, setAction] = useState('login')
    const { user, logout } = useAuth();
    const [isDark, setIsDark] = useState(false)
    const path = window.location.pathname
    console.log(path)

    useEffect(() => {
        const theme = localStorage.getItem("theme")
        if (theme === "dark") {
        document.documentElement.classList.add("dark")
        setIsDark(true)
        }
    }, [])

    function toggleTheme() {
        const html = document.documentElement

        if (html.classList.contains("dark")) {
            html.classList.remove("dark")
            localStorage.setItem("theme", "light")
            setIsDark(false)
        } else {
            html.classList.add("dark")
            localStorage.setItem("theme", "dark")
            setIsDark(true)
        }
    }

    return (
        <div className={`w-full flex fixed top-0 z-40 justify-between items-center md:px-4 text-gray-400`}>
            <div className='p-2'></div>
            <div className='flex gap-2 items-center px-2 py-1'>
            {
                path === '/' ?
                <div className='flex gap-2 items-center'>
                    <div className='hidden md:flex gap-3 items-center font-extralight text-sm'>
                        <span>services@apin.org.ng</span>
                        <Dialog>
                            <DialogTrigger asChild>
                                <div className='border border-white rounded-full px-4 py-1 text-white font-extralight hover:bg-white/20 cursor-pointer'>Console</div>
                            </DialogTrigger>
                            <DialogContent className="dark:bg-gradient-to-b from-background to-accent">
                                <DialogTitle></DialogTitle>
                            {
                                action === 'login' ?
                                <Login setAction={setAction} /> : <SignUp setAction={setAction} />
                            }
                            </DialogContent>
                        </Dialog>
                    </div>
                </div> : 
                <span className='text-sm uppercase'>
                {
                    user && 
                    <div className='px-2 py-1 flex items-center gap-1 rounded-full text-foreground bg-foreground/10'>
                        <UserCircle className='!w-4 !h-4' />
                        <span>{user.role}</span>
                    </div>
                }
                </span>
            }
                <Button variant="flat" size="icon" onClick={toggleTheme} className="md:mt-0 mt-2">
                    {isDark ? <Sun size={18} /> : <Moon size={18} />}
                </Button>
            </div>
        </div>
    )
}

export default ThemeToggle