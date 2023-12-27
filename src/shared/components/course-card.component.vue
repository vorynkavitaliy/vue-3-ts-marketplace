<template>
  <va-card>
    <img :src="item.poster" :alt="item.title" class="sp-carousel-poster" />
    <va-card-title class="sp-cart-title" :title="item.title">
      {{ item.title }}
    </va-card-title>
    <va-card-content :title="item.description" class="sp-card-description">
      {{ item.description }}
    </va-card-content>

    <va-card-content class="row">
      <div>
        <div class="row align-center">
          <va-icon
            name="schedule"
            color="rgba(0, 0, 0, 0.5)"
            size="large"
            class="mr-2"
          />
          <span>{{ item.duration }}</span>
        </div>

        <div class="row align-center mt-2">
          Level: &nbsp;
          <span class="va-text-bold">{{ item.level }}</span>
        </div>
      </div>

      <div class="ml-auto">
        <div>
          Langauges:
          <span class="va-text-bold">{{ item.languages.join(", ") }}</span>
        </div>

        <div class="row align-center mt-2">
          Rate:

          <va-rating v-model="item.rate" class="ml-2" />
        </div>
      </div>

      <va-button
        block
        class="mt-5"
        :to="{ name: 'course', params: { id: item.id } }"
      >
        More information
      </va-button>
    </va-card-content>
  </va-card>
</template>

<script setup lang="ts">
import { ICourse } from "../api/courses.api";

defineProps({
  item: {
    type: Object,
    default: (): ICourse | null => null,
    required: true,
  },
});
</script>

<style lang="scss" scoped>
.sp-card-description {
  display: block;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}
.sp-cart-title {
  font-size: 1.25rem;
  margin: 0.5rem 0;
  font-weight: 700;
  line-height: 1.5rem;
  @extend .sp-card-description;
}
</style>
