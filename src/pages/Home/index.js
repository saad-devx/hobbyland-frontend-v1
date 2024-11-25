import { Footer, Header } from "@/Component";
import {
  CourseCreative,
  CourseMember,
  CourseTeam,
  Features,
  HeroSection,
} from "@/layout/Home";

export default function Home() {
  return <>
    <Header />
    <HeroSection />
    <CourseCreative />
    <CourseMember />
    <Features />
    <CourseTeam />
    <Footer />
  </>
}
