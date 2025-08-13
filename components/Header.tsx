"use client"
import { Moon, Sun, Volleyball } from "lucide-react"
import Link from "next/link"
import { Separator } from "./ui/separator"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "./ui/dropdown-menu"
import { useTheme } from "next-themes"
import { Button } from "./ui/button"
const Header = () => {
    const { setTheme, theme } = useTheme();
    return (
        <>
            <header className="flex items-center justify-between py-5 px-[3vw]">
                <Link href={'/'} className="flex items-center gap-2 font-bold">
                    <Volleyball className="text-green-800" size={50} />
                    مباريات لايف
                </Link>
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button size={"icon"} variant={"outline"}>
                            {theme !== "light" ?
                                <Moon /> :
                                <Sun size={55} className="text-yellow-500 rounded-full " />
                            }
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent >
                        <DropdownMenuItem onClick={() => setTheme("dark")}>
                            <Moon />
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => setTheme("light")}>
                            <Sun className="text-yellow-500 rounded-full" />
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            </header>
            <Separator />
        </>
    )
}

export default Header