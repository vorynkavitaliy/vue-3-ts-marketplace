<template>
  <div>
    <courses-carousel-component
      v-for="(course, key) in courses"
      :key="key"
      :items="course.items"
      :title="key"
      :path="course.path"
      class="mb-4"
    />
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, reactive } from "vue";

import CoursesApi, {
  ICourse,
  IListParams,
  Order,
} from "@/shared/api/courses.api";

import { IPath } from "@/shared/interfaces/IPath";
import CoursesCarouselComponent from "./components/courses-carousel.component.vue";

const loading = ref<boolean>(false);

const params: IListParams = reactive<IListParams>({
  start: 0,
  offset: 5,
  filters: null,
  sort: null,
});

const courses = reactive({
  "Popular JS Courses": {
    items: [] as ICourse[],
    filters: {
      language: ["JS", "React", "Angular"],
    },
    sort: {
      type: "rate",
      order: "desc",
    },
    path: {
      name: "courses",
      query: {
        language: "JS,React,Angular",
        sort: "rate,desc",
      },
    } as IPath,
  },

  "Popular C Courses": {
    items: [] as ICourse[],
    filters: {
      language: ["C", "C#", "C+", "C++"],
    },
    sort: {
      type: "rate",
      order: "desc",
    },
    path: {
      name: "courses",
      query: {
        language: "C, C#, C+, C++",
        sort: "rate,desc",
      },
    } as IPath,
  },

  "Popular Entry Level Courses": {
    items: [] as ICourse[],
    filters: {
      level: ["entry"],
    },
    sort: {
      type: "rate",
      order: "desc",
    },
    path: {
      name: "courses",
      query: {
        level: "entry",
        sort: "rate,desc",
      },
    } as IPath,
  },
});

const fetchCoursesList = async (key: keyof typeof courses): Promise<void> => {
  loading.value = true;
  try {
    const response = await CoursesApi.fetchCoursesList({
      ...params,
      filters: courses[key].filters,
      sort: courses[key].sort as { type: keyof ICourse; order: Order },
    });

    courses[key].items = response;
  } catch (error) {
    console.log(error);
  } finally {
    loading.value = false;
  }
};

onMounted(async () => {
  for (const key in courses) {
    fetchCoursesList(key);
  }
});
</script>

<style></style>
