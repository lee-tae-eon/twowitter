import NewTweet from "components/NewTweet";
import { dbServ } from "Fbase";
import React, { useEffect, useState } from "react";

const Home = ({ userObj }) => {
  const [newTweet, setNewTweet] = useState("");
  const [newTweets, setNewTweets] = useState([]);

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
    if (newTweet !== "") {
      await dbServ.collection("twowitter").add({
        text: newTweet,
        createdAt: Date.now(),
        creatorId: userObj.uid,
      });
    } else {
      console.log("메세지를 써주세요");
      alert("3글자 이상 써주세요");
    }
    setNewTweet("");
  };
  const onChange = (event) => {
    const {
      target: { value },
    } = event;
    setNewTweet(value);
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
        <input type="submit" value="tweet" />
      </form>

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
