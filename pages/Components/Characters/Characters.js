import Header from "@/pages/Components/Header/header";
import Footer from "@/pages/Components/Footer/Footer";
import styles from "@/styles/characters.module.scss"
import Head from "next/head";
import { useState, useEffect } from "react";
import axios from "axios";
import Sem_foto from "@/public/sem_foto.gif"

export default function Characters() {
    const [post, setPosts] = useState([]);
    const [nextPage, setNextPage] = useState(1);

    useEffect(() => {
        getPosts();
        const Subtitulo = document.querySelector("h2")
        const SubtituloPosicao = Subtitulo.offsetTop
        window.scrollTo(0, SubtituloPosicao - 20)
    }, [nextPage]);

    const getPosts = async () => {
        const response = await axios.get(
            `https://www.narutodb.xyz/api/character?page=${nextPage}&limit=16`
        );
        setPosts(response.data.characters);
    };

    const Personagens = (item, index, id) => {

        let imageUrl = item.images[0] ? item.images[0] : item.images[1];
        
        if(item.images[0]){
            imageUrl = item.images[0]
        } else if(item.images[1]){
            imageUrl = item.images[1]
        } else if(item.images.length === 0)  {
            imageUrl = Sem_foto.src
        }

        let nacionalidade = "";

        if (item.personal.affiliation === "Konohagakure") {
            nacionalidade = "Vila Oculta da Folha";
        } else if (item.personal.affiliation === "Kumogakure") {
            nacionalidade = "Vila Oculta da Nuvem";
        } else if (item.personal.affiliation === "Takigakure") {
            nacionalidade = "Vila Oculta da Cachoeira";
        } else if (item.personal.affiliation === "Sunagakure") {
            nacionalidade = "Vila Oculta da Areia";
        } else if (item.personal.affiliation === "Kirigakure") {
            nacionalidade = "Vila Oculta da Névoa";
        } else if (item.personal.affiliation === "Iwagakure") {
            nacionalidade = "Vila Oculta da Pedra";
        } else if (item.personal.affiliation === "Hoshigakure") {
            nacionalidade = "Vila Oculta da Estrela"
        } else if (item.personal.affiliation === "Kusagakure") {
            nacionalidade = "Vila Oculta da Grama"
        } else if (item.personal.affiliation === "Otogakure") {
            nacionalidade = "Vila Oculta do Som"
        } else if (item.personal.affiliation === "Yukigakure") {
            nacionalidade = "Vila Oculta da Neve"
        } else if (item.personal.affiliation === "Amegakure") {
            nacionalidade = "Vila Oculta da Chuva"
        } else if (item.personal.affiliation === "Mount Myōboku") {
            nacionalidade = "Monte Myōboku";
        }
        // criar um objeto com nome de todos os países e vilas e trazer pra cá comparando o valor vindo da API com valor do objeto
       
        
        return (
            <div key={index} className={styles.Character}>
                <figure style={{ backgroundImage: `url(${imageUrl})` }} key={index}>
                    <figcaption>{item.name}</figcaption>
                    <figcaption>{nacionalidade}</figcaption>
                </figure>
            </div>
        );
    };
    
    return (
        <>
            <Head>
                <title>Characters</title>
                <meta name="description" content="Generated by create next app" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <link rel="icon" href="/Naruto.ico" />
            </Head>
            <Header />
            <main className={styles.CharactersMain}>
                <h2 onLoad={()=>{alert("testando")}}>CHARACTERS</h2>

                <section className={styles.CharactersBox}>
                    {post.map((item, index) => Personagens(item, index))}
                </section>

                <div className={styles.ButtonBox}>
                    <button onClick={() => setNextPage((prevPage) => prevPage + 1)}>
                        Página {nextPage + 1} <span>»</span>
                    </button>
                </div>

            </main>
            <Footer />
        </>
    );
}
