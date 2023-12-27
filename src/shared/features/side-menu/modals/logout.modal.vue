<template>
  <va-modal
    :model-value="value"
    ok-text="Logout"
    stateful
    @update:model-value="handleCloseModal"
    @ok="handleLogout"
  >
    <h3 class="va-h3">Logout</h3>
    <p>
      Are you sure you want to log out from your account?
    </p>
  </va-modal>
</template>

<script setup lang="ts">
defineProps({
  value: {
    type: Boolean,
    default: false,
  },
});

const emits = defineEmits(["update:value", "submit"]);

const handleCloseModal = (): void => {
  emits("update:value", false);
};

const handleLogout = (): void => emits("submit");
</script>
