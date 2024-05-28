import { Outlet } from "react-router-dom";
import Navbar from "../common/Navbar";
import Footer from "../common/Footer";
import Modal from "../common/Modal";
import Toasts from "../common/Toasts";

export default function Default() {
  return (
    <main className="relative">
      <Modal />
      <Toasts />

      <Navbar />
      <Outlet />
      <Footer />
    </main>
  );
}
