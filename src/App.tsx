import { useState, useEffect } from 'react';
import './App.css'
import { AuthStatus, useAuth } from './hooks/useAuth';
import Navbar from './components/navbar/Navbar';
import Routeur from './routes/Routeur';
import Login from './pages/Login/Login';
import { useAvatar } from './hooks/useAvatar';
import useListname from './hooks/useListname';
import { useGraph } from './hooks/useDataGraph';
import { Toaster } from 'react-hot-toast'
import { toastSuccess } from './utils/toast';



const AuthenticatedApp = () => {
    useGraph()
    useAvatar()
    useListname()
    useEffect(() => {
      toastSuccess('User connected')
    }, [])
  return (
    <>
        
    </>
  )
}

const App = () => {
  const [form, setForm] = useState({ pseudo:"", password: "" })
  const { status, authenticate, login, logout } = useAuth();
 

  useEffect(() => {
    authenticate();
  }, [])


  const handleOnChange = (e:React.ChangeEvent<HTMLInputElement>) => {
     const { name, value } = e.target
     setForm((c) => ({...c, [name] : value }))
  }

  const handleClick = async (e: React.MouseEvent<HTMLButtonElement>) => {
     e.preventDefault()
     await login(form.pseudo, form.password)
  }

  const deconnect = async (e:React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    await logout(); 
  }


  if (status === AuthStatus.Unknow || status === AuthStatus.Guest) {
    return (
      <Login handleOnChange={handleOnChange} handleClick={handleClick}/>
    );
  }

  if (status === AuthStatus.Authenticated) {
    return (
        <>

          <Toaster />
          <AuthenticatedApp/>
          <Navbar deconnect={deconnect}/>
          <Routeur/>
          
        </>
     )
  }
};

export default App;