import './Global.css';
import AuthProvider from './contexts/auth';
import Rotas from './rotasFronte'

import 'react-toastify/dist/ReactToastify.css';
import {BrowserRouter } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';


function App() {
  return (
      <AuthProvider>
        <BrowserRouter>
          <ToastContainer autoClose={15000} position = {'top-center'} theme={'colored'}/>
          <Rotas/>
        </BrowserRouter>
      </AuthProvider>
  );
}

export default App;
