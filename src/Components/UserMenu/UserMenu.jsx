import React, { useContext, useState } from "react";
import "./UserMenu.css";
import { AuthContext } from "../../App";
import { uploadImage } from "../../api";
import { Link } from "react-router-dom";
import { IoMdArrowDropup } from "react-icons/io";
import { calcLength } from "framer-motion";
const UserMenu = ({ refresh }) => {
  const { user } = useContext(AuthContext);
  const token = localStorage.getItem("token");
  return (
    <>
      {/* <IoMdArrowDropup className="user-menu-arrow" /> */}
      <div className="user-menu">
        <ul>
          {/* <li>
            <label htmlFor="upload-photo">
              change photo
              <input
                type="file"
                id="upload-photo"
                accept="image/*"
                onChange={handleImageChange}
                // disabled
              />
            </label>
          </li> */}
          <li>
            <Link
              to={`${token} ? "./" :"/signin"`}
              onClick={() => {
                if (token) {
                  localStorage.removeItem("token");
                }
              }}
            >
              Logout
            </Link>
          </li>
        </ul>
      </div>
    </>
  );
};

export default UserMenu;
