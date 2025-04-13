import React, { Suspense, Fragment } from "react";
import { Outlet, Link, useLocation } from "react-router-dom";
import { Disclosure, Transition } from "@headlessui/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import { useGetUserQuery, useLogoutMutation } from "../store";
import { useSelector } from "react-redux";
import type { RootState } from "../store";
import ChattrLogo from "./ChattrLogo";
import { mainNav } from "./Navigation";

function classNames(...classes: (string | boolean | undefined)[]) {
  return classes.filter(Boolean).join(" ");
}

const Layout: React.FC = () => {
  const location = useLocation();
  const key = useSelector((state: RootState) => state.auth.key);
  const { data: user } = useGetUserQuery(undefined, { skip: !key });
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
                    <ChattrLogo className="w-8 h-8" />
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
                    </div>
                  </div>
                </div>

                <div className="hidden md:block">
                  <div className="flex items-center ml-4 md:ml-6">
                    {user && (
                      <button
                        type="button"
                        onClick={handleLogout}
                        className="inline-flex items-center px-4 py-2 text-sm font-medium text-white bg-red-600 border border-transparent rounded-md shadow-sm hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                      >
                        Logout
                      </button>
                    )}
                  </div>
                </div>

                <div className="flex -mr-2 md:hidden">
                  <Disclosure.Button className="inline-flex items-center justify-center p-2 text-gray-400 bg-gray-800 rounded-md hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                    <span className="sr-only">Open main menu</span>
                    {open ? (
                      <XMarkIcon className="block w-6 h-6" aria-hidden="true" />
                    ) : (
                      <Bars3Icon className="block w-6 h-6" aria-hidden="true" />
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
