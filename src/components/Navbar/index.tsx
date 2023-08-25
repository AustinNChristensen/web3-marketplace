import Link from "next/link";

export const Navbar = () => {
  return (
    <section>
      <div className="relative pt-6 px-4 sm:px-6 lg:px-8">
        <nav className="relative" aria-label="Global">
          <div className="flex justify-between">
            <div>
              <Link
                href="/"
                className="font-medium mr-8 text-gray-500 hover:text-gray-900"
              >
                Home
              </Link>
              <Link
                href="/courses"
                className="font-medium mr-8 text-gray-500 hover:text-gray-900"
              >
                Courses
              </Link>
            </div>
            <div>
              <Link
                href="/"
                className="font-medium mr-8 text-gray-500 hover:text-gray-900"
              >
                Wishlist
              </Link>
              <a
                href="#"
                className="font-medium mr-8 text-indigo-600 hover:text-indigo-500"
              >
                Connect
              </a>
            </div>
          </div>
        </nav>
      </div>
    </section>
  );
};
