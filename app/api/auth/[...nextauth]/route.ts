import NextAuth from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'

//? NextAuth tiene Databases y guarda directamente en la base de dato
//! Estas funciones se ejecutan en el servidor varias veces
//TODO podemos autenticar usando de providers: credenciales, google, facebook, github, etc

const handler = NextAuth({
    providers: [
        CredentialsProvider({
            name: 'credentials',
            credentials: {
                email: { label: "Email", type: "email", placeholder: "some@hotmail.com" },
                password: { label: "Password", type: "password", placeholder: "********" }
            },
            authorize(credentials, req) {
                const user = { id: "1", fullname: 'flan02', email: 'chanivetdan@hotmail.com' }
                return user
            }
        })
    ],
    callbacks: {
        jwt({ account, token, user, profile, session }) {
            console.log({
                account,
                token,
                user,
                profile,
            });
            // * Aqui podemos modificar el token p/q guarde los datos qe ya tiene.
            // token.hello = "hello world."
            return token
        },
        // session() { },
    }
})

// * Tambien podemos usar el metodo SIGNIN en los callbacks

export { handler as GET, handler as POST }