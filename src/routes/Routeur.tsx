import { Route, Routes } from "react-router-dom";
import Home from "../pages/Home/Home";
import List from "../pages/List/List";
import Params from "../pages/Params/Params";
import Profil from "../components/ProfilNavbar/Profil";
import Chart from "../pages/Chart/Chart";
import { userAccountStore } from "../store/store";
import Edit from "../pages/Edit/Edit";


const Routeur = () => {
  const { burgerIsActive } = userAccountStore()

  return ( !burgerIsActive &&
    <div className="container">
      <Profil />
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/list" element={<List />}></Route>
        <Route path="/chart" element={<Chart />}></Route>
        <Route path="/edit" element={<Edit />}></Route>
        <Route path="/param" element={<Params />}></Route>
      </Routes>
    </div>
  );
};
export default Routeur;
