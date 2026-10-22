import React, { useEffect, useMemo, useState } from 'react'
import { ArrowUpRight, Badge, CircleX, HdIcon, Search, Sparkles, X } from 'lucide-react';
import { Input } from '../components/ui/input';
import { Button } from '../components/ui/button';
import { fetchPlatforms } from '../utils/platforms';
import SkeletonComponent from '../components/skeleton-component';
import { getCategories, getFirstTwoInitials, getPopularTitles } from '../utils/functions';
import { Card } from '../components/ui/card';
import LeftBanner from './left-banner';

const Home = () => {
    
    const [platforms, setPlatforms] = useState()
    const [error, setError] = useState()
    const [isLoading, setIsLoading] = useState(false)
    const [query, setQuery] = useState()
    const [popular, setPopular] = useState();
    const [categories, setCategories] = useState()
    const [category, setCategory] = useState('all')
    const isFiltering = query && (query.trim() !== "" || category !== "all");

    const results = useMemo(() => {
        const q = query?.trim().toLowerCase();
      
        return (platforms ?? []).filter((platform) => {
          if (q) {
            const matchesText = [platform.title, platform.caption, platform.description, platform.category]
              .some((field) => field?.toLowerCase().includes(q));
            if (!matchesText) return false;
          }
      
          if (category && category !== 'all' && platform.category !== category) {
            return false;
          }
      
          return true;
        });
    }, [query, category, platforms]);

    useEffect(() => {
        platforms && setPopular(getPopularTitles(platforms))
    }, [platforms])

    useEffect(() => {
        platforms && setCategories(getCategories(platforms))
    }, [platforms])

    useEffect(() => {
        fetchPlatforms(setPlatforms, setError, setIsLoading)
    }, [])

    console.log(categories)

    return (
        <div className='m-0'>
            <div className="min-h-screen bg-background text-foreground">
                <div>
                    <header className="sticky top-0 z-10 border-b border-border/70 bg-[#090f24] dark:bg-background/80 backdrop-blur">
                        <div className="mx-auto flex h-12 max-w-6xl items-center gap-2 px-4 sm:px-6">
                            <div className="flex size-7 items-center justify-center rounded-sm bg-secondary text-primary-foreground">
                                <Sparkles className="size-4" />
                            </div>
                            <span className="text-base font-semibold tracking-tight text-brand">
                                APIN Hub
                            </span>
                        </div>
                    </header>
                    <section className="relative overflow-hidden border-b border-border/70 bg-gradient-to-b from-accent/60 to-background">
                        <div className="z-50 mx-auto max-w-4xl px-4 py-12 text-center sm:px-6 sm:py-12">
                            <Button variant="outline" className="bg-foreground/5 rounded-full border-none mb-2 flex items-center gap-2 mx-auto hover:text-white">
                                <img src='/assets/logo.png' alt='logo' width="18px" />
                                <span className='font-extralight'>APIN Public Health Initiatives</span>
                            </Button>
                            <h1 className="text-balance text-3xl font-semibold tracking-tight !leading-tight sm:text-7xl dark:text-transparent dark:bg-clip-text dark:bg-gradient-to-r dark:from-brand dark:via-white dark:to-secondary">
                                Every of Our Digital Platforms in one place
                            </h1>
                            <p className="mx-auto mt-4 max-w-2xl text-pretty text-base text-muted-foreground sm:text-lg">
                                Search by name or keyword, or browse by category to find your portal.
                            </p>

                            <div className="relative mx-auto mt-8 max-w-xl">
                                <Search className="pointer-events-none absolute left-4 top-1/2 size-5 -translate-y-1/2 text-muted-foreground" />
                                <Input
                                type="search"
                                value={query}
                                onChange={(event) => setQuery(event.target.value)}
                                placeholder="Search platforms, e.g. resthub, vendor manager, apin-repo"
                                aria-label="Search platforms"
                                className="h-14 rounded-2xl border-border bg-card pl-12 pr-4 text-base shadow-sm"
                                />
                            </div>
                            <div className="mt-5 flex flex-wrap items-center justify-center gap-2">
                                <span className="text-sm text-muted-foreground">Popular:</span>
                                {popular && popular.map((platform) => (
                                <Button
                                    key={platform.name}
                                    variant="outline"
                                    size="sm"
                                    className="rounded-full bg-card hover:bg-card/20 dark:hover:bg-foreground/20"
                                    onClick={() => setQuery(platform.name)}
                                >
                                    {platform.name}
                                </Button>
                                ))}
                            </div>
                        </div>   
                    </section>
                {
                    isLoading ? <div className='p-6'><SkeletonComponent /></div> :
                    <main className="mx-auto max-w-6xl px-4 py-10 sm:px-6 sm:py-14">
                        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                            <div
                                role="group"
                                aria-label="Filter by category"
                                className="flex flex-wrap gap-2"
                            >
                                <Button
                                    size="sm"
                                    variant={category === "all" ? "default" : "outline"}
                                    aria-pressed={category === "all"}
                                    onClick={() => setCategory("all")}
                                    className="rounded-full"
                                >
                                    All
                                </Button>
                                {categories && categories.map((item) => (
                                <Button
                                    key={item.id}
                                    size="sm"
                                    variant={category === item.label ? "default" : "outline"}
                                    aria-pressed={category === item.label}
                                    onClick={() => setCategory(item.label)}
                                    className="rounded-full"
                                >
                                    {item.label}
                                </Button>
                                ))}
                            </div>
                            <div className="flex items-center gap-1 text-sm text-muted-foreground">
                                {
                                    (isFiltering || category !== 'all') && (
                                    <Button
                                        variant="ghost"
                                        size="sm"
                                        onClick={() => {
                                        setQuery("");
                                        setCategory("all");
                                        }}
                                        className="text-red-600 hover:bg-red-600"
                                    >
                                        Clear
                                    </Button>
                                    )
                                }
                                <span>
                                {results && results.length} of {platforms && platforms.length} shown
                                </span>
                            </div>
                        </div>
                        {results.length > 0 ? (
                        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                            {results.map((platform) => {
                            const Icon = platform.icon;
                            const categoryLabel = categories && categories.find(
                                (item) => item.id === platform.id,
                            )?.label;
                            return (
                                <a
                                key={platform.name}
                                href={platform.href}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="group block rounded-xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                                >
                                <Card className="h-full p-5 transition-all duration-200 group-hover:-translate-y-0.5 group-hover:border-primary/40 group-hover:shadow-md">
                                    <div className="flex items-start justify-between gap-4">
                                        <div className="flex size-10 items-center justify-center rounded-lg bg-secondary text-black uppercase font-semibold">
                                            {getFirstTwoInitials(platform.title)}
                                        </div>
                                        <a href={platform.url} target='_blank'>
                                            <ArrowUpRight 
                                                className="size-5 text-muted-foreground transition-colors group-hover:text-primary" 
                                            />
                                        </a>
                                    </div>
                                    <h2 className="mt-4 text-base font-semibold tracking-tight">
                                    {platform.title}
                                    </h2>
                                    <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">
                                    {platform.caption}
                                    </p>
                                    <p className="mt-4 text-xs font-medium uppercase tracking-wide text-muted-foreground">
                                    {categoryLabel}
                                    </p>
                                </Card>
                                </a>
                            );
                            })}
                        </div>
                        ) : (
                        <div className="mt-12 flex flex-col items-center rounded-xl border border-dashed border-border bg-card/50 px-6 py-16 text-center">
                            <div className="flex size-12 items-center justify-center rounded-full bg-accent text-accent-foreground">
                            <Search className="size-5" />
                            </div>
                            <h2 className="mt-4 text-base font-semibold">No platforms match</h2>
                            <p className="mt-1 max-w-sm text-sm text-muted-foreground">
                            Try a different keyword or choose another category.
                            </p>
                            <Button
                            variant="outline"
                            size="sm"
                            className="mt-5"
                            onClick={() => {
                                setQuery("");
                                setCategory("all");
                            }}
                            >
                            Show all platforms
                            </Button>
                        </div>
                        )}
                    </main>
                }
                </div>
            </div>
        </div>
    );
}

export default Home