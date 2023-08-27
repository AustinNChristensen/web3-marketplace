"use client";
import {
  CoursePageCurriculum
} from "@/components/CoursesPage/CoursePageCuricculum";
import { CoursePageHero } from "@/components/CoursesPage/CoursePageHero";
import { CoursePageKeypoint } from "@/components/CoursesPage/CoursePageKeypoint";
import { ICourse } from "@/types";
import { getAllCourses } from "@content/courses/fetcher";
import { useEffect, useState } from "react";

const CourseDetail = ({
  params,
}: {
  params: { courseID: string };
  }) => {
  const [courseData, setCourseData] = useState<ICourse | null>(null);

  useEffect(() => {
    const getData = async () => {
      const data = await getCourseDetailData(params.courseID);
      setCourseData(data);
    };

    getData();
  }, [params.courseID]);
  
  if (courseData) {
    return (
      <>
        {courseData.title}
        <div className="py-4">
          <CoursePageHero
            title={courseData.title}
            description={courseData.description}
            image={courseData.coverImage}
          />
        </div>
        <CoursePageKeypoint points={courseData.wsl} />
        <CoursePageCurriculum locked={true} />
        {/* <OrderModal isOpen={false} /> */}
      </>
    );
  } else {
    return null;
  }
};

const getCourseDetailData = async (slug: string | null) => {
  const { data } = await getAllCourses();
  const course = data.filter((c) => c.slug === slug)[0];

  return course;
};

export default CourseDetail;
