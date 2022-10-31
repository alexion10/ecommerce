import { useState } from "react";
import { useUpdateUserRoleMutation } from "../../store/api";


// update user role to customer, editor or admin
// only available for admin role users
export const UpateUserRole = () => {
    const [values, setValues] = useState({email: "", role:""})
    const [updateUserRole] = useUpdateUserRoleMutation();
    const handleSubmit = async (e) => {
        e.preventDefault();
        await updateUserRole({email: values.email, role: {role: values.role}})
        
    }

    //get values from inputs
    const handleChange = ({ currentTarget: input }) => {
		setValues({ ...values, [input.name]: input.value });
	};
    return (
        <div className="updateUserRole">
            <form onSubmit={handleSubmit}>
                <input type="email" placeholder="User email" name="email"
                    onChange={handleChange}
                    value={values.email}
                    required
                    className="add-product-input"/>
                <select value={values.role} onChange={handleChange} name="role">
                    <option value="customer">Customer</option>
                    <option value="editor">Editor</option>
                    <option value="admin">Admin</option>
                </select>
                <button type="submit" className="add-button-submit">Update</button>
            </form>
        </div>
    )
}
