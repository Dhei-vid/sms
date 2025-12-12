"use client";

import { useState } from "react";
import { ProductCard } from "@/components/dashboard-pages/canteen/product-card";
import {
  CategoryFilter,
  Category,
} from "@/components/dashboard-pages/canteen/category-filter";
import { Button } from "@/components/ui/button";
import { Icon } from "@/components/general/huge-icon";
import { ShoppingCart01Icon } from "@hugeicons/core-free-icons";
import { OrderSummarySheet } from "@/components/dashboard-pages/canteen/order-summary-sheet";

interface Product {
  id: string;
  name: string;
  price: string;
  category: string;
  image?: string;
}

interface CartItem {
  productId: string;
  quantity: number;
}

type Cart = Record<string, CartItem>;

const categories: Category[] = [
  {
    id: "food",
    label: "Food",
    icon: "/icons/rice_bowl.png",
  },
  {
    id: "drinks",
    label: "Drinks",
    icon: "/icons/drinks.png",
  },
  {
    id: "snacks",
    label: "Snacks",
    icon: "/icons/snacks.png",
  },
  {
    id: "daily-specials",
    label: "Daily Specials",
    icon: "/icons/daily_specials.png",
  },
];

const products: Product[] = [
  {
    id: "1",
    name: "Popcorn",
    price: "₦400.00",
    category: "snacks",
    image: "/canteen/popcorn.png",
  },
  {
    id: "2",
    name: "Soymilk Drink",
    price: "₦400.00",
    category: "drinks",
    image: "/canteen/soymilk.png",
  },
  {
    id: "3",
    name: "Meat Pie",
    price: "₦800.00",
    category: "snacks",
    image: "/canteen/meatpie.jpg",
  },
  {
    id: "4",
    name: "Watermelon Smoothie",
    price: "₦200.00",
    category: "drinks",
    image: "/canteen/watermelon_smoothie.jpg",
  },
  {
    id: "5",
    name: "Yam & Potato Chips",
    price: "₦800.00",
    category: "snacks",
    image: "/canteen/yam_chips.png",
  },
  {
    id: "6",
    name: "Spring Roll",
    price: "₦800.00",
    category: "snacks",
    image: "/canteen/spring_roll.jpg",
  },
  {
    id: "7",
    name: "Donuts",
    price: "₦400.00",
    category: "snacks",
    image: "/canteen/donuts.jpg",
  },
  {
    id: "8",
    name: "Bottled Water",
    price: "₦200.00",
    category: "drinks",
    image: "/canteen/water.jpg",
  },
  {
    id: "9",
    name: "Zobo Drink",
    price: "₦400.00",
    category: "drinks",
    image: "/canteen/zobo.jpg",
  },
  {
    id: "10",
    name: "Puff puff",
    price: "₦400.00",
    category: "snacks",
    image: "/canteen/puffpuff.jpg",
  },
  {
    id: "11",
    name: "Munch Kins Biscuits",
    price: "₦300.00",
    category: "snacks",
    image: "/canteen/munch_biscuit.jpg",
  },
  {
    id: "12",
    name: "Jollof Rice & Chicken",
    price: "₦1,500.00",
    category: "food",
    image: "/canteen/jollof_rice_n_chicken.jpg",
  },
];

export default function CanteenTerminalPage() {
  const [selectedCategory, setSelectedCategory] = useState<string>("food");
  const [cart, setCart] = useState<Cart>({});
  const [orderSummaryOpen, setOrderSummaryOpen] = useState(false);

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
      0
    );
  };

  const handlePurchase = () => {
    // Open order summary sheet
    setOrderSummaryOpen(true);
  };

  const handleCompleteTransaction = (
    studentId: string,
    paymentMethod: "cash" | "wallet"
  ) => {
    // Handle transaction completion
    console.log("Completing transaction:", {
      studentId,
      paymentMethod,
      cart: Object.values(cart),
    });
    // Reset cart and close sheet after transaction
    setCart({});
    setOrderSummaryOpen(false);
  };

  const handleAddAnotherItem = () => {
    // Close sheet to allow adding more items
    setOrderSummaryOpen(false);
  };

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
