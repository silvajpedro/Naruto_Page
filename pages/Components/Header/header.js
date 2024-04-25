import styles from '@/styles/header.module.scss';
import { Anton } from "next/font/google";
import Link from "next/link";

const AntonFont = Anton({
    subsets: ['latin'],
    weight: ['400']

})

export default function Header() {
    return (
        <>
            <header className={styles.Header} >

                <section className={styles.SessaoHeader}>

                    <h1 className={AntonFont.className}>NARUTO UZUMAKI</h1>

                    <nav>
                        <ul className={AntonFont.className}>
                            <li>
                                <Link href={"/"}>CASA</Link>
                            </li>
                            <li>
                                <Link  href={"/Components/Characters/Characters"}>CHARACTERS</Link>
                            </li>
                            <li>
                                <Link  href={"/Components/Villages/Villages"}>VILLAGES</Link>
                            </li>
                        </ul>
                    </nav>

                </section>

            </header>
        </>
    )
}