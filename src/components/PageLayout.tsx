import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SiteChatbot from "@/components/SiteChatbot";
import AdvertisePopup from "@/components/AdvertisePopup";
import { ReactNode } from "react";

const PageLayout = ({ children }: { children: ReactNode }) => (
  <div className="min-h-screen flex flex-col">
    <Header />
    <main className="flex-1">{children}</main>
    <Footer />
    <SiteChatbot />
    <AdvertisePopup />
  </div>
);

export default PageLayout;

