import ParamAvatar from '../../components/paramAvatar/ParamAvatar';
import './Params.css'
import { useCallback } from 'react';
import { refreshData } from '../../utils/refresh';

const Params = () => {
    const handleClick = useCallback(async () => {
        await refreshData()
    }, [])


    return (
        <div className="container-params">
            <h1>Paramètres</h1>
            <div className="params">
                <ParamAvatar/>
                <button onClick={handleClick} className='refreshData'>Actualiser les data</button>
                <div className='maj'>De futurs paramètres sont en production.</div>
               
            </div>
        </div>
    );
};

export default Params;