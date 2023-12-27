<template>
  <div v-if="course" class="row no-wrap">
    <div>
      <img :alt="course.title" :src="course.poster" />
    </div>

    <div class="pl-5">
      <h1 class="va-h2">{{ course.title }}</h1>

      <p>{{ course.description }}</p>
      <form v-if="isAuth" @submit.prevent @keyup.enter="handlePostCommnet" class="mt-5">
        <va-textarea
          v-model="commnet"
          max-length="125"
          label="Short text about yout mind"
          counter
          required-mark
          :rules="[
            (v) => (v && v.length > 0) || 'Required',
            (v) => v && v.length < 125,
          ]"
        />
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted, ref } from "vue";
import { useRoute } from "vue-router";
import useAuthStore from "@/stores/useAuthStore";

import CoursesApi, { ICourse } from "@/shared/api/courses.api";

const authStore = useAuthStore();
const route = useRoute();

const isAuth = computed((): boolean => {
  return authStore.isAuth;
});

const commnet = ref<string>("");

const course = ref<ICourse | null>(null);

const fetchCourseById = async (id: string) => {
  try {
    const response = await CoursesApi.fetchCourseById(id);

    console.log(response);

    course.value = response;
  } catch (error) {
    console.log(error);
  }
};

const handlePostCommnet = () => {
  alert(commnet.value);
};

onMounted(async () => {
  const id: string =
    route.params.id && typeof route.params.id === "string"
      ? route.params.id
      : "";

  await fetchCourseById(id);
});
</script>

<style></style>
