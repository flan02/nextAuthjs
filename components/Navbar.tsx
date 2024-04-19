import Link from "next/link";
import { authOpts } from "@/app/api/auth/[...nextauth]/route";
// TODO: This session is readed from the server (for server components)
import { getServerSession } from "next-auth/next";


// * Backend component always will be async
async function Navbar() {
  const session = await getServerSession(authOpts);
  console.log(session);

  // TODO: This component will be processed on the backend
  return (
    <nav className="">
      <h1 className="">NextAuth</h1>

      <ul className="">
        {!session?.user ? (
          <>
            <li>
              <Link href="/">Home</Link>
            </li>
            <li>
              <Link href="/auth/login">Login</Link>
            </li>
            <li>
              <Link href="/auth/register">Register</Link>
            </li>
          </>
        ) :
          (
            <Link href="/api/auth/signout">Logout</Link> // ? This link will be processed on the backend but its route move us to a client component (use client)
          )
        }


      </ul>
    </nav>
  );
}

export default Navbar;