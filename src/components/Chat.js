import React, { useRef, useEffect, useState } from "react";
import firebase from "firebase/app";
import Message from "./Message";

export default function Chat({ user = null, db = null }) {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [loader, setLoader] = useState(true);
  const dummy = useRef();
  const { uid, displayName, photoURL } = user;

  useEffect(() => {
    if (db) {
      const unsubscribe = db
        .collection("messages")
        .orderBy("createdAt")
        .limit(50)
        .onSnapshot((querySnapshot) => {
          const data = querySnapshot.docs.map((doc) => ({
            ...doc.data(),
            id: doc.id,
          }));
          console.log("la data:", data);
          setMessages(data);
          setLoader(false);
        });
      return unsubscribe;
    }
  }, [db]);

  const handleOnSubmit = (e) => {
    e.preventDefault();
    if (db) {
      db.collection("messages").add({
        text: newMessage,
        createdAt: firebase.firestore.FieldValue.serverTimestamp(),
        uid,
        displayName,
        photoURL,
      });
    }
    setNewMessage("");
    dummy.current.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="h-screen bg-gray-200 pb-20 px-4 relative box-border">
      {loader ? (
        <h1> Loading messages... </h1>
      ) : (
        <div className="h-full overflow-y-auto  pb-16">
          {messages.map((message) => {
            return (
              <div key={message.id}>
                <Message identifier={uid} {...message} />
              </div>
            );
          })}
          <span ref={dummy}></span>
        </div>
      )}

      <div>
        <form
          onSubmit={handleOnSubmit}
          className="h-18 box-border p-4 bg-purple-200 z-20 flex justify-center fixed bottom-0 left-0 h-1/7 w-full"
        >
          <input
            type="text"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            className="bg-gray-100 w-4/5 p-3 rounded-md "
          />
          <button
            type="submit"
            className="ml-1 bg-gradient-to-r from-purple-200 to-purple-400 w-1/5 p-3 rounded-md "
          >
            Send
          </button>
        </form>
      </div>
    </div>
  );
}
