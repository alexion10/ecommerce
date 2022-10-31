import { useCartQuery } from "../../store/api";
import { MdWarningAmber } from 'react-icons/md';
import { AiOutlineShoppingCart } from 'react-icons/ai';
import './cartNumber.scss';

export const CartNumber = () =>{
    const userInfo = JSON.parse(localStorage.getItem('userInfo'));
    const { data, error, isSuccess } = useCartQuery(userInfo.email);
    return(
        <div>
            {/* loader */}
            {error && (
                    <MdWarningAmber className="cart-num-icon"/>
                    
            )}
            {/* get total product numbers from user cart list */}
            {isSuccess && (
                <>
                    <AiOutlineShoppingCart className="cart-num-icon"/>
                    <span className="badge" id="cart">{(data.totalQuantity > 0) ? data.totalQuantity : null}</span>
                </>
            )}
            
        </div>
    )
}