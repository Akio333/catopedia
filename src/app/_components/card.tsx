"use client";

import Image from "next/image";
import Link from "next/link";
import type { PostCard } from "~/types";

import React from "react";

const Card = React.memo(
  React.forwardRef<HTMLDivElement, PostCard>((card, ref) => {
    return (
      <div
        ref={ref}
        className="flex w-full flex-col gap-2 rounded-xl border-2 border-neutral-700 bg-neutral-600 p-3"
      >
        <Link href={`/${card.id}`} about="Details of cat">
          <Image
            src={card.image}
            alt="cat img"
            width={500}
            height={400}
            className="h-52 w-full object-cover object-center"
          />
          <table>
            <tbody>
              <tr className="bg-slate-600">
                <td className="px-2">Breed </td>
                <td className="px-2">{card.breed}</td>
              </tr>
              <tr className="bg-gray-600">
                <td className="px-2">Origin </td>
                <td className="px-2">{card.origin}</td>
              </tr>
              <tr className="bg-zinc-600">
                <td className="px-2">Temperment</td>
                <td className="px-2">{card.temperment}</td>
              </tr>
            </tbody>
          </table>
        </Link>
      </div>
    );
  }),
);

Card.displayName = "Cat Teaser Card";

export default Card;
