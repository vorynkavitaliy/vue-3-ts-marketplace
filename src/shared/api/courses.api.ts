import http from "@/core/http.client";
import coursesMockData from "@/shared/mock/courses.mock.data.json";

export interface ICourse {
  id: string;
  title: string;
  description: string;
  price: number;
  poster: string;
  duration: number;
  level: string;
  pictures: string[];
  languages: string[];
  rate: number;
}

export enum Order {
  Desc = "desc",
  Asc = "asc",
}

export interface IListParams {
  offset: number;
  start: number;
  filters?: {
    language?: string[];
    level?: string[];
  } | null;
  sort?: { type: keyof ICourse; order: Order } | null;
}

const fetchCoursesList = (params: IListParams) =>
  http.get((): ICourse[] => {
    const { offset, start, filters, sort } = params;
    let courses: ICourse[] = [...coursesMockData];

    if (filters) {
      courses = courses.filter((course) => {
        let isLanguageMatch = true;
        let isLevelMatch = true;

        if (filters?.language?.length) {
          isLanguageMatch = course.languages.some(
            (language) => filters.language?.includes(language)
          );
        }

        if (filters.level?.length) {
          isLevelMatch = filters.level.includes(course.level);
        }

        return isLanguageMatch && isLevelMatch;
      });
    }

    if (sort) {
      courses = courses.sort((a, b) => {
        if (a[sort.type] < b[sort.type]) {
          return sort.order === "asc" ? -1 : 1;
        }
        if (a[sort.type] > b[sort.type]) {
          return sort.order === "asc" ? 1 : -1;
        }
        return 0;
      });
    }

    courses = courses.slice(start, offset);

    return courses;
  });

const fetchCourseById = (id: string) =>
  http.get((): ICourse | null => {
    return coursesMockData.find((c) => c.id === id) || null;
  });

export default {
  fetchCoursesList,
  fetchCourseById,
};
