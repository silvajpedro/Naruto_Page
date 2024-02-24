import Header from "../Header/header";
import Footer from "../Footer/Footer";
import Head from "next/head";
import axios from "axios";
import { useEffect, useState } from "react";
import Sem_foto from "@/public/sem_foto.jpg";

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

import { Hubballi, Anton } from "next/font/google"

const HubballiFont = Hubballi({
    subsets: ['latin'],
    weight: ['400']

})
const AntonFont = Anton({
  subsets: ['latin'],
  weight: ['400']

})

export default function Clans() {
    const [IsVisible, setIsVisible] = useState(false)
    const [villageNames, setVillageNames] = useState([]);

    // CONSUMO API
    const [chooseVillage, setChooseVillage] = useState("Konohagakure")
    
    const getVillage = async () => {
        const info = await axios.get(`https://narutodb.xyz/api/village/search?name=${chooseVillage}`)
        setVillageNames(info.data.characters)
    }
    
    const toggleVisibility = () => {
        if (window.scrollY > 2500) { // Assumindo que 100 é a altura desejada
          setIsVisible(true);
        } else {
          setIsVisible(false);
        }
      };
    
    
    
    useEffect(() => {
        
        getVillage()

        window.addEventListener('scroll',toggleVisibility)

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

                <h3 className={AntonFont.className}>{item.name}</h3>

                <figure style={{ backgroundImage: `url(${imageUrl})` }}></figure>
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

                            <p className={HubballiFont.className}>{item.historia_vila}</p>
                      
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
                        {villages.map((item, index) => <li className={HubballiFont.className} onClick={() => setChooseVillage(item.nome_vila)} key={index}>{item.nome_vila} <img src={IconVillages()} alt="icon village" /> </li>)}
                    </ul>
                </nav>

                <section className={styles.VillageSection}> 

                    <figure className={styles.VillageInfo}>
                        {VillageInfo()}
                    </figure>
                </section>

                <section className={styles.VillagesCharacterBox}>

                    {villageNames.map((item) => (VillageCharacters(item)))}

                </section>

            </section>

            { IsVisible && <button onClick={()=>{scrollTo(0,700)}} className={styles.upButton}>⇧</button>}
            
            <Footer />
        </>
    )
}