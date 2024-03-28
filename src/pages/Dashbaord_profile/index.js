import AdminLayout from "@/layout/AdminLayount";
import { Progress } from "antd";
function Index() {
  const Acivement = [{}, {}, {}, {}, {}, {}];
  return (
    <AdminLayout>
      <div className="conatainer_Dasbaord_profile w-100 ">
        <div className="">
          <div className="Title">Profile</div>
          <div className="container">
            <div className="row">
              <div className="col-md-5">
                <div className="w-100">
                  <div className="card1">
                    <div className="">
                      <img
                        src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSga0ZLFmGU0r4EcnP8Y-Mso4OklGh2o542zg&usqp=CAU"
                        className="Images"
                      />
                    </div>
                    <div className="ProfileName">Shahbaz</div>
                    <div className="SpecificEducation">
                      Computer Scinence 2022
                    </div>
                    <div className="Card_Section">
                      <div className="container">
                        <div className="row">
                          <div className="col-md-6">
                            <div className="Card_Box">
                              <div className="key">Course</div>
                              <div className="title">800</div>
                            </div>
                          </div>
                          <div className="col-md-6">
                            <div className="Card_Box">
                              <div className="key">Course</div>
                              <div className="title">800</div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="Acivement_Section">
                      <div className="title">Acivement</div>
                      <div className="AchivementFlex">
                        {Acivement.map((e, i) => {
                          return (
                            <div className="box" key={i}>
                              <img
                                src="https://png.pngtree.com/png-vector/20200131/ourmid/pngtree-bowing-achievement-award-vector-sport-png-image_2136866.jpg"
                                className="ImagesAchiment"
                              />
                            </div>
                          );
                        })}
                      </div>
                    </div>
                    <div className="Bio_section">
                      <div className="title">Bio</div>
                      <div className="descBio">
                        Lorem ipsum dolor sit amet consectetur adipisicing elit.
                        Eaque in illo, natus perspiciatis ullam quae enim quos
                        debitis corporis obcaecati laborum quia iure velit
                        voluptatum. Soluta consequuntur ullam minima quo?
                      </div>
                      <div className="descBio">
                        Lorem ipsum dolor sit amet consectetur adipisicing elit.
                        Eaque in illo, natus perspiciatis ullam quae enim quos
                        debitis corporis obcaecati laborum quia iure velit
                        voluptatum. Soluta consequuntur ullam minima quo?
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-md-7 ">
                <div className="right_Coloumn">
                  <div className="container">
                    <div className="row">
                      <div className="col-md-6">
                        <div className="Box_Top">
                          <div>
                            <img
                              width={70}
                              src="https://png.pngtree.com/png-vector/20200131/ourmid/pngtree-bowing-achievement-award-vector-sport-png-image_2136866.jpg"
                            />
                          </div>
                          <div>
                            <div className="title_card">100</div>
                            <div className="key">Certificate</div>
                          </div>
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="Box_Top">
                          <div>
                            <img
                              width={70}
                              src="https://png.pngtree.com/png-vector/20200131/ourmid/pngtree-bowing-achievement-award-vector-sport-png-image_2136866.jpg"
                            />
                          </div>
                          <div>
                            <div className="title_card">100</div>
                            <div className="key">Certificate</div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="Current_Course_Section">
                    <div className="title">Current Course</div>
                    <div className="container">
                      <div className="row">
                        <div className="col-md-6">
                          <div className="Box_Top">
                            <div></div>
                            <div>
                              <div className="key_dark">Certificate</div>
                              <div className="key">Ui Design engineer</div>
                              <div className="key_dark">Marks</div>
                              <div className="key">110/90</div>
                            </div>
                          </div>
                        </div>
                        <div className="col-md-6">
                          <div className="Box_Top">
                            <div></div>
                            <div>
                              <div className="key_dark">Certificate</div>
                              <div className="key">Ui Design engineer</div>
                              <div className="key_dark">Marks</div>
                              <div className="key">110/90</div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="container">
                    <div className="row">
                      <div className="col-md-12">
                        <div className="card1 mt-3">
                          <div className=""></div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}

export default Index;
