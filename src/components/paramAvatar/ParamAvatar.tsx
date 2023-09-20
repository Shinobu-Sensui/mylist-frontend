
import { userAccountStore } from '../../store/store';
import { uploadImage } from '../../utils/FetchApi';
import { useRef } from 'react';
import './ParamAvatar.css'

const ParamAvatar = () => {
    const { profil, setProfil } = userAccountStore()
    const fileInput = useRef<HTMLInputElement>(null);
    
    const handleImageChange = async (e:React.ChangeEvent<HTMLInputElement>) : Promise<void> =>  {
        if (e.target.files && e.target.files[0]) {
            let reader = new FileReader()
            const file = e.target.files[0]
            const maxSize = 500000; // par exemple 500 KB
            if (file.size > maxSize) {
              alert("Le fichier est trop volumineux. Veuillez sélectionner un fichier de moins de 500 KB.");
              return;
            }
            const formData = new FormData()
            formData.append('avatar', file)
            const response = await uploadImage('http://localhost:8000/avatar', formData)
            if (!response) {
                console.error('Erreur lors de l\'upload de l\'image');
            }
            reader.onload = (e:ProgressEvent<FileReader>) => {
                if (profil) {
                    setProfil({...profil, image: (e.target?.result as string)});
                }

            }

            reader.readAsDataURL(file)
        }
    }

    const handleClick = () => {
        fileInput.current?.click();
    }

    return (
        <div className="avatar-profil">
            <div className="x">
                <img src={profil?.image} alt="avatar" onClick={handleClick} />
                <label htmlFor="paramImg">Changer l'avatar</label>
                <input id="paramImg" ref={fileInput} type="file" hidden onChange={handleImageChange} accept="image/jpeg"/>
            </div>
        </div>  
    );
};

export default ParamAvatar;