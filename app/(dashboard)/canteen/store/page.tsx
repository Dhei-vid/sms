"use client";

import { useState, useMemo } from "react";
import { ProductCard } from "@/components/dashboard-pages/canteen/product-card";
import {
  CategoryFilter,
  Category,
} from "@/components/dashboard-pages/canteen/category-filter";
import { Button } from "@/components/ui/button";
import { Icon } from "@/components/general/huge-icon";
import { ShoppingCart01Icon } from "@hugeicons/core-free-icons";
import { OrderSummarySheet } from "@/components/dashboard-pages/canteen/order-summary-sheet";
import {
  useGetProductsQuery,
  useCreateOrderMutation,
} from "@/services/shared";
import { useSelector } from "react-redux";
import type { RootState } from "@/store";
import type { Product } from "@/services/products/products-type";

interface CartItem {
  productId: string;
  quantity: number;
}

type Cart = Record<string, CartItem>;

const categories: Category[] = [
  { id: "all", label: "All", icon: "/icons/rice_bowl.png" },
  { id: "food", label: "Food", icon: "/icons/rice_bowl.png" },
  { id: "drinks", label: "Drinks", icon: "/icons/drinks.png" },
  { id: "snacks", label: "Snacks", icon: "/icons/snacks.png" },
  { id: "daily specials", label: "Daily Specials", icon: "/icons/daily_specials.png" },
];

/** Format product for store display */
function toStoreProduct(p: Product): {
  id: string;
  name: string;
  price: string;
  category: string;
  image?: string;
} {
  const priceVal = parseFloat(p.sale_price || p.price || "0");
  return {
    id: p.id,
    name: p.name,
    price: `₦${priceVal.toLocaleString("en-NG", { minimumFractionDigits: 2 })}`,
    category: (p.category || "").toLowerCase(),
    image: typeof p.image === "string" ? p.image : undefined,
  };
}

export default function CanteenTerminalPage() {
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [cart, setCart] = useState<Cart>({});
  const [orderSummaryOpen, setOrderSummaryOpen] = useState(false);

  const { data: productsData, isLoading: productsLoading } = useGetProductsQuery({
    _all: true,
  });
  const [createOrder, { isLoading: isCreatingOrder }] = useCreateOrderMutation();
  const user = useSelector((s: RootState) => s.auth.user);
  const schoolId = user?.school_id ?? "";

  const products = useMemo(() => {
    const list = Array.isArray(productsData?.data)
      ? productsData.data
      : (productsData as { data?: Product[] })?.data ?? [];
    return list.filter((p) => !p.is_deleted).map(toStoreProduct);
  }, [productsData]);

  const filteredProducts =
    selectedCategory === "all"
      ? products
      : products.filter((product) => product.category === selectedCategory);

  const handleProductClick = (productId: string) => {
    setCart((prevCart) => {
      const newCart = { ...prevCart };

      if (newCart[productId]) {
        // If already in cart, increase quantity
        newCart[productId] = {
          ...newCart[productId],
          quantity: newCart[productId].quantity + 1,
        };
      } else {
        // Add to cart with quantity 1
        newCart[productId] = { productId, quantity: 1 };
      }

      return newCart;
    });
  };

  const handleQuantityIncrease = (productId: string) => {
    setCart((prevCart) => {
      const newCart = { ...prevCart };
      if (newCart[productId]) {
        newCart[productId] = {
          ...newCart[productId],
          quantity: newCart[productId].quantity + 1,
        };
      }
      return newCart;
    });
  };

  const handleQuantityDecrease = (productId: string) => {
    setCart((prevCart) => {
      const newCart = { ...prevCart };
      if (newCart[productId] && newCart[productId].quantity > 1) {
        newCart[productId] = {
          ...newCart[productId],
          quantity: newCart[productId].quantity - 1,
        };
      }
      return newCart;
    });
  };

  const handleRemove = (productId: string) => {
    setCart((prevCart) => {
      const newCart = { ...prevCart };
      delete newCart[productId];
      return newCart;
    });
  };

  const getTotalItems = () => {
    return Object.values(cart).reduce(
      (total, item) => total + item.quantity,
      0,
    );
  };

  const handlePurchase = () => {
    // Open order summary sheet
    setOrderSummaryOpen(true);
  };

  const handleCompleteTransaction = async (
    studentId: string,
    paymentMethod: "cash" | "wallet",
  ) => {
    if (!products.length) return;
    const items = Object.entries(cart).map(([productId, item]) => {
      const p = products.find((x) => x.id === productId);
      const price = p ? parseFloat(p.price.replace(/[₦,]/g, "")) : 0;
      return { product_id: productId, quantity: item.quantity, price };
    });
    const total_amount = items.reduce((sum, i) => sum + i.quantity * i.price, 0);
    try {
      await createOrder({
        school_id: schoolId,
        total_amount,
        items,
      }).unwrap();
      setCart({});
      setOrderSummaryOpen(false);
    } catch {
      // Error handled by baseApi toast
    }
  };

  const handleAddAnotherItem = () => {
    // Close sheet to allow adding more items
    setOrderSummaryOpen(false);
  };

  if (productsLoading) {
    return (
      <div className="flex items-center justify-center py-24 text-gray-500">
        Loading products...
      </div>
    );
  }

  return (
    <div className="space-y-6 pb-24">
      {/* Category Filters */}
      <CategoryFilter
        categories={categories}
        selectedCategory={selectedCategory}
        onCategoryChange={setSelectedCategory}
      />

      {/* Products Grid */}
      <div className="px-1 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
        {filteredProducts.map((product) => {
          const cartItem = cart[product.id];
          const isSelected = !!cartItem;
          const quantity = cartItem?.quantity || 0;

          return (
            <ProductCard
              key={product.id}
              id={product.id}
              name={product.name}
              price={product.price}
              image={product.image}
              onClick={() => handleProductClick(product.id)}
              isSelected={isSelected}
              quantity={quantity}
              onQuantityIncrease={() => handleQuantityIncrease(product.id)}
              onQuantityDecrease={() => handleQuantityDecrease(product.id)}
              onRemove={() => handleRemove(product.id)}
            />
          );
        })}
      </div>

      {/* Empty State */}
      {filteredProducts.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-500">No products found in this category.</p>
        </div>
      )}

      {/* Purchase Button - Fixed at bottom */}
      {getTotalItems() > 0 && (
        <div className="fixed bottom-6 right-6 z-50">
          <Button
            onClick={handlePurchase}
            className="bg-main-blue text-white hover:bg-main-blue/90 h-14 px-6 flex items-center gap-3 shadow-lg"
            size="lg"
          >
            <div className="relative">
              <Icon icon={ShoppingCart01Icon} size={24} />
              {getTotalItems() > 0 && (
                <span className="absolute -top-2 -right-2 bg-white text-main-blue rounded-full h-5 w-5 flex items-center justify-center text-xs font-bold">
                  {getTotalItems()}
                </span>
              )}
            </div>
            <span className="text-base font-semibold">Purchase Item</span>
          </Button>
        </div>
      )}

      {/* Order Summary Sheet */}
      <OrderSummarySheet
        open={orderSummaryOpen}
        onOpenChange={setOrderSummaryOpen}
        cart={cart}
        products={products}
        onQuantityIncrease={handleQuantityIncrease}
        onQuantityDecrease={handleQuantityDecrease}
        onRemove={handleRemove}
        onAddAnotherItem={handleAddAnotherItem}
        onCompleteTransaction={handleCompleteTransaction}
      />
    </div>
  );
}
