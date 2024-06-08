<template>
  <div
    class="place-self-center min-w-full sm:min-w-[36rem] max-w-sm sm:max-w-xl md:min-w-[42rem] md:max-w-2xl mx-2 rounded-xl border shadow overflow-hidden flex flex-col"
  >
    <header class="px-2 md:px-4 py-5 vm-header h-14 bg-primary text-white">
      <h1 class="text-xl font-bold">Vending Machine</h1>
    </header>

    <main class="border border-black/20">
      <div class="grid grid-cols-1 sm:grid-cols-4">
        <!-- categories nav -->
        <CategoriesNav
          :categories="productsData.categories"
          :selectedCategory="selectedCategory"
          @update:selectedCategory="updateSelectedCategory"
        />
        <!-- products container -->
        <ProductsContainer :products="productsData.products" />
      </div>
    </main>

    <footer
      class="px-2 md:px-5 py-10 h-14 bg-white bg-cover bg-center bg-no-repeat flex justify-between items-center"
    >
      <section>
        <button
          class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Cancel
        </button>
        <button
          class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Done
        </button>
      </section>
    </footer>
  </div>
</template>

<script setup lang="ts">
import { onMounted, reactive, ref } from "vue";
import CategoriesNav from "@/components/VendingMachine/CategoriesNav.vue";
import ProductsContainer from "@/components/VendingMachine/ProductsContainer.vue";
import type { Category, Product } from "@/types/types";

type ProductsData = {
  categories: Category[] | null;
  products: Product[] | null;
};

const productsData = reactive<ProductsData>({
  categories: null,
  products: null,
});

const selectedCategory = ref(1);

const fetchCategories = async () => {
  const response = await fetch("data.json");
  const json = await response.json();
  productsData.categories = json?.categories ?? null;
};

const fetchProducts = async (category_id: number) => {
  const response = await fetch("data.json");
  const json = await response.json();
  const filteredArray =
    json?.products?.filter(
      (product: Product) => product.category_id === category_id
    ) ?? null;
  productsData.products = filteredArray;
};

const updateSelectedCategory = (categoryId: number) => {
  selectedCategory.value = categoryId;
  fetchProducts(categoryId);
};

onMounted(() => {
  fetchCategories();
  fetchProducts(selectedCategory.value);
});
</script>

<style></style>
