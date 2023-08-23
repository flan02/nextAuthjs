'use client'
import Link from 'next/link'

//TODO React CSR classic
import { signOut, useSession } from 'next-auth/react' //? Podemos obtener datos desde el lado cliente

//TODO React SSR (Nextjs 13)
import { getServerSession } from 'next-auth' //? Podemos obtener datos desde el lado servidor

function Navbar() {
    //* Requiere ser asincrono el componente si usamos SSR
    //const session = await getServerSession() //! No vemos los cambios hasta que no se refresco la pagina
    //console.log(session?.user?.name); //! Esto es consola del backend NO del navegador
    const { status } = useSession() //! Esto es consola del navegador NO del backend
    console.log('This is the current status', status);

    //! Importante
    //! El getServerSession envia el componente desde el servidor, asi que si el cliente peticiona el componente, este no se actualizara hasta que el servidor lo envie de nuevo
    return (
        <>
            <nav className=''>
                <div className=''>
                    <Link href='/'>Next Auth</Link>
                    <ul>
                        <li>
                            <Link href='/about'>About</Link>
                        </li>
                        {
                            (status === "unauthenticated" || status !== null) ? (
                                <>
                                    <li>
                                        <Link href='/login'>Login</Link>
                                    </li>
                                    <li>
                                        <Link href='/register'>Register</Link>
                                    </li>

                                </>

                            ) : (

                                <li>
                                    <Link href='/dashboard'>Dashboard</Link>
                                </li>
                            )
                        }
                        {
                            (status !== "unauthenticated" && status !== "loading")
                                ? <button onClick={() => { signOut() }}>Logout</button>
                                : null
                        }
                    </ul>
                </div>
            </nav>
        </>
    )
}

export default Navbar