import { FC }from 'react'
import './Login.css'

interface LoginProps {
  handleOnChange: (e:React.ChangeEvent<HTMLInputElement>) => void,
  handleClick:(e:React.MouseEvent<HTMLButtonElement>) => void
} 

const Login : FC<LoginProps> = ({handleOnChange, handleClick}) => {
  return (
    <div className='form-container'>     
      <form method='POST'>
          <h2 className='connectTitle'>Se connecter</h2>
          <div className="containerLogin">
            <div className="containerInput">
              <input type="text"  onChange={handleOnChange} name="pseudo" id="pseudo" placeholder='pseudo' />
              <input type="password" onChange={handleOnChange} name="password" placeholder='mot de passe' />
            </div>
            <button onClick={handleClick}>Se connecter</button>
          </div>
      </form>
  </div>
  )
}

export default Login;