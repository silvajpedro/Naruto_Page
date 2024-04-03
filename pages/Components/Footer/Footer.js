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
        
        </footer>
    )
}