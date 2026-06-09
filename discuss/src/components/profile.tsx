"use client";

import { useSession } from "next-auth/react";

export default function Profile() {
  const session = useSession();
  console.log("session from client", session);

  if (session.data?.user) {
    return <div>From client: {JSON.stringify(session.data.user)}</div>;
  }

  return <div>From client: user is NOT signed in</div>;
}
