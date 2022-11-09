import { useUpdateCartListMutation } from "../../store/api";
import { BsFillCartCheckFill } from 'react-icons/bs';
import './updateCart.scss'

export const UpdateCart = ({productCode, productName, productPrice, image, rating}) => {
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
        updateCartList({productAndAction: productAndAction})
    }
    return (
        <>
            <BsFillCartCheckFill onClick={handleClick} className="product-cart"/>
        </>
    )
}