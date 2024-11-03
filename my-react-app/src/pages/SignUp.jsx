import React, { useState } from 'react';
import * as Yup from 'yup';
import { useNavigate } from 'react-router-dom';
import './SignUp.css';

const SignUp = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        userId: '',
        password: '',
        confirmPassword: '',
        name: '',
        address: '',
        country: '',
        zipCode: '',
        email: '',
        gender: '',
        language: '',
        about: '',
    });

    const [errors, setErrors] = useState({});

    const validationSchema = Yup.object().shape({
        name: Yup.string().matches(/^[A-Za-z\s]+$/, "Only letters allowed").required("Full Name is required"),
        email: Yup.string().email("Invalid email address").required("Email is required"),
        password: Yup.string()
            .min(7, "Password must be at least 7 characters")
            .max(12, "Password cannot exceed 12 characters")
            .required("Password is required"),
        confirmPassword: Yup.string()
            .oneOf([Yup.ref('password'), null], "Passwords must match")
            .required("Confirm Password is required"),
        gender: Yup.string().required("Gender is required"),
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await validationSchema.validate(formData, { abortEarly: false });
            setErrors({});

            // Show success alert
            window.alert(`Signup successful! Welcome, ${formData.name}`);
            console.log("Form Submitted:", formData);

            // Send data to Firebase
            await fetch('https://midhackathone-default-rtdb.firebaseio.com/form.json', {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    name: formData.name,
                    email: formData.email,
                    password: formData.password,
                    confirmPassword: formData.confirmPassword,
                }),
            });

            // Clear form fields
            setFormData({
                userId: '',
                password: '',
                confirmPassword: '',
                name: '',
                address: '',
                country: '',
                zipCode: '',
                email: '',
                gender: '',
                language: '',
                about: '',
            });

            // Navigate to home page
            navigate('/home');

        } catch (validationErrors) {
            if (validationErrors.inner) {
                const errorMessages = validationErrors.inner.reduce((acc, error) => {
                    acc[error.path] = error.message;
                    return acc;
                }, {});
                setErrors(errorMessages);
            } else {
                console.error(validationErrors);
            }
        }
    };

    return (
        <div className="signup-page">
            <h2>SignUp</h2>
            <form onSubmit={handleSubmit} className="signup-form">
                {/* Full Name Field */}
                <div className="form-group">
                    <label>Full Name</label>
                    <input
                        type="text"
                        name="name"
                        placeholder="Enter your full name"
                        value={formData.name}
                        onChange={handleChange}
                        className={errors.name ? "error" : ""}
                    />
                    {errors.name && <div className="error-message">{errors.name}</div>}
                </div>

                {/* Email Field */}
                <div className="form-group">
                    <label>Email</label>
                    <input
                        type="email"
                        name="email"
                        placeholder="Enter your email"
                        value={formData.email}
                        onChange={handleChange}
                        className={errors.email ? "error" : ""}
                    />
                    {errors.email && <div className="error-message">{errors.email}</div>}
                </div>

                {/* Password Field */}
                <div className="form-group">
                    <label>Password</label>
                    <input
                        type="password"
                        name="password"
                        placeholder="Enter your password"
                        value={formData.password}
                        onChange={handleChange}
                        className={errors.password ? "error" : ""}
                    />
                    {errors.password && <div className="error-message">{errors.password}</div>}
                </div>

                {/* Confirm Password Field */}
                <div className="form-group">
                    <label>Confirm Password</label>
                    <input
                        type="password"
                        name="confirmPassword"
                        placeholder="Confirm your password"
                        value={formData.confirmPassword}
                        onChange={handleChange}
                        className={errors.confirmPassword ? "error" : ""}
                    />
                    {errors.confirmPassword && <div className="error-message">{errors.confirmPassword}</div>}
                </div>

                {/* Gender Field */}
                <div className="form-group">
                    <label>Gender</label>
                    <div className="radio-group">
                        <label>
                            <input
                                type="radio"
                                name="gender"
                                value="Male"
                                checked={formData.gender === 'Male'}
                                onChange={handleChange}
                            />
                            Male
                        </label>
                        <label>
                            <input
                                type="radio"
                                name="gender"
                                value="Female"
                                checked={formData.gender === 'Female'}
                                onChange={handleChange}
                            />
                            Female
                        </label>
                    </div>
                    {errors.gender && <div className="error-message">{errors.gender}</div>}
                </div>

                <button type="submit" className="submit-button">SignUp</button>
            </form>
        </div>
    );
};

export default SignUp;
