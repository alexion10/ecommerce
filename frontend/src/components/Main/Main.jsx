import AddProduct from "../Dashboard/EditDashboard";
import {Link} from "react-router-dom";
import CustomerDashboard from "../Dashboard/CustomerDashboard";
import {FavoriteNumber} from "../Favorite/favoriteNumber";
import { CartNumber } from "../Cart/cartNumber";
import "./main.scss";
import { useSelector } from "react-redux";

export const Navbar = () => {
    //get user role
    const userRole = useSelector(state=> state.userInfo.role)
    //user role
    const generateUIByRole = ((userRole === 'editor') || (userRole === 'admin')) ? true : false;

    //remove information user from local storage
    const handleLogout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("userInfo");
        window.location.reload();
    };
    return (
        <nav className="navbar">
            <Link to={'/'}>
                <h1>E-Commerce</h1>
            </Link>
            <div className="nav-icons"> {
                !generateUIByRole && (
                    <div>
                        <Link to={'/favorite'}>
                            <FavoriteNumber/>
                        </Link>
                        <Link to={'/cart'}>
                            <CartNumber/>
                        </Link>
                    </div>
                )
            }

                <button className="white_btn"
                    onClick={handleLogout}>
                    Logout
                </button>
            </div>
        </nav>
    )
}

const Main = () => {
    const userRole = useSelector(state=> state.userInfo.role)
    const generateUIByRole = ((userRole === 'editor') || (userRole === 'admin')) ? true : false;
    return (
        <div className="main_container">
            <Navbar/> 
            {/* generate for admin/editor */}
            {generateUIByRole && (
                <AddProduct/>)
            }
            {/* generate for customers */}
            {!generateUIByRole && (
                <CustomerDashboard/>)
        } </div>
    );
};

export default Main;
