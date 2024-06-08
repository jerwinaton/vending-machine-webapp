<template>
  <nav
    class="min-h-fit sm:min-h-[500px] max-h-[500px] w-full px-3 py-2 overflow-auto bg-white border border-r-black/20 col-span-1"
  >
    <ul
      class="flex sm:flex-col gap-2 justify-start sm:justify-center items-center"
    >
      <li
        v-for="category in categories"
        :key="category.id"
        class="sm:w-full w-fit"
      >
        <button
          @click="$emit('update:selectedCategory', category.id)"
          :class="[
            'text-center border rounded-xl py-1 px-2 sm:p-3 w-fit sm:w-full h-fit hover:bg-gray-100 text-black flex flex-col items-center',
            selectedCategory == category.id
              ? 'bg-gray-100  border-primary'
              : 'bg-white ',
          ]"
        >
          <img
            class="w-8 h-8 sm:w-12 sm:h-12"
            :src="`src/assets/icons/${category.image_url}`"
            :alt="category.name"
          />
          {{ category.name }}
        </button>
      </li>
    </ul>
  </nav>
</template>

<script setup lang="ts">
import type { Category } from "@/types/types";

defineProps({
  categories: Array as () => Category[] | null,
  selectedCategory: Number,
});

defineEmits(["update:selectedCategory"]);
</script>
