import styles from "@/styles/footer.module.scss"
import Image from "next/image"
import spotify from "@/public/spotify.svg"
import github from "@/public/github.svg"
import instagram from "@/public/instagram.svg"
import { Hubballi } from "next/font/google"

const HubballiFont = Hubballi({
    subsets: ['latin'],
    weight: ['400']

})


export default function Footer() {
    return (
        <footer className={styles.Footer}>
            <nav>
                <Image src={instagram} quality={100} className={styles.Icons} alt="" />
                <Image src={spotify} quality={100}  className={styles.Icons} alt="" />
                <Image src={github} quality={100}  className={styles.Icons} alt="" />
            </nav>
            <p className={HubballiFont.className}>Copyright<span> João Pedro / Vai na Web, English Class</span></p>
        </footer>
    )
}