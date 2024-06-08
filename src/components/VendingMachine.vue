<template>
  <div
    class="place-self-center min-w-full sm:min-w-[36rem] max-w-sm sm:max-w-xl md:min-w-[42rem] md:max-w-2xl mx-2 rounded-xl border shadow overflow-hidden flex flex-col"
  >
    <header class="px-2 md:px-4 py-5 vm-header h-14 bg-blue-500 text-white">
      <h1 class="text-xl font-bold">Vending Machine</h1>
    </header>

    <main class="border border-black/20">
      <div class="grid grid-cols-1 sm:grid-cols-4">
        <!-- categories nav -->
        <nav
          class="min-h-fit sm:min-h-[500px] max-h-[500px] w-full px-3 py-2 overflow-auto bg-white border border-r-black/20 col-span-1"
        >
          <ul
            class="flex sm:flex-col gap-2 justify-start sm:justify-center items-center"
          >
            <li
              v-for="category in productsData.categories"
              :key="category.id"
              class="sm:w-full w-fit"
            >
              <button
                @click="
                  fetchProducts(category.id);
                  selectedCategory = category.id;
                "
                :class="[
                  'text-center border rounded-xl py-1 px-2 sm:p-3 w-fit sm:w-full h-fit hover:bg-gray-100 text-black flex flex-col items-center',
                  selectedCategory == category.id
                    ? 'bg-gray-100  border-black/20'
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
        <!-- products container -->
        <div
          class="w-full min-h-[500px] max-h-[500px] col-span-3 overflow-auto bg-white px-3 pt-2 pb-4"
        >
          <ul class="grid grid-cols-2 sm:grid-cols-3 gap-3 max-h-full">
            <li v-for="product in productsData.products" :key="product.id">
              <article
                class="bg-white h-full p-2 rounded-xl shadow flex flex-col items-center"
              >
                <img class="w-full h-full" src="../assets/logo.svg" alt="" />
                <p class="font-bold">
                  {{ formatAsMoney(product.price) }}
                </p>
                <h2 class="text-sm">{{ product.name }}</h2>
              </article>
            </li>
          </ul>
        </div>
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

type ProductsData = {
  categories: Category[] | null;
  products: Product[] | null;
};

type Product = {
  id: number;
  name: string;
  price: number;
  description: string;
  stock: number;
  image_url: string;
  category_id: number;
};

type Category = {
  id: number;
  name: string;
  description: string;
  image_url: string;
};

const productsData = reactive<ProductsData>({
  categories: null,
  products: null,
});

// default category id
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

const formatAsMoney = (amount: number) => {
  return new Intl.NumberFormat("en-PH", {
    style: "currency",
    currency: "PHP",
  }).format(amount);
};

onMounted(() => {
  fetchCategories();
  fetchProducts(selectedCategory.value);
});
</script>

<style></style>
