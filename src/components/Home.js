import React from "react";

export default function Home({ signIn }) {
  return (
    <>
      <div className="w-full flex justify-center ">
        <div className="p-5 mt-7 bg-white shadow-md rounded-md box-border w-2/3">
          <h2 className="text-4xl font-bold">Sign in</h2>
          <p className="text-gray-400 leading-5 mt-2 ">
            LV is an app that will allow you to get in contact with your firends
          </p>
          <button
            type="button"
            onClick={(e) => signIn(e)}
            className="bg-gradient-to-r from-purple-200 to-purple-400 rounded py-2 w-full mt-4 "
          >
            Sign in with Google
          </button>
        </div>
      </div>
    </>
  );
}
