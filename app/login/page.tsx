"use client"
import { FormEvent, useState } from "react"
import { signIn } from 'next-auth/react' //? Podemos loguearnos inmediatamente despues de registrarnos
import { useRouter } from "next/navigation"
import Link from "next/link"

//! Por defecto los botones qe van dentro de un form llevan el tipo submit

const Login = () => {
    const [error, setError] = useState('')
    const router = useRouter()

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        const formData = new FormData(e.currentTarget) //* Obtenemos los datos del formulario
        const email = formData.get('email')
        const password = formData.get('password')
        //console.log(email, password);
        //TODO Guardar los datos en una sesion podemos usar redux o context y localstorage
        const resAuth = await signIn('credentials', { //* Respuesta de next-auth
            email,
            password,
            redirect: false,
        }) //* Hacemos el login
        if (resAuth?.error) return setError(resAuth.error as string)
        if (resAuth?.ok) return router.push('/dashboard') //* Si el login es correcto redireccionamos
        //console.log(resAuth)
    }

    const handleGithub = () => {
        signIn('github')
    }

    //! Usar bibliotecas como formit, reactfrom para manejar formularios desde el frontend
    //TODO Por el momento nuestro login solo esta validado desde el backend.

    return (
        <div>
            <h1>Signin</h1>
            <form onSubmit={handleSubmit}>
                <input type="email" name="email" placeholder="some@email.com" /><br />
                <input type="password" name="password" placeholder="******" /><br />
                <button type="submit">Login</button>
                {error && <p style={{ background: "red", color: "white", width: "max-content" }}>{error}</p>}
            </form>
            <button onClick={handleGithub}>Sign up with Github</button>
        </div>
    )
}

export default Login