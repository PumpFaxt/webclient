import { Outlet } from "react-router-dom";
import Navbar from "../common/Navbar";
import Footer from "../common/Footer";
import Modal from "../common/Modal";
import Toasts from "../common/Toasts";
import { useEffect } from "react";
import useModal from "../hooks/useModal";
import Introduction from "../common/Introduction";

export default function Default() {
  const modal = useModal();

  useEffect(() => {
    modal.hide();
    const nextIntro = localStorage.getItem("pumpfaxt-intro");
    if (
      !nextIntro ||
      (nextIntro && Number(nextIntro) && Number(nextIntro) < Date.now())
    ) {
      modal.show(<Introduction />);
    }
  }, []);

  return (
    <main className="relative">
      <Modal />

      <Toasts />

      {/* <Navbar /> */}
      <Outlet />
      <Footer />
    </main>
  );
}
