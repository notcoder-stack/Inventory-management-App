import Sidebar from "./components/Sidebar.jsx";
const DashboardWrapper = ({ children }) => {
    return (
        <div className="flex w-full min-h-screen">
            <Sidebar />
            <main className="flex flex-col w-full h-full py-7 px-9 md:pl-24">
                {children}
            </main>
        </div>
    );
};

export default DashboardWrapper;
