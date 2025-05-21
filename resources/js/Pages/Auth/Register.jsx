import "../../../css/Auth.css";
import AuthLayout from "../../Layouts/AuthLayout";
import { Link, useForm } from "@inertiajs/react";
import { useRoute } from "../../../../vendor/tightenco/ziggy";

export default function Register() {
    const route = useRoute();
    const { data, setData, post, errors, reset } = useForm({
        name: "",
        email: "",
        password: "",
        password_confirmation: "",
    });

    const submit = (e) => {
        e.preventDefault();
        post(route("register"), {
            onFinish: () => reset("password", "password_confirmation"),
        });
    };
    return (
        <>
            <div className="auth-container">
                <h2 className="font-bold">Register</h2>
                <form onSubmit={submit}>
                    <div className="form-group">
                        <label htmlFor="name">Full Name:</label>
                        <input
                            type="text"
                            id="name"
                            name="name"
                            required
                            autoFocus
                            value={data.name}
                            onChange={(e) => setData("name", e.target.value)}
                            placeholder="Full name"
                        />
                        {errors.name && <div>{errors.name}</div>}
                    </div>
                    <div className="form-group">
                        <label htmlFor="email">Email:</label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            required
                            autoFocus
                            value={data.email}
                            onChange={(e) => setData("email", e.target.value)}
                            placeholder="email@exemple.com"
                        />
                        {errors.email && <div>{errors.email}</div>}
                    </div>
                    <div className="form-group">
                        <label htmlFor="password">Password:</label>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            required
                            value={data.password}
                            onChange={(e) =>
                                setData("password", e.target.value)
                            }
                            placeholder="Password"
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="confirmPassword">
                            Confirm Password:
                        </label>
                        <input
                            type="password"
                            id="confirmPassword"
                            required
                            value={data.password_confirmation}
                            onChange={(e) =>
                                setData("password_confirmation", e.target.value)
                            }
                            placeholder="Confirm password"
                        />
                    </div>
                    <button type="submit" className="auth-button">
                        Register
                    </button>
                </form>
                <p className="auth-link">
                    Already have an account? <Link href="/login">Login</Link>
                </p>
            </div>
        </>
    );
}

Register.layout = (page) => <AuthLayout children={page} />;
