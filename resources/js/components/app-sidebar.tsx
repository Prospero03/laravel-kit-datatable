import { NavFooter } from '@/components/nav-footer';
import { NavMain } from '@/components/nav-main';
import { NavUser } from '@/components/nav-user';
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from '@/components/ui/sidebar';
import { dashboard } from '@/routes';
import { type NavItem } from '@/types';
import { Link } from '@inertiajs/react';
import { BookOpen, Database, Folder, LayoutGrid, UserIcon } from 'lucide-react';
import AppLogo from './app-logo';
import users from '@/routes/users';

const mainNavItems: NavItem[] = [
    {
        title: 'Панель',
        href: dashboard(),
        icon: LayoutGrid,
    },
    {
        title: 'Пользователи',
        href: users.index(),
        icon: UserIcon,
    },
];

const footerNavItems: NavItem[] = [
    {
        title: 'Репозиторий',
        href: 'https://github.com/Prospero03/laravel-kit-datatable',
        icon: Folder,
    },
    {
        title: 'PHPMyAdmin',
        href: 'http://localhost/phpmyadmin/index.php?route=/database/structure&db=laravel_kit_datatable',
        icon: Database,
    },
];

export function AppSidebar() {
    return (
        <Sidebar collapsible="icon" variant="inset">
            <SidebarHeader>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton size="lg" asChild>
                            <Link href={dashboard()} prefetch>
                                <AppLogo />
                            </Link>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarHeader>

            <SidebarContent>
                <NavMain items={mainNavItems} />
            </SidebarContent>

            <SidebarFooter>
                <NavFooter items={footerNavItems} className="mt-auto" />
                <NavUser />
            </SidebarFooter>
        </Sidebar>
    );
}
