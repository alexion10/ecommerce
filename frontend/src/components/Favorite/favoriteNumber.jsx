import { useFavoritesQuery } from "../../store/api";
import { MdWarningAmber } from 'react-icons/md'
import { AiOutlineHeart } from 'react-icons/ai';
import './favoriteNumber.scss'

//get number of products in the favorite list
export const FavoriteNumber = () =>{
    // get userInfo
    const userInfo = JSON.parse(localStorage.getItem('userInfo'));
    //get user favorite list
    const { data, error, isSuccess } = useFavoritesQuery(userInfo.email);
    return(
        <div>
            {error && (
                <MdWarningAmber className="favorite-num-icon"/>
            )}
            {isSuccess && (
                <>
                    <AiOutlineHeart className="favorite-num-icon"/>
                    <span className="badge" id="favorite">{([...data].length > 0) ? [...data].length : null}</span>
                 </>
            )}
            
        </div>
    )
}


