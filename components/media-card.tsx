'use client';

import { useState } from 'react';
import Image from 'next/image';
import { Calendar, Clock, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { useLocalStorage } from '@/lib/hooks/useLocalStorage';
import { MediaDetailsDialog } from './media-details-dialog';

interface MediaCardProps {
  id: number;
  title: string;
  overview: string;
  posterPath: string;
  releaseDate: string;
  rating: number;
  type: 'movie' | 'tv';
  runtime?: number;
}

export function MediaCard({
  id,
  title,
  overview,
  posterPath,
  releaseDate,
  rating,
  type,
  runtime,
}: MediaCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);
  const [watchlist, setWatchlist] = useLocalStorage<number[]>('watchlist', []);
  const [watched, setWatched] = useLocalStorage<{ id: number; runtime: number }[]>(
    'watched',
    []
  );

  const isInWatchlist = watchlist.includes(id);
  const isWatched = watched.some((item) => item.id === id);

  const handleWatchlistToggle = () => {
    if (isInWatchlist) {
      setWatchlist(watchlist.filter((itemId) => itemId !== id));
    } else {
      setWatchlist([...watchlist, id]);
    }
  };

  const handleWatchedToggle = () => {
    if (isWatched) {
      setWatched(watched.filter((item) => item.id !== id));
    } else if (runtime) {
      setWatched([...watched, { id, runtime }]);
    }
  };

  return (
    <>
      <Card
        className="relative overflow-hidden transition-all duration-300"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div className="relative aspect-[2/3]">
          <Image
            src={`https://image.tmdb.org/t/p/w500${posterPath}`}
            alt={title}
            fill
            className="object-cover"
          />
          {isHovered && (
            <div className="absolute inset-0 bg-black/70 p-4 flex flex-col justify-between text-white transition-opacity duration-300">
              <div>
                <h3 className="font-bold mb-2">{title}</h3>
                <p className="text-sm line-clamp-3">{overview}</p>
              </div>
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-sm">
                  <Calendar className="h-4 w-4" />
                  {new Date(releaseDate).toLocaleDateString()}
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <Star className="h-4 w-4" />
                  {rating.toFixed(1)}
                </div>
                {runtime && (
                  <div className="flex items-center gap-2 text-sm">
                    <Clock className="h-4 w-4" />
                    {runtime} min
                  </div>
                )}
                <div className="flex gap-2">
                  <Button
                    size="sm"
                    variant="secondary"
                    className="flex-1"
                    onClick={() => setIsDetailsOpen(true)}
                  >
                    More Info
                  </Button>
                  <Button
                    size="sm"
                    variant={isInWatchlist ? 'destructive' : 'default'}
                    className="flex-1"
                    onClick={handleWatchlistToggle}
                  >
                    {isInWatchlist ? 'Remove' : 'Watch Later'}
                  </Button>
                </div>
                {type === 'movie' && (
                  <Button
                    size="sm"
                    variant={isWatched ? 'destructive' : 'default'}
                    className="w-full"
                    onClick={handleWatchedToggle}
                  >
                    {isWatched ? 'Unmark Watched' : 'Mark as Watched'}
                  </Button>
                )}
              </div>
            </div>
          )}
        </div>
      </Card>
      <MediaDetailsDialog
        open={isDetailsOpen}
        onOpenChange={setIsDetailsOpen}
        mediaId={id}
        type={type}
      />
    </>
  );
}