import "../../../css/Auth.css";
import AuthLayout from "../../Layouts/AuthLayout";
import { Link, useForm } from "@inertiajs/react";
import { useRoute } from "../../../../vendor/tightenco/ziggy";

export default function Login() {
    const route = useRoute();
    const { data, setData, post, errors, reset } = useForm({
        email: "",
        password: "",
        remember: false,
    });
    const submit = (e) => {
        e.preventDefault();
        post(route("login"), {
            onFinish: () => reset("password"),
        });
    };
    return (
        <>
            <div className="auth-container">
                <h2 className="font-bold">Login</h2>
                <form onSubmit={submit}>
                    <div className="form-group">
                        <label htmlFor="email">Username or Email:</label>
                        <input
                            type="text"
                            id="email"
                            required
                            name="email"
                            autoFocus
                            value={data.email}
                            onChange={(e) => setData("email", e.target.value)}
                            placeholder="email@example.com"
                        />
                        {errors.email && <div>{errors.email}</div>}
                    </div>
                    <div className="form-group">
                        <label htmlFor="password">Password:</label>
                        <input
                            type="password"
                            id="password"
                            required
                            name="password"
                            value={data.password}
                            onChange={(e) =>
                                setData("password", e.target.value)
                            }
                            placeholder="Password"
                        />
                    </div>
                    <button type="submit" className="auth-button">
                        Login
                    </button>
                </form>
                <p className="auth-link">
                    Don't have an account?{" "}
                    <Link href="/register">Register</Link>
                </p>
            </div>
        </>
    );
}

Login.layout = (page) => <AuthLayout children={page} />;
