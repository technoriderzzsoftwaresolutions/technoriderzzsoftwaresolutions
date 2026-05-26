import { ReactNode } from "react";
import TopBar from "./TopBar";
import MainNav from "./MainNav";
import Footer from "./Footer";
import AnimatedBackground from "@/components/ui/AnimatedBackground";

interface LayoutProps {
  children: ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  return (
    <div className="min-h-screen flex flex-col relative">
      <AnimatedBackground />
      {/* <TopBar /> */}
      <MainNav />
      <main className="flex-1 relative z-10">
        {children}
      </main>
      <Footer />
    </div>
  );
};

export default Layout;