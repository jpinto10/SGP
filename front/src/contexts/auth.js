import { useState, createContext, useEffect } from 'react';
import conn from '../services/sqlconnection'
import { toast } from 'react-toastify'
export const AuthContext = createContext({});

const conect = conn()

function AuthProvider({ children }){
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [signed, setsigned] = useState(false);
  const [tituloBotao, setTituloBotao] = useState('Login')
  const [moduloLogado, setModuloLogado] = useState('')

  const [urlImagemUser, setUrlImagemUser] = useState('')

  useEffect(()=>{
      //verifica se existe o usuário quando entrar na aplicação. Procurando o item = SistemaUser
      const storageUser = localStorage.getItem('SistemaUser');
      // debugger
      if(storageUser){
        setTituloBotao('Home')
        setUser(JSON.parse(storageUser));
        setLoading(false);
        setsigned(true);
        setUrlImagemUser(JSON.parse(storageUser).imagem)
        setModuloLogado(JSON.parse(storageUser).modulo)
      } else{
        setUser('Visitante');
        setTituloBotao('Login');
        setLoading(false);       
        setsigned(false)
        setUrlImagemUser('')
      }

    }, [moduloLogado])

  //função que valida o usuário autenticado
  async function signIn(usuario, senha, modulo, obra){
    // debugger
    setLoading(true)
    const ativo = await conect.login(usuario, senha, modulo, obra)
    if(ativo.auth){
      debugger  
      let userAtivo = {...ativo.dadosUser, modulo, obra }
      setUser(userAtivo);
      storageUser(userAtivo);
      setLoading(false);
      setsigned(true);
      setTituloBotao('Home')
      setModuloLogado(modulo)

      toast(`Bem vindo.. ${ativo.dadosUser.nome} `, {
        theme:"colored",
        position:"top-center",
        autoClose: 1000
      })  

    } else{   
      toast.error('Dados inválidos, tente novamente por favor');
    }
      setLoading(false);
  }

  //função criada para setar os dados do usuário na variável SistemaUser
  function storageUser(data){
    localStorage.setItem('SistemaUser', JSON.stringify(data));
  }

  async function signOut(){
    toast.success(`Até Logo..`)
    localStorage.removeItem('SistemaUser');
    setUser("Visitante");
    setsigned(false);
    window.location.href = '/'
  }

  return(
    <AuthContext.Provider 
      value={{ 
        //variáveis
        signed,  
        user, 
        loading,
        tituloBotao, 
        urlImagemUser,
        moduloLogado,

        //funções
        signIn,
        signOut,
        setUser,
        setsigned, 
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export default AuthProvider;
