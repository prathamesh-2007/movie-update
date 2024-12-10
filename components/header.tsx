'use client';

import { Film } from 'lucide-react';
import { ModeToggle } from './mode-toggle';
import Link from 'next/link';
import { Button } from './ui/button';
import { usePathname } from 'next/navigation';

export default function Header() {
  const pathname = usePathname();

  return (
    <header className="border-b">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <Link href="/" className="flex items-center space-x-2">
          <Film className="h-6 w-6" />
          <span className="font-bold text-xl">MovieMate</span>
        </Link>

        <nav className="hidden md:flex items-center space-x-4">
          <Link href="/">
            <Button variant={pathname === '/' ? 'default' : 'ghost'}>
              Discover
            </Button>
          </Link>
          <Link href="/trending">
            <Button variant={pathname === '/trending' ? 'default' : 'ghost'}>
              Trending
            </Button>
          </Link>
          <Link href="/popular">
            <Button variant={pathname === '/popular' ? 'default' : 'ghost'}>
              Popular
            </Button>
          </Link>
          <Link href="/watchlist">
            <Button variant={pathname === '/watchlist' ? 'default' : 'ghost'}>
              Watchlist
            </Button>
          </Link>
        </nav>

        <div className="flex items-center space-x-4">
          <ModeToggle />
        </div>
      </div>
    </header>
  );
}