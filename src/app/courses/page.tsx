"use client";
import { Button } from "@/components/Button";
import { CourseCard } from "@/components/CourseCard";
import { CourseList } from "@/components/CourseList";
import { OrderModal } from "@/components/OrderModal";
import { WalletBar } from "@/components/WalletBar";
import { getAllCourses } from "@/content/courses/fetcher";
import { useAccount } from "@/hooks/useAccount";
import { useNetwork } from "@/hooks/useNetwork";
import { useWeb3 } from "@/providers/web3";
import { ICourse } from "@/types";
import { useEffect, useState } from "react";

const getCoursesData = async () => {
  const { data } = await getAllCourses();
  return data;
};

export default function Courses() {
  const [selectedCourse, setSelectedCourse] = useState<ICourse | null>(null);

  const { web3 } = useWeb3();
  const { account } = useAccount(web3);
  const { network } = useNetwork(web3);
  const [courses, setCourses] = useState<ICourse[]>([]);

  useEffect(() => {
    const getData = async () => {
      const data = await getCoursesData();
      setCourses(data);
    };

    getData();
  }, []);

  return (
    <>
      <div className="py-4">
        <WalletBar address={account.data} network={network} />
      </div>
      <CourseList courses={courses}>
        {(course) => (
          <CourseCard
            key={course.id}
            course={course}
            Footer={() => (
              <div className="mt-4">
                <Button
                  variant="lightPurple"
                  onClick={() => setSelectedCourse(course)}
                >
                  Purchase
                </Button>
              </div>
            )}
          />
        )}
      </CourseList>
      {selectedCourse && (
        <OrderModal
          course={selectedCourse}
          onClose={() => setSelectedCourse(null)}
        />
      )}
    </>
  );
}
