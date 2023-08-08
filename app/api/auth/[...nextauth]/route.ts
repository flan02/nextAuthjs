import NextAuth from "next-auth";
import GithubProvider from "next-auth/providers/github";

// TODO 1: Crear un auth en Github
//? https://github.com/settings/developers
//? Authorization callback URL: http://localhost:3000/api/auth/callback/github
//* Si usamos otra URL, debemos cambiarla en el provider de arriba

//* [...nextauth] Procesa cualquier ruta que venga despues de api/auth
//* Por ejemplo: api/auth/signin, api/auth/signout, etc.

// TODO 2: Crear un archivo .env.local

// TODO 3: Este modulo lo crea NextAuth
// http://localhost:3000/api/auth/signin

const clientID = process.env.GITHUB_ID || ""
const clientSecret = process.env.GITHUB_SECRET || ""

const handler = NextAuth({
    //! Todos la info debe ir en variables de entorno
    providers: [
        GithubProvider({
            clientId: clientID,
            clientSecret: clientSecret
        })
    ]
})

export { handler as GET, handler as POST }