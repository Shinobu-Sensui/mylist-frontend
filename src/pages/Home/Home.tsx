import './Home.css'
import { userAccountStore } from '../../store/store'
import Typewriter from './Typewriter'

const Home = () => {

  const { profil } = userAccountStore()

  return (
    <div className="home">
        <Typewriter text={`Hello, ${profil?.name}`}/>   
    </div>
  )
}

export default Home;