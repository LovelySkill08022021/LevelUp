import { Link, Head } from "@inertiajs/react";
import { PageProps } from "@/types";
import Card from "@mui/material/Card";

export default function Welcome({
    auth,
    laravelVersion,
    phpVersion,
}: PageProps<{ laravelVersion: string; phpVersion: string }>) {
    const handleImageError = () => {
        document
            .getElementById("screenshot-container")
            ?.classList.add("!hidden");
        document.getElementById("docs-card")?.classList.add("!row-span-1");
        document
            .getElementById("docs-card-content")
            ?.classList.add("!flex-row");
        document.getElementById("background")?.classList.add("!hidden");
    };

    function hello() {
        console.log("asdadasdasd");
    }

    return (
        <>
            {/* <Head title="Home" /> */}
            <div className="text-black bg-[url('/images/home_bg.jpg')] w-full h-screen">
                {/* <img id="background" className="absolute w-full top-0" src="/images/home_bg.jpg" /> */}
                <div className="w-full pt-10 lg:pt-28 text-center">
                    <div className="flex justify-center w-full mb-10 lg:mb-20">
                        <div className="me-1">
                            <img
                                src="/images/rad-logo.png"
                                alt="logo"
                                width={100}
                                height={100}
                            />
                        </div>
                        <div className="flex flex-col items-start">
                            <div className="font-bold text-[36px] leading-none">
                                Level
                            </div>
                            <div className="font-bold text-[67px] leading-none">
                                UP
                            </div>
                        </div>
                    </div>
                    <div className="flex flex-col md:flex-row items-center justify-center">
                        {auth.user ? (
                            <Link
                                href={route("dashboard")}
                                className="w-[160px] text-white font-bold border-2 border-[#2967b0] px-10 py-3 rounded-lg hover:text-white transition bg-[#2967b0]"
                            >
                                Dashboard
                            </Link>
                        ) : (
                            <>
                                <Link
                                    href={route("login")}
                                    className="w-[160px] text-black font-bold border-2 border-[#2967b0] px-10 py-3 rounded-lg mb-2 md:mb-0 md:me-4 text-white transition bg-[#2967b0] hover:bg-[#245085] hover:border-[#245085]"
                                >
                                    Log in
                                </Link>
                                <Link
                                    href={route("register")}
                                    className="w-[160px] text-black font-bold border-2 border-black px-10 py-3 rounded-lg hover:border-[#2967b0] hover:text-white transition hover:bg-[#2967b0]"
                                >
                                    Register
                                </Link>
                            </>
                        )}
                    </div>
                </div>
            </div>
        </>
    );
}
