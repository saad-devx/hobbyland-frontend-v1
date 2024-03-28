import { Footer, Header } from "@/Component";
import { FetchQrcode } from "@/config/Axiosconfig/AxiosHandle/Qrcode";

import QRCode from "qrcode.react";
import React, { useEffect } from "react";

function Index() {
  const GetData = async () => {
    try {
      const responseData = await FetchQrcode();
      if (responseData) {
        console.log(responseData);
        
      }
    } catch (error) {
      console.log(error, "err");
    }
  };

  useEffect(() => {
    GetData();
  }, []);
  return (
    <>
      <Header />
      <div className="Container__Two_Step_varification">
        <div className="container my-5">
          <div className="row">
            <div className="col-md-6">
              <h3 className="fw-bold my-3">Two Step verfication</h3>
              <div className="verfication_code">
                <QRCode style={{ width: "100%", height: "100%" }} value="" />
              </div>
            </div>
            <div className="col-md-6">
              <div className="dscs">
                Scan The QrCOde the Two Factor Autheintication app on Your Phone
                And Enter a Verification Code Is You Con't use a barcode use the
                text code instead
              </div>
              <div className="my-3">
                <div style={{ fontSize: "14px", padding: "0px 3px 3px 0px" }}>
                  Enter Otp
                </div>
                <input className="Input" />
              </div>
              <div className="Button_Section">
                <div>
                  <button className="btn_Green">Cancel</button>
                </div>
                <div>
                  <button className="btn_Green">Next</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default Index;
