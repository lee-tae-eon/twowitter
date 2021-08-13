import { dbServ, storageServ } from "Fbase";
import React, { useState } from "react";
import PropTypes from "prop-types";

const NewTweet = ({ tweetObj, isOwner, tweetId }) => {
  const [editor, setEditor] = useState(false);
  const [editTweet, setEditTweet] = useState(tweetObj.text);

  const onDelClick = async () => {
    const ok = window.confirm("삭제 하시겠습니까?");
    if (ok) {
      await dbServ.doc(`twowitter/${tweetId}`).delete();
      await tweetObj.downLoadUrl.map((img) =>
        storageServ.refFromURL(img).delete()
      );
    }
  };

  const onEditClick = async () => {
    setEditor((prev) => !prev);
  };

  const onSubmit = async (event) => {
    event.preventDefault();
    await dbServ.doc(`twowitter/${tweetObj.id}`).update({ text: editTweet });
    setEditor(false);
  };

  const onChange = (event) => {
    const {
      target: { value },
    } = event;
    setEditTweet(value);
  };

  return (
    <div>
      {editor ? (
        <>
          <form onSubmit={onSubmit}>
            <input onChange={onChange} type="text" value={editTweet} required />
            <input type="submit" value="수정" />
            <button onClick={onEditClick}>취소</button>
          </form>
        </>
      ) : (
        <>
          <h4>{editTweet}</h4>
          {tweetObj.downLoadUrl &&
            tweetObj.downLoadUrl.map((img, index) => (
              <img
                key={index}
                src={img}
                alt=""
                style={{ width: "50px", height: "50px" }}
              />
            ))}
          {isOwner && (
            <>
              <button onClick={onDelClick}>Delete</button>
              <button onClick={onEditClick}>Edit</button>
            </>
          )}
        </>
      )}
    </div>
  );
};

NewTweet.propTypes = {
  tweetObj: PropTypes.shape({
    text: PropTypes.string.isRequired,
    id: PropTypes.string.isRequired,
    downLoadUrl: PropTypes.array.isRequired,
  }).isRequired,
  isOwner: PropTypes.bool.isRequired,
  tweetId: PropTypes.string.isRequired,
};

export default NewTweet;
