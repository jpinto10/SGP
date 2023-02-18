import './style.css'

export default function Input({name, Apresenta, className, titulo}){
    return(
        <form>
            <input title={titulo}  className={className} name={name} autocomplete="off" required />
            <label for={name}>
                <strong>{Apresenta}</strong>
            </label>
        </form>
    )
}
