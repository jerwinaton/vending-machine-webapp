<template>
  <div class="modal-overlay">
    <div
      class="modal min-w-[300px] max-w-md min-h-[400px] sm:min-h-[500px] max-h-[500px] overflow-auto flex flex-col"
    >
      <ul
        v-if="cartItems.length > 0"
        class="grid grid-cols-2 sm:grid-cols-3 gap-3 max-h-full"
      >
        <li v-for="(item, index) in cartItems" :key="index">
          <article
            class="bg-white h-full p-2 rounded-xl shadow flex flex-col items-center"
          >
            <img
              class="w-full h-full"
              src="/src/assets/logo.svg"
              :alt="item.product.name"
            />
            <p class="font-bold">
              {{ formatAsMoney(item.product.price) }}
            </p>
            <h2 class="text-sm mb-2">{{ item.product.name }}</h2>
            <label for="quantity" class="text-xs text-black/70">Quantity</label>
            <input
              class="border border-primary px-2 py-1 rounded mb-1"
              id="quantity"
              type="number"
              min="0"
              :max="item?.product.stock"
              v-model="item.quantity"
              @input="() => updateQuantity(index, item.quantity)"
            />
            <button
              @click="removeItem(index)"
              class="button text-red-600 text-xs bg-red-100 hover:bg-red-200"
            >
              Remove
            </button>
          </article>
        </li>
      </ul>
      <div class="flex-grow flex flex-col items-center justify-center" v-else>
        <CaShoppingCartClear class="w-20 h-20" />
        <p class="text-center">No cart items</p>
      </div>
      <div class="mt-auto sticky -bottom-5 py-2 bg-white border-t">
        <button
          class="button bg-white hover:bg-gray-100 shadow t"
          @click="() => emit('close')"
        >
          Close
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import formatAsMoney from "@/utils/formatAsMoney";
import { CaShoppingCartClear } from "@kalimahapps/vue-icons";
import type { Product } from "@/types/types";
import { computed, ref } from "vue";
import { useCartStore } from "@/stores/cart";

const cartStore = useCartStore();
const cartItems = cartStore.items;

const emit = defineEmits(["close", "add-to-cart"]);

const removeItem = (index: number) => {
  cartStore.removeFromCart(index);
};

const updateQuantity = (index: number, quantity: number) => {
  if (quantity <= 0) {
    removeItem(index);
    return;
  }
  cartStore.updateQuantity(index, quantity);
};

// Define computed property to calculate total price
// const totalPrice = computed(() => {
//   if (props.product && props.product.price) {
//     return props.product.price * quantity.value; // Multiply product price by quantity
//   }
//   return 0; // Default to 0 if product or product price is undefined
// });
</script>

<style scoped>
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
}

.modal {
  background-color: white;
  padding: 20px;
  border-radius: 8px;
}
</style>
