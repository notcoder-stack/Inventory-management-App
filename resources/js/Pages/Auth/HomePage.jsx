import AuthLayout from "../../Layouts/AuthLayout";
import { Link } from "@inertiajs/react";
import "../../../css/HomePage.css";

export default function HomePage() {
    return (
        <div className="container">
            <header>
                <div className="logo">StockFlow</div>
                <nav>
                    <ul>
                        <li>
                            <Link href="/register">Register</Link>
                        </li>
                        <li>
                            <Link href="/login">Login</Link>
                        </li>
                    </ul>
                </nav>
            </header>

            <section className="hero">
                <div className="hero-text">
                    <h1>Take Control of Your Stock. Effortlessly.</h1>
                    <p>
                        Streamline your inventory, boost efficiency, and
                        eliminate guesswork with our intuitive app.
                    </p>
                    <div className="hero-buttons">
                        <Link href="/login" className="btn btn-primary">
                            Get Started
                        </Link>
                    </div>
                </div>
                <div className="hero-image">
                    <img
                        src="https://img.freepik.com/free-vector/new-entries-concept-illustration_114360-28019.jpg?ga=GA1.1.199671683.1747076729&semt=ais_hybrid&w=740"
                        alt="Inventory Management Dashboard"
                        width="500"
                    />
                </div>
            </section>

            <section className="features">
                <h2>Powerful Features to Manage Your Entire Business</h2>
                <div className="features-list">
                    <div className="feature-item">
                        <h3>Product Management</h3>
                        <p>
                            Organize and track all your products with detailed
                            information, including descriptions, SKUs, images,
                            and pricing.
                        </p>
                    </div>
                    <div className="feature-item">
                        <h3>Supplier Management</h3>
                        <p>
                            Keep track of your suppliers, manage purchase
                            orders, and streamline your procurement process.
                        </p>
                    </div>
                    <div className="feature-item">
                        <h3>Sales Management</h3>
                        <p>
                            Manage your sales orders, track shipments, and gain
                            insights into your sales performance.
                        </p>
                    </div>
                    <div className="feature-item">
                        <h3>Employee Management</h3>
                        <p>
                            Control user access and permissions, allowing your
                            team to collaborate efficiently within the app.
                        </p>
                    </div>
                    <div className="feature-item">
                        <h3>Real-time Inventory Tracking</h3>
                        <p>
                            Monitor stock levels, locations, and item details in
                            real-time to prevent stockouts and overstocking.
                        </p>
                    </div>
                    <div className="feature-item">
                        <h3>Comprehensive Reporting</h3>
                        <p>
                            Generate insightful reports on inventory levels,
                            sales trends, and more to make informed business
                            decisions.
                        </p>
                    </div>
                </div>
            </section>

            <section className="cta">
                <h2>Ready to Simplify Your Inventory and More?</h2>
                <p>
                    Join thousands of businesses who are already saving time and
                    money with StockFlow.
                </p>
                <Link href="/register" className="btn btn-primary btn-large">
                    Sign Up for Free
                </Link>
            </section>

            <footer>
                <p>&copy; 2025 StockFlow. All rights reserved.</p>
            </footer>
        </div>
    );
}

HomePage.layout = (page) => <AuthLayout children={page} />;
