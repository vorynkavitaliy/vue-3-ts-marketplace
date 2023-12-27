import { useRouter, useRoute } from "vue-router";

export default function () {
  const router = useRouter();
  const route = useRoute();

  const setQUery = (name: string, query: any) => router.push({ name, query });
  const getQuery = (name: string) => route.query[name];
  const replaceQuery = (query: any) => router.replace({ query });

  return { setQUery, getQuery, replaceQuery };
}
