import Link from "next/link";
import { usePathname } from "next/navigation";
import { PropsWithChildren } from "react";

interface IActiveLinkProps {
  activeLinkClass?: string;
  href: string;
}

export const ActiveLink = ({
  children,
  activeLinkClass,
  ...props
}: PropsWithChildren<IActiveLinkProps>) => {
  const pathname = usePathname();

  // @ts-ignore
  let className = props.className || "";

  if (pathname === props.href) {
    className = `${className} ${
      activeLinkClass ? activeLinkClass : "text-indigo-600"
    } mx-4`;
  }

  return (
    <Link {...props} className={className}>
     {children}
    </Link>
  );
};
