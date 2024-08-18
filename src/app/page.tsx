"use client";

import { api } from "~/trpc/react";
import Card from "./_components/card";
import React, { useState, useEffect, useRef, useCallback } from "react";
import type { PostCard } from "~/types";

export default function Home() {
  const [cards, setCards] = useState<PostCard[]>([]);
  const [offset, setOffset] = useState(0);
  const [hasMore, setHasMore] = useState(true);
  const [isFetching, setIsFetching] = useState<boolean>(false);
  const observer = useRef<IntersectionObserver | null>(null);

  // Fetch Data from tRPC
  const { data, isLoading, error } = api.cats.images.useQuery(
    {
      page: offset,
      limit: 10,
    },
    {
      enabled: !isFetching && hasMore,
    },
  );

  useEffect(() => {
    if (data) {
      if (data.length > 0) {
        setCards((prevCards) => [...prevCards, ...data]);
      } else {
        setHasMore(false);
      }
      setIsFetching(false);
    }
  }, [data]);

  // terminate fetching after 6 Pages.
  useEffect(() => {
    if (offset >= 5) {
      setHasMore(false);
    }
  }, [offset]);

  const lastCardRef = useCallback(
    (node: HTMLDivElement) => {
      if (isLoading) return;
      if (observer?.current) observer.current.disconnect();

      observer.current = new IntersectionObserver((entries) => {
        if (entries[0]?.isIntersecting && hasMore) {
          setOffset((prevOffset) => prevOffset + 1);
        }
      });

      if (node) observer.current.observe(node);
    },
    [isLoading, hasMore],
  );

  return (
    <main className="min-h-screen bg-zinc-700 p-2 text-white">
      <div className="container mx-auto grid min-h-screen grid-cols-1 flex-col gap-x-3 gap-y-4 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4">
        {cards.map((card, idx) => {
          if (idx === cards.length - 1) {
            return (
              <Card
                key={card.id}
                id={card.id}
                image={card.image}
                breed={card.breed}
                origin={card.origin}
                temperment={card.temperment}
                ref={lastCardRef}
              />
            );
          } else {
            return (
              <Card
                key={card.id}
                id={card.id}
                image={card.image}
                breed={card.breed}
                origin={card.origin}
                temperment={card.temperment}
              />
            );
          }
        })}
        {isLoading && <p>Loading More cats...</p>}
        {error && <p>Error loading teasers: {error.message}</p>}
      </div>
    </main>
  );
}
