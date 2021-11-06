import {useEffect} from "react";
import {useHistory} from "react-router-dom";

export const LogOut = () => {

    const history = useHistory()

    useEffect(() => {
        sessionStorage.clear()
        history.push('/login')
    })

    return (
        <h1>Log Out</h1>
    )
}