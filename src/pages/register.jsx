import { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import './style.css';
import cookieParser from 'cookie-parser';
export default function register() {

    const USER_REGEX = /^[a-zA-Z][a-zA-Z0-9]{3,23}$/;
    const PASSWORD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;

    const [username, setUsername] = useState('')
    const [validUsername, setValidUsername] = useState(false)
    const [validPassword, setValidPassword] = useState(false)
    const [passwordMatch, setPasswordMatch] = useState(false)
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')

    //verify if all inputs are filled
    useEffect(() => {
        if (username && email && password && confirmPassword) setButtonEnabled(true)
    }, [username, email, password, confirmPassword])
    useEffect(() => {
        setValidUsername(false)
        if (USER_REGEX.test(username)) setValidUsername(true)
    }, [username])
    useEffect(() => {
        setValidPassword(false)
        if (PASSWORD_REGEX.test(password)) setValidPassword(true)
    }, [password])
    useEffect(() => {
        setPasswordMatch(false)
        if (password == confirmPassword) setPasswordMatch(true)
    }, [confirmPassword])

    const handleSubmit = async (e) => {
        e.preventDefault()
        if (!validUsername || !passwordMatch || !email || !password || !confirmPassword) return setError('Invalid inputs')
        if(!USER_REGEX.test(username) || !PASSWORD_REGEX.test(password)) return setError('Invalid input')
        const newUser = {username, email, password}
        const result = await axios.post("http://localhost:3333",newUser,{headers:{'Content-Type': 'application/json'}})
        return console.log(result)

    }
    const [error, setError] = useState('')
    const [userFocus, setUserFocus] = useState(false)
    const [passwordFocus, setPasswordFocus] = useState(false)
    const [confirmPasswordFocus, setConfirmPasswordFocus] = useState(false)
    const [buttonEnabled, setButtonEnabled] = useState(false)


    return (
        <div className='bg-zinc-950 font-mono h-screen w-screen flex justify-center items-center'>
            <form autoComplete='off' onSubmit={handleSubmit} className='max-h-max h-3/5 w-2/5 bg-zinc-800 flex flex-col justify-center items-center gap-4'>
                <p>{error}</p>
                <h1 className='text-xl'>Register</h1>
                <div className='flex flex-col justify-center w-3/5 max-w-xl content-center'>
                    <label htmlFor="username">Username</label>
                    <input aria-invalid={validUsername ? false : true} aria-describedby='userDescription' onBlur={() => setUserFocus(false)} onFocus={() => setUserFocus(true)} onChange={(e) => setUsername(e.target.value)} required className='duration-100 hover:brightness-90 rounded-md h-8 text-lg' id='username' type="text" />
                    <p id='userDescription' className={userFocus || !validUsername && username ? 'bg-zinc-800 text-white' : 'hidden'} >Usuario deve ter pelo menos 4 digitos</p>
                    <label htmlFor="email">Email</label>
                    <input onChange={(e) => setEmail(e.target.value)} required className='duration-100 hover:brightness-90 rounded-md h-8 text-lg' id='email' type="email" />
                    <label htmlFor="password">Password</label>
                    <input onChange={(e) => setPassword(e.target.value)} onBlur={() => setPasswordFocus(false)} onFocus={() => setPasswordFocus(true)} required className={!passwordFocus && !validPassword && password ? 'duration-100 hover:brightness-90 rounded-md h-8 text-lg border-red-500 border-2' : 'duration-100 hover:brightness-90 rounded-md h-8 text-lg'} id='password' aria-describedby='passwordDescription' type="password" />
                    <p id='passwordDescription' className={passwordFocus || !validPassword && password ? 'bg-zinc-800 text-white' : 'hidden'} >A senha deve ter 9 digitos, deve ter pelo menos um caixa baixa, alta, número e caractere especial</p>
                    <label htmlFor="confirmPassword">Confirm password</label>
                    <input onFocus={() => setConfirmPasswordFocus(true)} onBlur={() => setConfirmPasswordFocus(false)} aria-describedby='confirmPasswordDescription' onChange={(e) => setConfirmPassword(e.target.value)} required className={!confirmPasswordFocus && !passwordMatch && confirmPassword ? 'duration-100 hover:brightness-90 rounded-md h-8 text-lg border-red-500 border-2' : 'duration-100 hover:brightness-90 rounded-md h-8 text-lg'} id='confirmPassword' type="password" />
                    <p id='confirmPasswordDescription' className={confirmPasswordFocus || !passwordMatch && confirmPassword ? 'bg-zinc-800 text-white' : 'hidden'}>A senha deve ser igual</p>
                    <button className={buttonEnabled ? 'bg-emerald-500 w-36 self-center h-10 mt-10 rounded-md hover:brightness-125 duration-100' : 'hover:cursor-not-allowed bg-emerald-800 w-36 self-center h-10 mt-10 rounded-md'}>Registre-se</button>
                </div>
                <p>Já registrado? <a href="" className='underline text-blue-100'>login</a></p>
            </form>
        </div>
    )
}