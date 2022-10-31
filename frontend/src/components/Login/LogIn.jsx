import { useState } from "react";
import { Link } from "react-router-dom";
import { useLogInMutation } from "../../store/api";
import "./login.scss";

const Login = () => {
	const [logInData, setData] = useState({ email: "", password: "" });
	const [error, setError] = useState("");
	const [logIn]  = useLogInMutation();

	//get input values
	const handleChange = ({ currentTarget: input }) => {
		setData({ ...logInData, [input.name]: input.value });
	};

	//submit data to database
	const handleSubmit = async (e) => {
		e.preventDefault();
		try {
			//get user data from db
			const userData = await logIn(logInData);
			//save token and userInfo to localStorage
			localStorage.setItem("token", userData.data.token);
			localStorage.setItem('userInfo', JSON.stringify(userData.data.infoUser))
			
			//reload to main dashboard
			window.location = '/' 
		} catch (error) {
			//set error and show error to console
			setError(error);			
			console.log(error)
		}
	};

	return (
		<div className="login_container">
			<div className="login_form_container">
				<div className="left">
					<form className="form_container" onSubmit={handleSubmit}>
						<h1>Login to Your Account</h1>
						<input
							type="email"
							placeholder="Email"
							name="email"
							onChange={handleChange}
							value={logInData.email}
							required
							className="input"
						/>
						<input
							type="password"
							placeholder="Password"
							name="password"
							onChange={handleChange}
							value={logInData.password}
							required
							className="input"
						/>
						{error && <div className="error_msg">{error}</div>}
						<button type="submit" className="green_btn">
							Sing In
						</button>
					</form>
				</div>
				<div className="right">
					<h1>New Here ?</h1>
					<Link to="/signup">
						<button type="button" className="white_btn">
							Sing Up
						</button>
					</Link>
				</div>
			</div>
		</div>
	);
};

export default Login;
