import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import './signUp.scss'
import { useCreateFaoriteListMutation, useSignUpMutation, useCreateCartListMutation } from "../../store/api";


//signup user
const Signup = () => {
	const [createFavoriteMutationList] = useCreateFaoriteListMutation();
	const [createCartList] = useCreateCartListMutation();
	const [signUp] = useSignUpMutation();
	const [data, setData] = useState({
		firstName: "",
		lastName: "",
		email: "",
		password: "",
	});
	const [error, setError] = useState("");
	const navigate = useNavigate();

	//get value from inputs
	const handleChange = ({ currentTarget: input }) => {
		setData({ ...data, [input.name]: input.value });
	};

	//submit data to database
	const handleSubmit = async (e) => {
		e.preventDefault();
		try {
			signUp(data);
			createFavoriteMutationList({email: data.email});
			createCartList({email: data.email})
			navigate("/login");
		} catch (error) {
			setError(error);
			console.log(error);
		}
	};

	return (
		<div className="signup_container">
			<div className="signup_form_container">
				<div className="left">
					<h1>Welcome Back</h1>
					<Link to="/login">
						<button type="button" className="white_btn">
							Sing in
						</button>
					</Link>
				</div>
				<div className="right">
					<form className="form_container" onSubmit={handleSubmit}>
						<h1>Create Account</h1>
						<input
							type="text"
							placeholder="First Name"
							name="firstName"
							onChange={handleChange}
							value={data.firstName}
							required
							className="input"
						/>
						<input
							type="text"
							placeholder="Last Name"
							name="lastName"
							onChange={handleChange}
							value={data.lastName}
							required
							className="input"
						/>
						<input
							type="email"
							placeholder="Email"
							name="email"
							onChange={handleChange}
							value={data.email}
							required
							className="input"
						/>
						<input
							type="password"
							placeholder="Password"
							name="password"
							onChange={handleChange}
							value={data.password}
							required
							className="input"
						/>
						{error && <div className="error_msg">{error}</div>}
						<button type="submit" className="green_btn">
							Sing Up
						</button>
					</form>
				</div>
			</div>
		</div>
	);
};

export default Signup;
