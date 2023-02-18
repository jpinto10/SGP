import './style.css'

export default function Input({name, Apresenta, className}){
    return(
        <form>
            <input className={className} name={name} autocomplete="off" required />
            <label for={name}>
                <strong>{Apresenta}</strong>
            </label>
        </form>
    )
}
