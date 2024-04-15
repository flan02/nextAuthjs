import Link from "next/link";




export default function Home() {

  return (
    <>
      <main>
        <h1>JWT auth with Middlewares and private routes</h1>
        <Link href="/login">Login</Link>

      </main>
      <br /><br /><br />
      <footer>
        <a href="https://react-hook-form.com/" target="_blank">react libraries forms</a> <br />
        <a href="https://tempo.formkit.com/" target="_blank">react handle dates</a>
      </footer>
    </>
  )
}