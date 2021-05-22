import React from "react";

export default function Nav({ user, signOut }) {
  return (
    <div className=" bg-purple-300 shadow-sm  p-4 flex justify-between sticky ">
      <h4 className="font-bold ">{user ? "Chat Room" : "Chat App"}</h4>
      {user ? (
        <button className="px-3 py-1 bg-white rounded-md " onClick={signOut}>
          Sign out
        </button>
      ) : null}
    </div>
  );
}
