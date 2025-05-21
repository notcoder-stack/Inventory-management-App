import { StatsGrid } from "../components/StatsGrid";

export default function Dashboard({ employees, sales, products, revenue }) {
    return (
        <>
            <div className="-ml-24 -m-9">
                <StatsGrid sums={[employees, sales, products, revenue]} />
            </div>
            <div></div>
        </>
    );
}
