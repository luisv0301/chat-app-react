import React from "react";

export default function Message({
  identifier,
  text,
  photoURL,
  displayName,
  uid,
}) {
  return (
    <div
      className={` flex w-full p-3 ${
        identifier === uid ? "bg-gray-100" : "bg-purple-200"
      } rounded-md my-4 shadow-md box-border`}
    >
      <div>
        <img
          className="w-9 h-9 bg-indigo-300 rounded-full"
          src={photoURL && photoURL}
          alt="avatar"
        />
      </div>
      <div className="ml-2">
        <h4 className="font-bold">{displayName && displayName}</h4>
        <p>{text && text}</p>
      </div>
    </div>
  );
}
