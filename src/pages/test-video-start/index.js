import { useRouter } from "next/router";
import React from "react";

function Index() {
  const route = useRouter();
  return (
    <div>
      <div className="Header_">
        <div className="HoobbyLand_Title">
          Hobby
          <br />
          Land.
        </div>
      </div>
      {/* <iframe
        style={{ margin: "auto" }}
        src="https://mp4-c.udemycdn.com/2021-06-02_23-42-25-6192508ebf9dfbe824a8a08573e54b63/1/WebHD_720p.mp4?Expires=1709830628&Signature=K1s455C0o7BmQPEQHHDCrkmkdNrX20JPvBAoAfrpUx8yZMU-Kj~3PpOOyqHrXeEUUdPhXbASPeTy-lOdzx0P1lcK25gJhdjcYsOxSGlv4cGnyaa6lbmNrqyPVUU2HMXYF9FQAe7TW60xA12Hu11ZK3oilXbiPy4gO8o57jkaweRN4oSxQzealRvqhuWorDa70-xZzHL-3HZTPjGOiZ83lsN5rgeXo~U56Q2CWRDsyxRItPnyB~ES8VrT2BRV5NELUf3NI5t7w28K5Ti9H~~FqUd94jG~i26uXuyZKZ~MYtlmA5WCzpIEH7EMcpGh2XUBLoWfrMK-OTRhH5FbKZYxjw__&Key-Pair-Id=K3MG148K9RIRF4"
        width={800}
        height={800}
      /> */}
      <div className="Postion_Bottom">
        <button
          onClick={() => {
            route.push("/test-video");
          }}
          className="Outline_Btn"
        >
          Previous
        </button>
        <div className="Text_">
          <span className="Current_Step">{"1"}</span> / 2
        </div>
        <button
          onClick={() => {
            route.push("/test-video-question");
          }}
          className="dark_btn"
        >
          Next
        </button>
      </div>
    </div>
  );
}

export default Index;
