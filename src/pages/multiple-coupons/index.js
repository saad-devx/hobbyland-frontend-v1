import { Footer } from "@/Component";
import AdminLayout from "@/layout/AdminLayount";
import { Icon } from "@iconify/react";
import Link from "next/link";
import React from "react";

function Index() {
  return (
    <div>
      <AdminLayout>
        <div className="w-100 Marketing_place_container">
          <div className="TOP_HEader ">
            <div>
              <Link className="Link" href="./StudentHome">
                <div className="Link">Student</div>
              </Link>
            </div>
            <div>
              <Icon className="Icon" icon="carbon:notification-filled" />
            </div>
            <div className="Profile_box">S</div>
          </div>
          <div>
            <div className="container">
              <div className="row">
                <div className="col-md-8">
                  <h3 className="fw-bold mt-3">Bulk coupon creation</h3>
                  <div className="mt-3">
                    Use this tool to create multiple coupons within the current
                    calendar month through CSV upload. Note: the file must be a
                    .csv file (comma delimited). See the CSV template file
                    section below.
                  </div>
                  <div className="mt-3">
                    <button className="btn_Green_Large_Size">
                      upload CSVto create coupons
                    </button>
                  </div>
                  <div className="mt-5 fs-4 fw-bold">CSV preparation guide</div>
                  <div className="mt-2">
                    For a successful CSV upload, you must adhere to the standard
                    coupon policies and acceptable inputs. The information below
                    will guide you through creating a CSV file that meets the
                    requirements.
                  </div>
                  <div className="mt-5 fs-4 fw-bold">Course information</div>
                  <div className="mt-2">
                    Use this course information to create a bulk coupon CSV
                    file. The information provided is: Course ID, current best
                    price value, minimum and maximum custom price values
                    allowed, and number of coupons remaining for the course for
                    the month.
                  </div>
                  <div className="mt-5 fs-4 fw-bold">CSV template file</div>
                  <div className="mt-2">
                    Download the template CSV file and create your own using the
                    values given in your Course information file and entering
                    the coupon types and values you want to create. Important:
                    the data contained in the template file is only an example,
                    and is not your course information. You will need to leave
                    the column headers, delete the example data, and add your
                    own coupon data.
                  </div>
                  <div className="mt-5 fs-4 fw-bold">
                    CSV upload requirements
                  </div>
                  <div>
                    <table className="mb-5 mt-3">
                      <tr style={{ backgroundColor: "#f7f9fa" }}>
                        <th className="TableColoumn_size">Header</th>
                        <th className="TableColoumn_size">Description</th>
                        <th className="TableColoumn_size">Accepted values</th>
                      </tr>
                      <tr>
                        <td className="TableColoumn_size ">
                          course_id (required)
                        </td>
                        <td className="TableColoumn_size ">
                          Your Course ID can be found in your course data
                        </td>{" "}
                        <td className="TableColoumn_size ">course_id</td>
                      </tr>
                      <tr>
                        <td className="TableColoumn_size ">
                          coupon_type (required)
                        </td>
                        <td className="TableColoumn_size ">
                          The type of coupon being issued (best price, custom
                          price, etc).
                        </td>{" "}
                        <td className="TableColoumn_size ">
                          best_price custom_price free_targeted free_open
                        </td>
                      </tr>
                      <tr>
                        <td className="TableColoumn_size ">
                          coupon_code (required)
                        </td>
                        <td className="TableColoumn_size ">
                          The unique code you share with others.
                        </td>{" "}
                        <td className="TableColoumn_size ">
                          Must between 6 and 20 characters and can only contain
                          alphanumeric characters (A-Z, 0-9), periods ("."),
                          dashes ("-") or underscores ("_")
                        </td>
                      </tr>
                    </table>
                  </div>
                </div>
                <div className="col-md-4">
                  <div className="card">
                    <div className="fw-bold">
                      Your active and scheduled coupons
                    </div>
                    <div className="mt-3">
                      Check out all of the active and scheduled coupons for your
                      courses, including the discount values and coupon URLs.
                    </div>
                    <div className="mt-3">
                      <button className="Outline_large_btn">
                        Dwonload current Courponse
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </AdminLayout>
    </div>
  );
}

export default Index;
