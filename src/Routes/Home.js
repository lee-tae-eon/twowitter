import NewTweet from "components/NewTweet";
import { dbServ } from "Fbase";
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import TweetFactory from "components/TweetFactory";
import PropTypes from "prop-types";

const HomeContainer = styled.div``;

const Home = ({ userObj }) => {
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
    return;
  }, []);

  return (
    <HomeContainer>
      <TweetFactory userObj={userObj} />
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
    </HomeContainer>
  );
};

Home.propTypes = {
  userObj: PropTypes.object.isRequired,
};

export default Home;
