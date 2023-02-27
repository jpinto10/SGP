import { useNavigate } from "react-router-dom"

export const Redirecionamento = ({_url}) =>{
    const navigate = useNavigate()
    return( navigate(_url))
}