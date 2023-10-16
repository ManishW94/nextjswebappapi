"use client";
import { signIn, signOut, useSession } from "next-auth/react";
import React from "react";
import { useRouter } from "next/navigation";

const SignInButton = () => {
  const navigate = useRouter();
  const { data: session } = useSession();
  console.log(session?.user);

  if (session && session.user) {
    return (
      <div className="flex gap-4 ml-auto">
        <h4 className="text-sky-600">
          Welcome, {session.user.name}
          <p className="text-green-600">Role: {session.user.role}</p>
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
