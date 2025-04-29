import { useState } from 'react';
import {
    IconForklift,
    IconClipboard,
    IconUser,
    IconCoins,
    IconAdjustmentsHorizontal,
    IconArchive,
    IconLayoutDashboard,
} from '@tabler/icons-react';
import { Code, Group } from '@mantine/core';
import { MantineLogo } from '@mantinex/mantine-logo';
import classes from '../../css/Sidebar.module.css';
import {Link} from "@inertiajs/react";

const data = [
    { link: '/', label: 'Dashboard', icon: IconLayoutDashboard },
    { link: '/inventory', label: 'Inventory', icon: IconArchive },
    { link: '/products', label: 'Products', icon: IconClipboard },
    { link: '/sells', label: 'Sells', icon: IconCoins },
    { link: '/suppliers', label: 'Suppliers', icon: IconForklift },
    { link: '/employees', label: 'Employees', icon: IconUser },
    { link: '/settings', label: 'Settings', icon: IconAdjustmentsHorizontal },
];

export default function Sidebar() {
    const [active, setActive] = useState('Billing');

    const links = data.map((item) => (
        <Link
            className={classes.link}
            href={item.link}
            key={item.label}
        >
            <item.icon className={classes.linkIcon} stroke={1.5} />
            <span>{item.label}</span>
        </Link>
    ));

    return (
        <nav className={classes.navbar}>
            <div className={classes.navbarMain}>
                <Group className={classes.header}>
                    <h1>STOCKFLOW</h1>
                </Group>
                {links}
            </div>

            <div className={classes.footer}>
                <span>&copy; 2025 STOCKFLOW</span>
            </div>
        </nav>
    );
}
