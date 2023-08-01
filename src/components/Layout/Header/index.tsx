"use client"
import { useEffect, useState } from "react";
import { BiUser } from "react-icons/bi";
import { FiLock } from "react-icons/fi";
import { FaUserAlt } from "react-icons/fa";
import { IconContext } from "react-icons/lib";

import { onAuthStateChanged } from "firebase/auth";
import { AiOutlineMenu } from "react-icons/ai";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { getUserInfo, loginBySocial, loginHome, signUp } from "@/redux/features/login/loginSlide";
import { auth, signInWithFacebook, signInWithGoogle } from "@/app/firebase";
import Link from "next/link";
import Modal from "@/components/common/Modal";
import Input from "@/components/common/Input";
import Button from "@/components/common/Button";

export interface HeaderProps { }

export default function Header(props: HeaderProps) {
  const [showModal, setShowModal] = useState<boolean>(false);
  const [showMenu, setShowMenu] = useState<boolean>(false);
  const [showModalSignUp, setShowModalSignUp] = useState<boolean>(false);
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [firstName, setFirstName] = useState<string>("");
  const [lastName, setlastName] = useState<string>("");
  const [error, setError] = useState<string>("");
  const token = localStorage.getItem("token");
  const dispatch = useAppDispatch();
  const loginInfo = useAppSelector((state) => state.login);

  const navLinkClass = ({ isActive }: any) => {
    return isActive
      ? "nav-link text-[#FD6600] text-md md:text-xl font-medium rounded-lg px-3 md:px-5 py-1"
      : "nav-link text-md md:text-xl font-medium rounded-md hover:text-white hover:bg-[#FF9400] transition-all px-3 md:px-5 py-1";
  };
  const handleLogin = () => {
    if (email === "" || password === "") {
      setError("Please complete all information");
    } else {
      if (/^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[A-Za-z]+$/.test(email)) {
        setError("");
        dispatch({
          type: loginHome({
            email: email,
            password: password,
          }).type,
          payload: {
            email: email,
            password: password,
          },
        });
      } else {
        setError("Invalid email!");
      }
    }
  };
  const handleSignUp = () => {
    if (
      email === "" ||
      password === "" ||
      firstName === "" ||
      lastName === ""
    ) {
      setError("Please complete all information");
    } else {
      if (/^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[A-Za-z]+$/.test(email)) {
        setError("");
        dispatch({
          type: signUp({
            email,
            password,
            firstName,
            lastName,
          }).type,
          payload: {
            email,
            password,
            firstName,
            lastName,
          },
        });
        setShowModalSignUp(false);
      } else {
        setError("Invalid email!");
      }
    }
  };
  const handleShowSingUp = () => {
    setShowModal(false);
    setShowModalSignUp(true);
  };

  useEffect(() => {
    const unregisterAuthObserver = onAuthStateChanged(auth, async (user) => {
      if (user) {
        const tokenSocial = await user.getIdToken();
        dispatch({
          type: loginBySocial({ token: tokenSocial }).type,
          payload: { token: tokenSocial },
        });
        setShowModal(false);
      } else {
        if (token) {
          dispatch(getUserInfo());
        }
      }
    });
    return () => unregisterAuthObserver();
  }, []);

  return (
    <>
      <div className="h-fit w-full flex justify-center shadow-xl font-mono relative">
        <div className="h-fit w-[1200px] flex items-center justify-between py-5 px-6 relative">
          <div className="flex items-center">
            <div className="text-[#FD6600] text-xl md:text-3xl font-bold hover:cursor-pointer pr-4">
              TESTQUIZS
            </div>
            <div className="hidden sm:flex ">
              <Link href="/" className={`${navLinkClass}}`}>
                Home
              </Link>
              <Link href="/policy" className={`${navLinkClass}}`}>
                Policy
              </Link>
              <Link href="/gaming" className={`${navLinkClass}}`}>
                Gaming
              </Link>
              <Link href="/eq" className={`${navLinkClass}}`}>
                EQ
              </Link>
            </div>
          </div>
          <div>
            {loginInfo?.info.token ? (
              <div className="absolute top-[8px] right-[24px] flex items-center justify-center">
                <div
                  className="hover:cursor-pointer pr-4 flex sm:hidden"
                  onClick={() => setShowMenu(!showMenu)}
                >
                  <IconContext.Provider
                    value={{
                      color: "#FE7900",
                    }}
                  >
                    <div>
                      <AiOutlineMenu size={28} />
                    </div>
                  </IconContext.Provider>
                </div>
                <div className="flex flex-col justify-center items-center">
                  <div className="h-[30px] md:h-[45px] w-[30px] md:w-[45px] rounded-full overflow-hidden bg-[#FE7900] flex items-center justify-center">
                    {loginInfo?.info.avatar ? (
                      <img
                        src={loginInfo?.info.avatar}
                        alt="test quiz avatar"
                        className="h-full w-full object-contain"
                      />
                    ) : (
                      <IconContext.Provider
                        value={{
                          color: "#fff",
                        }}
                      >
                        <div>
                          <FaUserAlt size={25} />
                        </div>
                      </IconContext.Provider>
                    )}
                  </div>
                  <div className="text-center capitalize font-medium text-sm md:text-md">
                    {loginInfo?.info.firstName &&
                      `${loginInfo?.info.firstName +
                      " " +
                      loginInfo?.info.lastName
                      }`}
                  </div>
                </div>
              </div>
            ) : (
              <div className="flex items-center justify-center">
                <div
                  className="hover:cursor-pointer pr-4 flex sm:hidden"
                  onClick={() => setShowMenu(!showMenu)}
                >
                  <IconContext.Provider
                    value={{
                      color: "#FE7900",
                    }}
                  >
                    <div>
                      <AiOutlineMenu size={28} />
                    </div>
                  </IconContext.Provider>
                </div>
                <div
                  className="nav-link text-xl font-medium rounded-md text-white
          bg-[#FF9400] hover:cursor-pointer transition-all px-3 md:px-5 py-1"
                  onClick={() => setShowModal(true)}
                >
                  Login
                </div>
              </div>
            )}
          </div>
        </div>

        <Modal
          title=""
          modalWidth="450px"
          isOpen={showModal && !loginInfo.info._id}
          disableClose={false}
          onClose={() => {
            setShowModal(false);
          }}
        >
          <div className="py-3 px-2  transition-all">
            <h4 className="text-xl font-bold text-[#FE7900] text-center pt-12 pb-4">
              Login
            </h4>
            <div className="px-4">
              <div>
                <Input
                  title="Email"
                  iconRight={
                    <IconContext.Provider
                      value={{
                        color: "#FE7900",
                      }}
                    >
                      <div>
                        <BiUser />
                      </div>
                    </IconContext.Provider>
                  }
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  inputClassName="pl-8 border-l-0 border-t-0 border-r-0 rounded-[0px] border-b-[0.5px]"
                />
              </div>
              <div className="mt-5">
                <Input
                  title="Password"
                  type="password"
                  iconRight={
                    <IconContext.Provider
                      value={{
                        color: "#FE7900",
                      }}
                    >
                      <div>
                        <FiLock />
                      </div>
                    </IconContext.Provider>
                  }
                  inputClassName="pl-8 border-l-0 border-t-0 border-r-0 rounded-[0px]"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              {(loginInfo.error || error) && (
                <div className="text-red-600 text-center mt-1">
                  {error || loginInfo.error}
                </div>
              )}
              <div className="text-end pt-2 text-[13px] hover:cursor-pointer">
                Forgot Password?
              </div>
              <Button
                title="LOGIN"
                className="w-full py-2 text-white font-medium mt-6 text-sm 
              bg-gradient-to-r from-[#FE5803] to-[#FFC07D]"
                onClick={() => handleLogin()}
              />
            </div>
            <div className="pt-10">
              <p className="text-center text-sm py-3">Or Sign Up Using</p>
              <div className="flex justify-center items-center space-x-4">
                <div
                  className="h-[32px] w-[32px] hover:cursor-pointer hover:scale-[1.1]"
                  onClick={signInWithFacebook}
                >
                  <img
                    className="w-full h-full object-contain"
                    src="/images/share_icon_facebook_hover.png"
                    alt="test quiz facebook"
                  />
                </div>
                <div
                  className="h-[32px] w-[32px] hover:cursor-pointer hover:scale-[1.1]"
                  onClick={signInWithGoogle}
                >
                  <img
                    className="w-full h-full object-contain"
                    src="/images/share_icon_google_hover.png"
                    alt="test quiz google"
                  />
                </div>
              </div>
            </div>
            <div className="pt-6">
              <p className="text-center text-sm pt-10">Or Sign Up Using</p>
              <div
                className="text-center pt-2 hover:cursor-pointer text-blue-600"
                onClick={() => {
                  handleShowSingUp();
                }}
              >
                SIGN UP
              </div>
            </div>
          </div>
        </Modal>
        <Modal
          title=""
          modalWidth="450px"
          isOpen={showModalSignUp}
          disableClose={false}
          onClose={() => {
            setShowModalSignUp(false);
          }}
        >
          <div className="py-3 px-2">
            <h4 className="text-xl font-bold text-[#FE7900] text-center pt-12 pb-4">
              SignUp
            </h4>
            <div className="px-4">
              <div>
                <Input
                  title="Email"
                  iconRight={
                    <IconContext.Provider
                      value={{
                        color: "#FE7900",
                      }}
                    >
                      <div>
                        <BiUser />
                      </div>
                    </IconContext.Provider>
                  }
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  inputClassName="pl-8 border-l-0 border-t-0 border-r-0 rounded-[0px] border-b-[0.5px]"
                />
              </div>
              <div className="mt-5">
                <Input
                  title="Password"
                  type="password"
                  iconRight={
                    <IconContext.Provider
                      value={{
                        color: "#FE7900",
                      }}
                    >
                      <div>
                        <FiLock />
                      </div>
                    </IconContext.Provider>
                  }
                  inputClassName="pl-8 border-l-0 border-t-0 border-r-0 rounded-[0px]"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <div className="mt-5">
                <Input
                  title="First Name"
                  iconRight={
                    <IconContext.Provider
                      value={{
                        color: "#FE7900",
                      }}
                    >
                      <div>
                        <BiUser />
                      </div>
                    </IconContext.Provider>
                  }
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  inputClassName="pl-8 border-l-0 border-t-0 border-r-0 rounded-[0px] border-b-[0.5px]"
                />
              </div>
              <div className="mt-5">
                <Input
                  title="Last Name"
                  iconRight={
                    <IconContext.Provider
                      value={{
                        color: "#FE7900",
                      }}
                    >
                      <div>
                        <BiUser />
                      </div>
                    </IconContext.Provider>
                  }
                  value={lastName}
                  onChange={(e) => setlastName(e.target.value)}
                  inputClassName="pl-8 border-l-0 border-t-0 border-r-0 rounded-[0px] border-b-[0.5px]"
                />
              </div>
              {(loginInfo.error || error) && (
                <div className="text-red-600 text-center mt-1">
                  {error || loginInfo.error}
                </div>
              )}
              <Button
                title="SIGN UP"
                className="w-full py-2 text-white font-medium mt-6 text-sm 
              bg-gradient-to-r from-[#FE5803] to-[#FFC07D]"
                onClick={() => handleSignUp()}
              />
            </div>
            <div className="pt-10">
              <p className="text-center text-sm py-3">Or Sign Up Using</p>
              <div className="flex justify-center items-center space-x-4">
                <div
                  className="h-[32px] w-[32px] hover:cursor-pointer hover:scale-[1.1]"
                  onClick={signInWithFacebook}
                >
                  <img
                    className="w-full h-full object-contain"
                    src="/images/share_icon_facebook_hover.png"
                    alt="test quiz facebook"
                  />
                </div>
                <div
                  className="h-[32px] w-[32px] hover:cursor-pointer hover:scale-[1.1]"
                  onClick={signInWithGoogle}
                >
                  <img
                    className="w-full h-full object-contain"
                    src="/images/share_icon_google_hover.png"
                    alt="test quiz google"
                  />
                </div>
              </div>
            </div>
            <div className="pt-6">
              <div
                className="text-center pt-2 hover:cursor-pointer"
                onClick={() => {
                  setShowModal(true);
                  setShowModalSignUp(false);
                }}
              >
                Back To Login
              </div>
            </div>
          </div>
        </Modal>
        <div className="bg-white flex items-center justify-center flex-col md:hidden absolute top-[70px] left-0 w-full h-fit z-[100]">
          {showMenu && (
            <div className=" flex flex-col items-center justify-center">
              <Link
                onClick={() => setShowMenu(!showMenu)}
                href="/"
              >
                Home
              </Link>
              <Link
                onClick={() => setShowMenu(!showMenu)}
                href="/policy"
              >
                Policy
              </Link>
              <Link
                onClick={() => setShowMenu(!showMenu)}
                href="/gaming"
              >
                Gaming
              </Link>
              <Link
                onClick={() => setShowMenu(!showMenu)}
                href="/eq"
              >
                EQ
              </Link>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
