import React, { useState } from "react";
import "./Header.css";
import Avatar from "react-avatar";
import { AiOutlineMenu } from "react-icons/ai";
import { NavLink } from "react-router-dom";
import { RiArrowDropDownLine } from "react-icons/ri";
import evangadi from "../../image/evangadi.png";
import { useContext } from "react";
import { AuthContext } from "../../App";
import UserMenu from "../UserMenu/UserMenu";
const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [userMenu, setUserMenu] = useState(false);
  const { user, setUser } = useContext(AuthContext);
  const handleMenuClick = () => {
    setMenuOpen(!menuOpen);
  };
  return (
    <header>
      <nav>
        <div className="log">
          <img src={evangadi} alt="Evangadi Logo" />
        </div>
        <div className="menu">
          <div
            className="menu-btn__burger"
            onClick={() => {
              handleMenuClick();
            }}
          >
            <AiOutlineMenu />
          </div>
          {menuOpen && (
            <ul className={"nav-links"}>
              <li>
                <NavLink
                  to="/"
                  style={({ isActive }) => ({
                    color: isActive ? "#f68402" : "",
                  })}
                >
                  Home
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/how"
                  style={({ isActive }) => ({
                    color: isActive ? "#f68402" : "",
                  })}
                >
                  How it works
                </NavLink>
              </li>
              <li className="btn">
                <NavLink
                  to="/signin"
                  style={({ isActive }) => ({
                    color: isActive ? "#f68402" : "",
                  })}
                  onClick={() => {
                    if (token) {
                      localStorage.removeItem("token");
                      setToken(null);
                    }
                  }}
                >
                  {token ? "Sign out" : "Sign IN"}
                </NavLink>
              </li>
            </ul>
          )}
        </div>
        <div className="submenu">
          <ul className={`nav-links`}>
            <li>
              <NavLink
                to={token ? "/forum" : "/"}
                style={({ isActive }) => ({
                  color: isActive ? "#fe8402" : "",
                })}
              >
                Home
              </NavLink>
            </li>
            <li>
              <NavLink to="./">How it works</NavLink>
            </li>
            {token ? (
              <>
                <div
                  className="user"
                  onMouseEnter={() => setUserMenu(true)}
                  onMouseLeave={() => setUserMenu(false)}
                >
                  <div className="user-profile">
                    {user?.imageBlob && user.imageBlob[user?.userid] ? (
                      <img
                        src={
                          user?.imageBlob
                            ? `http://localhost:4000/api/all/images/${
                                user.imageBlob[user?.userid]
                              }`
                            : ""
                        }
                        alt="User Profile"
                      />
                    ) : (
                      <Avatar
                        name={user?.username}
                        size="40"
                        round={true}
                        // color={randomColor}
                      />
                    )}
                  </div>
                  <div className="user-name">
                    <h3>
                      {user?.username}
                      <RiArrowDropDownLine />
                    </h3>
                  </div>
                  {userMenu && (
                    <UserMenu
                    // refresh={() => {
                    //   setUserImage(!userImage);
                    // }}
                    />
                  )}
                </div>
                {/* <div className="user-name">
                  <NavLink
                    to={token ? "./" : "/signin"}
                    style={({ isActive }) => ({
                      color: isActive ? "#fe8402" : "",
                    })}
                    onClick={() => {
                      if (token) {
                        localStorage.removeItem("token");
                        // setToken(null);
                      }
                    }}
                  >
                    {user?.username}
                  </NavLink>
                </div> */}
              </>
            ) : (
              <li className="btn">
                <NavLink
                  to="/signin"
                  style={({ isActive }) => ({
                    color: isActive ? "#fe8402" : "",
                  })}
                  onClick={() => {
                    if (token) {
                      localStorage.removeItem("token");
                      setToken(null);
                    }
                  }}
                >
                  Sign In
                </NavLink>
              </li>
            )}
          </ul>
        </div>
      </nav>
    </header>
  );
};

export default Header;
