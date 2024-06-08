<template>
  <div
    class="w-full min-h-[400px] sm:min-h-[500px] max-h-[500px] col-span-3 overflow-auto bg-white px-3 pt-2 pb-4"
  >
    <ul class="grid grid-cols-2 sm:grid-cols-3 gap-3 max-h-full">
      <li v-for="product in products" :key="product.id">
        <article
          tabindex="0"
          role="button"
          @click="handleProductClick(product)"
          class="bg-white h-full p-2 rounded-xl shadow flex flex-col items-center"
        >
          <img
            class="w-20 h-20"
            src="/src/assets/logo.svg"
            :alt="product.name"
          />
          <p class="font-bold">
            {{ formatAsMoney(product.price) }}
          </p>
          <h2 class="text-sm">{{ product.name }}</h2>
        </article>
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
import type { Product } from "@/types/types";
import formatAsMoney from "@/utils/formatAsMoney";

defineProps({
  products: Array as () => Product[] | null,
});

const emit = defineEmits(["productSelected"]);

const handleProductClick = (product: Product) => {
  emit("productSelected", product);
};
</script>

<style scoped>
/* Add your styles here */
</style>
