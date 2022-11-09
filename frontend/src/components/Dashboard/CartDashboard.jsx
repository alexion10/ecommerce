import {useCartQuery} from "../../store/api";
import {UpdateFavorite} from "../Favorite/updateFavorite";
import { useUpdateCartListMutation } from "../../store/api";
import {Navbar} from "../Main/Main";
import { AiOutlineArrowLeft, AiOutlineArrowRight } from "react-icons/ai";
import '../Cart/cartList.scss';

const CartDashboard = () => {
    const {data, error, isSuccess, isLoading} = useCartQuery();
    //update user cart list
    const [updateCartList] = useUpdateCartListMutation();
    //product details and type of action "add/remove"
    const updateCart = (productCode, productName, productPrice, image, rating, action) => {
        const obj = {
            product: {
                productCode: productCode,
                productName: productName,
                productPrice: productPrice,
                image: image,
                rating: rating
            },
            action: action
        }
        return {productAndAction: obj};
    }

    return (
        <>
            <Navbar/>

            <div className="hover-list">
                <h5>Cart list...</h5>
                {/* loader */}
                {isLoading && (
                    <div className="loader"></div>
                )}
                {/* display error message */}
                {error && (
                    <div className="error-msg">
                        <img src="error.png" alt="error msg" width="15px"/>
                        <p>We experienced some problems please come back later!</p>
                    </div>
                )}
                {/* display cart dashboard */}
                {isSuccess && (
                <div className="cart-dashboard">    
                    <div className="cart-list">
                        {
                        [...data.cartList].sort((a,b)=> a.productName.localeCompare(b.productName)).map(item => {
                            return <div key={item.productCode} className="cart-item">
                                <div className="cart-image">
                                <img src={item.image} alt={item.image} width="300px"/>
                                </div>
                                <div className="cart-details">
                                    <div>
                                        <h5 className="item-title">{item.productName}</h5>
                                        <p>{item.productPrice} RON</p>
                                        <p>Quantity:</p>
                                        <div className="cart-quantity-control">
                                            {/* Remove item*/}
                                            <AiOutlineArrowLeft onClick={()=>{updateCartList(updateCart(item.productCode, item.productName, item.productPrice, item.image, item.rating, 'remove'))}}/>
                                                {item.quantity}
                                            {/* Add item*/}
                                            <AiOutlineArrowRight onClick={()=>{updateCartList(updateCart(item.productCode, item.productName, item.productPrice, item.image, item.rating, 'add'))}}/>    
                                        </div>
                                    </div>
                                    <div className="cart-favorite">
                                        <UpdateFavorite 
                                            id={item.productCode}
                                            name={item.productName}
                                            image={'./placeholder.jpg'}
                                            price={item.productPrice}
                                        />
                                    </div>
                                </div>
                            </div>
                    })} </div>
                    <div className="purchase-details">
                        <p>Total: </p>
                        <p>{data.totalPrice} RON</p>
                        <button>Buy!</button>
                    </div>
                    </div>
                )
            } 
            
        
            </div>
       

        </>
    );
}

export default CartDashboard;
