import { Footer, Header } from "@/Component";
import { Icon } from "@iconify/react";
import React, { useState, useEffect } from "react";
import moment from "moment-timezone";
import { useRouter } from "next/router";
import { CreateAcount } from "@/config/Axiosconfig/AxiosHandle/auth";
import citiesData from "@/constant/country";
import {
  GoogleMap,
  useJsApiLoader,
  Autocomplete,
} from "@react-google-maps/api";
const libraries = ["places"];

function Index() {
  const [inputType, setInputType] = useState(true);
  const [accecptPolicies, setAccecptPolicies] = useState(true);

  const router = useRouter();
  const { query } = router.query;
  console.log(query);
  const Acounttype = query;
  const [acountType, setAcountType] = useState();
  useEffect(() => {
    const data = localStorage.getItem("acountType");
    setAcountType(data);

    console.log(acountType, "acoht type");
  }, [query]);
  const [signupData, setSignupData] = useState({
    username: "",
    email: "",
    password: "",
    firstname: "",
    lastname: "",
    timezone: "",
    longitude: "",
    latitude: "",
    location: "",
    account_type: acountType ? acountType : query,
    accept_policies: accecptPolicies,
    register_provider: "hobbyland",
  });
  const [errors, setErrors] = useState({});
  const [timezones, setTimezones] = useState([]);
  useEffect(() => {
    const currentTimezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
    const timezoneList = moment.tz.names();
    setTimezones(timezoneList);
    setSignupData({ ...signupData, timezone: currentTimezone });
  }, []);

  const [autocomplete, setAutocomplete] = useState(null);
  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: "AIzaSyA1lurRRYuP5JyVNVNsjHvNgDiq7TBtNhU",
    libraries,
  });

  const onPlaceChanged = () => {
    if (autocomplete !== null) {
      const place = autocomplete.getPlace();

      // Extracting latitude and longitude
      const lat = place.geometry?.location?.lat();
      const lng = place.geometry?.location?.lng();

      setSignupData((prev) => ({
        ...prev,
        location: place.formatted_address || "",
        latitude: lat || "",
        longitude: lng || "",
      }));
    } else {
      console.log("Autocomplete is not loaded yet!");
    }
  };

  const [countries, setCountries] = useState([]);
  useEffect(() => {
    fetch("https://restcountries.com/v3.1/all")
      .then((response) => response.json())
      .then((data) => {
        const countryNames = data.map((country) => country.name.common);
        setCountries(countryNames);
      })
      .catch((error) => {
        console.error("Error fetching countries:", error);
      });
  }, []);
  const handleChange = (e) => {
    const { name, value } = e.target;
    setSignupData({ ...signupData, [name]: value });
  };
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  // async function fetchCitiesByCountry(countryName) {
  //   try {
  //     // Make an API request to fetch country data
  //     const response = await fetch(
  //       `https://countriesnow.space/api/v0.1/countries`
  //     );
  //     const data = await response.json();

  //     // Find the country data by matching country name
  //     const countryData = data.data.find(
  //       (country) => country.country.toLowerCase() === countryName.toLowerCase()
  //     );

  //     if (countryData) {
  //       // Get the array of cities
  //       const cities = countryData.cities;

  //       // Console log all the cities in the array
  //       console.log(`Cities in ${countryName}:`, cities);
  //     } else {
  //       console.log(`No cities found for ${countryName}`);
  //     }
  //   } catch (error) {
  //     console.error("Error fetching cities:", error);
  //   }
  // }

  // Call the function and pass the country name
  // fetchCitiesByCountry("Pakistan");

  const [city, setCity] = useState([]);
  console.log(signupData, "singupData");
  const SubmitData = async () => {
    const newErrors = {};
    console.log(newErrors);
    if (!signupData.username) {
      newErrors.username = "Username is required";
    } else if (signupData.username.length < 4) {
      newErrors.username = "Username should be at least 8 characters long";
    } else if (signupData.username.length > 30) {
      newErrors.password = "Password should be at least 30 characters short";
    }
    if (!signupData.email) {
      newErrors.email = "Email is required";
    }

    if (!signupData.password) {
      newErrors.password = "Password should be greater than 8 characters";
    } else if (signupData.password.length < 8) {
      newErrors.password = "Password should be at least 8 characters long";
    } else if (!signupData.location) {
      newErrors.location = "Location is required";
    } else if (!signupData.firstname) {
      newErrors.firstname = "firstname is required";
    }

    if (!signupData.lastname) {
      newErrors.lastname = "lastname is required";
    }

    if (!signupData.timezone) {
      newErrors.timezone = "timezone is required";
    }
    if (!accecptPolicies) {
      newErrors.accept_policies = "accept_policies is required";
    }
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
    } else {
      try {
        setErrors("");
        console.log(signupData);
        console.log(newErrors);
        const data = await CreateAcount(signupData);
        if (data) {
          console.log(data.data.msg);
          setSuccess(data.data.msg);
          setError("");
          localStorage.removeItem("acountType");

          setTimeout(() => {
            router.push("./otp");
          }, 1000);
        } else {
        }
      } catch (error) {
        setError(error.response ? error.response.data.msg : error.message);
        console.log(error);
        setSuccess("");
        console.log(error);
      }
    }
  };

  return (
    <>
      <Header />
      <div className="Main_Container mb-3">
        <div className="CenterContainer">
          <div className="Heading_of_Signup">Sign up to find work you love</div>

          {error && (
            <div
              style={{
                marginTop: "20px",
                marginBottom: "20px",
                backgroundColor: "#feefee",
                padding: "12px",
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                gap: "10px",
              }}
            >
              <Icon
                icon="carbon:warning-filled"
                style={{ fontSize: "29px", color: "#ee5d50" }}
              />
              {error}
            </div>
          )}
          {success && (
            <div
              style={{
                marginTop: "20px",
                marginBottom: "20px",
                backgroundColor: "#e6faf5",
                padding: "12px",
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                gap: "10px",
              }}
            >
              <Icon
                icon="ep:success-filled"
                style={{ fontSize: "29px", color: "#01b574" }}
              />
              {success}
            </div>
          )}
          <div className="d-flex m-auto gap-3 mt-5">
            <div className="w-75">
              <div className="label">Enter Your First Name</div>
              <input
                value={signupData.firstname}
                onChange={handleChange}
                className={errors.firstname ? "errTimezoneInput" : "Input"}
                placeholder="Your First Name"
                name="firstname"
              />
              {errors.firstname ? (
                <div className="ErrorMessage">{errors.firstname}</div>
              ) : null}
            </div>
            <div className="w-75">
              <div className="label">Enter Your Last Name</div>
              <input
                value={signupData.lastname}
                onChange={handleChange}
                className={errors.lastname ? "errTimezoneInput" : "Input"}
                placeholder="Your Full Name"
                name="lastname"
              />

              {errors.lastname ? (
                <div className="ErrorMessage">{errors.lastname}</div>
              ) : null}
            </div>
          </div>
          <div className="w-100 mt-3">
            <div className="label">Enter Your Username</div>
            <input
              value={signupData.username}
              onChange={handleChange}
              className={errors.username ? "errTimezoneInput" : "Input"}
              placeholder="Your UserName"
              name="username"
            />

            {errors.username ? (
              <div className="ErrorMessage">{errors.username}</div>
            ) : null}
          </div>
          <div className="w-100 mt-3">
            <div className="label">Enter Your Email</div>
            <input
              value={signupData.email}
              onChange={handleChange}
              className={errors.email ? "errTimezoneInput" : "Input"}
              placeholder="Your Email"
              name="email"
            />
            {errors.email ? (
              <div className="ErrorMessage">{errors.email}</div>
            ) : null}
          </div>

          <div className="w-100 mt-3">
            <div className="label">Enter Your Password</div>
            <div className={errors.email ? "errTimezoneInput" : "Input"}>
              <div className="input_box">
                <input
                  value={signupData.password}
                  onChange={handleChange}
                  type={`${inputType ? "password" : ""}`}
                  className="PasswordInput"
                  placeholder="Your Password"
                  name="password"
                />
              </div>
              <div className="p-2 ">
                {inputType ? (
                  <Icon
                    className="icon"
                    onClick={() => {
                      setInputType(false);
                    }}
                    icon="ep:hide"
                    fontSize={15}
                  />
                ) : (
                  <Icon
                    className="icon"
                    onClick={() => {
                      setInputType(true);
                    }}
                    icon="icon-park-outline:eyes"
                    fontSize={15}
                  />
                )}
              </div>
            </div>
            {errors.password ? (
              <div className="ErrorMessage">{errors.password}</div>
            ) : null}
          </div>
          <div className="w-100 mt-3">
            <div>
              {isLoaded ? (
                <Autocomplete
                  onLoad={(auto) => setAutocomplete(auto)}
                  onPlaceChanged={onPlaceChanged}
                >
                  <input
                    className={`${
                      error.location ? "errTimezoneInput" : "Input"
                    }`}
                    placeholder="location"
                    value={signupData.location}
                    name="location"
                    onChange={(e) => {
                      setSignupData((prev) => ({
                        ...prev,
                        location: e.target.value,
                      }));
                    }}
                  />
                </Autocomplete>
              ) : null}
            </div>
            {errors.location ? (
              <div className="ErrorMessage">{errors.location}</div>
            ) : null}
          </div>

          <div className="w-100 mt-3">
            <div className="label">select Your Timezone</div>
            <select
              value={signupData.timezone}
              className={errors.timezone ? "errTimezoneInput" : "Input"}
              placeholder="Your Password"
              name="timezone"
            >
              {timezones.map((tz) => (
                <option key={tz} value={tz}>
                  {tz}
                </option>
              ))}
            </select>
          </div>

          {errors.timezone ? (
            <div className="ErrorMessage">{errors.timezone}</div>
          ) : null}
          <div className="Privacy_CHeck mt-3">
            <input
              id="myCheckbox"
              type="checkbox"
              checked={accecptPolicies}
              onChange={() => {
                setAccecptPolicies((prevValue) => !prevValue);
              }}
            />

            <div className={`${errors.accecptPolicies ? "text" : "text"}`}>
              Send me helpful emails to find rewarding work and job leads.
            </div>
          </div>
          <div>
            <button class="google-button">
              <img
                className="m-0  radius"
                src="data:image/svg+xml;charset=utf-8,%3Csvg width='38' height='38' viewBox='0 0 101.33 101.33' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath fill='%23fff' d='M0 0h101.33v101.33H0z'/%3E%3Cpath d='M50.667 36.167c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85c-4.16-3.87-9.59-6.25-16.06-6.25-9.38 0-17.49 5.38-21.44 13.22l7.98 6.19c1.89-5.69 7.2-9.91 13.46-9.91z' fill='%23ea4335'/%3E%3Cpath d='M73.647 51.217c0-1.57-.15-3.09-.38-4.55h-22.6v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z' fill='%234285f4'/%3E%3Cpath d='M37.197 55.257c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19c-1.63 3.24-2.55 6.9-2.55 10.78s.92 7.54 2.56 10.78z' fill='%23fbbc05'/%3E%3Cpath d='M50.667 74.667c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19c3.96 7.85 12.07 13.23 21.45 13.23z' fill='%2334a853'/%3E%3Cpath d='M26.667 26.667h48v48h-48z' fill='none'/%3E%3C/svg%3E"
              />
              <div className="text-center mx-3">Continue With Goggle</div>
            </button>
          </div>
          <div>
            <button class="Aple-button">
              <img
                className="m-0  radius"
                width={35}
                src="https://1000logos.net/wp-content/uploads/2016/10/Apple-Logo.png"
              />
              <div className="text-center mx-3">Continue With Apple</div>
            </button>
          </div>
          <div className="text-center">
            <button className="btn_Green_Size_Full mt-3" onClick={SubmitData}>
              Create Account
            </button>

            <p style={{ fontSize: "12px", marginTop: "10px" }}>
              I Have Already Created Your Acount ?{" "}
              <a href="./login" className="login_Href">
                Login
              </a>
            </p>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default Index;
