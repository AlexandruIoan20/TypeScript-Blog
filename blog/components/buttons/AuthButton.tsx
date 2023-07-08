interface AuthButtonProps { 
    classes: string, 
    executeFunction: () => void, 
    name: string, 
}; 

const AuthButton = ({ executeFunction, classes, name }: AuthButtonProps) => { 
    return ( 
        <button
            onClick = { executeFunction }
            className = { classes }
        >
            { name }
        </button>
    )
}; 


export default AuthButton; 