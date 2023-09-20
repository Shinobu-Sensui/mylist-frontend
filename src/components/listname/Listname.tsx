import { userAccountStore } from "../../store/store";
import { ChooseCategory } from "../../types/chooseCategory";


import '../listname/listname.css';

;
const Listname = () => {
    const { list, setChooseCategory, chooseCategory } = userAccountStore()

    const alllist: string[] = list?.listnameAll.data || []

    const handleClick = async (event:React.MouseEvent<HTMLDivElement>)=> {
        const text = event.currentTarget.textContent
        if (text && alllist.includes(text)) {
            const newCategory: ChooseCategory = { ...chooseCategory,  category:text }
            setChooseCategory(newCategory)
        } else {
            const newCategory:ChooseCategory = { ...chooseCategory,  category:'dico' }
            setChooseCategory(newCategory)
        }     
    }

    return (
      <>
        <div className="parent-container-list">
          {list?.listnameAll.data.map((element, index) => (
            <div
              key={index}
              className={`circle-container ${chooseCategory.category === element ? 'selected' : ''}`}
              onClick={handleClick}
            >
              <div className='list-name'>{element}</div>
            </div>
          ))}
        </div>
        </>
      );
    }

export default Listname;