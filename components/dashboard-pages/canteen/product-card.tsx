"use client";

import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { QuantitySelector } from "./quantity-selector";

interface ProductCardProps {
  id: string;
  name: string;
  price: string;
  image?: string;
  imageAlt?: string;
  onClick?: () => void;
  className?: string;
  isSelected?: boolean;
  quantity?: number;
  onQuantityIncrease?: () => void;
  onQuantityDecrease?: () => void;
  onRemove?: () => void;
}

export function ProductCard({
  id,
  name,
  price,
  image,
  imageAlt,
  onClick,
  className,
  isSelected = false,
  quantity = 0,
  onQuantityIncrease,
  onQuantityDecrease,
  onRemove,
}: ProductCardProps) {
  return (
    <Card
      className={cn(
        "cursor-pointer hover:shadow-md transition-all overflow-hidden p-0",
        isSelected && "ring-2 ring-main-blue border-main-blue",
        className,
      )}
      onClick={(e) => {
        e.stopPropagation();
        if (onClick) {
          onClick();
        }
      }}
    >
      <CardContent className="p-0">
        {/* Product Image */}
        <div className="relative w-full h-48 bg-gray-100 flex items-center justify-center overflow-hidden">
          {image ? (
            <Image
              src={image}
              alt={imageAlt || name}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 20vw"
            />
          ) : (
            <div className="text-gray-400 text-sm">No Image</div>
          )}
        </div>

        {/* Product Info */}
        <div className="p-4">
          <div className="col-span-2">
            <h3 className="font-semibold text-gray-800 mb-2 line-clamp-2">
              {name}
            </h3>
            <p className="text-base font-bold text-gray-900 mb-2">{price}</p>
          </div>

          {/* Quantity Selector - Only show when selected */}
          {isSelected && quantity > 0 && (
            <div
              className="place-self-end mt-2"
              onClick={(e) => e.stopPropagation()}
            >
              <QuantitySelector
                quantity={quantity}
                onIncrease={onQuantityIncrease || (() => {})}
                onDecrease={onQuantityDecrease || (() => {})}
                onRemove={onRemove || (() => {})}
              />
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
