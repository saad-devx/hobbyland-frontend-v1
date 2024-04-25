import Link from "next/link";
import React from "react";

function Index() {
  return (
    <>
      <div className="container_CHeckout mb-5">
        <div className="container">
          <div className="row">
            <div className="LargeTile mt-5">Start your free 7 days</div>
            <div className="mt-3 label_Input">
              No commitments. Cancel anytime.
            </div>
            <div className="col-md-6">
              <div>
                <div className="Card_Number mt-3">
                  <div className="label_Input">CARD NUMBER</div>
                  <input className="Input" placeholder="Card Number" />
                </div>
                <div className="d-flex gap-3">
                  <div className="w-75">
                    <div className="Card_Number mt-3">
                      <div className="label_Input">EXPIRATION </div>
                      <input className="Input" placeholder="EXPIRATION" />
                    </div>
                  </div>
                  <div className="w-75">
                    <div className="Card_Number mt-3">
                      <div className="label_Input">CVC</div>
                      <input className="Input" placeholder="EXPIRATION" />
                    </div>
                  </div>
                </div>
                <div className="Card_Number mt-3">
                  <div className="label_Input">COUNTRY</div>
                  <select className="Input" placeholder="COUNTRY">
                    <option value="pakistan">pakistan</option>
                    <option value="pakistan">pakistan</option>
                    <option value="pakistan">pakistan</option>
                    <option value="pakistan">pakistan</option>
                    <option value="pakistan">pakistan</option>
                    <option value="pakistan">pakistan</option>
                    <option value="pakistan">pakistan</option>
                  </select>
                </div>
                <div className="Card_Number mt-3">
                  <div className="label_Input">Gift Card or Discount Code</div>
                  <input
                    className="Input"
                    placeholder="Gift Card or Discount Code"
                  />
                </div>
                <div className="Card_Number mt-3">
                  <a href="./StudentHome">
                    <button className="btn_Green_Size_Full">Apply</button>
                  </a>
                </div>
              </div>
              <div className="text-center mt-3">OR</div>
              <div className="mt-3">
                <div className="label_Input my-2">Select a plan</div>
                <div className="display_FLex">
                  <div className="w-100">
                    <div className="AnualAndMOnthlybox mt-3">
                      <div>
                        <input name="paybel" type="radio" />
                      </div>
                      <div>
                        <div className="label_Input fw-bold">
                          Annual &nbsp;&nbsp;
                          <span
                            style={{
                              fontSize: "10px",
                              padding: "2px 5px",
                              backgroundColor: "rgb(0, 255, 132)",
                            }}
                          >
                            Best Offer
                          </span>
                        </div>
                        <div className="label_Input">US$2.00</div>
                        <div className="label_Input">
                         ( (US$24.00 billed annually))
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="w-100">
                    <div className="AnualAndMOnthlybox mt-3">
                      <div>
                        <input name="paybel" type="radio" />
                      </div>
                      <div>
                        <div className="label_Input fw-bold">
                          Annual &nbsp;&nbsp;
                          <span
                            style={{
                              fontSize: "10px",
                              padding: "2px 5px",
                              backgroundColor: "rgb(0, 255, 132)",
                            }}
                          >
                            Best Offer
                          </span>
                        </div>
                        <div className="label_Input">US$2.00</div>
                        <div className="label_Input">
                          (US$24.00 billed annually)
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-md-6">
              <div className="Card_of_rigt_Section">
                <div className=" text-center LargeTile">Summary</div>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    marginTop: "50px",
                  }}
                >
                  <div className="label_Input fw-bold">Annual Membership</div>
                  <div className="label_Input">
                    US$2.00/month <br /> (US$24.00 billed <br /> annually)
                  </div>
                </div>
                <div className="totalAmount">
                  <div className="Title mt-3">Total Amount :</div>
                  <div className="fs-5 fw-bold mt-3">0.00$</div>
                </div>
                <div className="mt-3">
                  <a href="./Dashboard">
                    <button className="btn_Green_Size_Full">
                      Checkout With Paypal
                    </button>
                  </a>
                </div>
                <div className="Content_ofCard mt-3">
                  A recurring annual charge of US$24.00 (plus tax, where
                  applicable) will be automatically applied to your payment
                  method and start on February 28, 2024. Note: the actual amount
                  charged may be lower in the first year based on promo codes or
                  discounts applied. You may cancel at any time, effective at
                  the end of the billing period, by going to your Memberships &
                  Payments settings. Rates for subsequent billing periods may
                  change. All amounts paid are non-refundable, subject to
                  certain exceptions.
                </div>
                <div className="Content_ofCard mt-2">
                  By clicking 'Check out with PayPal', you agree to our Terms of
                  Service and authorize this recurring charge.
                </div>
                <div className="Content_ofCard mt-2">
                  Have any questions? Write to our support team at
                  help@skillshare.com or visit our Help Center.
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Index;
