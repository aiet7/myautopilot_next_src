"use client";

import Image from "next/image";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useGoogleLogin } from "@react-oauth/google";
import MicrosoftLogin from "react-microsoft-login";
import { TiVendorMicrosoft } from "react-icons/ti";
import { FcGoogle } from "react-icons/fc";

import Loading from "../../../components/Loading.js";

import {
  isEmailInputValid,
  isInputEmpty,
  validateInput,
} from "../../../utils/formValidations.js";

import { UsaStates } from "usa-states";

import Cookie from "js-cookie";

const Signup = () => {
  const usStates = new UsaStates();

  const [height, setHeight] = useState(null);

  const [loading, setLoading] = useState(false);

  const [errorMessage, setErrorMessage] = useState("");

  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [businessName, setBusinessName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [address, setAddress] = useState({
    street: "",
    city: "",
    zipcode: "",
    state: "",
  });
  const [password, setPassword] = useState("");

  const [showSignupForm, setShowSignupForm] = useState(false);

  const router = useRouter();

  const handleGoogleSignup = useGoogleLogin({
    flow: "auth-code",
    scope:
      "https://www.googleapis.com/auth/calendar.events https://www.googleapis.com/auth/calendar.events.readonly https://www.googleapis.com/auth/gmail.readonly https://www.googleapis.com/auth/gmail.modify https://www.googleapis.com/auth/gmail.send https://www.googleapis.com/auth/calendar https://www.googleapis.com/auth/contacts https://www.googleapis.com/auth/contacts.readonly",
    onSuccess: async (codeResponse) => {
      setLoading(true);
      try {
        const tokenResponse = await fetch(
          `https://etech7-wf-etech7-db-service.azuremicroservices.io/getGoogleToken?code=${codeResponse.code}`
        );

        const token = await tokenResponse.json();

        const user = {
          accessToken: token.access_token,
          refreshToken: token.refresh_token,
          expiryTime: token.expiryTime,
          firstName: token.firstName,
          lastName: token.lastName,
          businessEmail: token.email,
          businessName: "",
          businessPhone: "",
          address: {
            street: "",
            city: "",
            zipcode: "",
            state: "",
          },
        };
        const validateGoogleResponse = await fetch(
          `https://etech7-wf-etech7-db-service.azuremicroservices.io/validateUser?token=google`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(user),
          }
        );
        if (validateGoogleResponse.status === 200) {
          const googleUser = await validateGoogleResponse.json();
          router.push(`/dashboard/${googleUser.id}`);
          Cookie.set("Secure-next.session-token-g", token.id_token, {
            expires: 7,
            secure: true,
            sameSite: "lax",
          });
        } else {
          console.log("error");
        }
      } catch (e) {
        console.log(e);
      } finally {
        setLoading(false);
      }
    },
  });

  const handleMicrosoftSignup = async (err, data) => {
    setLoading(true);
    try {
      const {
        accessToken,
        account: { name, username },
      } = data;

      const fullName = name.split(" ");

      const user = {
        firstName: fullName[0],
        lastName: fullName[1],
        businessEmail: username,
        businessName: "",
        businessPhone: "",
        address: {
          street: "",
          city: "",
          zipcode: "",
          state: "",
        },
      };

      const response = await fetch(
        `https://etech7-wf-etech7-db-service.azuremicroservices.io/validateUser?token=microsoft`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(user),
        }
      );

      if (response.ok) {
        const microsoftUser = await response.json();
        router.push(`/dashboard/${microsoftUser.id}`);
        Cookie.set("microsoft_session_token", accessToken, { expires: 7 });
        Cookie.set("user_id", microsoftUser.id, { expires: 7 });
      } else {
        setErrorMessage("Error with Microsoft Login.");
      }
    } catch (e) {
      console.log(e);
    } finally {
      setLoading(false);
    }
  };

  const handleEmailCheck = async () => {
    if (isInputEmpty(email) || !isEmailInputValid(email)) {
      setErrorMessage("A valid email is required.");
      return;
    }

    try {
      const response = await fetch(
        `https://etech7-wf-etech7-db-service.azuremicroservices.io/getUserByEmail?email=${email}`
      );
      const user = await response.json();
      setErrorMessage("");
      if (user.message === "No Users") {
        setShowSignupForm(true);
      } else {
        setErrorMessage("Account exists.");
      }
    } catch (e) {
      console.log(e);
    }
  };

  const handleEmailSignup = async () => {
    const user = {
      firstName: firstName,
      lastName: lastName,
      businessName: businessName,
      businessEmail: email,
      businessPhone: phoneNumber,
      address: address,
      password: password,
    };

    const validationError = validateInput(user);
    if (validationError) {
      setErrorMessage(validationError);
      return;
    }

    try {
      const response = await fetch(
        `https://etech7-wf-etech7-db-service.azuremicroservices.io/validateUser`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(user),
        }
      );
      setErrorMessage("");
      if (response.ok) {
        router.push("/auth/login");
      } else {
        setErrorMessage("Error occurred during sign up.");
      }
    } catch (e) {
      console.log(e);
    } finally {
      setLoading(false);
    }
  };

  const handleShowLogin = () => {
    router.push("/auth/login");
  };

  useEffect(() => {
    if (typeof window !== "undefined") {
      setHeight(window.innerHeight);

      const handleResize = () => setHeight(window.innerHeight);
      window.addEventListener("resize", handleResize);
      return () => {
        window.removeEventListener("resize", handleResize);
      };
    }
  }, []);

  return (
    <>
      {loading ? <Loading /> : null}
      {height && (
        <div
          className="relative z-[99]  bg-gradient-to-b from-white via-white to-gray-400 h-full flex justify-center items-center"
          style={{ height: `calc(${height}px - 1px)` }}
        >
          <form className="w-[300px] flex flex-col items-center gap-4">
            <Image
              priority
              src="/myautopilot_logo.png"
              alt="Circuit board in the shape of a human brain"
              width={125}
              height={125}
            />
            <h1 className="text-3xl font-bold text-black text-center">
              Create your account
            </h1>
            <p className="text-center text-black text-sm">
              Please note that the optional fields can be updated/changed in
              your profile page. Optional fields are not required during sign
              up.
            </p>
            <p className="text-red-500 text-sm">{errorMessage}</p>

            {!showSignupForm && (
              <>
                <input
                  onChange={(e) => setEmail(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      e.preventDefault();
                      handleEmailCheck();
                    }
                  }}
                  type="email"
                  placeholder="Enter your email"
                  className="w-full p-2 border border-gray-300  bg-white text-black"
                />
                <button
                  onClick={handleEmailCheck}
                  type="button"
                  className="w-full py-2 bg-green-700 text-white font-bold rounded-sm"
                >
                  Continue
                </button>

                <div className="flex items-center w-full">
                  <div className="border border-black/10 w-full" />
                  <span className="mx-2 text-black">or</span>
                  <div className="border border-black/10 w-full" />
                </div>
                <div className="flex flex-col gap-1">
                  <button
                    onClick={() => handleGoogleSignup()}
                    type="button"
                    className="w-[300px] p-2 bg-red-500 text-white font-bold flex items-center justify-start rounded-sm gap-2"
                  >
                    <FcGoogle size={30} />
                    Sign up with Google
                  </button>

                  <MicrosoftLogin
                    graphScopes={[
                      "mail.read",
                      "mail.readwrite",
                      "mail.send",
                      "calendars.read",
                      "calendars.readwrite",
                      "contacts.read",
                      "contacts.readwrite",
                    ]}
                    clientId="14a9d59a-1d19-486e-a4db-d81c5410a453"
                    authCallback={handleMicrosoftSignup}
                    redirectUri="https://myautopilot.ai"
                  >
                    <button
                      type="button"
                      className="w-[300px] p-2 bg-blue-500 text-white font-bold flex items-center justify-start rounded-sm gap-2"
                    >
                      <TiVendorMicrosoft size={30} />
                      Sign up with Microsoft
                    </button>
                  </MicrosoftLogin>
                </div>
              </>
            )}
            {showSignupForm && (
              <>
                <div className="flex gap-2">
                  <input
                    onChange={(e) => setFirstName(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        e.preventDefault();
                        handleEmailSignup();
                      }
                    }}
                    type="text"
                    placeholder="First name"
                    className="w-full p-2 border border-gray-300 bg-white text-black"
                  />
                  <input
                    onChange={(e) => setLastName(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        e.preventDefault();
                        handleEmailSignup();
                      }
                    }}
                    type="text"
                    placeholder="Last name"
                    className="w-full p-2 border border-gray-300 bg-white text-black"
                  />
                </div>
                <input
                  onChange={(e) => setBusinessName(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      e.preventDefault();
                      handleEmailSignup();
                    }
                  }}
                  type="text"
                  placeholder="Business name"
                  className="w-full p-2 border border-gray-300 bg-white text-black"
                />
                <div className="flex gap-2">
                  <input
                    onChange={(e) =>
                      setAddress((prevState) => ({
                        ...prevState,
                        street: e.target.value,
                      }))
                    }
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        e.preventDefault();
                        handleEmailSignup();
                      }
                    }}
                    type="text"
                    placeholder="Street"
                    className="w-full p-2 border border-gray-300 bg-white text-black"
                  />

                  <input
                    onChange={(e) =>
                      setAddress((prevState) => ({
                        ...prevState,
                        city: e.target.value,
                      }))
                    }
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        e.preventDefault();
                        handleEmailSignup();
                      }
                    }}
                    type="text"
                    placeholder="City "
                    className="w-full p-2 border border-gray-300 bg-white text-black"
                  />
                </div>
                <div className="w-full flex gap-2">
                  <input
                    maxLength={5}
                    onChange={(e) =>
                      setAddress((prevState) => ({
                        ...prevState,
                        zipcode: e.target.value,
                      }))
                    }
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        e.preventDefault();
                        handleEmailSignup();
                      }
                    }}
                    type="text"
                    placeholder="Zipcode"
                    className="w-full p-2 border border-gray-300 bg-white text-black"
                  />
                  <select
                    onChange={(e) =>
                      setAddress((prevState) => ({
                        ...prevState,
                        state: e.target.value,
                      }))
                    }
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        e.preventDefault();
                        handleEmailSignup();
                      }
                    }}
                    className={`w-full p-2 border rounded-none border-gray-300  ${
                      address.state
                        ? "bg-white text-black"
                        : "bg-white text-gray-400"
                    }`}
                  >
                    <option value="">State</option>
                    {usStates.states.map((state) => (
                      <option
                        key={state.abbreviation}
                        value={state.abbreviation}
                      >
                        {state.abbreviation}
                      </option>
                    ))}
                  </select>
                </div>
                <input
                  maxLength={10}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      e.preventDefault();
                      handleEmailSignup();
                    }
                  }}
                  type="text"
                  placeholder="*Phone number"
                  className="w-full p-2 border border-gray-300 bg-white text-black"
                />
                <input
                  onChange={(e) => setPassword(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      e.preventDefault();
                      handleEmailSignup();
                    }
                  }}
                  type="password"
                  placeholder="*Password"
                  className="w-full p-2 border border-gray-300 bg-white text-black"
                />
                <button
                  onClick={handleEmailSignup}
                  type="button"
                  className="w-full  py-2 bg-green-700 text-white font-bold rounded-sm"
                >
                  Continue
                </button>
              </>
            )}
            <button
              onClick={() => handleShowLogin()}
              type="button"
              className="w-full text-blue-500 text-sm flex items-center justify-start"
            >
              Already have an account?
            </button>
          </form>
        </div>
      )}
    </>
  );
};

export default Signup;
