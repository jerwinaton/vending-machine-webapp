<template>
  <div
    class="place-self-center min-w-full sm:min-w-[36rem] max-w-sm sm:max-w-xl md:min-w-[42rem] md:max-w-2xl mx-2 rounded-xl shadow overflow-hidden flex flex-col"
  >
    <header
      class="px-2 md:px-4 py-2 vm-header bg-primary text-white flex flex-col"
    >
      <h1 class="text-xl mb-1">Vending Machine</h1>
      <div class="flex items-center justify-between">
        <p class="text-2xl font-medium rounded-xl px-4 py-2 bg-black/10">
          {{ formatAsMoney(cartStore.totalPrice) }}
        </p>
        <button
          v-if="!isCheckout"
          @click="() => (openCartModal = true)"
          class="button w-fit flex items-center text-black bg-white hover:bg-gray-100"
        >
          <AkCart class="me-1" />Cart ({{ cartStore.totalItems }})
        </button>
      </div>
    </header>

    <main class="border">
      <div v-if="isCheckout">
        <Checkout @back="isCheckout = false" />
      </div>
      <div v-else class="grid grid-cols-1 sm:grid-cols-4">
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
      <button
        v-if="isCheckout"
        @click="() => (isCheckout = false)"
        class="button border-black flex items-center"
      >
        <CaPreviousFilled class="me-1 h-5 w-5" /> Back
      </button>
      <button
        v-else
        @click="handleCheckout"
        class="primary-button flex items-center ms-auto"
      >
        Checkout <CaNextFilled class="ms-1 h-5 w-5" />
      </button>
      <button
        v-if="isCheckout"
        @click="handlePay"
        class="primary-button flex items-center ms-auto"
      >
        Pay <AkMoney class="ms-1 h-5 w-5" />
      </button>
    </footer>
    <!-- add to cart modal -->
    <ModalAddToCart
      v-if="modalProduct"
      :product="modalProduct"
      @close="closeAddToCartModal"
      @add-to-cart="handleAddToCart"
    />
    <ModalCart v-if="openCartModal" @close="() => (openCartModal = false)" />
    <ModalShowChange
      :change="change"
      v-if="showChange"
      @close="() => (showChange = false)"
    />
  </div>
</template>

<script setup lang="ts">
import { onMounted, reactive, ref } from "vue";
import CategoriesNav from "@/components/VendingMachine/CategoriesNav.vue";
import ProductsContainer from "@/components/VendingMachine/ProductsContainer.vue";
import ModalAddToCart from "@/components/VendingMachine/ModalAddToCart.vue";
import ModalCart from "@/components/VendingMachine/ModalCart.vue";
import {
  AkCart,
  AkMoney,
  CaPreviousFilled,
  CaNextFilled,
} from "@kalimahapps/vue-icons";
import type { Category, Product } from "@/types/types";
import { useCartStore } from "@/stores/cart";
import formatAsMoney from "@/utils/formatAsMoney";
import Checkout from "@/components/VendingMachine/Checkout.vue";
import ModalShowChange from "./VendingMachine/ModalShowChange.vue";

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

type ProductsData = {
  categories: Category[] | null;
  products: Product[] | null;
};

const productsData = reactive<ProductsData>({
  categories: null,
  products: null,
});

const selectedCategory = ref(1);
const isCheckout = ref(false);
const showChange = ref(false);
const change = ref<Record<string, number>>();

const openCartModal = ref(false);
const modalProduct = ref<Product | null>(null);

const openModal = (product: Product) => {
  modalProduct.value = product;
};

const closeAddToCartModal = () => {
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

//cart functions
const handleAddToCart = (product: Product, quantity: number) => {
  cartStore.addToCart(product, quantity); // call addToCart action from the cart store
  // close the modal
  closeAddToCartModal();
};

//pay function
const handleCheckout = () => {
  if (cartStore.totalPrice === 0) return alert("Cart is empty");
  isCheckout.value = true;
  return;
};

//handle pay
const handlePay = () => {
  if (cartStore.totalPrice === 0) return alert("Cart is empty");

  const bill = cartStore.selectedBill;
  if (!bill) return alert("Select an amount");

  const total = cartStore.totalPrice;
  //check if bill is lower
  if (bill < total) return alert("Insufficient funds!");

  const owed = total;
  change.value = getChange(bill, owed);
  showChange.value = true;
};

onMounted(() => {
  fetchCategories();
  fetchProducts(selectedCategory.value);
});
</script>

<style></style>
