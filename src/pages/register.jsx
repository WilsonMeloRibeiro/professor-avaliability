import { useEffect, useState, useRef } from 'react';
import './style.css';

export default function register() {
    const USER_REGEX = /^[a-zA-Z][a-zA-Z0-9]{3,23}$/;
    const PASSWORD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;

    const errRef = useRef(null);
    const userRef = useRef(null);

    const [userFocus, setUserFocus] = useState(true);
    const [userValid, setUserValid] = useState(false);
    const [error, setError] = useState('');
    const [user, setUser] = useState('');
    const [password, setPassword] = useState('');
    const [passwordValid, setPasswordValid] = useState(false);
    const [passwordFocus, setPasswordFocus] = useState(false);
    const [match, setMatch] = useState('');
    const [matchFocus, setMatchFocus] = useState(false);
    const [matchValid, setMatchValid] = useState(false);
    const [buttonDisabled, setButtonDisabled] = useState(false);

    const handleSubmit = async (e)=>{
        e.preventDefault();
        const v1 = USER_REGEX.test(user);
        const v2 = PASSWORD_REGEX.test(password);
        if(!v1 || !v2){
            setError('campos invalidos');
            return;
        }
    }

    useEffect(() => {
        setPasswordValid(PASSWORD_REGEX.test(password));
    }, [password])

    useEffect(() => {
        setUserValid(USER_REGEX.test(user));
    }, [user])

    useEffect(() => {
        setMatchValid(match == password);
    }, [match])

    useEffect(() => {
        if (matchValid && passwordValid && userValid) {
            setButtonDisabled(false)
        }
    }, [matchValid, passwordValid, userValid])


    return (
        <main className='w-screen h-screen bg-slate-800 flex items-center justify-center'>
            <div className='bg-slate-100 rounded-sm h-4/5 w-4/12'>
                <p ref={errRef} className={error ? 'visible' : 'invisible'} >{error}</p>
                <form className='h-full w-full flex flex-col items-center justify-center'>
                    <label className='mt-2' htmlFor="username">Usuário</label>
                    <input className='w-2/3 shadow-md bg-white rounded-sm appearance-none' ref={userRef} id='username' type="text" autoComplete='off' aria-invalid={userValid ? false : true} required aria-describedby='userDescribed' onChange={(e) => setUser(e.target.value)} onFocus={() => setUserFocus(true)} onBlur={() => setUserFocus(false)} />
                    <p id='userDescribed' className={userFocus && user && !userValid ? 'w-2/3 bg-black text-white' : 'sr-only'}>
                        ! O usuario deve começar com uma letra, podendo conter letras e números que atingam no minimo 4 letras e no máximo 25 digitos
                    </p>
                    <label className='mt-2' htmlFor="password">Senha</label>
                    <input className='w-2/3 shadow-md bg-white rounded-sm appearance-none' id='password' type="password" required aria-describedby='passwordDescribed' onChange={(e) => setPassword(e.target.value)} onFocus={() => setPasswordFocus(true)} onBlur={() => setPasswordFocus(false)} />
                    <p id='passwordDescribed' className={passwordFocus && !passwordValid ? 'w-2/3 bg-black text-white' : 'sr-only'}>
                        ! A senha deve conter uma letra minuscula, maiuscula, numeros e um dos seguintes simbolos: !@#$%
                    </p>
                    <label className='mt-2' htmlFor="match">Repita a senha</label>
                    <input className='w-2/3 shadow-md bg-white rounded-sm appearance-none' id='password' type="password" required aria-describedby='matchDescribed' onChange={(e) => setMatch(e.target.value)} onFocus={() => setMatchFocus(true)} onBlur={() => setMatchFocus(false)} />
                    <p id='matchDescribed' className={matchFocus && !matchValid ? 'w-2/3 bg-black text-white' : 'sr-only'}>
                        ! A senha deve ser a mesma que a anterior
                    </p>
                    <button className='bg-white shadow-md mt-3' disabled={buttonDisabled} onClick={handleSubmit}>Enviar</button>
                    <footer className='mt-3'>
                        <p>
                            Já cadastrado ?
                        <a href="">Login</a>
                        </p>
                    </footer>
                </form>
            </div>
        </main>
    )
}