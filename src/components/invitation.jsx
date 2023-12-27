import { useEffect, useState } from "react"
import { useCookies } from "react-cookie"
import axios from "axios";
export default function Invitation(id) {
    const [cookies, setCookie, removeCookie] = useCookies(['userInfo']);
    const [userEmail, setUserEmail] = useState()
    const [isDestiny, setIsDestiny] = useState()

    //useEfect
    useEffect(() => {
        const roles = [201]
        setUserEmail(cookies.userInfo?.email)
        const authRole = cookies.userInfo.roles.map(element => roles.includes(element)).find(value => value == true)
        if (authRole) {
            setIsDestiny(true)
            axios.get(`http://localhost:3333/invitation/${id}`)
        } else {
            setIsDestiny(false)
        }
    }, [])

    const acept = async () => {
        const invitationAcepted = {
            id,
            status: 'acepted'
        }
        const result = await axios.put('http://localhost:3333/invitation', invitationAcepted)
        console.log(result)
    }

    const a = ()=>{
        return (
            <div>
                aaa
            </div>
        )
    }

    const decline = async () => {
        const invitationDeclined = {
            id,
            status: 'declined'
        }
        const result = await axios.put('http://localhost:3333/invitation', invitationDeclined,)
        console.log(result)
    }

    return (
        <div className="bg-red-300">
            <h1>user</h1>
            <h1>title</h1>
            <p>description</p>
            {isDestiny? 
                <>
                    <button onClick={acept}>Acept</button> 
                    <button onClick={decline}>Decline</button>
                </>: 
                <p>Sent to :</p>
            }
        </div>
    )
}