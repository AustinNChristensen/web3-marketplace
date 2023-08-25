'use client';
import { CourseList } from "@/components/CourseList";
import { getAllCourses } from "@/content/courses/fetcher";
import { ICourse } from "@/types";
import { useEffect, useState } from "react";

const getCoursesData = async () => {
  const { data } = await getAllCourses();
  return data;
};

export default function Courses() {
  const [courses, setCourses] = useState<ICourse[]>([]);

  useEffect(() => {
    const getData = async () => {
      const data = await getCoursesData();
      setCourses(data);
    };

    getData();
  }, []);

  return (
    <div className="relative max-w-7xl mx-auto px-4 py-4">
      <CourseList courses={courses} />
    </div>
  );
}
