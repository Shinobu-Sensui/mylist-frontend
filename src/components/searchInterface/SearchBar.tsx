import React, { ChangeEvent } from 'react';
import { FaSearch } from 'react-icons/fa';

type ShearchBarProps = {
    change: (event:ChangeEvent<HTMLInputElement>) => void
    id:string,
    style?: {
        [key:string]:string
    }
}

const SearchBar:React.FC<ShearchBarProps>  = ({ change, id, style }) => {
    return (
        <div className="search-container" id={id}>
                <FaSearch  className='search-icon'/>
                <input
                onChange={ change }
                className="interface-input"
                type="search"
                name="int-shearch"
                placeholder="Rechercher un mot"
                style={style}
                />
        </div>
   
    );
};

export default SearchBar;