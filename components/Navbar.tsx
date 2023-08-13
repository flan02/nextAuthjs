import Link from 'next/link'

//TODO React CSR classic
//import { useSession } from 'next-auth/react' //? Podemos obtener datos desde el lado cliente

//TODO React SSR (Nextjs 13)
import { getServerSession } from 'next-auth' //? Podemos obtener datos desde el lado servidor

async function Navbar() {

    const session = await getServerSession() //! No vemos los cambios hasta que no se refresco la pagina
    //console.log(session?.user?.name); //! Esto es consola del backend NO del navegador
    return (
        <>
            <nav className=''>
                <div className=''>
                    <h1>NextAuth</h1>
                    <ul>
                        {
                            session ? (
                                <li>
                                    <Link href='/dashboard'>Dashboard</Link>
                                </li>
                            ) : (
                                <>
                                    <li>
                                        <Link href='/login'>Login</Link>
                                    </li>
                                    <li>
                                        <Link href='/register'>Register</Link>
                                    </li>
                                </>
                            )
                        }
                        <li>
                            <Link href='/about'>About</Link>
                        </li>

                    </ul>
                </div>
            </nav>
        </>
    )
}

export default Navbar