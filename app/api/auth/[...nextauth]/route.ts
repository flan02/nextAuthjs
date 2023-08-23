import NextAuth from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'
import GithubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";
import LinkedinProvider from "next-auth/providers/linkedin";
import FacebookProvider from "next-auth/providers/facebook";
import { connectDB } from '@/mongodb/mongodb'
import User from '@/models/user'
import bcrypt from 'bcryptjs'

//? NextAuth tiene Databases y guarda directamente en la base de dato
//? Recordar qe una cosa es el TOKEN & otra cosa es la SESSION

//! Estas funciones se ejecutan en el servidor varias veces
//TODO podemos autenticar usando de providers: credenciales, google, facebook, github, etc

const clientId_GITHUB = process.env.GITHUB_ID || ""
const clientSecret_GITHUB = process.env.GITHUB_SECRET || ""
const clientId_GOOGLE = process.env.GOOGLE_ID || ""
const clientSecret_GOOGLE = process.env.GOOGLE_SECRET || ""
const clientId_LINKEDIN = process.env.LINKEDIN_ID || ""
const clientSecret_LINKEDIN = process.env.LINKEDIN_SECRET || ""
const clientId_FACEBOOK = process.env.FACEBOOK_ID || ""
const clientSecret_FACEBOOK = process.env.FACEBOOK_SECRET || ""


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
                //console.log(userFound);
                return userFound
            }
        }),
        GithubProvider({
            clientId: clientId_GITHUB,
            clientSecret: clientSecret_GITHUB,
        }),
        GoogleProvider({
            clientId: clientId_GOOGLE,
            clientSecret: clientSecret_GOOGLE,
        }),
        FacebookProvider({
            clientId: clientId_FACEBOOK,
            clientSecret: clientSecret_FACEBOOK,
        }),
        LinkedinProvider({
            clientId: clientId_LINKEDIN,
            clientSecret: clientSecret_LINKEDIN,
            wellKnown: 'https://www.linkedin.com/oauth/.well-known/openid-configuration',
            profile(profile, tokens) {
                return {
                    id: profile.id,
                    name: profile.localizedFirstName + " " + profile.localizedLastName,
                    email: profile.emailAddress
                    /* image: profile.profilePicture.displayImage,*/
                }
            },
            authorization: {
                params: {
                    response_type: "code",
                    client_id: clientId_LINKEDIN,
                    redirect_uri: "http://localhost:3000/api/auth/callback/linkedin",
                    scope: "openid profile email",
                },
            }
            /*  userinfo: {
                  url: "https://api.linkedin.com/v2/me?projection=(id,firstName,lastName,profilePicture(displayImage~:playableStreams))",
              },*/
            /* authorization: {
                 url: `https://www.linkedin.com/oauth/v2/authorization?client_id=78jb8cgtebmjvv&response_type=code&scope=${SCOPE}&redirect_uri=http://localhost:3000/api/auth/callback/linkedin`,
                 params: { scope: "email", client_id: clientId_LINKEDIN },
                 //? El callbackUrl es la url a la qe nos redirecciona despues de logearnos
                 request(context) {
                     return {
                         code: context.query.code,
                         client_id: clientId_LINKEDIN,
                         client_secret: clientSecret_LINKEDIN,
                         redirect_uri: "http://localhost:3000/dashboard",
                         grant_type: "authorization_code",
                     }
                 },
             },*/
            //  accessTokenUrl: `https://www.linkedin.com/oauth/v2/accessToken?grant_type=authorization_code&client_id=78jb8cgtebmjvv&client_secret=LlqPAdMdlqaXSKWz&code=${code}`,
            /*   token: {
                   url: "https://www.linkedin.com/oauth/v2/accessToken",
                   async request({
                       client,
                       params,
                       checks,
                       provider
                   }) {
                       const response = await client.oauthCallback(provider.callbackUrl, params, checks, {
                           exchangeBody: {
                               client_id: clientId_LINKEDIN,
                               client_secret: clientSecret_LINKEDIN,
                           }
                       })
                       return {
                           tokens: response
                       }
                   }
               },
               profile(profile, tokens) {
                   return {
                       id: profile.id,
                       name: profile.localizedFirstName + " " + profile.localizedLastName,
                       email: profile.emailAddress,
                       image: profile.profilePicture.displayImage,
                   }
               }*/
        })
    ],
    callbacks: {
        jwt({ account, token, user, profile, session }) {
            console.log({ account, token, user, profile, });
            // * Aqui podemos modificar el token p/q guarde los datos qe ya tiene.
            // token.fullname = token.fullname || profile?.name || session?.user?.fullname
            if (user) token.user = user //? Lo qe recibe de mongo lo guarda en el token
            // console.log('Token\'s value are', token);
            //  console.log('Token\'s  fullname value is', token.fullname);

            return token
        },
        async session({ session, token }) {
            //console.log(session);
            //TODO crear interfaz nunca ANY, esto aparece en el frontend
            session.user = token.user as any //? La sesion tendra en el navegador data del token
            console.log('Session\'s values from backend', session.user?.email);
            await connectDB()
            const userFound = await User.findOne({ email: session.user?.email }).select("+password") //? El + es p/ añada el campo password
            if (!userFound) throw new Error("Invalid credentials") //! Nunca especificar que datos son invalidos.
            console.log('These are the user\'s values from backend method SignIn', userFound);
            session = { ...session, user: userFound }
            return session

        },
        redirect({ url, baseUrl }) {
            //console.log(url, baseUrl);
            url = "http://localhost:3000/dashboard"
            return url
        }
    },
    pages: {
        signIn: '/login', //* Si accedo a localhost:3000/api/auth/signin me redirecciona a /login

    }
})

// * Tambien podemos usar el metodo SIGNIN en los callbacks

export { handler as GET, handler as POST }