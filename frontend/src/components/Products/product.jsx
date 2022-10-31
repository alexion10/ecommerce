import { useDeleteProductsMutation } from "../../store/api";
import { UpdateFavorite } from "../Favorite/updateFavorite";
import { UpdateCart } from "../Cart/UpdateCart";

export const Product = ({
    id,
    productName,
    productPrice,
    rating,
    productCode,
    hideFromCustomer = false
}) => {

    //function to delete product from db
    const [deleteProduct] = useDeleteProductsMutation();
    return (
        <div className="product-item">
            {
                /* add to favorite option show only to customers*/ 
                !hideFromCustomer ? (
                    <div className ="product-favorite-action">
                        <UpdateFavorite  id={productCode} name={productName} image={'./placeholder.jpg'} price={productPrice}/>
                    </div>
                ) : null
            }
            
            <img src="./placeholder.jpg" alt={productName} width="300px"/>
            <div className="product-details">
            <div>
            <h5>{productName}</h5>
            {hideFromCustomer &&(
                <p>{productCode}</p>
            )}
            
            <p>{productPrice}
                RON</p>
            </div>
            <div> 
                {/* hide delete product option for customer, show add to cart option
                    delete product option will be available only for users with editor/admin role
                */}
                {hideFromCustomer ? (
                <button onClick={
                    () => deleteProduct({id: id})
                }>Delete!</button>
            ): 
                <UpdateCart 
                    productCode={productCode} 
                    productName={productName} 
                    productPrice={productPrice} 
                    image={'./placeholder.jpg'} 
                    rating={rating}
                />
                }
            </div>            
            
        </div>
        </div>
    )
}