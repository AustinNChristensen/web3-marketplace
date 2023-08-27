import { Breadcrumbs } from "@/components/Breadcrumbs";
import { Currency } from "@/components/Currency";
import { WalletBar } from "@/components/WalletBar";

const LINKS = [
  {
    href: "/marketplace",
    value: "Buy",
  },
  {
    href: "/marketplace/courses/owned",
    value: "My Courses",
  },
  {
    href: "/marketplace/courses/manage",
    value: "Manage Courses",
  },
];

export const CoursePageHeader = () => {
  return null;
  return (
    <>
      <WalletBar />
      <Currency />
      <div className="flex flex-row-reverse py-4 px-4 sm:px-6 lg:px-8">
        <Breadcrumbs items={LINKS} />
      </div>
    </>
  );
};
