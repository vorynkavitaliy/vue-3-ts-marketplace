<template>
  <va-modal
    :model-value="value"
    stateful
    hide-default-actions
    @update:model-value="handleCloseModal"
  >
    <h3 class="va-h3">Registrate</h3>

    <va-form
      ref="registrationForm"
      immediate
      hide-error-messages
      class="sp-registration-form"
      @submit.prevent
      @keyup.enter="handleRegistrate"
    >
      <va-input
        v-model="form.email"
        label="Email"
        name="Email"
        type="email"
        :rules="[(v) => Boolean(v) || 'Email is required']"
      />
      <va-input v-model="form.name" label="Name" name="Name" />
      <va-input
        v-model="form.password"
        label="Password"
        type="password"
        name="Password"
        :rules="[
          (v) => Boolean(v) || 'Password is required',
          (v) => v.length > 6 || 'Password must be a least 6 symbols',
        ]"
      />
      <div>
        <va-button color="danger" class="mr-3" @click="handleCloseModal">
          Cancle
        </va-button>
        <va-button
          :disabled="!isValid || loading"
          :loading="loading"
          type="submit"
          @click="handleRegistrate"
        >
          Registrate
        </va-button>
      </div>
    </va-form>
  </va-modal>
</template>

<script setup lang="ts">
import { reactive } from "vue";
import { useForm } from "vuestic-ui";
import { IRegistration } from "../form.interfaces";

defineProps({
  value: {
    type: Boolean,
    default: false,
  },
  loading: {
    type: Boolean,
    default: false,
  },
});

const emits = defineEmits(["update:value", "submit"]);

const form = reactive<IRegistration>({
  email: "",
  name: "",
  password: "",
});

const { isValid } = useForm("registrationForm");

const handleCloseModal = (): void => emits("update:value", false);

const handleRegistrate = (): void => {
  emits("submit", form);
};
</script>

<style lang="scss" scoped>
.sp-registration-form {
  display: flex;
  flex-direction: column;
  row-gap: 20px;
}
</style>
