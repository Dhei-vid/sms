"use client";

import { useState } from "react";
import { InputField } from "@/components/ui/input-field";
import { SelectField } from "@/components/ui/input-field";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { SelectItem } from "@/components/ui/select";
import { useCreateProductMutation } from "@/services/products/products";
import { toast } from "sonner";

const initialData = {
  itemName: "",
  itemCategory: "",
  unitPrice: "",
  availableStock: "",
  walletDebit: false,
  cash: false,
  posCard: false,
  salesTax: false,
  itemStatus: false,
};

interface PostCanteenItemForm {
  itemName: string;
  itemCategory: string;
  unitPrice: string;
  availableStock: string;
  walletDebit: boolean;
  cash: boolean;
  posCard: boolean;
  salesTax: boolean;
  itemStatus: boolean;
}

const CATEGORY_MAP: Record<string, string> = {
  food: "food",
  beverage: "drinks",
  snack: "snacks",
  other: "other",
};

export function PostCanteenItemForm({ onClose }: { onClose: () => void }) {
  const [formData, setFormData] = useState<PostCanteenItemForm>(initialData);
  const [createProduct, { isLoading }] = useCreateProductMutation();

  const handleSubmit = async () => {
    const name = formData.itemName.trim();
    const priceNum = parseFloat(formData.unitPrice);
    const stockNum = parseInt(formData.availableStock, 10);

    if (!name) {
      toast.error("Item name is required");
      return;
    }
    if (isNaN(priceNum) || priceNum < 0) {
      toast.error("Please enter a valid unit price");
      return;
    }
    if (isNaN(stockNum) || stockNum < 0) {
      toast.error("Please enter a valid stock quantity");
      return;
    }

    const category =
      CATEGORY_MAP[formData.itemCategory] || formData.itemCategory || "other";

    try {
      await createProduct({
        name,
        description: name,
        price: priceNum,
        sale_price: priceNum,
        category,
        stock: stockNum,
        in_stock: formData.itemStatus,
      }).unwrap();
      toast.success("Item added to canteen menu");
      setFormData(initialData);
      onClose();
    } catch (err: unknown) {
      const msg =
        err && typeof err === "object" && "data" in err
          ? (err as { data?: { message?: string } }).data?.message
          : "Failed to add item";
      toast.error(String(msg));
    }
  };

  return (
    <div className="space-y-6 py-4">
      {/* Item Name */}
      <InputField
        label="Item Name"
        placeholder="E.g., meat pie, spring roll, hamburger"
        type="text"
        value={formData.itemName}
        onChange={(e) =>
          setFormData((prev) => ({
            ...prev,
            itemName: e.target.value,
          }))
        }
      />

      {/* Select Item Category */}
      <SelectField
        label="Select Item"
        value={formData.itemCategory}
        onValueChange={(value) =>
          setFormData((prev) => ({ ...prev, itemCategory: value }))
        }
        placeholder="Select: Food, Beverage, Snack, Other"
      >
        <SelectItem value="food">Food</SelectItem>
        <SelectItem value="beverage">Beverage</SelectItem>
        <SelectItem value="snack">Snack</SelectItem>
        <SelectItem value="other">Other</SelectItem>
      </SelectField>

      {/* Unit Price */}
      <InputField
        label="Unit Price (₦)"
        placeholder="placeholder"
        type="number"
        value={formData.unitPrice}
        onChange={(e) =>
          setFormData((prev) => ({
            ...prev,
            unitPrice: e.target.value,
          }))
        }
      />

      {/* Available Stock */}
      <InputField
        label="Available Stock"
        placeholder="placeholder"
        type="number"
        value={formData.availableStock}
        onChange={(e) =>
          setFormData((prev) => ({
            ...prev,
            availableStock: e.target.value,
          }))
        }
      />

      {/* Payment Allowed */}
      <div className="space-y-3">
        <Label className="text-sm font-medium">Payment Allowed</Label>
        <div className="flex flex-row flex-wrap gap-6">
          <div className="flex items-center gap-2">
            <Checkbox
              id="wallet-debit"
              checked={formData.walletDebit}
              onCheckedChange={(checked) =>
                setFormData((prev) => ({
                  ...prev,
                  walletDebit: checked === true,
                }))
              }
            />
            <Label
              htmlFor="wallet-debit"
              className="text-sm font-normal cursor-pointer"
            >
              Wallet Debit
            </Label>
          </div>
          <div className="flex items-center gap-2">
            <Checkbox
              id="cash"
              checked={formData.cash}
              onCheckedChange={(checked) =>
                setFormData((prev) => ({
                  ...prev,
                  cash: checked === true,
                }))
              }
            />
            <Label
              htmlFor="cash"
              className="text-sm font-normal cursor-pointer"
            >
              Cash
            </Label>
          </div>
          <div className="flex items-center gap-2">
            <Checkbox
              id="pos-card"
              checked={formData.posCard}
              onCheckedChange={(checked) =>
                setFormData((prev) => ({
                  ...prev,
                  posCard: checked === true,
                }))
              }
            />
            <Label
              htmlFor="pos-card"
              className="text-sm font-normal cursor-pointer"
            >
              POS Card
            </Label>
          </div>
        </div>
      </div>

      {/* Sales Tax Applicable */}
      <div className="flex items-center justify-between">
        <div className="flex-1">
          <Label className="text-sm font-medium">Sales Tax Applicable</Label>
          <p className="text-xs text-gray-600 mt-1">
            If school policy requires taxing sales.
          </p>
        </div>
        <Switch
          checked={formData.salesTax}
          onCheckedChange={(checked) =>
            setFormData((prev) => ({ ...prev, salesTax: checked }))
          }
        />
      </div>

      {/* Item Status */}
      <div className="flex items-center justify-between">
        <div className="flex-1">
          <Label className="text-sm font-medium">Item Status</Label>
          <p className="text-xs text-gray-600 mt-1">
            Switch to temporarily remove seasonal or sold-out items from the POS
            without deleting them.
          </p>
        </div>
        <Switch
          checked={formData.itemStatus}
          onCheckedChange={(checked) =>
            setFormData((prev) => ({ ...prev, itemStatus: checked }))
          }
        />
      </div>

      {/* Action Buttons */}
      <div className="grid grid-cols-2 gap-3 pt-4">
        <Button variant="outline" onClick={onClose}>
          Cancel
        </Button>
        <Button onClick={handleSubmit} disabled={isLoading}>
          {isLoading ? "Saving…" : "Save and Update Canteen Menu"}
        </Button>
      </div>
    </div>
  );
}
