import {useFavoritesQuery} from "../../store/api";
import {UpdateFavorite} from "../Favorite/updateFavorite";
import {Navbar} from "../Main/Main";


const FavoriteDashboard = () => {
    const userInfo = JSON.parse(localStorage.getItem('userInfo'));
    const {data, error, isSuccess, isLoading} = useFavoritesQuery(userInfo.email);
    
    return (
        <>
            <Navbar/>

            <div className="hover-list">
                <h5>Favorite list...</h5>
                {
                isLoading && (
                    <div className="loader">asdasd</div>
                )
            }
                {
                error && (
                    <div className="error-msg">
                        <img src="error.png" alt="error msg" width="15px"/>
                        <p>We experienced some problems please come back later!</p>
                    </div>
                )
            }
                {
                isSuccess && (
                    <div className="product-list">                        
                        {
                        [...data].map(item => {
                            return <div key={
                                    item.id
                                }
                                className="product-item">
                                <img src={
                                        item.image
                                    }
                                    alt={
                                        item.image
                                    }
                                    width="300px"/>
                                <div className="product-details">
                                    <div>
                                        <p>{
                                            item.name
                                        }</p>
                                        <p>{
                                            item.price
                                        }</p>
                                    </div>
                                    <div>
                                        <UpdateFavorite id={
                                                item.id
                                            }
                                            name={
                                                item.name
                                            }
                                            image={'./placeholder.jpg'}
                                            price={
                                                item.price
                                            }/>
                                            
                                    </div>
                                </div>
                            </div>
                    })
                    } </div>
                )
            } </div>


        </>
    );
}

export default FavoriteDashboard;
