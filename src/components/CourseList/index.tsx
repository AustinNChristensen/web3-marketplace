import { ICourse } from "@/types";

interface ICourseListProps {
  courses: ICourse[];
  children: (course: ICourse) => JSX.Element;
}

export const CourseList = ({ courses, children }: ICourseListProps) => {
  return (
    <section className="grid md:grid-cols-1 lg:grid-cols-2 gap-4 mb-5">
      {courses.map((course) => children(course))}
    </section>
  );
};
