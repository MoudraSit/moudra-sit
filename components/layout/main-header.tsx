import Link from "next/link";

function MainHeader() {
    return <header>
        <div>
            <Link href='/'>MoudráSíť</Link>
        </div>
        <nav>
            <li>
                <Link href='/'>Domů</Link>
            </li>
        </nav>
    </header>
}

export default MainHeader;