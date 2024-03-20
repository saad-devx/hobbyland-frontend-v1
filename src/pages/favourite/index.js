import { Footer, Header } from "@/Component";
import { Card_Section, Student_Header } from "@/layout/Student_portal";
import React from "react";

function Index() {
  return (
    <div>
      <Header />
      <Student_Header />
      <Card_Section islike={true} />
      <Footer />
    </div>
  );
}

export default Index;
