'use client';

import { Button } from "@/components/Button";
import { CoursePageHeader } from "@/components/CoursesPage/CoursePageHeader";
import { Message } from "@/components/Message";
import { OwnedCourseCard } from "@/components/OwnedCourseCard";

const OwnedCourses = () => {
  return (
    <>
      <div className="py-4">
        <CoursePageHeader />
      </div>
      <section className="grid grid-cols-1">
        <OwnedCourseCard>
          <Message>My custom message!</Message>
          <Button>Watch the course</Button>
        </OwnedCourseCard>{" "}
      </section>
    </>
  );
}

export default OwnedCourses;