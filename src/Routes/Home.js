import NewTweet from "components/NewTweet";
import { dbServ, storageServ } from "Fbase";
import React, { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";

const Home = ({ userObj }) => {
  const [newTweet, setNewTweet] = useState("");
  const [newTweets, setNewTweets] = useState([]);
  const [fileAttach, setFileAttach] = useState([]);

  useEffect(() => {
    dbServ
      .collection("twowitter")
      .orderBy("createdAt", "desc")
      .onSnapshot((snap) => {
        const tweetArray = snap.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setNewTweets(tweetArray);
        console.log(tweetArray);
      });
    return;
  }, []);

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

      <div>
        {newTweets.map((tweet) => (
          <NewTweet
            key={tweet.id}
            tweetId={tweet.id}
            tweetObj={tweet}
            isOwner={tweet.creatorId === userObj.uid}
          />
        ))}
      </div>
    </>
  );
};

export default Home;
