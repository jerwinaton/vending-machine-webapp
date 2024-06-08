<template>
  <div class="modal-overlay">
    <div class="modal min-h-48 min-h-96 flex flex-col">
      <img
        class="w-48 h-48 mx-auto"
        src="/src/assets/logo.svg"
        :alt="product?.name"
      />
      <h2>{{ product?.name }}</h2>
      <p class="text-sm text-black/70 mb-1">{{ product?.description }}</p>
      <p class="font-bold mb-1">
        Price: {{ formatAsMoney(product?.price ?? 0) }}
      </p>
      <label for="quantity">Quantity</label>
      <input
        class="border border-primary px-2 py-1 rounded mb-4"
        id="quantity"
        type="number"
        min="1"
        :max="product?.stock"
        v-model="quantity"
      />
      <p class="text-center font-bold text-xl my-2">
        Total Price: {{ formatAsMoney(totalPrice) }}
      </p>
      <!-- Display total price -->
      <div class="flex mt-auto gap-2 justify-center">
        <button
          class="button bg-white hover:bg-gray-100 shadow"
          @click="$emit('close')"
        >
          Cancel
        </button>
        <button class="primary-button shadow" @click="addToCart">
          Add to Cart
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import formatAsMoney from "@/utils/formatAsMoney";

import type { Product } from "@/types/types";
import { computed, ref } from "vue";

const props = defineProps({
  product: Object as () => Product,
});

const emit = defineEmits(["close", "add-to-cart"]);

const addToCart = () => {
  emit("add-to-cart", props.product, quantity.value);
};
const quantity = ref(1); // Initialize quantity ref with default value

// Define computed property to calculate total price
const totalPrice = computed(() => {
  if (props.product && props.product.price) {
    return props.product.price * quantity.value; // Multiply product price by quantity
  }
  return 0; // Default to 0 if product or product price is undefined
});
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
