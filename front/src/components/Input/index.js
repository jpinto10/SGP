import './style.css'

export default function Input({name, Apresenta}){
    return(
        <form>
            <input className={name} name={name} autocomplete="off" required />
            <label for={name}>
                <strong>{Apresenta}</strong>
            </label>
        </form>
    )
}
