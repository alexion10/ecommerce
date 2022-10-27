import { useFavoritesQuery } from "../../store/api";
import { MdWarningAmber } from 'react-icons/md'
import { AiOutlineHeart } from 'react-icons/ai';
import './favoriteNumber.scss'

export const FavoriteNumber = () =>{
    const userInfo = JSON.parse(localStorage.getItem('userInfo'));
    const { data, error, isSuccess } = useFavoritesQuery(userInfo.email);
    return(
        <div>
            {
                error && (
                    <MdWarningAmber className="favorite-num-icon"/>
                    
                )
            }
            {isSuccess && (
                <>
                <AiOutlineHeart className="favorite-num-icon"/>
                 <span className="badge" id="favorite">{([...data].length > 0) ? [...data].length : null}</span>
                 </>
            )}
            
        </div>
    )
}


