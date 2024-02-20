import { Icon } from "@iconify/react";
import React from "react";

function Footer() {
  return (
    <div className="Footer_Container">
      <div>
        <div className="container">
          <div className="row">
            <div className="col-md-3">
              <div className="HeadinG_Foter">Company</div>
              <a className="link">About</a>
              <a className="link">Careers</a>
              <a className="link">Press</a>
              <a className="link">Blog</a>
              <a className="link">Affiliates</a>
              <a className="link">Partnerships</a>
            </div>
            <div className="col-md-3">
              <div className="HeadinG_Foter">Community</div>
              <a className="link">Team Plans</a>
              <a className="link">Refer a Friend</a>
              <a className="link">Limited Memberships</a>
              <a className="link">Scholarships</a>
              <a className="link">Free Classes</a>
            </div>{" "}
            <div className="col-md-3">
              <div className="HeadinG_Foter">Teaching</div>
              <a className="link">Become a Teacher</a>
              <a className="link">Teacher Help Center</a>
              <a className="link">Teacher Rules & Requirements</a>
            </div>{" "}
            <div className="col-md-3">
              <div className="HeadinG_Foter">Contact</div>
              <div className="COntact_text">
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Fuga,
                quo, enim cum architecto tempora autem commodi doloremque quis,
                ducimus
              </div>
              <div className="mt-3">
                <div className="InputBox">
                  <input
                    className="Input_Email"
                    placeholder="Enter Your Gmail"
                  />
                  <div>
                    <Icon
                      icon="streamline:mail-send-email-message-solid"
                      fontSize={15}
                      color="white"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="Copy_Right">
          <div className="text-white">@hobby-land.com/en</div>
        </div>
      </div>
    </div>
  );
}

export default Footer;
