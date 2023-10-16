"use client";
import React, { useState, useRef } from "react";
import { User } from "@/types/interfaces";
import { useSession } from "next-auth/react";

const AdminPage = () => {
  const { data: session } = useSession();
  const [userData, setUserData] = useState<User>();
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  console.log(session);

  const fetchUserProfile = async () => {
    // console.log(`${session?.user.username}`);

    const username = session?.user.username;

    const res = await fetch(`/api/getusers/?username=${username}`, {
      method: "GET",
      headers: {
        "content-type": "application/json",
        Authorization: `${session?.user.accessToken}`,
      },
    });
    const data = await res.json();

    // Get current session user data
    if (data && Array.isArray(data.getUsers)) {
      const users = data.getUsers;
      const currentUser = users.find(
        (user: User) => user.username === username
      );

      if (currentUser) {
        setUserData(currentUser);
      }
    }
  };

  const handleFormSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    const file = fileInputRef.current?.files?.[0];

    if (!file) {
      return;
    }

    console.log("Selected File:", file);

    const formData = new FormData();
    formData.append("image", file);

    try {
      await fetch("/api/upload-image", {
        method: "POST",
        body: formData,
      });
      console.log("Image uploaded successfully!");
    } catch (error) {
      console.error("Failed to upload image:", error);
    }
  };

  return (
    <form onSubmit={handleFormSubmit}>
      <div>
        <h1>Your landed on AdminPage!!</h1>

        {/* <input
          className="mt-10"
          type="file"
          accept="image/*"
          ref={fileInputRef}
        />

        <button className="bg-blue-600 rounded-md w-28 h-10" type="submit">
          Upload
        </button> */}
        <div>
          <button
            className="btn bg-sidebar rounded mt-10 border-none h-6 mb-5 text-gray-900 bg-red-100"
            onClick={fetchUserProfile}
          >
            Click here to fetch current User Profile Data
          </button>
        </div>

        <div style={{ display: "flex", flexDirection: "row" }}>
          <p className="text-gray-300">Name:</p>
          <p className="text-green-500 ml-14">{userData?.name}</p>
        </div>
        <div style={{ display: "flex", flexDirection: "row" }}>
          <p className="text-gray-300">UserName:</p>
          <p className="text-green-500 ml-5">{userData?.username}</p>
        </div>
        <div style={{ display: "flex", flexDirection: "row" }}>
          <p className="text-gray-300">Role:</p>
          <p className="text-green-500 ml-16">{userData?.role}</p>
        </div>
      </div>
    </form>
  );
};

export default AdminPage;
