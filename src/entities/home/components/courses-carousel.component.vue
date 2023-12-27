<template>
  <div>
    <div class="row justify-space-between align-center mb-3">
      <h3 class="va-h3">{{ title }}</h3>

      <router-link :to="path">View all</router-link>
    </div>

    <swiper :slides-per-view="3" :space-between="50">
      <swiper-slide v-for="item of items" :key="item.id">
        <course-card-component :item="item" />
      </swiper-slide>
    </swiper>
  </div>
</template>

<script setup lang="ts">
import { Swiper, SwiperSlide } from "swiper/vue";
import { ICourse } from "@/shared/api/courses.api";
import { IPath } from "@/shared/interfaces/IPath";
import CourseCardComponent from "@/shared/components/course-card.component.vue";

import "swiper/css";

defineProps({
  title: {
    type: String,
    default: "",
  },
  items: {
    type: Array,
    default: (): ICourse[] | null => null,
    required: true,
  },

  path: {
    type: Object,
    default: (): IPath => ({ name: "" }),
    required: true,
  },
});
</script>
