import React from 'react';
import { useSession, signIn, signOut } from 'next-auth/react';

const SignIn = () => {
    const { data: session } = useSession()

    if (session) {
        return(
            <div>
                <button className='text-xs text-white' onClick={signOut}>sign out</button>
            </div>
        )
    }
    return (
        <div>
            <button className='text-xs text-white' onClick={signIn}>sign in</button>
        </div>
    );
}

export default SignIn;
