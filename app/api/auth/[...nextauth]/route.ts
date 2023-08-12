import NextAuth from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'
import { connectDB } from '@/mongodb/mongodb'
import User from '@/models/user'
import bcrypt from 'bcryptjs'

//? NextAuth tiene Databases y guarda directamente en la base de dato
//? Recordar qe una cosa es el TOKEN & otra cosa es la SESSION

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
            async authorize(credentials, req) {
                //const user = { id: "1", fullname: 'flan02', email: 'chanivetdan@hotmail.com' }
                await connectDB()
                //console.log(credentials);
                const userFound = await User.findOne({ email: credentials?.email }).select("+password") //? El + es p/ añada el campo password
                if (!userFound) throw new Error("Invalid credentials") //! Nunca especificar que datos son invalidos.
                const passwordMatch = await bcrypt.compare(credentials!.password, userFound.password)
                if (!passwordMatch) throw new Error("Invalid credentials") //! Nunca especificar que datos son invalidos.
                console.log(userFound);
                return userFound
            }
        })
    ],
    callbacks: {
        jwt({ account, token, user, profile, session }) {
            /*   console.log({account,token,user,profile,}); */
            // * Aqui podemos modificar el token p/q guarde los datos qe ya tiene.
            // token.hello = "hello world"
            if (user) token.user = user //? Lo qe recibe de mongo lo guarda en el token
            //console.log(token);
            return token
        },
        session({ session, token }) {
            //console.log(session);
            //TODO crear interfaz nunca ANY, esto aparece en el frontend
            session.user = token.user as any //? La sesion tendra en el navegador data del token
            return session
        },
    },
    pages: {
        signIn: '/login', //* Si accedo a localhost:3000/api/auth/signin me redirecciona a /login
    }
})

// * Tambien podemos usar el metodo SIGNIN en los callbacks

export { handler as GET, handler as POST }