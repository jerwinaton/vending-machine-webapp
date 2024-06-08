<template>
  <div class="modal-overlay">
    <div class="modal min-h-48 min-h-96 flex flex-col">
      <!-- Display change -->
      <div class="flex flex-col mt-4">
        <h2 class="text-lg font-medium mb-2">Change breakdown:</h2>
        <ul class="list-inside">
          <li v-for="(count, denomination) in change" :key="denomination">
            {{ count }} x {{ denomination }}
          </li>
        </ul>
      </div>
      <!-- Display total change -->
      <div class="mt-4">
        <p class="text-xl font-medium">
          Total Change: {{ formatAsMoney(totalChange) }}
        </p>
      </div>
      <div class="flex mt-auto gap-2 justify-center">
        <button
          class="button bg-white hover:bg-gray-100 shadow"
          @click="$emit('close')"
        >
          Cancel
        </button>
        <button class="primary-button shadow" @click="reloadPage">Ok</button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import formatAsMoney from "@/utils/formatAsMoney";
import { computed } from "vue";

const props = defineProps({
  change: {
    type: Object as () => Record<string, number>,
    required: true,
  },
});

const emit = defineEmits(["close"]);

const totalChange = computed(() => {
  return Object.entries(props.change).reduce((total, [denomination, count]) => {
    const amount = parseInt(denomination.replace("P", ""), 10);
    return total + amount * count;
  }, 0);
});
function reloadPage() {
  window.location.reload();
}
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
