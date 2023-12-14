import { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import './style.css';
import { getCookieParser } from 'next/dist/server/api-utils';
import { document } from 'postcss';
export default function index() {

    


    return (
        <div className='font-mono h-screen w-full text-white bg-zinc-950'>
            <nav className='from-black  to-zinc-950 from-15% to-75% bg-gradient-to-b  flex place-content-between items-center w-full h-14 '>
                <h3 className='ml-3 p-1'>SiteName</h3>
                <div className='place-content-between flex w-52 mr-3'>
                    <a className='p-1' href="">Entrar</a>
                    <a className='border-2 p-1 rounded-md' href="">Cadastre-se</a>
                </div>
            </nav>
            <main className='h-full w-full bg-zinc-950'>
                <div className='w-3/4 flex h-3/5 flex-col items-center mt-64'>
                    <h1 className='text-6xl'>Site Name</h1>
                    <p className='text-2xl'>A plataforma que conecta Professores e alunos</p>
                    <a className='border-2 p-1 text-lg bg-emerald-500 rounded-md mt-20 w-32 h-11 text-center content-center' href="">Começar</a>
                </div>
                <div className='w-full flex flex-col items-center h-full bg-zinc-900 from-15% from-zinc-950 bg-gradient-to-b'>
                    <h1 className='text-6xl -mt-0'>Sobre nós</h1>
                    <p className='w-1/3 text-2xl mt-96'>
                        A SiteName tem a missão de conectar o mundo acadêmico, facilitando a colaboração entre professores e alunos no desenvolvimento de projetos e criação de um futuro academico mais colaborativo
                    </p>
                </div>
            </main>
        </div>
    )
}