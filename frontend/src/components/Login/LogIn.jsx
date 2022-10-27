import { useState } from "react";
import { Link } from "react-router-dom";
import { useLogInMutation } from "../../store/api";
import "./login.scss";

const Login = () => {
	const [logInData, setData] = useState({ email: "", password: "" });
	const [error, setError] = useState("");
	const [logIn]  = useLogInMutation();
	const handleChange = ({ currentTarget: input }) => {
		setData({ ...logInData, [input.name]: input.value });
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		try {
			const userData = await logIn(logInData);
			localStorage.setItem("token", userData.data.token);
			localStorage.setItem('userInfo', JSON.stringify(userData.data.infoUser))
			window.location = '/' 
		} catch (error) {
			if (
				error.response &&
				error.response.status >= 400 &&
				error.response.status <= 500
			) {
				setError(error.response.data.message);
			}
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
