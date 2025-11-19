import { Outlet, NavLink } from "react-router-dom";
import { UserButton, SignOutButton } from "@clerk/clerk-react";
import { Button } from "./ui/button";
import { useState } from "react";
import { FiMenu, FiX } from "react-icons/fi";

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <div>
      <nav className="bg-black text-white p-4 flex justify-between items-center w-[100%]">
        <div className="text-xl uppercase">
          <strong className="bg-[#269fe8] px-2 py-1 mx-2">Employee</strong>
          Management
        </div>

        <div
          className="md:hidden text-3xl cursor-pointer"
          onClick={() => setOpen(!open)}
        >
          {open ? <FiX /> : <FiMenu />}
        </div>

        <div className="hidden md:flex gap-6 text-lg uppercase">
          <NavLink to="/" className="hover:text-gray-300">
            Home
          </NavLink>
          <NavLink to="/employee" className="hover:text-gray-300">
            Employee
          </NavLink>
        </div>

        <div className="hidden md:flex items-center gap-4">
          <UserButton />
          <Button
            variant="destructive"
            className=" bg-red-600 hover:bg-[#269fe8] "
          >
            <SignOutButton />
          </Button>
        </div>
      </nav>

      {open && (
        <div className="md:hidden bg-black text-white p-4 space-y-4 text-lg uppercase">
          <NavLink
            to="/"
            className="block hover:text-gray-300"
            onClick={() => setOpen(false)}
          >
            Home
          </NavLink>
          <NavLink
            to="/employee"
            className="block hover:text-gray-300"
            onClick={() => setOpen(false)}
          >
            Employee
          </NavLink>

          <div className="flex items-center gap-4 pt-4">
            <UserButton />
            <Button
              variant="destructive"
              className=" bg-red-600 hover:bg-[#269fe8] "
            >
              <SignOutButton />
            </Button>
          </div>
        </div>
      )}

      <main className="p-6 bg-white min-h-screen w-[100%] text-black  ">
        <Outlet />
      </main>
    </div>
  );
}
