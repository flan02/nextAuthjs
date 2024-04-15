'use client'
import Link from 'next/link'
//import { useState } from 'react'

//TODO React CSR classic
import { signOut, useSession } from 'next-auth/react' //? Podemos obtener datos desde el lado cliente
import { useState } from 'react'
import { connectDB } from '@/mongodb/mongodb'

//TODO React SSR (Nextjs 13)
//import { getServerSession } from 'next-auth' //? Podemos obtener datos desde el lado servidor


function Navbar() {
    //* Requiere ser asincrono el componente si usamos SSR
    //   const session = await getServerSession() //! No vemos los cambios hasta que no se refresco la pagina
    //console.log(session?.user?.name); //! Esto es consola del backend NO del navegador
    const { data: session, status } = useSession() //! Esto es consola del navegador NO del backend
    /*
        const [user, setUser] = useState(window.localStorage.getItem('user'))
    
        if (session) {
            const setLocalStorage = (value: string) => {
                try {
                    setUser(value);
                    localStorage.setItem('user', value);
                    console.log(value)
                } catch (error) {
                    console.log(error);
                }
            }
        }
    */
    let isLogged;
    //(session && status == 'authenticated' && status != null) ? logged = true : logged = false
    (session && status == 'authenticated') ? isLogged = true : isLogged = false;
    /*
    let home;
    (!session && status !== 'loading') ? home = true : home = false;
*/
    // ? session && status == 'unauthenticated'
    //console.log('Valor del getSession: SESSION ', session);
    // console.log('Valor del useSession: STATUS', status);
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
                            (isLogged) ? (
                                <>
                                    <li>
                                        <Link href='/dashboard'>Dashboard</Link>
                                    </li>
                                    <button onClick={() => {
                                        // connectDB() // ! When we click the button, we must close the connection to mongodb 
                                        signOut()
                                    }}>Logout</button>
                                </>
                            )
                                : (
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
                        {/*
                            (home) && (
                                <>
                                    <li>
                                        <Link href='/login'>Login</Link>
                                    </li>
                                    <li>
                                        <Link href='/register'>Register</Link>
                                    </li>
                                </>
                            )
                            */   }
                    </ul>
                </div>
            </nav>
        </>
    )
}

export default Navbar