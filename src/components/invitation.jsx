import { useEffect } from "react"
import axios from('axios')
export default function invitation(user, title, description, id){
    const acept = async ()=>{
        const invitationAcepted = {
            id,
            status:'acepted'
        }
        const result = await axios.put('http://localhost:3333/invitation', invitationAcepted)
        console.log(result)
    }

    const decline = async ()=>{
        const invitationDeclined = {
            id,
            status:'declined'
        }
        const result = await axios.put('http://localhost:3333/invitation', invitationDeclined,)
        console.log(result)
    }

    return(
        <div>
            <h1>{user}</h1>
            <h1>{title}</h1>
            <p>{description}</p>
            <button onClick={acept}>Acept</button>
            <button onClick={decline}>Decline</button>
        </div>
    )
}