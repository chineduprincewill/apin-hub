import { GripVertical, Tally1 } from 'lucide-react';
import React from 'react'
import { useLocation } from 'react-router-dom'

const Header = ({ user }) => {

    const location = useLocation();
    const path = location.pathname.replace('/', '').replace('-', ' ');

    return (
        <header className="sticky top-0 z-30 border-b border-border bg-card/95 backdrop-blur">
            <div className="grid md:flex md:items-end md:justify-between gap-0 h-12 px-2">
              <div className='flex items-center gap-2 mb-2'>
                <h1 className="hidden md:block font-semibold text-foreground capitalize">{path}</h1>
                <span className='hidden md:block mb-1'>|</span>
                <span className="hidden md:block text-sm text-muted-foreground">
                {user && `Welcome back, ${user?.fullname || user?.email}!`}
                </span>
              </div>
              <div>
              </div>
            </div>
        </header>
    )
}

export default Header