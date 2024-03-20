import { Footer, Header } from "@/Component";
import { Card_Section, Student_Header } from "@/layout/Student_portal";
import { useRouter } from "next/router";
import React from "react";

function Index() {
  const router = useRouter();
  const { title } = router.query;
  console.log(title);
  return (
    <div>
      <Header />
      <Student_Header />
      <Card_Section categrios={title} islike={false} />
      <Footer />
    </div>
  );
}

export default Index;
