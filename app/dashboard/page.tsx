'use client'
import { useSession } from 'next-auth/react'
import Image from 'next/image'
import { useState } from 'react'

interface User {
    fullname?: string
}

const Dashboard = () => {
    const { data: session, status, update } = useSession<boolean>()
    const [user, setUser] = useState<User>()

    // { JSON.stringify({ session, status }, null, 2) }

    console.log('Session frontend / Status:', session, status);
    return (
        <>
            <h1>Dashboard</h1>
            <p>Welcome {session?.user?.email}</p>
            <p>{session?.user?.name}</p>
            <p>Tu nickname asociado a la base de datos de mongodb es: {session?.user?.fullname || 'tu login no esta asociado a la bbdd'}</p>

            <pre>
                {JSON.stringify(session, null, 2)}
            </pre>
            {
                session?.user?.image &&
                <Image src={session?.user?.image || 'No profile image'} alt={session?.user?.name || 'No profile image'} width={100} height={100} />
                || <p>No profile image</p>
            }

        </>
    )
}

export default Dashboard