import { userAccountStore } from "../../store/store";
import "./profil.css";
import defaultImage from "../../img/guest.png";
import {FaStar, FaUser} from "react-icons/fa"

const Profil = () => {
  const { account, profil } = userAccountStore();

  return (
    <div className="profil">
      <div className="profil-role">{(account?.role === "admin" ?  <FaUser/> : <FaStar/>)} {account?.role}</div>
      <div className="profil-pseudo">
        {account?.name}{" "}
      </div>
      <img
        className="profil-image"
        src={profil?.image || defaultImage}
        alt="Avatar de l'utilisateur"
      />
    </div>
  );
};

export default Profil;
