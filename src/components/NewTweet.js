import { dbServ } from "Fbase";
import React, { useState } from "react";

const NewTweet = ({ tweetObj, isOwner }) => {
  const [editor, setEditor] = useState(false);
  const [editTweet, setEditTweet] = useState(tweetObj.text);
  const onDelClick = async () => {
    const ok = window.confirm("삭제 하시겠습니까?");

    if (ok) {
      await dbServ.doc(`twowitter/${tweetObj.id}`).delete();
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

export default NewTweet;
