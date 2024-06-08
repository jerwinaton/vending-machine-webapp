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
        <ProductsContainer
          @productSelected="handleProductSelected"
          :products="productsData.products"
        />
      </div>
    </main>

    <footer
      class="px-2 md:px-5 py-10 h-14 bg-white bg-cover bg-center bg-no-repeat flex justify-between items-center"
    >
      <section>
        <button class="primary-button">Done</button>
      </section>
    </footer>
    <!-- add to cart modal -->
    <Modal
      v-if="modalProduct"
      :product="modalProduct"
      @close="closeModal"
      @add-to-cart="addToCart"
    />
  </div>
</template>

<script setup lang="ts">
import { onMounted, reactive, ref } from "vue";
import CategoriesNav from "@/components/VendingMachine/CategoriesNav.vue";
import ProductsContainer from "@/components/VendingMachine/ProductsContainer.vue";
import Modal from "@/components/VendingMachine/ModalAddToCart.vue";
import type { Category, Product } from "@/types/types";
import { useCartStore } from "@/stores/cart";

//MAIN FUNCTIONALITY
function getChange(bill: number, owed: number): Record<string, number> {
  const denominations = [1000, 500, 200, 100, 50, 20, 10, 5, 1];
  const change: Record<string, number> = {};

  let remaining = bill - owed;

  denominations.forEach((denomination) => {
    if (remaining >= denomination) {
      const count = Math.floor(remaining / denomination);
      change[`P${denomination}`] = count;
      remaining -= count * denomination;
    }
  });

  return change;
}

// Test cases
// console.log(getChange(0, 0));
// console.log(getChange(1000, 1));
// console.log(getChange(500, 600));
// console.log(getChange(100, 27));

const cartStore = useCartStore();

const addToCart = (product: Product, quantity: number) => {
  cartStore.addToCart(product, quantity); // call addToCart action from the cart store
  // close the modal
  closeModal();
};

const removeFromCart = (index: number) => {
  cartStore.removeFromCart(index); // call removeFromCart action from the cart store
};

const clearCart = () => {
  cartStore.clearCart(); // call clearCart action from the cart store
};
type ProductsData = {
  categories: Category[] | null;
  products: Product[] | null;
};

const productsData = reactive<ProductsData>({
  categories: null,
  products: null,
});

const selectedCategory = ref(1);
const modalProduct = ref<Product | null>(null);
const openModal = (product: Product) => {
  modalProduct.value = product;
};

const closeModal = () => {
  modalProduct.value = null;
};

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

const handleProductSelected = (product: Product) => {
  openModal(product);
};
onMounted(() => {
  fetchCategories();
  fetchProducts(selectedCategory.value);
});
</script>

<style></style>
