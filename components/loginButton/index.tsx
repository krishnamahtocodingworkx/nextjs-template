"use client";

import { signIn, signOut, useSession } from "next-auth/react";

export default function LoginButton() {
    const { data: session } = useSession();

    if (session) {
        console.log("SESSION DATA (BROWSER):", session);
        console.log("USER DATA (BROWSER):", session.user);

        return (
            <div>
                <p>{session.user?.name}</p>
                <p>{session.user?.email}</p>
                <img src={session.user?.image} width={50} alt="profile"/>
                <button onClick={() => signOut()}>Logout</button>
            </div>
        );
    }

    return <button className="border " onClick={() => signIn("google")}>Login with Google</button>;
}
