import DashboardWrapper from "../dashboardWrapper"
import '@mantine/core/styles.css';
import { MantineProvider } from '@mantine/core';

export default function Layout({ children }) {
    return(
        <MantineProvider>
            <main>
                <DashboardWrapper>
                    { children }
                </DashboardWrapper>
            </main>
        </MantineProvider>
    )
}
