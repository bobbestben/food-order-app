"use client";
import { signOut, useSession } from "next-auth/react"
import { useEffect } from "react";
import Link from "next/link";

export default function Header() {
  const session = useSession();
  const status = session?.status;
  // const { data: session, status } = useSession()
  // useEffect(() => {s
  //   session = useSession()
  // }, [session, status])
  console.log("session")
  console.log(session);
  console.log(status);
  // BEN-TODO to fix this session thing
  // const status = session.status
  // const status = "authenticated"
  const userData = session.data?.user
  console.log("userData")
  console.log(userData);
  let userName = userData?.name || userData?.email || "Nousername"
  console.log(userData?.name)
  if (userName && userName.includes(' ')) {
    userName = userName.split(' ')[0];
    console.log("2" + userName);
  }

  return (
    <header className="flex items-center justify-between">
      <nav className="flex items-center gap-8 text-gray-500 font-semibold">
        <Link className="text-primary font-semibold text-2xl"
          href="">My Pizza Shop</Link>
        <Link href={''}>Home</Link>
        <Link href={''}>Menu</Link>
        <Link href={''}>About</Link>
        <Link href={''}>Contact</Link>
      </nav>
      <nav className="flex items-center gap-4 text-gray-500
        font-semibold">
        {status === 'authenticated' && (
          <>
          {console.log("status: " + status)}
          {console.log("username: " + userName)}
          {console.log(session)}
          <Link href={'/profile'} className="whitespace-nowrap">
          Hello, {userName}
          </Link>
          <button
            onClick={() => signOut()}
            className="bg-primary rounded-full text-white px-8 py-2">
            Logout
          </button>
          </>
        )}
        {status === 'unauthenticated' && (
          <>
            <Link href={'/login'}>Login</Link>
            <Link href={'/register'} className="bg-primary rounded-full
         text-white px-8 py-2">
              Register
            </Link>
          </>
        )}
      </nav>
    </header>
  )
}