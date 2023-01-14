import { useState, createContext, useEffect } from 'react';
import conn from '../services/sqlconnection'
import { toast } from 'react-toastify'
import { isLogged, doLogin } from '../services/AuthHandler';
export const AuthContext = createContext({});


const conect = conn()

function AuthProvider({ children }){
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [signed, setsigned] = useState(false);
  const [tituloBotao, setTituloBotao] = useState('Login')

  const [urlImagemUser, setUrlImagemUser] = useState('')

  useEffect(()=>{
      // debugger
      //verifica se existe o usuário quando entrar na aplicação. Procurando o item = SistemaUser
      const storageUser = localStorage.getItem('SistemaUser');
      if(storageUser){
        setTituloBotao('Home')
        setUser(JSON.parse(storageUser));
        setLoading(false);
        setsigned(true);
        setUrlImagemUser(JSON.parse(storageUser).imagem)
      } else{
        setUser('Visitante');
        setTituloBotao('Login');
        setLoading(false);       
        setsigned(false)
        setUrlImagemUser('')
      }

    }, [])

  //função que valida o usuário autenticado
  async function signIn(email, senha){
    //debugger
    setLoading(true)
    const ativo = await conect.login(email, senha)
    if(ativo.auth){
      toast.success(`Bem vindo.. ${ativo.dadosUser.nome} -  ${ativo.dadosUser.loja}`);
      setUser(ativo.dadosUser);
      storageUser(ativo.dadosUser);
      setLoading(false);
      setsigned(true);
      setTituloBotao('Home')
    } else{   
      toast.error('Dados inválidos, tente novamente por favor');
    }
      setLoading(false);
  }

  //função de gravação dos usuários!
  async function garvarUsuarios(nome, email, senha, trocaSenha, isAdmin, funcao, urlImagem, isBloqueado, loja){
    const isGravado = await conect.salvarUsuario(nome, email, senha, trocaSenha, isAdmin, funcao, urlImagem, isBloqueado, loja)
    if(isGravado.gravado){
      toast.success(`Usuario ${isGravado._nome} Gravado com sucesso`)
    }else{
      toast.error('Erro na gravação, acione a TI')
    }
  }
    
  //função criada para setar os dados do usuário na variável SistemaUser
  function storageUser(data){
    // debugger
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
        signed,  
        user, 
        loading,
        signIn,
        signOut,
        garvarUsuarios,
        tituloBotao, 
        setUser,
        setsigned,
        urlImagemUser
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export default AuthProvider;
