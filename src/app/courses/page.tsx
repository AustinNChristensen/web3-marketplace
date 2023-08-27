"use client";

import { Button } from "@/components/Button";
import { CourseCard } from "@/components/CourseCard";
import { CourseList } from "@/components/CourseList";
import { CoursePageHeader } from "@/components/CoursesPage/CoursePageHeader";
import { OrderModal } from "@/components/OrderModal";
import { getAllCourses } from "@/content/courses/fetcher";
import { useEthPrice } from "@/hooks/useEthPrice";
import { useWalletInfo } from "@/hooks/useWalletInfo";
import { ICourse } from "@/types";
import { useState, useEffect } from "react";

const getCoursesData = async () => {
  const { data } = await getAllCourses();
  return data;
};

const Courses = () => {
  const [selectedCourse, setSelectedCourse] = useState<ICourse | null>(null);

  const { account, network, canPurchaseCourse } = useWalletInfo();
  const [courses, setCourses] = useState<ICourse[]>([]);
  const { eth } = useEthPrice();

  useEffect(() => {
    const getData = async () => {
      const data = await getCoursesData();
      setCourses(data);
    };

    getData();
  }, []);

   const purchaseCourse = (order: any) => {
    alert(JSON.stringify(order))
  }

  return (
    <>
      <div className="py-4">
       <CoursePageHeader />
      </div>
      <CourseList courses={courses}>
        {(course) => (
          <CourseCard
            key={course.id}
            course={course}
            disabled={!canPurchaseCourse}
            Footer={() => (
              <div className="mt-4">
                <Button
                  variant="lightPurple"
                  onClick={() => setSelectedCourse(course)}
                  disabled={!canPurchaseCourse}
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
          onSubmit={purchaseCourse}
        />
      )}
    </>
  );
}

export default Courses;