import { storageServ, dbServ } from "Fbase";
import React, { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import PropTypes from "prop-types";

const TweetFactory = ({ userObj }) => {
  const [newTweet, setNewTweet] = useState("");
  const [fileAttach, setFileAttach] = useState([]);
  const onSubmit = async (event) => {
    event.preventDefault();

    let downLoadUrl = [];
    if (fileAttach !== []) {
      const response = await Promise.all(
        fileAttach.map((file) => {
          const fileref = storageServ.ref().child(`${userObj.uid}/${uuidv4()}`);
          return fileref.putString(file, "data_url");
        })
      );

      downLoadUrl = await Promise.all(
        response.map((res) => res.ref.getDownloadURL())
      );
    }
    const newTweetObj = {
      text: newTweet,
      createdAt: Date.now(),
      creatorId: userObj.uid,
      downLoadUrl,
    };

    await dbServ.collection("twowitter").add(newTweetObj);

    setNewTweet("");
    setFileAttach([]);
  };
  const onChange = (event) => {
    const {
      target: { value },
    } = event;
    setNewTweet(value);
  };

  const onFileChange = (event) => {
    const {
      target: { files },
    } = event;

    const imgFiles = [...files];

    imgFiles.forEach((file) => {
      const imgReader = new FileReader();
      imgReader.onload = (event) => {
        const {
          currentTarget: { result },
        } = event;
        setFileAttach((fileAttach) => [...fileAttach, result]);
      };
      imgReader.readAsDataURL(file);
    });
    return setFileAttach([]);
  };

  const onClearPhotoClick = (event) => {
    const {
      target: { name },
    } = event;
    setFileAttach(fileAttach.filter((file) => file !== name));
  };

  return (
    <>
      <form onSubmit={onSubmit}>
        <input
          value={newTweet}
          onChange={onChange}
          type="text"
          placeholder="메세지를 써주세요"
          maxLength={120}
          minLength={3}
        />
        <input type="file" accept="image/*" multiple onChange={onFileChange} />
        <input type="submit" value="tweet" />
        {fileAttach &&
          fileAttach.map((file, index) => (
            <div key={index}>
              <img
                src={file}
                key={index}
                alt="업로드사진"
                style={{ width: "50px", height: "50px" }}
              />
              <button name={file} onClick={onClearPhotoClick}>
                업로드 취소
              </button>
            </div>
          ))}
      </form>
    </>
  );
};

TweetFactory.propTypes = {
  userObj: PropTypes.object.isRequired,
};

export default TweetFactory;
