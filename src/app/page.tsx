'use client';
import { Address } from "@/components/Address";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { CourseList } from "@/components/CourseList";
import { Currency } from "@/components/Currency";
import { Hero } from "@/components/Hero";
import { OrderInfo } from "@/components/OrderInfo";
import { getAllCourses } from "@/content/courses/fetcher";
import { ICourse } from "@/types";
import { useEffect, useState } from "react";

export default function Home() {
  const [coursesData, setCoursesData] = useState<ICourse[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const res = await getData();
      setCoursesData(res.data);
    }

    fetchData();

  }, []);

  return (
    <div className="fit">
      <Hero />
      <Breadcrumbs />
      <Address />
      <Currency />
      <OrderInfo />
      <CourseList
        courses={coursesData}
      />
    </div>
  );
}

const getData = async () => {
  const res = await getAllCourses();
  return res;
}