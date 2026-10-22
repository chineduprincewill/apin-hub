import React, { useContext, useEffect, useState } from 'react'
import { AppContext } from '../../context/AppContext'
import { createPlatform, platformCategories } from '../../utils/platforms'
import ComboboxComponent2 from '../../components/combobox-component2'
import { Input } from '../../components/ui/input'
import { Textarea } from '../../components/ui/textarea'
import { Label } from '../../components/ui/label'
import { RadioGroup, RadioGroupItem } from '../../components/ui/radio-group'
import { Button } from '../../components/ui/button'
import { toast } from 'sonner'

const NewPlatform = ({ data, action}) => {

    const { token, refreshRecord } = useContext(AppContext)
    const [categories, setCategories] = useState()
    const [title, setTitle] = useState(data && data.title)
    const [category, setCategory] = useState(data && data.category)
    const [caption, setCaption] = useState(data && data.caption)
    const [url, setUrl] = useState(data && data.url)
    const [description, setDescription] = useState(data && data.description)
    const [tags, setTags] = useState(data && data.tags)
    const [popular, setPopular] = useState(data && data.popular)
    const [error, setError] = useState()
    const [isLoading, setIsLoading] = useState(false)
    const [updating, setUpdating] = useState(false)
    const [success, setSuccess] = useState()


    const handleSubmit = (e) => {
        e.preventDefault()

        const pltdata = {
            title, 
            category, 
            caption, 
            url, 
            description, 
            tags, 
            popular
        }

        if(action && action === 'edit') {
            pltdata.id = data.id
        } 

        createPlatform(token, pltdata, setSuccess, setError, setUpdating)
    }

    if(success){
        toast.success("Platform updated successfully!", {
            className: "!bg-green-700 !text-white !border-white !font-bold",
            descriptionClassName: "!text-green-700",
        });
        //router.push('/forms');
        setSuccess();
        setTitle('');
        setCategory('')
        setCaption('');
        setDescription('');
        setUrl('');
        setPopular('');
        setTags('');
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
        platformCategories(token, setCategories, setError, setIsLoading)
    }, [])

    return (
        <form onSubmit={handleSubmit} className='grid gap-4'>
            <div className='grid gap-1'>
                <ComboboxComponent2 comboOptions={categories} value={category} setValue={setCategory} fetching={isLoading} plc='Select category' />
                <span className='text-lg font-extralight mx-auto'>OR</span>
                <Input 
                    type="text"
                    value={category}
                    placeholder="Type in category here if not in dropdown above"
                    onChange={(e) => setCategory(e.target.value)}
                    required
                />
            </div>
            <Input 
                type="text"
                value={title}
                placeholder="Enter platform name/title"
                onChange={(e) => setTitle(e.target.value)}
                required
            />
            <Textarea 
                value={caption}
                placeholder="Enter caption"
                onChange={(e) => setCaption(e.target.value)}
                required
            />
            <Textarea 
                value={description}
                placeholder="Enter description"
                onChange={(e) => setDescription(e.target.value)}
            />
            <Input 
                type="text"
                value={url}
                placeholder="Enter platfrom URL"
                onChange={(e) => setUrl(e.target.value)}
                required
            />
            <Input 
                type="text"
                value={tags}
                placeholder="Enter search tags"
                onChange={(e) => setTags(e.target.value)}
            />
            <RadioGroup
                value={popular}
                className="flex items-center gap-3"
                onValueChange={(v) => setPopular(v)}
                required
            >
                <div className="flex items-center gap-3">
                    <RadioGroupItem value={"Yes"} id="r1" />
                    <Label htmlFor="r1">Popular</Label>
                </div>
                <div className="flex items-center gap-3">
                    <RadioGroupItem value={"No"} id="r2" />
                    <Label htmlFor="r2">Not popular</Label>
                </div>
            </RadioGroup>
            <Button 
                className="gradient"
            >
            {
                updating ?
                <span className="flex items-center gap-2">
                    <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                    </svg>
                    Saving...
                </span>
                :
                <span>Save</span>
            }
            </Button>
        </form>
    )
}

export default NewPlatform