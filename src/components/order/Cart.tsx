import React from 'react';
import { Minus, Plus, X, ShoppingBag, ChevronDown, ChevronUp, Plus as PlusIcon } from 'lucide-react';
import type { CartItem } from '../../hooks/useCart';

interface CartProps {
  items: CartItem[];
  onUpdateQuantity: (id: string, quantity: number) => void;
  onRemoveItem: (id: string) => void;
  onToggleIngredients: (id: string) => void;
  onUpdateIngredients: (id: string, excludedIngredients: string[]) => void;
  onAddCustomIngredient: (id: string, ingredientId: string) => void;
  onRemoveCustomIngredient: (id: string, ingredientId: string) => void;
  onCheckout: () => void;
  total: number;
}

const CartItemRow: React.FC<CartItem & {
  onUpdateQuantity: (id: string, quantity: number) => void;
  onRemoveItem: (id: string) => void;
  onToggleIngredients: (id: string) => void;
  onUpdateIngredients: (id: string, excludedIngredients: string[]) => void;
  onAddCustomIngredient: (id: string, ingredientId: string) => void;
  onRemoveCustomIngredient: (id: string, ingredientId: string) => void;
}> = ({
  id,
  name,
  price,
  image,
  quantity,
  ingredients,
  excludedIngredients,
  addedIngredients,
  customizationOptions,
  showIngredients,
  onUpdateQuantity,
  onRemoveItem,
  onToggleIngredients,
  onUpdateIngredients,
  onAddCustomIngredient,
  onRemoveCustomIngredient,
}) => (
  <div className="flex flex-col py-4 border-b dark:border-gray-700">
    <div className="flex items-center gap-4">
      <img
        src={image}
        alt={name}
        className="w-20 h-20 object-cover rounded-lg"
      />
      <div className="flex-1">
        <h3 className="font-semibold text-gray-900 dark:text-gray-100">{name}</h3>
        <p className="text-emerald-600 dark:text-emerald-400">${price.toFixed(2)}</p>
      </div>
      <div className="flex items-center gap-2">
        <button
          onClick={() => onUpdateQuantity(id, quantity - 1)}
          className="p-1 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700"
          disabled={quantity <= 1}
        >
          <Minus className="w-4 h-4" />
        </button>
        <span className="w-8 text-center text-gray-900 dark:text-gray-100">{quantity}</span>
        <button
          onClick={() => onUpdateQuantity(id, quantity + 1)}
          className="p-1 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700"
        >
          <Plus className="w-4 h-4" />
        </button>
        <button
          onClick={() => onRemoveItem(id)}
          className="p-1 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 
                   text-gray-400 hover:text-gray-600 dark:text-gray-500 dark:hover:text-gray-300"
        >
          <X className="w-4 h-4" />
        </button>
        <button
          onClick={() => onToggleIngredients(id)}
          className="p-1 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700"
        >
          {showIngredients ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
        </button>
      </div>
    </div>
    
    {showIngredients && (
      <div className="mt-4 ml-24 space-y-4">
        <div>
          <h4 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">Ingredients:</h4>
          <div className="space-y-1">
            {ingredients.map((ingredient) => (
              <label key={ingredient} className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={!excludedIngredients.includes(ingredient)}
                  onChange={(e) => {
                    const newExcluded = e.target.checked
                      ? excludedIngredients.filter(i => i !== ingredient)
                      : [...excludedIngredients, ingredient];
                    onUpdateIngredients(id, newExcluded);
                  }}
                  className="rounded text-emerald-600 focus:ring-emerald-500"
                />
                <span className="text-sm text-gray-600 dark:text-gray-400">{ingredient}</span>
              </label>
            ))}
          </div>
        </div>

        {customizationOptions?.addons && (
          <div>
            <h4 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">Add-ons:</h4>
            <div className="space-y-2">
              {customizationOptions.addons.map((addon) => (
                <div key={addon.id} className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="text-sm text-gray-600 dark:text-gray-400">{addon.name}</span>
                    <span className="text-xs text-gray-500">+${addon.price.toFixed(2)}</span>
                  </div>
                  <button
                    onClick={() => {
                      if (addedIngredients.includes(addon.id)) {
                        onRemoveCustomIngredient(id, addon.id);
                      } else {
                        onAddCustomIngredient(id, addon.id);
                      }
                    }}
                    className={`p-1 rounded-full ${
                      addedIngredients.includes(addon.id)
                        ? 'bg-emerald-100 text-emerald-600'
                        : 'hover:bg-gray-100 text-gray-400'
                    }`}
                  >
                    <PlusIcon className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    )}
  </div>
);

const Cart: React.FC<CartProps> = ({ 
  items, 
  onUpdateQuantity, 
  onRemoveItem,
  onToggleIngredients,
  onUpdateIngredients,
  onAddCustomIngredient,
  onRemoveCustomIngredient,
  onCheckout,
  total 
}) => {
  const TAX_RATE = 0.0825;
  const deliveryFee = items.length > 0 ? 5.99 : 0;
  const salesTax = total * TAX_RATE;
  const finalTotal = total + salesTax + deliveryFee;

  if (items.length === 0) {
    return (
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 text-center py-12">
        <ShoppingBag className="w-16 h-16 text-gray-400 dark:text-gray-500 mx-auto mb-4" />
        <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-2">
          Your cart is empty
        </h3>
        <p className="text-gray-600 dark:text-gray-400">
          Add some delicious meals to get started!
        </p>
      </div>
    );
  }

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
      <h2 className="text-2xl font-semibold text-gray-900 dark:text-gray-100 mb-6">Your Cart</h2>
      
      <div className="space-y-4 mb-6">
        {items.map((item) => (
          <CartItemRow
            key={item.id}
            {...item}
            onUpdateQuantity={onUpdateQuantity}
            onRemoveItem={onRemoveItem}
            onToggleIngredients={onToggleIngredients}
            onUpdateIngredients={onUpdateIngredients}
            onAddCustomIngredient={onAddCustomIngredient}
            onRemoveCustomIngredient={onRemoveCustomIngredient}
          />
        ))}
      </div>

      <div className="space-y-2 text-sm border-t dark:border-gray-700 pt-4">
        <div className="flex justify-between text-gray-600 dark:text-gray-400">
          <span>Subtotal</span>
          <span>${total.toFixed(2)}</span>
        </div>
        <div className="flex justify-between text-gray-600 dark:text-gray-400">
          <span>Sales Tax (8.25%)</span>
          <span>${salesTax.toFixed(2)}</span>
        </div>
        <div className="flex justify-between text-gray-600 dark:text-gray-400">
          <span>Delivery Fee</span>
          <span>${deliveryFee.toFixed(2)}</span>
        </div>
        <div className="flex justify-between font-semibold text-lg pt-2 border-t dark:border-gray-700 
                      text-gray-900 dark:text-gray-100">
          <span>Total</span>
          <span>${finalTotal.toFixed(2)}</span>
        </div>
      </div>

      <button 
        onClick={onCheckout}
        className="w-full btn-primary mt-6"
      >
        Proceed to Checkout
      </button>
    </div>
  );
};

export default Cart;
