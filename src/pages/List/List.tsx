import Listname from "../../components/listname/Listname"
import ShearchInterface from "../../components/searchInterface/SearchInterface";
import './list.css'

const List = () => {
  return (
    <div className="container-searchList">
        <ShearchInterface/>
      <Listname/>
    </div>
  )
}

export default List;