import React, { useState } from 'react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../../components/ui/tabs';
import { LockKeyhole } from 'lucide-react';
import Security from './security';

const Settings = () => {

  const [error, setError] = useState();

  return (
    <div className='w-full p-4'>
        {/* Error Message */}
        {error && (
            <div className="mb-6 p-3 bg-destructive/10 border border-destructive/20 rounded-lg">
                <p className="text-sm text-destructive flex items-center gap-2">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    {error}
                </p>
            </div>
        )}
        <Tabs defaultValue="security" className='grid gap-2'>
            <TabsList className="gap-4 w-full md:max-w-max">
                <TabsTrigger value="security">
                    <div className='flex gap-1 items-center'>
                        <LockKeyhole size={16} />
                        <span className='hidden md:block'>Security</span>
                    </div>
                </TabsTrigger>
            </TabsList>
            <TabsContent value="security">
              <Security />
            </TabsContent>
        </Tabs>
    </div>
  )
}

export default Settings