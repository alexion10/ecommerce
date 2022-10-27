import { useFavoritesQuery, useUpdateFavoriteListMutation } from "../../store/api";
import { AiOutlineHeart, AiFillHeart } from 'react-icons/ai';
import './updateFavorite.scss';

export const UpdateFavorite = ({id, name, image, price}) =>{
    const user = JSON.parse(localStorage.getItem('userInfo'));
    const userInfo = user.email;
    const product = {id: id, name: name, image: image, price: price};
    const [updateFavoriteList] = useUpdateFavoriteListMutation();
    const {data, isSuccess} = useFavoritesQuery(userInfo);
    const handleClick = () => {
        updateFavoriteList({email: userInfo, product: product});
    }
    return (
        <>
            {
                isSuccess &&
                ([...data].find(item => item.id === id) ? 
                <AiFillHeart className="product-favorite marked" onClick={handleClick}/>  
                : 
                <AiOutlineHeart className="product-favorite unmarked" onClick={handleClick}/>
                )
            }
            
        </>
    )
}
