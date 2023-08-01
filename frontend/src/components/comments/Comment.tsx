//import React, { useContext, useEffect, useRef, useState } from "react";

const Comment = (props) => {
  const userName = "juliusomo";

  return (
    <div className="relative flex w-full flex-wrap-reverse gap-2 rounded-lg bg-white px-5 py-4 shadow-sm sm:flex-nowrap sm:gap-5">
      <div className="w-full">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <img
              className="h-7 w-7 rounded-full"
              src={"/thebois.jpg"}
              alt="Rounded avatar"
            />
            <p className="text-sm font-semibold text-[#4a535d]">{userName}</p>
            {userName === "juliusomo" ? (
              <div className="rounded-md bg-[#5557b1] px-2 text-sm text-white">
                You
              </div>
            ) : (
              ""
            )}
            <p className="text-sm text-gray-500">10:51pm</p>
          </div>
          <div className="absolute bottom-0 right-0 p-5 sm:top-0 sm:p-3">
            {userName === "juliusomo" ? (
              1 && (
                <div className="flex gap-3">
                  <div className="flex cursor-pointer items-center gap-1 text-[14px] font-semibold text-red-500">
                    <p>Delete</p>
                  </div>
                  <div className="flex cursor-pointer items-center gap-1 text-[14px] font-semibold text-[#4a4d9c]">
                    <p>Edit</p>
                  </div>
                </div>
              )
            ) : (
              <div className="flex cursor-pointer items-center gap-1 text-[14px] font-semibold text-[#4a4d9c]">
                <p>Reply</p>
              </div>
            )}
          </div>
        </div>
        <div className="mb-3 mr-3 mt-3 text-sm text-[#707276] sm:text-[15px]">
          {props.message}
        </div>
      </div>
    </div>
  );
};

export default Comment;
