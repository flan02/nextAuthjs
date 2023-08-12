"use client"

import axios, { AxiosError } from "axios"
import { FormEvent, useState } from "react"
import { signIn } from 'next-auth/react' //? Podemos loguearnos inmediatamente despues de registrarnos
import { useRouter } from "next/navigation"

//! Por defecto los botones qe van dentro de un form llevan el tipo submit

const Register = () => {
    const [error, setError] = useState('')
    const router = useRouter()

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        const formData = new FormData(e.currentTarget) //* Obtenemos los datos del formulario
        try {
            const email = formData.get('email')
            const password = formData.get('password')
            const fullname = formData.get('fullname')
            //console.log(email, password, fullname);
            //TODO Guardar los datos en una sesion podemos usar redux o context y localstorage
            const signupResponse = await axios.post('/api/auth/signup', { email, password, fullname })
            setError('')
            console.log(signupResponse);
            const resAuth = await signIn('credentials', { //* Respuesta de next-auth
                email: signupResponse.data.email,
                password,
                redirect: false,
                //callbackUrl: '/'
            }) //* Hacemos el login
            if (resAuth?.ok) return router.push('/dashboard') //* Si el login es correcto redireccionamos
            //console.log(resAuth)
        } catch (error) {
            //console.log(error)
            if (error instanceof AxiosError) setError(error.response?.data.message)
        }

    }

    //! Usar bibliotecas como formit, reactfrom para manejar formularios desde el frontend
    //TODO Por el momento nuestro login solo esta validado desde el backend.

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <h1>Signup</h1>
                <input type="text" name="fullname" placeholder="fullname" /><br />
                <input type="email" name="email" placeholder="some@email.com" /><br />
                <input type="password" name="password" placeholder="******" /><br />
                <button type="submit">Register</button>
                {error && <p style={{ background: "red", color: "white", width: "max-content" }}>{error}</p>}
            </form>
        </div>
    )
}

export default Register