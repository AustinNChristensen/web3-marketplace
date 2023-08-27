"use client";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { CourseCard } from "@/components/CourseCard";
import { CourseList } from "@/components/CourseList";
import { Currency } from "@/components/Currency";
import { Hero } from "@/components/Hero";
import { OrderInfo } from "@/components/OrderInfo";
import { WalletBar } from "@/components/WalletBar";
import { getAllCourses } from "@/content/courses/fetcher";
import { ICourse } from "@/types";
import { useEffect, useState } from "react";

const Home = () => {
  const [coursesData, setCoursesData] = useState<ICourse[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const res = await getData();
      setCoursesData(res.data);
    };

    fetchData();
  }, []);

  return (
    <div className="fit">
      <Hero />
      <Breadcrumbs items={[]} />
      <WalletBar />
      <Currency />
      <OrderInfo />
      <CourseList courses={coursesData}>
        {(course) => <CourseCard key={course.id} course={course} />}
      </CourseList>
    </div>
  );
}

const getData = async () => {
  const res = await getAllCourses();
  return res;
};

export default Home;