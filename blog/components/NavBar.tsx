'use client'; 

import { FaBlogger } from 'react-icons/fa'; 
import { IconContext } from 'react-icons';
import Link from "next/link"; 
import { useState, useEffect } from 'react'; 
import { signIn, useSession, getProviders } from 'next-auth/react'; 
import Login from './Auth/Login';
import AuthButton from './buttons/AuthButton';

export interface GoogleProvider {
    id: string;
    name: string;
    type: string;
    callbackUrl: string;
    clientId: string;
    clientSecret: string;
    // ... Add other Google provider-specific properties
}

const CustomFaBlogger: React.FC = () => { 
    return( 
        <IconContext.Provider value = {{ size: '35', color:'#491A74' }}>
            <FaBlogger size = { 35 } /> 
        </IconContext.Provider>
    )
}


const NavBar = () => {
    const [ providers, setProviders ] = useState <GoogleProvider[]>([]); 
    const { data: session } = useSession(); 

    useEffect( () => { 
        const setGlobalProviders = async () => { 
            console.log ("Hello")
            const response = await getProviders(); 
            console.log(response); 
            setProviders([]);
        }; 

        setGlobalProviders();
    }, []); 
  return  (
    <nav className = 'bg-primary-purple py-1 px-1 flex flex-row w-screen'>
        <Link href = "/">
            <CustomFaBlogger /> 
        </Link>


        { session?.user ? 
            (
                <Login /> 
            ) 
            : 
            ( 
                <div className = 'ml-auto flex items-center content-center'>
                    <AuthButton 
                        name = "Sign In"
                        executeFunction = { () => { signIn() }}
                        classes = 'sign-button'
                    /> 
                </div>
            )
        }
    </nav>
)
}

export default NavBar