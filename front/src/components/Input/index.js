import './style.css'

export default function Input({name, Apresenta, className, titulo, maxLen, value, funcao}){
    return(
        <form>
            <input onChange={funcao} value={value} maxLength={maxLen} title={titulo}  className={className} name={name} required />
            <label for={name}>
                <strong>{Apresenta}</strong>
            </label>
        </form>
    )
}
