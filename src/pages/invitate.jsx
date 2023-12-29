import { useEffect, useState } from 'react';
import axios from 'axios';
import './style.css';
import { useCookies } from 'react-cookie';

export default function login() {
    const [cookies, setCookie, removeCookie] = useCookies(['userInfo']);
    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')
    const [buttonEnabled, setButtonEnabled] = useState()
    const [destiny, setDestiny] = useState('')

    //verify if all inputs are filled
    useEffect(() => {
        if (title && description) setButtonEnabled(true)
    }, [title, description])

    const handleSubmit = async (e) => {
        e.preventDefault()
        const accessToken = cookies.userInfo.accessToken
        const newInvitation = {
            title,
            description,
            invitation_destiny: destiny,
            invitation_owner: cookies.userInfo.email,
            status: 'pendente'
        }
        const result = await axios.post("http://localhost:3333/invitation", newInvitation, { headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${accessToken}` } })
        return window.location.replace('/dashboard')
    }


    return (
        <div className='bg-zinc-950 font-mono h-screen w-screen flex justify-center items-center'>
            <a className='text-white absolute top-2 left-2' href="/dashboard">voltar</a>
            <form autoComplete='off' onSubmit={handleSubmit} className='text-white max-h-max h-3/5 w-2/5 bg-zinc-800 flex flex-col justify-center items-center gap-4'>
                <h1 className='text-xl'>Criar requisição</h1>
                <div className='flex flex-col justify-center w-3/5 max-w-xl content-center'>
                    <label htmlFor="title">Titulo</label>
                    <input onChange={(e) => setTitle(e.target.value)} required className='text-black duration-100 hover:brightness-90 rounded-md h-8 text-lg' type="text" />
                    <label htmlFor="decription">Descrição</label>
                    <textarea onChange={(e) => setDescription(e.target.value)} className=' h-40 text-black duration-100 resize-none hover:brightness-90 rounded-md text-lg' name="description" id="" cols="30" rows="10"></textarea>
                    <label htmlFor="destiny">Orientador</label>
                    <input onChange={(e) => setDestiny(e.target.value)} className='text-black duration-100 hover:brightness-90 rounded-md h-8 text-lg' type="text" />
                    <p>Deixe orientador vazio para deixar público</p>
                    <button className={buttonEnabled ? 'bg-emerald-500 w-36 self-center h-10 mt-10 rounded-md hover:brightness-125 duration-100' : 'hover:cursor-not-allowed bg-emerald-800 w-36 self-center h-10 mt-10 rounded-md'}>Enviar</button>
                </div>
            </form>
        </div>
    )
}