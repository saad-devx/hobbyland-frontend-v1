import { Button, Select } from "antd";
import React from "react";

function CourseMember() {
  const RatingCard = [
    {
      RatingHeading: "25K+",
      RatingText: "CLASSES",
    },
    {
      RatingHeading: "600K+",
      RatingText: "MEMBERS",
    },
    {
      RatingHeading: "8K+",
      RatingText: "TEACHERS",
    },
    {
      RatingHeading: "4.8+",
      RatingText: "APP STORE RATING",
    },
  ];
  const courseCategriosCard = [
    {
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSrRP8JreEX62fA6rZI-j2yNx20hiRaFVw0kA&usqp=CAU",
    },
    {
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRLh_eBQyK-p4wH9I3IMaZSmxcCeBMFR6i7oQ&usqp=CAU",
    },
    {
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR8rqlUUsglmiFwk3S7HDZilYpmkGv93NETEw&usqp=CAU",
    },
    {
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSrRP8JreEX62fA6rZI-j2yNx20hiRaFVw0kA&usqp=CAU",
    },
    {
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRLh_eBQyK-p4wH9I3IMaZSmxcCeBMFR6i7oQ&usqp=CAU",
    },
    {
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR8rqlUUsglmiFwk3S7HDZilYpmkGv93NETEw&usqp=CAU",
    },
    {
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRLh_eBQyK-p4wH9I3IMaZSmxcCeBMFR6i7oQ&usqp=CAU",
    },
    {
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRLh_eBQyK-p4wH9I3IMaZSmxcCeBMFR6i7oQ&usqp=CAU",
    },
  ];
  const CourseTeacher = [
    {
      title: "Marques Brownlee",
      categrios: "Youtuber, Podcaster",
      image:
        "https://static-web-prod.skillshare.com/_next/static/images/marques_brownlee-1ebf4aeda0fcd1c55705f31c211af239.webp",
    },
    {
      title: "Aaron Draplin",
      categrios: "Graphic Designer",
      image:
        "https://static-web-prod.skillshare.com/_next/static/images/alicia_souza-ccd1faba0454771e94bbb7dbd1debbb2.webp",
    },
    {
      title: "Alicia Souza",
      categrios: "Illustrator, eCommerce Expert",
      image:
        "https://static-web-prod.skillshare.com/_next/static/images/aaron_draplin-749a8d269942ed419ee69d47553f7840.webp",
    },
    {
      title: "Amelie Satzger",
      categrios: "Photographer",
      image:
        "https://static-web-prod.skillshare.com/_next/static/images/amelie_satzger-b3f40d799d7efc36cdbf8f06c8acb7b4.webp",
    },
  ];
  return (
    <div className="Course_Member_Container">
      <div className="container margin_top">
        <div className="row px-3">
          {RatingCard.map((e, i) => {
            return (
              <div key={i} className="col-md-3 mt-3">
                <div className="RatingCard">
                  <div>
                    <div className="Rating_cardHeading">{e.RatingHeading}</div>
                    <div className="Rating_p">{e.RatingText}</div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
      <div className="Course__Categrios_Heading mb-3">
        Explore Inspiring Online Courses
      </div>
      <div className="container">
        <div className="row">
          {courseCategriosCard.map((e, i) => {
            return (
              <div className="col-md-3 mt-3">
                <div className="Categrios_Card">
                  <img className="Image_Categrios_card" src={e.image} />
                  <div className="p-2">
                    <div className="Course_Student">
                      <div className="Quantity_Student">84,618 students</div>
                      <div className="Quantity_Student">1h 13m</div>
                    </div>
                    <div className="Card_dsc">
                      YouTube Success: Script, Shoot & Edit with MKBHD
                    </div>
                    <div className="Card_location">Marques Brownlee</div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
      <div className="Course_Teacher">Learn from Creative Experts</div>
      <div className="course_Content">
        Skillshare classes are taught by industry leaders excited to share their
        tools, techniques, and professional journeys with you.
      </div>
      <div className="container">
        <div className="row">
          {CourseTeacher.map((e, i) => {
            return (
              <div className="col-md-3 text-center mt-3">
                <div className="my-2">
                  <img src={e.image} className="Round_Image" />
                </div>
                <div className="Card_Heading_Teacher">{e.title}</div>
                <div className="Card_Heading_Categrios">{e.categrios}</div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default CourseMember;
