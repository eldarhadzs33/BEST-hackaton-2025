import {
    Navbar,
    NavbarBrand,
    NavbarContent,
    NavbarItem,
    Link,
    DropdownItem,
    DropdownTrigger,
    Dropdown,
    DropdownMenu,
    Avatar,
} from "@heroui/react";

export const AcmeLogo = () => {
    return (
        <Link href="/">
            <img
                src="/Leaful.png" // Putanja do slike u public folderu
                alt="Logo"
                width={65} // Prilagodi veličinu po potrebi
                height={65}
            />
        </Link>
    );
};

export default function App() {
    return (
        <Navbar className="fixed top-0 left-0 w-full bg-white shadow-md z-50">
            <NavbarBrand>
                <AcmeLogo/>
            </NavbarBrand>

            <NavbarContent className="hidden sm:flex gap-4" justify="center">
                <NavbarItem>
                    <Link color="foreground" href="/leaderboard">
                        Leaferboard
                    </Link>
                </NavbarItem>
                <NavbarItem>
                    <Link color="foreground" href="/quiz">
                        Quiz
                    </Link>
                </NavbarItem>
            </NavbarContent>

            <NavbarContent as="div" justify="end">
                <Dropdown placement="bottom-end">
                    <DropdownTrigger>
                        <Avatar
                            isBordered
                            as="button"
                            className="transition-transform"
                            color="secondary"
                            name="Jason Hughes"
                            size="sm"
                            src="/mirza.jpg"
                        />
                    </DropdownTrigger>
                    <DropdownMenu aria-label="Profile Actions" variant="flat">
                        <DropdownItem key="profile" className="h-14 gap-2">
                            <p className="font-semibold">Signed in as</p>
                            <p className="font-semibold">mirza@skola.com</p>
                        </DropdownItem>
                        <DropdownItem key="my-profile">
                            <Link href="/dummy-users">
                                My Profile
                            </Link>
                        </DropdownItem>

                        <DropdownItem key="logout" color="danger">
                            Log Out
                        </DropdownItem>
                    </DropdownMenu>
                </Dropdown>
            </NavbarContent>
        </Navbar>
    );
}