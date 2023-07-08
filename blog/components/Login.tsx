'use client'; 
import { useSession, signIn, signOut } from "next-auth/react";
import UserCard from "./UserCard";

const Login = () => {
    const { data: session } = useSession(); 
    if(session) { 
        return ( 
            <>
                <button onClick = { () => { signOut() }}>Sign Out</button>
                <UserCard user = { session?.user } /> 
            </>
        )
    }

    return ( 
        <>
            <button onClick = { () => { signIn() }}> Sign In </button>
        </>
    )
}

export default Login