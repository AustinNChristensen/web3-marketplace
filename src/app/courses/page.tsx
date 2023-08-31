"use client";

import { Button } from "@/components/Button";
import { CourseCard } from "@/components/CourseCard";
import { CourseList } from "@/components/CourseList";
import { CoursePageHeader } from "@/components/CoursesPage/CoursePageHeader";
import { OrderModal } from "@/components/OrderModal";
import { getAllCourses } from "@/content/courses/fetcher";
import { useWalletInfo } from "@/hooks/useWalletInfo";
import { useWeb3 } from "@/providers/web3";
import { ICourse } from "@/types";
import { convertValueToHex } from "@/utils/web3";
import { useEffect, useState } from "react";

interface ISubmittedOrder {
  email: string;
  price: number;
  confirmationEmail: string;
}

const getCoursesData = async () => {
  const { data } = await getAllCourses();
  return data;
};

const Courses = () => {
  const { web3, contract } = useWeb3();
  const [selectedCourse, setSelectedCourse] = useState<ICourse | null>(null);

  const { account, canPurchaseCourse } = useWalletInfo();
  const [courses, setCourses] = useState<ICourse[]>([]);

  useEffect(() => {
    const getData = async () => {
      const data = await getCoursesData();
      setCourses(data);
    };

    getData();
  }, []);

  const purchaseCourse = async (order: ISubmittedOrder) => {
    console.log("contract", contract);
    if (selectedCourse && contract) {
      const hexCourseId = convertValueToHex(selectedCourse.id, web3);

      const orderHash = web3.utils.soliditySha3(
        { type: "bytes16", value: hexCourseId },
        { type: "address", value: account.data }
      );

      const emailHash = web3.utils.sha3(order.email);

      const proof = web3.utils.soliditySha3(emailHash, orderHash);

      const value = web3.utils.toWei(String(order.price), "ether");

      console.log("hexCourseId", hexCourseId);
      console.log('proof', proof);
      console.log('value', value);
      console.log('account.data', account.data);

      try {
        const result = await contract.methods
          .purchaseCourse(hexCourseId, proof)
          .send({ from: account.data, value });
        console.log(result);
      } catch {
        console.error("Purchase course: Operation has failed.");
      }
    }
  };
  

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
};

export default Courses;
