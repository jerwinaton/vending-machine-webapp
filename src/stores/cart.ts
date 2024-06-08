// cart.ts
import { defineStore } from 'pinia';
import type { Product } from '@/types/types';

export const useCartStore = defineStore('cart', {
  state: () => ({
    items: [] as { product: Product; quantity: number }[], // array to store products and their quantities in the cart
  }),
  getters: {
    totalItems(state) {
      // Sum up all quantities
      return state.items.reduce((total, item) => total + item.quantity, 0);
    },
    totalPrice(state) {
      // Multiply price by quantity for each item and sum up
      return state.items.reduce((total, item) => total + item.product.price * item.quantity, 0);
    },
  },
  actions: {
    // action to add a product to the cart
    addToCart(product: Product, quantity: number) {
      const existingItem = this.items.find(item => item.product.id === product.id); // Check if product already exists in cart
      if (existingItem) {
        // If product exists, update its quantity
        existingItem.quantity += quantity;
        
      } else {
        // Otherwise, add new item to cart
        this.items.push({ product, quantity });
      }
    },
    //action to update the quantity of a product in the cart
    updateQuantity(index: number, quantity: number) {
      this.items[index].quantity = quantity;
    },
    // action to remove a product from the cart
    removeFromCart(index: number) {
      this.items.splice(index, 1);
    },
    // action to clear all items from the cart
    clearCart() {
      this.items = [];
    },
  },
});
