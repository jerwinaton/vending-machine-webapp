<template>
  <div class="w-full min-h-[400px] sm:min-h-[500px] max-h-[500px] bg-white p-4">
    <h2 class="text-2xl font-bold">Checkout</h2>
    <p class="mb-2">Items total: {{ cartItems.length }}</p>
    <button
      class="text-blue-500 flex items-center h-10 underline"
      @click="() => (viewItems = !viewItems)"
    >
      View items
      <BsCaretRightFill :class="['ms-1', viewItems ? 'rotate-90' : '']" />
    </button>
    <ul v-show="viewItems" class="mb-4 max-h-80 overflow-auto">
      <li v-for="item in cartItems" :key="item.product.id" class="mb-1">
        <p class="">
          {{ item.product.name }} {{ formatAsMoney(item.product.price) }} ({{
            item.quantity
          }})
        </p>
        <p class="font-medium">
          {{ formatAsMoney(item.product.price * item.quantity) }}
        </p>
      </li>
    </ul>
    <p class="font-bold text-xl bg-yellow-500/10 mb-4">
      Total Price: {{ formatAsMoney(totalPrice) }}
    </p>
    <h3 class="mb-2">Select Amount to pay:</h3>
    <ul class="flex flex-wrap gap-2 max-w-sm">
      <li v-for="(bill, index) in bills" :key="index" class="">
        <button
          @click="
            () => {
              cartStore.selectedBill = bill;
            }
          "
          :class="[
            ' border border-blue-400 rounded-md  px-4 py-2 text-xl sm:text-3xl',
            cartStore.selectedBill == bill
              ? 'bg-primary hover:bg-primary/90 text-white'
              : 'bg-white hover:bg-blue-100',
          ]"
        >
          {{ bill }}
        </button>
      </li>
    </ul>
  </div>
</template>
<script setup lang="ts">
import formatAsMoney from "@/utils/formatAsMoney";
import { useCartStore } from "@/stores/cart";
import { BsCaretRightFill } from "@kalimahapps/vue-icons";
import { computed, ref } from "vue";

const cartStore = useCartStore();
const viewItems = ref(false);

const cartItems = computed(() => cartStore.items);
const totalPrice = computed(() => cartStore.totalPrice);

const bills = [1000, 500, 200, 100, 50, 20];
</script>
