import { Route, Routes, Navigate } from "react-router-dom";
import Main from "./components/Main/Main";
import Signup from "./components/Singup/SignUp";
import Login from "./components/Login/LogIn";
import FavoriteDashboard from "./components/Dashboard/FavoriteDashboard";
import CartDasboard from "./components/Dashboard/CartDashboard";


function App() {
	const user = localStorage.getItem("token");

	return (
		<>
		<Routes>	
			{user && <Route path="/" exact element={<Main />} />}
			{user && <Route path="/favorite" exact element={<FavoriteDashboard />} />}
			{user && <Route path="/cart" exact element={<CartDasboard />} />}
			<Route path="/signup" exact element={<Signup />} />
			<Route path="/login" exact element={<Login />} />
			<Route path="/" element={<Navigate replace to="/login" />} />
			<Route path="/favorite" element={<Navigate replace to="/login" />} />
			<Route path="/cart" element={<Navigate replace to="/login" />} />
		</Routes>
		</>
	);
}

export default App;
