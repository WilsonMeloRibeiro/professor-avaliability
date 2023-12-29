import { useEffect, useState } from "react"
import { useCookies } from "react-cookie"
import axios from "axios";
import './style.css';
import Image from "next/image";
export default function dashboard() {
    const [invitationsAccepted, setInvitationsAccepted] = useState([])
    const [invitationsPending, setInvitationsPending] = useState([])
    const [invitationsDeclined, setInvitationsDeclined] = useState([])
    const [isDestiny, setIsDestiny] = useState()
    useEffect(() => {
        fetchDataAccepted()
        fetchDataPending()
        fetchDataDeclined()
    }, [])
    const fetchDataAccepted = async () => {
        const roles = [201]
        const authRole = cookies.userInfo.roles.map(element => roles.includes(element)).find(value => value == true)
        if (authRole) {
            setIsDestiny(true)
            const accessToken = cookies.userInfo?.accessToken
            const result = await axios.get(`http://localhost:3333/invitationdestinyaccepted/${cookies.userInfo.email}`, { headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${accessToken}` } })
            setInvitationsAccepted(await result.data)
        } else {
            setIsDestiny(false)
            const accessToken = cookies.userInfo?.accessToken
            const result = await axios.get(`http://localhost:3333/invitationowneraccepted/${cookies.userInfo.email}`, { headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${accessToken}` } })
            setInvitationsAccepted(await result.data)
        }
    }
    const fetchDataPending = async () => {
        const roles = [201]
        const authRole = cookies.userInfo.roles.map(element => roles.includes(element)).find(value => value == true)
        if (authRole) {
            setIsDestiny(true)
            const accessToken = cookies.userInfo?.accessToken
            const result = await axios.get(`http://localhost:3333/invitationdestinypending/${cookies.userInfo.email}`, { headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${accessToken}` } })
            setInvitationsPending(await result.data)
        } else {
            setIsDestiny(false)
            const accessToken = cookies.userInfo?.accessToken
            const result = await axios.get(`http://localhost:3333/invitationownerpending/${cookies.userInfo.email}`, { headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${accessToken}` } })
            setInvitationsPending(await result.data)
        }
    }
    const fetchDataDeclined = async () => {
        const roles = [201]
        const authRole = cookies.userInfo.roles.map(element => roles.includes(element)).find(value => value == true)
        if (authRole) {
            setIsDestiny(true)
            const accessToken = cookies.userInfo?.accessToken
            const result = await axios.get(`http://localhost:3333/invitationdestinydeclined/${cookies.userInfo.email}`, { headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${accessToken}` } })
            setInvitationsDeclined(await result.data)
        } else {
            setIsDestiny(false)
            const accessToken = cookies.userInfo?.accessToken
            const result = await axios.get(`http://localhost:3333/invitationownerdeclined/${cookies.userInfo.email}`, { headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${accessToken}` } })
            setInvitationsDeclined(await result.data)
        }
    }

    const [cookies, setCookie, removeCookie] = useCookies(['userInfo']);
    const [username, setUsername] = useState()
    const [email, setEmail] = useState()

    useEffect(() => {
        if (!cookies.userInfo) {
            window.location.replace('/login')
        } else {
            setEmail(cookies.userInfo?.email)
            setUsername(cookies.userInfo?.username)
            /* invitations() */
        }
    }, [])

    const accept = async (id) => {
        const accessToken = cookies.userInfo?.accessToken
        const invitationAcepted = {
            id,
            destiny: cookies.userInfo.email,
            status: 'aceito'
        }
        const result = await axios.put('http://localhost:3333/invitation', invitationAcepted, { headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${accessToken}` } })
        window.location.reload()
    }

    const decline = async (id) => {
        const accessToken = cookies.userInfo?.accessToken
        const invitationDeclined = {
            id,
            status: 'recusado'
        }
        const result = await axios.put('http://localhost:3333/invitation', invitationDeclined, { headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${accessToken}` } })
        window.location.reload()
    }


    const logout = () => {
        removeCookie('userInfo')
        return window.location.replace('/')
    }
    return (
        <div className=" bg-zinc-950 bg-scroll h-max max-w-screen p-0 m-0 flex ">
            <div className="text-white bg-zinc-800 h-2/3 bg- w-1/4 justify-between flex flex-col">
                <div className="flex justify-center items-center flex-col">
                    <Image className="rounded-lg"
                        alt="Profile picture"
                        src='data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBwgHBgkIBwgKCgkLDRYPDQwMDRsUFRAWIB0iIiAdHx8kKDQsJCYxJx8fLT0tMTU3Ojo6Iys/RD84QzQ5OjcBCgoKDQwNGg8PGjclHyU3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3N//AABEIAJQAnAMBIgACEQEDEQH/xAAbAAEBAAMBAQEAAAAAAAAAAAAABgMEBQECB//EADsQAAICAQIBBgkKBwAAAAAAAAABAgMEBRFREhMhMUFxBlJhgZGhscHRIiMyM0JDYnKS4RQVNVNjgpP/xAAVAQEBAAAAAAAAAAAAAAAAAAAAAf/EABQRAQAAAAAAAAAAAAAAAAAAAAD/2gAMAwEAAhEDEQA/AP3AAAAAAAAAA+bLI1wc7JKMUt232AfQOFl68t3HFrUvxz+BpS1nOf3sV3QQFUCZq1zLg/nFXYu1NbP1HZwNSpzVyY7ws6+RL3cQN0AAAAAAAAAAAAAAAAAACX1vOeVe6oS+Zre23jPid7Urnj4N1setR2Xe+gjwAAKgewk4TjOLalF7po8AFdpeZ/GYqm/rIvaa8vE3CZ8HrnDO5v7NkWvOukpiKAAAAAAAAAAAAAAAA5vhC2tNlt2ziS5W6zW7dOuSW7iuUvMSQAAFQAAG3pTa1HHa8cryV0OrnNSrfZBOT9ntKoigAAAAAAAAAAAAAAAPJJSTTW6fQyP1DFeHkyqfU3vB8UWJr52HVm083atmvoyXXFgRoN7L0vKxpP5t2Q7JQ6fUaTTT2aa70VHgMlWPddLk1VTk/JE7WmaK4TVuZs2ulVrq84Vn0DD5jHd01tO3ZpcI9h1QCAAAAAAAAAAAAAAA+ZzjCDlOSjFdLb7DiZ2utNww4p/5Je5AduU4xi5Tkori3sa1mp4Vb2lkQ/16fYSd19t8uVdZKb8rMYFZ/OMH+8/0S+B8vV9P7bX565fAlT0CrWsYHZc/+cvgI6xgt7c/6Yv4EoALSnLx73tVdCT4J9Jm3IU3cTVMrGaSm5wX2Z9P7gVoNHA1OjM+SnyLO2EvdxN4AAAAAAAAAeSkoxcpPZJbtnpyvCK91Yca4vbnZbPuQHJ1TUZ5tjjBtURfyY8fKzQAKgAAAAAAAAAAPU3GScW012rrRS6NqLy4Oq766K6/GXHvJkzYlzx8qq1fZkvR2kVaA8T36T0AAAAAAE74S2b5VUPFhv6X+xREtr0uVqdn4YxXqA5wAKgAAAAAAAAAAAAAtMOfO4lFj65Vxb9BmNLRnvplG/YtvWbpFAAAAAAlNb/qVvm9iKs4XhBg2TksqqPKSW00uvvA4QAKgAAAAAAAAAAABkopsvtjXVHlSl1AU+iLbTKd/L7TfMWLSsfHrpT35EUt+JlIoAAAAAAADnZmj4+S3KK5qx9sep+Y5GRouXU3yErY8Yvp9BUACIsqsqe1tc4P8Udj4LlxUls0muDMFmDiWfTx6m+PJ2AjQVctHwZfc8n8smj4eh4XCz9ZUS4KdaHhcLP1n3HRsGP3Tl3yYEqZKqbbntVXOf5Y7lbXgYlb3hj1p8XHdmwkl0LoRFTmLoWRZtK+Sqjw65fA7eJhUYcHGmGzfXJ9LZsgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAD//Z'
                        width={100}
                        height={100}
                    />
                    <h1 >
                        {email}
                    </h1>
                    <h1>
                        {username}
                    </h1>
                </div>
                <div className="flex justify-center m-24">
                    <button className="bg-red-400 rounded-md w w-32" onClick={logout}>Encerrar sessão</button>
                </div>
            </div>
            <div className="text-white h-screen w-2/4">
                <h1 className="ml-5 text-3xl mb-5 mt-2">Projetos</h1>
                {isDestiny ? <p></p> : <a href="/invitate" className="bg-emerald-500 ml-5 rounded-md">Novo projeto</a>}

                <div>
                    <h1 className="ml-5">Pendentes:</h1>
                    {invitationsPending.map((data) => {
                        console.log(data);
                        return (
                            <div key={data._id} className="bg-zinc-800 ml-5 p-2 mt-2 border-yellow-300">
                                <h1>Titulo: {data.title}</h1>
                                <h1>Descrição: {data.description}</h1>
                                <h1>Status: {data.status}</h1>
                                {isDestiny ?
                                    <div>
                                        <p>Enviado por: {data.invitation_owner}</p>
                                        <button className="bg-green-300" onClick={() => accept(data._id)}>Aceitar</button>
                                        <button className="bg-red-300 ml-2" onClick={() => decline(data._id)}>Recusar</button>
                                    </div> :
                                    <p>Enviado para: {data.invitation_destiny}</p>
                                }
                            </div>
                        )
                    })}
                </div>
                <div>
                    <h1 className="ml-5">Aceitos:</h1>
                    {invitationsAccepted.map((data) => {
                        console.log(data);
                        return (
                            <div key={data._id} className="bg-zinc-800 ml-5 p-2 mt-2 border-2 border-green-300">
                                <h1>Titulo: {data.title}</h1>
                                <h1>Descrição: {data.description}</h1>
                                <h1>Status: {data.status}</h1>
                                {isDestiny && data.status == 'pendente' ?
                                    <div><button className="bg-green-300" onClick={() => accept(data._id)}>Aceitar</button> <button className="bg-red-300" onClick={() => decline(data._id)}>Recusar</button></div> :
                                    data.invitation_destiny == cookies.userInfo.email ?
                                        <p>Enviado por: {data.invitation_owner}</p> :
                                        <p>Enviado para: {data.invitation_destiny}</p>
                                }
                            </div>
                        )
                    })}
                </div>
                <div>
                    <h1 className="ml-5">Recusados:</h1>
                    {invitationsDeclined.map((data) => {
                        console.log(data);
                        return (
                            <div key={data._id} className="bg-zinc-800 ml-5 p-2 mt-2  border-2 border-red-300">
                                <h1>Titulo: {data.title}</h1>
                                <h1>Descrição: {data.description}</h1>
                                <h1>Status: {data.status}</h1>
                                {isDestiny && data.status == 'pendente' ?
                                    <div><button className="bg-green-300" onClick={() => accept(data._id)}>Aceitar</button> <button className="bg-red-300" onClick={() => decline(data._id)}>Recusar</button></div> :
                                    data.invitation_destiny == cookies.userInfo.email ?
                                        <p>Enviado por: {data.invitation_owner}</p> :
                                        <p>Enviado para: {data.invitation_destiny}</p>
                                }
                            </div>
                        )
                    })}
                </div>
            </div>
        </div>
    )
}