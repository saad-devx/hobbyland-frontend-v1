import Image from "next/image";
import { Inter } from "next/font/google";
import { Footer, Header } from "@/Component";
import {
  CourseCreative,
  CourseMember,
  CourseTeam,
  Features,
  HeroSection,
} from "@/layout/Home";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <>
      <Header />
      <HeroSection />
      <CourseCreative />
      <CourseMember />
      <Features />
      <CourseTeam />
      <Footer />
    </>
  );
}
