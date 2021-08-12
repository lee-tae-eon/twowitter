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
      });
  }, []);

  const onSubmit = async (event) => {
    event.preventDefault();

    // const response = await fileAttach.map((file) => {
    //   const fileref = storageServ.ref().child(`${userObj.uid}/${uuidv4()}`);
    //   return fileref.putString(file, "data_url");
    // });

    // 파일 여러개 업로드 Promise 이용
    // const fileUploadHandle = async (file) => {
    //   return new Promise((resolve, reject) => {
    //     setTimeout(() => {
    //       const fileref = storageServ.ref().child(`${userObj.uid}/${uuidv4()}`);
    //       resolve(fileref.putString(file, "data_url"));
    //     }, 200);
    //   });
    // };
    const response = await Promise.all(
      fileAttach.map((file) => {
        const fileref = storageServ.ref().child(`${userObj.uid}/${uuidv4()}`);
        return fileref.putString(file, "data_url");
      })
    );
    console.log(response);

    const downUrl = await Promise.all(
      response.map((res) => res.ref.getDownloadURL())
    );

    console.log(downUrl);

    // if (newTweet !== "") {
    //   await dbServ.collection("twowitter").add({
    //     text: newTweet,
    //     createdAt: Date.now(),
    //     creatorId: userObj.uid,
    //   });
    // } else {
    //   console.log("메세지를 써주세요");
    //   alert("3글자 이상 써주세요");
    // }
    // setNewTweet("");
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
      </form>
      {fileAttach.map((file, index) => (
        <div key={index}>
          <img
            src={file}
            key={index}
            alt="업로드사진"
            style={{ width: "200px", height: "100px" }}
          />
          <button name={file} onClick={onClearPhotoClick}>
            업로드 취소
          </button>
        </div>
      ))}
      {newTweets.map((tweet) => (
        <NewTweet
          key={tweet.id}
          tweetObj={tweet}
          isOwner={tweet.creatorId === userObj.uid}
        />
      ))}
    </>
  );
};

export default Home;
