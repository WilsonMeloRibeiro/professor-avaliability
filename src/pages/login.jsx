import { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import './style.css';
export default function login() {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    //verify if all inputs are filled
    useEffect(() => {
        if (email && password ) setButtonEnabled(true)
    }, [email, password])
    
    const handleSubmit = async (e) => {
        e.preventDefault()
        console.log('a')
    }
    const [error, setError] = useState('')
    const [buttonEnabled, setButtonEnabled] = useState(false)


    return (
        <div className='bg-zinc-950 font-mono h-screen w-screen flex justify-center items-center'>
            <form autoComplete='off' onSubmit={handleSubmit} className='max-h-max h-3/5 w-2/5 bg-zinc-800 flex flex-col justify-center items-center gap-4'>
                <p>{error}</p>
                <h1 className='text-xl'>Login</h1>
                <div className='flex flex-col justify-center w-3/5 max-w-xl content-center'>
                    <label htmlFor="email">Email</label>
                    <input onChange={(e) => setEmail(e.target.value)} required className='duration-100 hover:brightness-90 rounded-md h-8 text-lg' id='email' type="email" />
                    <label htmlFor="password">Password</label>
                    <input onChange={(e) => setPassword(e.target.value)} required className='duration-100 hover:brightness-90 rounded-md h-8 text-lg' id='password' type="password" />
                    <button className={buttonEnabled ? 'bg-emerald-500 w-36 self-center h-10 mt-10 rounded-md hover:brightness-125 duration-100' : 'hover:cursor-not-allowed bg-emerald-800 w-36 self-center h-10 mt-10 rounded-md'}>Login</button>
                </div>
                <p>Não registrado? <a href="" className='underline text-blue-100'>Register</a></p>
            </form>
        </div>
    )
}