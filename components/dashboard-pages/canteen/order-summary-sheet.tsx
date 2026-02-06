"use client";

import { useState } from "react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { QuantitySelector } from "./quantity-selector";
import Image from "next/image";
import { Icon } from "@/components/general/huge-icon";
import { AddSquareIcon } from "@hugeicons/core-free-icons";
import { cn } from "@/lib/utils";

interface CartItem {
  productId: string;
  quantity: number;
}

interface Product {
  id: string;
  name: string;
  price: string;
  image?: string;
}

interface OrderSummarySheetProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  cart: Record<string, CartItem>;
  products: Product[];
  onQuantityIncrease: (productId: string) => void;
  onQuantityDecrease: (productId: string) => void;
  onRemove: (productId: string) => void;
  onAddAnotherItem: () => void;
  onCompleteTransaction: (
    studentId: string,
    paymentMethod: "cash" | "wallet",
  ) => void;
}

export function OrderSummarySheet({
  open,
  onOpenChange,
  cart,
  products,
  onQuantityIncrease,
  onQuantityDecrease,
  onRemove,
  onAddAnotherItem,
  onCompleteTransaction,
}: OrderSummarySheetProps) {
  const [studentId, setStudentId] = useState("");
  const [paymentMethod, setPaymentMethod] = useState<"cash" | "wallet">(
    "wallet",
  );

  // Get cart items with product details
  const cartItems = Object.values(cart).map((item) => {
    const product = products.find((p) => p.id === item.productId);
    return {
      ...item,
      product,
    };
  });

  // Calculate totals
  const calculateSubtotal = () => {
    return cartItems.reduce((total, item) => {
      if (!item.product) return total;
      const price = parseFloat(item.product.price.replace(/[₦,]/g, ""));
      return total + price * item.quantity;
    }, 0);
  };

  const subtotal = calculateSubtotal();
  const total = subtotal; // No tax or fees for now

  const formatCurrency = (amount: number) => {
    return `₦ ${amount.toLocaleString("en-NG", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    })}`;
  };

  const handleCompleteTransaction = () => {
    if (!studentId.trim()) {
      // Could add validation here
      return;
    }
    onCompleteTransaction(studentId, paymentMethod);
    setStudentId("");
  };

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent
        side="right"
        className="w-full sm:max-w-lg overflow-y-auto p-0"
      >
        <SheetHeader className="px-6 pt-6 pb-4 border-b">
          <SheetTitle className="text-xl font-bold text-gray-800">
            Order Summary
          </SheetTitle>
        </SheetHeader>

        <div className="px-6 py-6 space-y-6">
          {/* Ordered Items */}
          <div className="space-y-4">
            {cartItems.map((item) => {
              if (!item.product) return null;

              return (
                <div
                  key={item.productId}
                  className="flex items-start gap-4 pb-4 border-b last:border-b-0"
                >
                  {/* Product Image */}
                  <div className="relative w-16 h-16 rounded-full overflow-hidden shrink-0 bg-gray-100">
                    {item.product.image ? (
                      <Image
                        src={item.product.image}
                        alt={item.product.name}
                        fill
                        className="object-cover"
                        sizes="64px"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-gray-400 text-xs">
                        No Image
                      </div>
                    )}
                  </div>

                  {/* Product Details */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2 mb-2">
                      <h3 className="font-semibold text-gray-800 text-sm">
                        {item.product.name}
                      </h3>
                      <p className="text-sm font-semibold text-gray-900 whitespace-nowrap">
                        {item.product.price}
                      </p>
                    </div>

                    {/* Quantity Selector */}
                    <div
                      className="place-self-end"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <QuantitySelector
                        quantity={item.quantity}
                        onIncrease={() => onQuantityIncrease(item.productId)}
                        onDecrease={() => onQuantityDecrease(item.productId)}
                        onRemove={() => onRemove(item.productId)}
                      />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Add Another Item Button */}
          <Button
            variant="outline"
            onClick={onAddAnotherItem}
            className="w-full flex items-center gap-2"
          >
            <Icon icon={AddSquareIcon} size={18} />
            Add another item
          </Button>

          {/* Summary Totals */}
          <div className="space-y-3 pt-4 border-t">
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">Sub-total</span>
              <span className="text-sm font-semibold text-gray-800">
                {formatCurrency(subtotal)}
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-lg font-bold text-gray-800">Total</span>
              <span className="text-lg font-bold text-gray-800">
                {formatCurrency(total)}
              </span>
            </div>
          </div>

          {/* Payment Method Section */}
          <div className="space-y-4 pt-4 border-t">
            <h3 className="text-base font-semibold text-gray-800">
              Payment Method
            </h3>

            {/* Student ID Input */}
            <div className="space-y-2">
              <Label htmlFor="studentId" className="text-sm text-gray-700">
                Enter Student ID
              </Label>
              <Input
                id="studentId"
                type="text"
                placeholder="Enter Student ID"
                value={studentId}
                onChange={(e) => setStudentId(e.target.value)}
                className="h-11"
              />
            </div>

            {/* Payment Buttons */}
            <div className="grid grid-cols-2 gap-3">
              <Button
                variant="outline"
                onClick={() => setPaymentMethod("cash")}
                className={cn(
                  "h-11",
                  paymentMethod === "cash" &&
                    "border-main-blue bg-main-blue/5 text-main-blue",
                )}
              >
                Pay with Cash
              </Button>
              <Button
                onClick={handleCompleteTransaction}
                className="h-11 bg-main-blue text-white hover:bg-main-blue/90"
                disabled={!studentId.trim()}
              >
                Complete Transaction
              </Button>
            </div>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}
