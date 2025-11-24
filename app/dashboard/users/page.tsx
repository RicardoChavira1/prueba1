import Header from "@/Components/Header";
import Link from "next/link";

export default function Users() {
    return (
        <>
            {/* HEADER*/}
            <Header showLoginButton={true} showSingUpButton={true} />

            <ul className="p-4">
                <li>
                    <Link href="/dashboard/users/1">
                        user 1
                    </Link>
                </li>
                <li>
                    <Link href="/dashboard/users/2">
                        user 2
                    </Link>
                </li>
                <li>
                    <Link href="/dashboard/users/3">
                        user 3
                    </Link>
                </li>
            </ul>
        </>
    )
}

