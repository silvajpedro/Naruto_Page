import Header from "../Header/header";
import Footer from "../Footer/Footer";
import Head from "next/head";
import axios from "axios";
import { useEffect, useState } from "react";
import Sem_foto from "@/public/sem_foto.gif";

// ÍCONES VILAS
import pergaminho from "@/public/pergaminho.png";
import pergaminho2 from "@/public/pergaminho2.png";
import estrela1 from "@/public/estrela1.png";
import estrela2 from "@/public/estrela2.png";
import estrela3 from "@/public/estrela3.png";
import estrela4 from "@/public/estrela4.png";
import casa from "@/public/casa.png";
import villages from "./villages.json";

// ESTILO SASS
import styles from "@/styles/villages.module.scss";

export default function Clans() {

    const [villageNames, setVillageNames] = useState([]);

    // CONSUMO API
    const [chooseVillage, setChooseVillage] = useState("Konohagakure")
    
    const getVillage = async () => {
        const info = await axios.get(`https://narutodb.xyz/api/village/search?name=${chooseVillage}`)
        setVillageNames(info.data.characters)
    }
    
    useEffect(() => {
        getVillage()
    }, [chooseVillage])
    // FIM CONSUMO API

    // FUNCIONALIDADE ÍCONES VILAS
    const IconVillages = () => {

        let villageIcons = [estrela1, estrela2, estrela3, estrela4, pergaminho, pergaminho2, casa]

        let IconImg = villageIcons[Math.floor(Math.random() * villageIcons.length)]

        return (
            IconImg.src
        )
    }

    // FUNÇÃO VERIFICAR SE EXISTE IMAGEM
    const VillageCharacters = (item) => {

        let imageUrl

        if (item.images[0]) {
            imageUrl = item.images[0]
        } else if (item.images[1]) {
            imageUrl = item.images[1]
        } else if (item.images.length === 0) {
            imageUrl = Sem_foto.src
        }
        
        return (
            <div className={styles.VillageCharacters}>
                <figure className={styles.Characters} style={{ backgroundImage: `url(${imageUrl})` }}>
                    <figcaption>{item.name}</figcaption>
                </figure>
            </div>
        )
    }
// Função que compara o useState e renderiza a comparação com o map() do arquivo json
    const VillageInfo = () => {

        return (
            <>
                {villages.map((item) => (
                    item.nome_vila === chooseVillage ?
                        <>
                            <div style={{backgroundImage:`url(${item.imagem_vila})`}}></div>
                            <p>{item.historia_vila}</p>
                        </> : null

                ))}
            </>
        )
    }

    return (
        <>
            <Head>
                <title>Villages</title>
                <meta name="description" content="Generated by create next app" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <link rel="icon" href="/Naruto.ico" />
            </Head>

            <Header />

            <section className={styles.VillageBox}>

                <h2>{chooseVillage}</h2>

                <nav className={styles.Navigation}>
                    <ul>
                        {villages.map((item, index) => <li onClick={() => setChooseVillage(item.nome_vila)} key={index}>{item.nome_vila} <img src={IconVillages()} alt="" /> </li>)}
                    </ul>
                </nav>

                <section>

                    <figure className={styles.VillageInfo}>
                        {VillageInfo()}
                    </figure>
                </section>

                <section className={styles.VillagesCharacterBox}>

                    {villageNames.map((item) => (VillageCharacters(item)))}

                </section>

            </section>

            <Footer />
        </>
    )
}