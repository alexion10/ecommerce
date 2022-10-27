import {useState} from "react"
import "./products.scss";
import { useAddProductsMutation, useUpdateProductsMutation} from "../../store/api";
import {CgArrowLongDown} from "react-icons/cg";


export const AddtoDatabase = () => {
    const [addProducts] = useAddProductsMutation();
    const [updateProducts] = useUpdateProductsMutation();
    const [product, setAddProduct] = useState({productName: "", typeOfProduct: "", productPrice: '', productCode: ""});
    const [getError, setError] = useState('');
    const [handleUpdateUI, setHandleUpdateUI] = useState(true);

    const handleChange = ({currentTarget: input}) => {
        setAddProduct({
            ...product,
            [input.name]: input.value
        });
    };

    const handleSubmitAdd = async (e) => {
        e.preventDefault();
        try {
            if(handleUpdateUI){
                addProducts(product)
                setAddProduct({productName: "", typeOfProduct: "", productPrice: '', productCode: ""})
            }else{
                const validateProductUpdate = () =>{
                    let prod = {};
                    if(product.productName.length>0)
                        prod = {...prod, productName: product.productName}
                    if(product.typeOfProduct.length>0)
                        prod = {...prod, typeOfProduct: product.typeOfProduct}
                    if(product.productPrice.length>0)
                        prod = {...prod, productPrice: product.productPrice}
                    return prod;    
                }
                updateProducts({productCode: product.productCode, product: validateProductUpdate()})
            }   
            setAddProduct({productName: "", typeOfProduct: "", productPrice: '', productCode: ""})
        } catch (error) {
            if (error.response && error.response.status >= 400 && error.response.status <= 500) {
                setError(error.response.data.message);
                console.error(getError);
            }
        }
    };

    const handleUIUpdate = () => {
        setHandleUpdateUI(!handleUpdateUI);
    }

    return (
        <div className="add-product">
            {
            handleUpdateUI && (
                <div className="control-details">
                    <div className="control-details-current">
                        <h5>Add product</h5>
                        <CgArrowLongDown/>
                    </div>
                    <button onClick={handleUIUpdate}>Update</button>
                </div>
            )
        }

            {
            !handleUpdateUI && (
                <div className="control-details">
                    <div className="control-details-current">
                        <h5>Update product</h5>
                        <CgArrowLongDown/>
                    </div>
                    <button onClick={handleUIUpdate}>Add</button>
                </div>
            )
        }


            <form onSubmit={handleSubmitAdd}>
                <input type="text" placeholder="Product code" name="productCode"
                    onChange={handleChange}
                    value={
                        product.productCode
                    }
                    required
                    className="add-product-input"/>
                <input type="text" placeholder="Product name" name="productName"
                    onChange={handleChange}
                    value={
                        product.productName
                    }
                    required={handleUpdateUI}
                    className="add-product-input"/>
                <input type="text" placeholder="Product type" name="typeOfProduct"
                    onChange={handleChange}
                    value={
                        product.typeOfProduct
                    }
                    required={handleUpdateUI}
                    className="add-product-input"/>
                <input type="number" placeholder="Product price" name="productPrice"
                    onChange={handleChange}
                    value={
                        product.productPrice
                    }
                    required={handleUpdateUI}
                    className="add-product-input"/> 
                {
                   !handleUpdateUI && (
                        <button type="submit" className="add-button-submit">Update product!</button>
                    )
                }
                {
                    handleUpdateUI && (
                        <button type="submit" className="add-button-submit">Add product!</button>
                    )
                }
             </form>


        </div>
    )
}