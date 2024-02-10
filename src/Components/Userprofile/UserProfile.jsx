import React, { useContext, useEffect, useState } from "react";
import Avatar from "react-avatar";
import { AuthContext } from "../../App";
const UserProfile = ({ username, userid }) => {
  const { user } = useContext(AuthContext);
  const [randomColor, setRandomColor] = useState(null);
  useEffect(() => {
    const randomColorGenerator = () => {
      let randomColor = Math.floor(Math.random() * 16777215).toString(16);
      if (randomColor.length !== 6) {
        randomColorGenerator();
      } else {
        if (randomColor === "ffffff" || randomColor === "000000") {
          randomColorGenerator();
        } else {
          setRandomColor("#" + randomColor);
        }
      }
    };
    randomColorGenerator();
  }, []);
  return (
    <div className="user-profile">
      <Avatar
        name={username ? username : user?.username}
        size="40"
        round={true}
        color={randomColor}
      />
    </div>
  );
};

export default UserProfile;