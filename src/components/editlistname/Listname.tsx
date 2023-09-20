import { userAccountStore } from "../../store/store";

import '../listname/listname.css';

const Listname = () => {
    const { list, selectEditCategory, setSelectEditCategory } = userAccountStore()

    const alllist: string[] = list?.listnameAll.data || []

    const handleClick = async (event:React.MouseEvent<HTMLDivElement>)=> {
        const text = event.currentTarget.textContent
        if (text && alllist.includes(text)) {
            setSelectEditCategory(text)
        } else {
            setSelectEditCategory('dico')
        }     
    }

    return (
        <div className="parent-container-list">
          {list?.listnameAll.data.map((element, index) => (
            <div
              key={index}
              className={`card-container ${selectEditCategory === element ? 'selected' : ''}`}
              onClick={handleClick}
            >
              <div className='list-name'>{element}</div>
            </div>
          ))}
        </div>
      );
    }

export default Listname;