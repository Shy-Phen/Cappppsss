import { LogOut } from "lucide-react";
import { useAuthStore } from "../store/authStore";
import { useState } from "react";

const Navbar = () => {
  const { authUser } = useAuthStore();
  const [isOpen, setIsOpen] = useState(false);
  const toggleDropdown = () => {
    setIsOpen((prevState) => !prevState);
  };
  const { logout } = useAuthStore();

  if (!authUser) {
    return null;
  }
  return (
    <header className="fixed bg-base-300 h-16 w-full top-0 z-40 border-b border-black backdrop-blur-lg">
      <div className="container mx-auto px-4 h-16">
        <div className="flex items-center justify-between h-full">
          {/* Left Section (Home Link) */}
          <div className="flex items-center gap-8">
            <h1 className="text-lg font-bold text-primary">Evalllll</h1>
          </div>

          <div className="flex items-center gap-6">
            <button
              onClick={toggleDropdown}
              className="flex items-center gap-2 hover:opacity-80 absolute right-4 transition-all"
            >
              <div className="size-9 rounded-lg bg-primary/10 flex items-center justify-center">
                <LogOut className="size-5 text-primary" />
              </div>
              <h1 className="hidden sm:block text-lg font-bold text-primary">
                Logout
              </h1>
            </button>
          </div>
          {isOpen && (
            <ul className="bg-base-100 rounded-box mt-20 w-20 p-2 shadow right-5 hover:bg-slate-500">
              <li>
                <button onClick={logout}>Logout</button>
              </li>
            </ul>
          )}
        </div>
      </div>
    </header>
  );
};
export default Navbar;
