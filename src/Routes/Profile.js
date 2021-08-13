import { dbServ } from "Fbase";
import React, { useEffect, useState } from "react";

const Profile = ({ userObj, updateUser }) => {
  const [updateName, setUpdateName] = useState(userObj.displayName);

  const getMyTweet = async () => {
    const tweets = await dbServ
      .collection("twowitter")
      .where("creatorId", "==", userObj.uid)
      .orderBy("createdAt", "desc")
      .get();
  };

  useEffect(() => {
    getMyTweet();
  }, []);

  const onChange = (event) => {
    const {
      target: { value },
    } = event;
    setUpdateName(value);
  };
  const onSubmit = async (event) => {
    event.preventDefault();
    if (userObj.displayName !== updateName) {
      await userObj.updateProfile({
        displayName: updateName,
      });
      updateUser();
    }
  };

  return (
    <form onSubmit={onSubmit}>
      <input
        onChange={onChange}
        type="text"
        placeholder="이름"
        value={updateName}
      />
      <input type="submit" value="update name" />
    </form>
  );
};

export default Profile;
