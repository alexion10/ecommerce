import { useState } from "react";
import { useSelector } from "react-redux";
import { useUsersQuery } from "../../store/api";
import { Product } from "./product";


//filter options 
const sortItems = (array, category, order, typeOfProduct) => {
    if(typeOfProduct !== 'all'){
        array = array.filter(i=> i.typeOfProduct === typeOfProduct);
    }

    if((category === 'date') && (order ===  'asc')){
        return array.sort((a,b)=> new Date(b.date) - new Date(a.date));
    }

    if(category === 'date' && order ===  'desc'){
        return array.sort((a,b)=> new Date(a.date) - new Date(b.date));
    }

    if((category === 'price') && order ===  'desc'){
        return array.sort((a,b)=> b.productPrice - a.productPrice);
    }

    if(category === 'price' && order ===  'asc'){
        return array.sort((a,b)=> a.productPrice - b.productPrice);
    }

    if(category === 'name' && order ===  'asc'){
        return array.sort((a,b)=> a.productName.localeCompare(b.productName));
    }

    if(category === 'name' && order ===  'desc'){
        return array.sort((a,b)=> b.productName.localeCompare(a.productName));
    }
    return array;
}

export const ProductList = () => {
    const [sortOrder, setSortOrder] = useState('desc');
    const [sortByCategory, setSortCategory] = useState('date');
    const [productType, setProductType] = useState('all');
    //get userRole 
    const userRole = useSelector(state => state.userInfo.role)
    
    //show only for editor and admin users
    const hideFromCustomer = ((userRole === 'editor') || (userRole === 'admin')) ? true : false;
    const {
        data,
        error,
        isLoading,
        isFetching,
        isSuccess
    } = useUsersQuery();

    //get values from inputs
    const handleChangeCategory = (e) => {
        setSortCategory(e.target.value);
    }

    const handleChangeOrder = (e) => {
        setSortOrder(e.target.value);
    }

    const handleChangeProductType = (e) => {
        setProductType(e.target.value);
    }

    return (
        <div className="products-area">
            <h5 className="product-area-title">Product List...</h5>
            {/*loader and msg will be activ as application is loading data*/}
            {
            isLoading && (
                <>
                    <div className="loader"></div>
                    <p>We are loading data :)...</p>
                </>
            )
        }
        {/*loader and msg will be activ as application is fetching data*/}
            {
            isFetching && (
                <>
                    <div className="loader"></div>
                    <p>Talking to server... :)...</p>
                </>
            )
        }
        {/* error mesaj will be given when we have a error*/}
            {
            error && (
                <div className="error-msg">
                    <img src="error.png" alt="error msg" width="100px"/>
                    <p>We experienced some problems please come back later!</p>
                </div>
            )
        }
        {/* product list */}
            {
            isSuccess && (
                <div>
                    <div className="filter-area">
                    <select value={sortByCategory} onChange={handleChangeCategory} name="category">
                            <option value="date">Date</option>
                            <option value="price">Price</option>
                            <option value="name">Name</option>
                        </select>
                        <select value={sortOrder} onChange={handleChangeOrder} name="order">
                            <option value="desc">Desc</option>
                            <option value="asc">Asc</option>
                        </select>
                        <select value={productType} onChange={handleChangeProductType}>
                            <option value="all">All</option>
                            {[...new Set(data.map(i=> i.typeOfProduct))].map(i=> {
                                return <option value={i} key={i}>{i}</option>
                            })}
                        </select>
                        
                    </div>
                <div className="product-list">
                    {
                    sortItems( [...data], sortByCategory, sortOrder, productType ).map((product) => {
                        return (
                            <Product key={product._id}
                                id={product._id}
                                productName={product.productName}
                                productPrice={product.productPrice}
                                rating={product.rating}
                                productCode={product.productCode}
                                hideFromCustomer={hideFromCustomer}
                            />
                        )
                    })
                } </div></div>
            )
        } </div>
    )
}