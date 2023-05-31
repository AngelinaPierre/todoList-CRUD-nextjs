import React, { useState } from "react";
import { useAuth } from "../context/AuthContext";

export default function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);
    const [isLogingIn, setIsLogingIn] = useState(true)
    const { login, signup, currentUser } = useAuth();

    async function submitHandler() {
        if (!email && !password) {
            setError("Please enter email and password")
            return
        }
        if (isLogingIn) {
            try {
                await login(email, password);
            } catch (error) {
                setError('Incorrect email or password')
            }
            return
        }
        await signup(email, password);
    }
    return (
        <div className="flex-1 flex flex-col justify-center items-center text-xs sm:text-sm gap-2 sm:gap-4">
            <h1 className="font-extrabold text-2xl sm:text-4xl select-none uppercase">{isLogingIn ? 'Login' : 'Register'}</h1>
            {error && <div className="w-full max-w-[40ch] border-rose-400 border boder-solid text-center text-rose-400 py-2">{error}</div>}
            <input
                type="text"
                className="outline-none text-slate-900 p-2 w-full max-w-[40ch] duration-300 border-b-2 border-solid border-white focus:border-cyan-300"
                placeholder="Email Address"
                value={email}
                onChange={(evt) => setEmail(evt.target.value)}
            />
            <input
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                type="password"
                placeholder='Password'
                className='outline-none text-slate-900 p-2 w-full max-w-[40ch] duration-300 border-b-2 border-solid border-white focus:border-cyan-300'
            />
            <button className="w-full max-w-[40ch] border boder-white boder-solid uppercase py-2 duration-300 relative after:absolute after:top-0 after:right-full after:bg-white after:z-10 after:w-full after:h-full overflow-hidden hover:after:translate-x-full after:duration-300 hover:text-slate-900"
                onClick={submitHandler}
            >
                <h2 className="relative z-20">Submit</h2>
            </button>
            <h2
                className="duration-300 hover:scale-110 cursor-pointer"
                onClick={() => setIsLogingIn(!isLogingIn)}>{!isLogingIn ? 'Login' : 'Register'}</h2>
        </div>
    )
}