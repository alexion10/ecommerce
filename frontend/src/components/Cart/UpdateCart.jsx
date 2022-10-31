import { useUpdateCartListMutation } from "../../store/api";
import { BsFillCartCheckFill } from 'react-icons/bs';
import './updateCart.scss'

export const UpdateCart = ({productCode, productName, productPrice, image, rating}) => {
    const userInfo = JSON.parse(localStorage.getItem('userInfo'));
    const userEmail = userInfo.email;
    // product details and action type
    const productAndAction = {
        product: {
            productCode: productCode,
            productName: productName,
            productPrice: productPrice,
            image: image,
            rating: rating
        },
        action: 'add'        
    }
    const [updateCartList] = useUpdateCartListMutation();
    const handleClick = (e) => {
        e.preventDefault();
        //update cart product list
        updateCartList({email: userEmail, productAndAction: productAndAction})
    }
    return (
        <>
            <BsFillCartCheckFill onClick={handleClick} className="product-cart"/>
        </>
    )
}