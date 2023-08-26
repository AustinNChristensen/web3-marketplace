"use client";
import { WalletBar } from "@/components/WalletBar";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { CourseList } from "@/components/CourseList";
import { Currency } from "@/components/Currency";
import { Hero } from "@/components/Hero";
import { OrderInfo } from "@/components/OrderInfo";
import { getAllCourses } from "@/content/courses/fetcher";
import { ICourse } from "@/types";
import { useEffect, useState } from "react";
import { useNetwork } from "@/hooks/useNetwork";
import { useWeb3 } from "@/providers/web3";
import { useAccount } from "@/hooks/useAccount";
import { CourseCard } from "@/components/CourseCard";

export default function Home() {
  const [coursesData, setCoursesData] = useState<ICourse[]>([]);
  const { web3 } = useWeb3();
  const { account } = useAccount(web3);
  const { network } = useNetwork(web3);

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
      <Breadcrumbs />
      <WalletBar address={account.data} network={network} />
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
