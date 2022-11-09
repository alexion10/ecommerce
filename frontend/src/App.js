import { Route, Routes, Navigate } from "react-router-dom";
import Main from "./components/Main/Main";
import Signup from "./components/Singup/SignUp";
import Login from "./components/Login/LogIn";
import FavoriteDashboard from "./components/Dashboard/FavoriteDashboard";
import CartDasboard from "./components/Dashboard/CartDashboard";
import { useDispatch } from "react-redux";
import { useUserRoleQuery } from "./store/api";
import { getRole } from "./store/userInfo";
import { useEffect } from "react";

function App() {
	const user = localStorage.getItem("token");
	const dispatch = useDispatch();
	const {data, isError, isSuccess} = useUserRoleQuery();
	useEffect(()=>{
		if(user){
			const setUserRole = async () =>{
				try{
					const success = await isSuccess;
					if(success){
						dispatch(getRole(data.userRole))
					} 
					const error = await isError;
					console.log(error)
					if(error){
						localStorage.removeItem('token');
						window.location = "/";
					}
	
				}catch(error){
					console.log(error)
				}
			}
			setUserRole();
		}
	},[dispatch, data, isSuccess, user, isError])
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
