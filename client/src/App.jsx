import { Routes, Route, Navigate, Outlet, useLocation } from "react-router-dom";
import { Toaster } from "sonner";
import { useSelector, useDispatch } from "react-redux";
import { setOpenSidebar } from './redux/slices/authSlice';
import Login from './pages/Login';
import Dashboard from "./pages/dashboard";
import Tasks from "./pages/Tasks";
import Users from "./pages/Users";
import Trash from "./pages/Trash";
import TaskDetails from "./pages/TaskDetails";
import Sidebar from "./components/Sidebar";
import Navbar from "./components/Navbar";
import { Transition } from "@headlessui/react";
import { Fragment, useRef } from "react";
import clsx from "clsx";
import { IoClose } from "react-icons/io5";

function Layout() {
  const { user } = useSelector(state => state.auth);
  const location = useLocation();

  if (!user) {
    return <Navigate to="/log-in" state={{ from: location }} replace />;
  }

  return (
    <div className="flex flex-col w-full h-screen md:flex-row">
      <div className="sticky top-0 hidden w-1/5 h-screen bg-white md:block">
        <Sidebar />
      </div>
      <div className="flex-1 overflow-y-auto">
        <Navbar />
        <div className="p-4 2xl:p-10">
          <Outlet />
        </div>
      </div>
    </div>
  );
}

const MobileSidebar = () => {
  const { isSidebarOpen } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const mobileMenuRef = useRef(null);

  const closeSidebar = () => {
    dispatch(setOpenSidebar(false));
  };

  return (
    <Transition
      show={isSidebarOpen}
      as={Fragment}
      enter="transition-opacity duration-700"
      enterFrom="opacity-0"
      enterTo="opacity-100"
      leave="transition-opacity duration-700"
      leaveFrom="opacity-100"
      leaveTo="opacity-0"
    >
      {(ref) => (
        <div
          ref={mobileMenuRef}
          className={clsx("md:hidden w-full h-full bg-black/40 transition-all duration-700 transform", 
          isSidebarOpen ? "translate-x-0" : "translate-x-full")}
          onClick={closeSidebar}
          role="dialog"
          aria-modal="true"
        >
          <div className="w-3/4 h-full bg-white">
            <div className="flex justify-end w-full px-5 mt-5">
              <button
                onClick={closeSidebar}
                className="flex items-end justify-end"
                aria-label="Close sidebar"
              >
                <IoClose size={25} />
              </button>
            </div>
            <div className="-mt-10">
              <Sidebar />
            </div>
          </div>
        </div>
      )}
    </Transition>
  );
}

function App() {
  return (
    <main className='w-full min-h-screen bg-[#f3f4f6]'>
      <Routes>
        <Route element={<Layout />}>
          <Route index path="/" element={<Navigate to="/dashboard" />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/tasks" element={<Tasks />} />
          <Route path="/completed/:status" element={<Tasks />} />
          <Route path="/in-progress/:status" element={<Tasks />} />
          <Route path="/todo/:status" element={<Tasks />} />
          <Route path="/team" element={<Users />} />
          <Route path="/trashed" element={<Trash />} />
          <Route path="/task/:id" element={<TaskDetails />} />
        </Route>
        <Route path="/log-in" element={<Login />} />
      </Routes>
      <Toaster richColors />
    </main>
  );
}

export default App;
