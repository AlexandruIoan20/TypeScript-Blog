'use client'; 
import { useSession } from "next-auth/react";
import UserCard from "./UserCard";

const Login = () => {
    const { data: session } = useSession(); 
    return ( 
        <div className = "ml-auto"> 
            { session?.user &&
                ( 
                    <UserCard user = { session?.user } /> 
                )  
            }
        </div>
    )
}

export default Login