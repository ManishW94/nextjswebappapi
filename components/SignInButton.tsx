"use client";
import { signIn, signOut } from "next-auth/react";
import React from "react";
import { useRouter } from "next/navigation";

const SignInButton = ({user}) => {
  const navigate = useRouter();
    console.log('User', user)
  if (user) {
    return (
      <div className="flex gap-4 ml-auto">
        <h4 className="text-sky-600">
          Welcome, {user.name}
          <p className="text-green-600">Role: {user.role}</p>
        </h4>

        <button onClick={() => signOut()} className="text-red-600">
          Sign Out
        </button>
      </div>
    );
  }
  return (
    <>
      <button
        onClick={() => navigate.push("/signup")}
        className="text-red-400 justify-end"
      >
        Sign Up
      </button>

      <button onClick={() => signIn()} className="text-green-600 ml-auto">
        Sign In
      </button>
    </>
  );
};

export default SignInButton;
