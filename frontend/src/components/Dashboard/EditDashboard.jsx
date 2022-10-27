import "../Products/products.scss";
import { UpateUserRole } from "../User/updateUserRole";
import { AddtoDatabase } from "../Products/addToDatabase";
import { ProductList } from "../Products/productList";


const EditDashboard = () => {
    const userDetails = JSON.parse(localStorage.getItem('userInfo'));
    const userRole = userDetails.role;
    return (
        <div className="admin-area">
            <div className="add-products">
                <AddtoDatabase/>
                {userRole === 'admin' && <UpateUserRole />}
            </div>
            <ProductList/>
        </div>
    )
}

export default EditDashboard;
