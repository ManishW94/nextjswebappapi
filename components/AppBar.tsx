"use client"
import Link from "next/link";
import React from "react";
import SignInButton from "./SignInButton";
import {useSession} from "next-auth/react";

const AppBar = () => {
    const {data: session, status} = useSession()
    let isAdmin = false
    if (status === 'loading') {
        isAdmin = false
    }
    if (session && session?.user) {
        isAdmin = session.user.role === "admin"
    }
    console.log('AppBar', session?.user)
        return (
            <header className="flex gap-4 p-4 bg-gradient-to-b from-white text-black to-gray-200 shadow">
                <Link className="transition-colors hover:text-blue-500" href={"/"}>
                    Home Page
                </Link>
                <Link
                    className="transition-colors hover:text-blue-500"
                    href={"/UserPost"}
                >
                    User Post Page
                </Link>
                {isAdmin ? (
                    <Link className="text-sky-600 hover:text-sky-700" href={"/admin"}>
                        Admin Panel
                    </Link>
                ) : (
                    <Link className="text-sky-600 hover:text-sky-700" href={"/user"}>
                        User Panel
                    </Link>
                )}
                <SignInButton user={session?.user}/>
            </header>
        );
};

export default AppBar;
