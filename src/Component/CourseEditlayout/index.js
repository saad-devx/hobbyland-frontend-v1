import React from "react";
import { useRouter } from "next/router";

function Index() {
  const router = useRouter();
  const navigateLink = [
    {
      title: "Intended learners",
      path: "/Course-Edit/Intended-learning",
    },
    {
      title: "Course structure",
      path: "/Course-Edit/CourseStructure",
    },
    {
      title: "Setup & test video",
      path: "/Course-Edit/SetupTestVideo",
    },
  ];
  const navigateLink2 = [
    {
      title: "Film & edit",
      path: "/Course-Edit/Film-edit",
    },
    {
      title: "Curriculum",
      path: "/Course-Edit/Curriculum",
    },
    {
      title: "Captions (optional)",
      path: "/Course-Edit/Captions",
    },
    {
      title: "Accessibility (optional)",
      path: "/Course-Edit/Accessibility",
    },
  ];
  const navigateLink3 = [
    {
      title: "Course landing page",
      path: "/Course-Edit/Landing-page",
    },
    {
      title: "Pricing",
      path: "/Course-Edit/Pricing",
    },
    {
      title: "Course messages",
      path: "/Course-Edit/Course-Massage",
    },
  ];

  return (
    <div className="User_profile_Container">
      <div className="SideBare">
        <div className="my-3">
          <div className="p-2">
            <div className="mb-5 fs-3 text-white">Plan your course</div>
            {navigateLink.map((e, i) => {
              return (
                <button
                  onClick={() => {
                    router.push(e.path);
                  }}
                  className="Button"
                >
                  {e.title}
                </button>
              );
            })}
            <div className="mb-1 mt-5 fs-5 text-white">Create your content</div>
            {navigateLink2.map((e, i) => {
              return (
                <button
                  onClick={() => {
                    router.push(e.path);
                  }}
                  className="Button"
                >
                  {e.title}
                </button>
              );
            })}
            <div className="mb-1 mt-5 fs-5 text-white">Publish your course</div>
            {navigateLink3.map((e, i) => {
              return (
                <button
                  onClick={() => {
                    router.push(e.path);
                  }}
                  className="Button"
                >
                  {e.title}
                </button>
              );
            })}
          </div>
        </div>
        <div className="mt-3">
          <div>
            <button
              onClick={() => {
                router.push("/Dashboard");
              }}
              className="btn_Green_Size_Full"
            >
              Submit for Review
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Index;
