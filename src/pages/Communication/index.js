import AdminLayout from "@/layout/AdminLayount";
import React, { useState } from "react";

function Index() {
  const [qA, setQA] = useState(true);
  const [messages, setMessages] = useState(false);
  const [assignments, setAssignments] = useState(false);
  const [announcements, setAnnouncements] = useState(false);

  return (
    <div>
      <AdminLayout>
        <div className="w-100">
          <div className="Top_Bare">
            <div
              onClick={() => {
                setQA(true);
                setMessages(false);
                setAssignments(false);
                setAnnouncements(false);
              }}
              className={`${qA == true ? "active" : "title_"}`}
            >
              Q&A
            </div>
            <div
              onClick={() => {
                setQA(false);
                setMessages(true);
                setAssignments(false);
                setAnnouncements(false);
              }}
              className={`${messages == true ? "active" : "title_"}`}
            >
              Messages
            </div>
            <div
              onClick={() => {
                setQA(false);
                setMessages(false);
                setAssignments(true);
                setAnnouncements(false);
              }}
              className={`${assignments == true ? "active" : "title_"}`}
            >
              Assignments
            </div>
            <div
              onClick={() => {
                setQA(false);
                setMessages(false);
                setAssignments(false);
                setAnnouncements(true);
              }}
              className={`${announcements == true ? "active" : "title_"}`}
            >
              Announcements
            </div>
          </div>
          <div
            style={{
              width: "100%",
              height: "90%",
              background: "transparent",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            {qA === true ? (
              <div style={{ fontSize: "20px", fontWeight: "900" }}>
                <img
                  style={{ margin: "auto" }}
                  src="https://s.udemycdn.com/communication/empty-mailbox-v2.jpg"
                />
                <div className="fs-5 fw-bold text-center">No questions yet</div>
                <div className="mt-3 fs-5 text-center">
                  Q&A is a forum where your students can ask questions, hear{" "}
                  <br />
                  your responses, and respond to one another. Here’s where
                  <br />
                  you’ll see your courses’ Q&A threads
                </div>
              </div>
            ) : messages === true ? (
              <div style={{ fontSize: "20px", fontWeight: "900" }}>
                <img
                  style={{ margin: "auto" }}
                  src="https://s.udemycdn.com/communication/empty-mailbox-v2.jpg"
                />
                <div className="fs-5 fw-bold text-center">No new messages</div>
                <div className="mt-3 fs-5 text-center">
                  Direct messages are for you to communicate with your <br />{" "}
                  students or other instructors privately. Here’s where you’ll
                  see <br /> them.
                </div>
              </div>
            ) : assignments === true ? (
              <div style={{ fontSize: "20px", fontWeight: "900" }}>
                <img
                  style={{ margin: "auto" }}
                  src="https://s.udemycdn.com/communication/empty-search.jpg"
                />
                <div className="fs-5 fw-bold text-center">No results</div>
                <div className="mt-3 fs-5 text-center">
                  Try a different filter
                </div>
              </div>
            ) : announcements === true ? (
              <div style={{ fontSize: "20px", fontWeight: "900" }}>
                <img
                  style={{ margin: "auto" }}
                  src="https://s.udemycdn.com/communication/empty-mailbox-v2.jpg"
                />
                <div className="fs-5 fw-bold text-center">
                  No announcements yet
                </div>
                <div className="mt-3 fs-5 text-center">
                  Here’s where you can send your students a few email <br />
                  announcements every month. Use educational emails to <br />{" "}
                  support your students’ learning. Use promotional emails to{" "}
                  <br />
                  market your courses. Learn more
                </div>
              </div>
            ) : null}
          </div>
        </div>
      </AdminLayout>
    </div>
  );
}

export default Index;
