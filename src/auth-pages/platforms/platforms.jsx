import React, { useContext, useEffect, useState } from 'react'
import { AppContext } from '../../context/AppContext'
import { managePlatforms, platformStatusUpdate } from '../../utils/platforms'
import { Check, CircleCheck, CircleX, Copy, Edit, Plus, X } from 'lucide-react'
import NewPlatform from './new-platform'
import { Dialog, DialogContent, DialogTitle, DialogTrigger } from '../../components/ui/dialog'
import SkeletonComponent from '../../components/skeleton-component'
import DataTable from '@/components/data-table';
import { toast } from 'sonner'

const Platforms = () => {

    const { token, record, refreshRecord } = useContext(AppContext)
    const [platforms, setPlatforms] = useState()
    const [error, setError] = useState()
    const [isLoading, setIsLoading] = useState(false)
    const [plt_id, setPlt_id] = useState()
    const [updating, setUpdating] = useState(false)
    const [action, setAction] = useState()
    const [success, setSuccess] = useState()

    const columns = [    
        {
            id: 'actions',
            cell: ({ row }) => {
            const plt = row.original; 
            return (
                <div className="flex items-center gap-3">
                    <div className='flex items-center p-0.5 gap-1 rounded-full border border-muted-foreground/40 bg-muted-foreground/10'>
                        <CircleCheck 
                            className={`!w-4 !h-4 ${plt.status === 1 ? 'text-green-600' : 'text-muted-foreground/20 cursor-pointer hover:text-green-400'} ${updating && plt.id === plt_id && action === 'activate' && 'animate-spin text-green-600'}`} 
                            onClick={() => plt.status === 0 && updatePlatformStatus(plt.id, plt.title, 'activate')}
                        />
                        <CircleX 
                            className={`!w-4 !h-4 ${plt.status === 0 ? 'text-red-600' : 'text-muted-foreground/20 cursor-pointer hover:text-red-400'} ${updating && plt.id === plt_id && action === 'disable' && 'animate-spin text-red-600'}`} 
                            onClick={() =>  plt.status === 1 && updatePlatformStatus(plt.id, plt.title, 'disable')}
                        />
                    </div>
                {
                    plt.status === 1 &&
                    <>
                    <Dialog>
                        <DialogTrigger asChild>
                            <Edit 
                                className="h-4 w-4 cursor-pointer" 
                            />
                        </DialogTrigger>
                        <DialogContent className="dark:bg-gradient-to-b from-background to-accent">
                            <DialogTitle className="font-extralight">Edit {plt.title}</DialogTitle>
                            <NewPlatform data={plt} action='edit' />
                        </DialogContent>
                    </Dialog>
                    <Dialog>
                        <DialogTrigger asChild>
                            <Copy 
                                className="h-4 w-4 cursor-pointer" 
                            />
                        </DialogTrigger>
                        <DialogContent className="dark:bg-gradient-to-b from-background to-accent">
                            <DialogTitle className="font-extralight">Copy {plt.title}</DialogTitle>
                            <NewPlatform data={plt} action='copy' />
                        </DialogContent>
                    </Dialog>
                    </>
                }
                </div>
            );
            },
        },
        {
            accessorKey: 'title',
            header: 'Platform',
            cell: ({row}) => {
                const plt = row.original;
                return(
                    <div className='grid gap-0'>
                        <span className="font-extralight">{plt.title}</span>
                    </div>
                )
            },
            enableSorting: true,
            enableColumnFilter: true,
        },
        {
            accessorKey: 'category',
            header: 'Category',
            cell: ({row}) => {
                const plt = row.original;
                return(
                    <div className='grid gap-0'>
                        <span className="font-extralight text-wrap">{plt.category}</span>
                    </div>
                )
            },
            enableSorting: true,
            enableColumnFilter: true,
        },
        {
            accessorKey: 'url',
            header: 'URL',
            cell: ({row}) => {
                const plt = row.original;
                return(
                    <div className='grid gap-0'>
                        <span className="font-extralight">{plt.url}</span>
                    </div>
                )
            },
            enableSorting: true,
            enableColumnFilter: true,
        },
        {
            accessorKey: 'tags',
            header: 'Tags',
            cell: ({row}) => {
                const plt = row.original;
                return(
                    <div className='grid gap-0'>
                        <span className="font-extralight text-wrap">{plt.tags}</span>
                    </div>
                )
            },
            enableSorting: true,
            enableColumnFilter: true,
        },
        {
            accessorKey: 'popular',
            header: 'Is Popular?',
            cell: ({row}) => {
                const plt = row.original;
                return(
                    plt.popular === "Yes" ?
                    <Check className='w-4 h-4 text-green-600' /> :
                    <X className='w-4 h-4 text-muted-foreground/20' />
                )
            },
            enableSorting: true,
            enableColumnFilter: true,
        },
    ];

    const datafilters = [
        {
            title: "title",
            placeholder: "filter by platform..."
        },
        {
            title: "category",
            placeholder: "filter by category..."
        },
        {
            title: "url",
            placeholder: "filter by URL..."
        },
    ]

    const updatePlatformStatus = (pltid, pltname, pltaction) => {
        setPlt_id(pltid)
        setAction(pltaction)
        if(window.confirm(`Are you sure you want to ${pltaction} ${pltname}?`)){
            const data = {
                id:pltid,
                //action
            }
            platformStatusUpdate(token, data, setSuccess, setError, setUpdating)
        }
    }

    if(success){
        toast.success("Platform status updated successfully!", {
            className: "!bg-green-700 !text-white !border-white !font-bold",
            descriptionClassName: "!text-green-700",
        });
        //router.push('/forms');
        setSuccess();
        setPlt_id();
        refreshRecord(Date.now());
    }

    if(error){
        toast.error(JSON.stringify(error), {
            className: "!bg-red-700 !text-white !border-white !font-bold",
            descriptionClassName: "!text-red-700",
        });
        setError();
    }

    useEffect(() => {
        managePlatforms(token, setPlatforms, setError, setIsLoading)
    }, [record])

    return (
        <div className='grid gap-4 p-4'>
            <div className='w-full flex items-center justify-end'>
                <Dialog>
                    <DialogTrigger asChild>
                        <div className='flex items-center gap-1 px-4 py-2 rounded-full bg-background hover:bg-secondary cursor-pointer hover:text-black'>
                            <Plus />
                            <span>Platform</span>
                        </div>
                    </DialogTrigger>
                    <DialogContent className="dark:bg-gradient-to-b from-background to-accent">
                        <DialogTitle className="font-extralight">New platform</DialogTitle>
                        <NewPlatform />
                    </DialogContent>
                </Dialog>
            </div>
            {
                isLoading ? <SkeletonComponent /> :
                platforms &&
                <div className='w-full px-4 overflow-auto bg-background p-4 rounded-t-2xl'>
                    <DataTable data={platforms} columns={columns} filterArrs={datafilters} />
                </div>
            }
        </div>
    )
}

export default Platforms