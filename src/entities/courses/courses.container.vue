<template>
  <div>
    <div class="mb-4">
      <va-select
        :model-value="params.filters?.language"
        :options="languagesFilters"
        :max-visible-options="2"
        label="Language Filters"
        multiple
        @update:model-value="handleSetLanguageFilter"
        class="mr-3"
      />

      <va-select
        :model-value="params.filters?.level"
        :options="levelFilters"
        :max-visible-options="2"
        label="Level Filters"
        multiple
        @update:model-value="handleSetLevelFilter"
        class="mr-3"
      />

      <va-select
        :model-value="selectedSorted"
        :options="sorted"
        label="Sort courses"
        @update:model-value="handleSortCoursesList"
      />
    </div>
    <div class="sp-courses-list">
      <course-card-component
        v-for="course of courses"
        :key="course.id"
        :item="course"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, reactive } from "vue";
import { useRoute } from "vue-router";
import CoursesApi, {
  ICourse,
  IListParams,
  Order,
} from "@/shared/api/courses.api";
import useQuery from "@/shared/hooks/useQuery.hook";
import CourseCardComponent from "@/shared/components/course-card.component.vue";

const route = useRoute();
const queries = useQuery();

const loading = ref<boolean>(false);
const courses = ref<ICourse[]>([]);

const languagesFilters = ref<String[]>([
  "Vue",
  "React",
  "C",
  "C#",
  "Java",
  "C++",
  "Angular",
]);

const levelFilters = ref<String[]>(["entry", "medium", "high"]);

const sorted = ref<string[]>([
  "From popular",
  "From not popular",
  "From longer",
  "From shorter",
]);
const selectedSorted = ref<string>("From popular");

const sort = ref([
  {
    type: "rate",
    title: "From popular",
    order: "desc",
  },

  {
    type: "rate",
    title: "From not popular",
    order: "asc",
  },

  {
    type: "duration",
    title: "From longer",
    order: "desc",
  },
  {
    type: "duration",
    title: "From shorter",
    order: "asc",
  },
]);

const params: IListParams = reactive<IListParams>({
  start: 0,
  offset: 20,
  filters: {
    language: [],
    level: [],
  },
  sort: {
    type: "rate",
    order: "desc" as Order,
  },
});

const fetchCoursesList = async (): Promise<void> => {
  loading.value = true;
  try {
    const response = await CoursesApi.fetchCoursesList(params);

    courses.value = [...courses.value, ...response];
  } catch (error) {
    console.log(error);
  } finally {
    loading.value = false;
  }
};

const handleSortCoursesList = async (sortParams: string): Promise<void> => {
  courses.value = [];

  selectedSorted.value = sortParams;

  const selected = sort.value.find((s) => s.title === sortParams);

  params.sort = {
    type: selected?.type || "rate",
    order: selected?.order || "desc",
  };

  queries.replaceQuery({
    ...route.query,
    sort: `${params.sort?.type},${params.sort?.order}`,
  });

  await fetchCoursesList();
};

const handleSetLanguageFilter = async (options: string[]): Promise<void> => {
  courses.value = [];

  if (params.filters) {
    params.filters.language = options;
  }

  queries.replaceQuery({ ...route.query, language: options.join(",") });

  await fetchCoursesList();
};

const handleSetLevelFilter = async (options: string[]): Promise<void> => {
  courses.value = [];

  if (params.filters) {
    params.filters.level = options.map((option) => option.toLowerCase());
  }

  queries.replaceQuery({ ...route.query, level: options.join(",") });

  await fetchCoursesList();
};

onMounted(async () => {
  if (route.query) {
    if (route.query.language && params.filters) {
      params.filters.language =
        route.query.language && typeof route.query.language === "string"
          ? route.query.language.split(",")
          : [];
    }

    if (route.query.level && params.filters) {
      params.filters.level =
        route.query.level && typeof route.query.level === "string"
          ? route.query.level.split(",")
          : [];
    }

    if (route.query.sort) {
      const [type, order] =
        route.query.sort && typeof route.query.sort === "string"
          ? route.query.sort.split(",")
          : ["rate", "desc"];

      params.sort.type = type;
      params.sort.order = order === "desc" || order === "asc" ? order : "desc";

      const selected = sort.value.find(
        (s) => s.type === type && s.order === order
      );

      selectedSorted.value = selected?.title || "";
    }
  }

  await fetchCoursesList();
});
</script>

<style lang="scss" scoped>
.sp-courses-list {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));

  column-gap: 20px;
  row-gap: 20px;
}
</style>
