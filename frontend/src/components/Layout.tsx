import React, { Suspense } from "react";
import { Outlet, Link, useLocation } from "react-router-dom";
import { Disclosure } from "@headlessui/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import { useLogoutMutation } from "../store";
import { useGetCurrentUserQuery } from "../store/apis/authApi";
import ResearchChatLogo from "./ChattrLogo";
import { mainNav } from "./Navigation";
import PathConstants from "../routes/PathConstants";

function classNames(...classes: (string | boolean | undefined)[]) {
  return classes.filter(Boolean).join(" ");
}

const Layout: React.FC = () => {
  const location = useLocation();
  const { data: user, isLoading } = useGetCurrentUserQuery();
  const [logout] = useLogoutMutation();

  const handleLogout = () => logout();
  const isCurrent = (href: string) => location.pathname.startsWith(href);

  return (
    <div className="min-h-full">
      <Disclosure as="nav" className="bg-gray-800">
        {({ open }) => (
          <>
            <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
              <div className="flex items-center justify-between h-16">
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    <ResearchChatLogo className="w-8 h-8" />
                  </div>
                  <div className="hidden md:block">
                    <div className="flex items-baseline ml-10 space-x-4">
                      {mainNav.map((item) => (
                        <Link
                          key={item.name}
                          to={item.href}
                          className={classNames(
                            isCurrent(item.href)
                              ? "bg-gray-900 text-white"
                              : "text-gray-300 hover:bg-gray-700 hover:text-white",
                            "rounded-md px-3 py-2 text-sm font-medium"
                          )}
                          aria-current={isCurrent(item.href) ? "page" : undefined}
                        >
                          {item.name}
                        </Link>
                      ))}

                      {/* Admin Dashboard visible only for staff */}
                      {!isLoading && user?.is_staff && (
                        <Link
                          to={PathConstants.ADMIN_DASHBOARD}
                          className={classNames(
                            isCurrent(PathConstants.ADMIN_DASHBOARD)
                              ? "bg-gray-900 text-white"
                              : "text-gray-300 hover:bg-gray-700 hover:text-white",
                            "rounded-md px-3 py-2 text-sm font-medium"
                          )}
                        >
                          Admin
                        </Link>
                      )}
                    </div>
                  </div>
                </div>
                <div className="hidden md:flex items-center space-x-4">
                  {!isLoading && user ? (
                    <>
                      <span className="text-white text-sm">Hello, {user.username}</span>
                      <Link to={PathConstants.PROFILE} className="text-white hover:underline">
                        Profile
                      </Link>
                      <button
                        onClick={handleLogout}
                        className="px-4 py-2 text-sm font-medium text-white bg-red-600 rounded hover:bg-red-700"
                      >
                        Logout
                      </button>
                    </>
                  ) : (
                    <>
                     <Link
                       to={PathConstants.LOGIN}
                       className="text-sm text-white hover:underline"
                     >
                       Log In
                     </Link>
                     <Link
                       to={PathConstants.REGISTER}
                       className="text-sm text-blue-300 hover:underline"
                     >
                       Register
                     </Link>
                  </>
                )}
              </div>

                <div className="flex md:hidden">
                  <Disclosure.Button className="inline-flex items-center justify-center p-2 text-gray-400 bg-gray-800 rounded-md hover:bg-gray-700 hover:text-white">
                    <span className="sr-only">Open main menu</span>
                    {open ? (
                      <XMarkIcon className="block w-6 h-6" />
                    ) : (
                      <Bars3Icon className="block w-6 h-6" />
                    )}
                  </Disclosure.Button>
                </div>
              </div>
            </div>

            <Disclosure.Panel className="md:hidden">
              <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
                {mainNav.map((item) => (
                  <Disclosure.Button
                    key={item.name}
                    as={Link}
                    to={item.href}
                    className={classNames(
                      isCurrent(item.href)
                        ? "bg-gray-900 text-white"
                        : "text-gray-300 hover:bg-gray-700 hover:text-white",
                      "block rounded-md px-3 py-2 text-base font-medium"
                    )}
                    aria-current={isCurrent(item.href) ? "page" : undefined}
                  >
                    {item.name}
                  </Disclosure.Button>
                ))}

                {!isLoading && user?.is_staff && (
                  <Disclosure.Button
                    as={Link}
                    to={PathConstants.ADMIN_DASHBOARD}
                    className={classNames(
                      isCurrent(PathConstants.ADMIN_DASHBOARD)
                        ? "bg-gray-900 text-white"
                        : "text-gray-300 hover:bg-gray-700 hover:text-white",
                      "block rounded-md px-3 py-2 text-base font-medium"
                    )}
                  >
                    Admin
                  </Disclosure.Button>
                )}
              </div>
            </Disclosure.Panel>
          </>
        )}
      </Disclosure>

      <main>
        <div className="py-6 mx-auto max-w-7xl sm:px-6 lg:px-8">
          <Suspense fallback={<div>Loading...</div>}>
            <Outlet />
          </Suspense>
        </div>
      </main>
    </div>
  );
};

export default Layout;

