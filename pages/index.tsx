import { useEffect, useState } from "react";
import Head from "next/head";
import styles from "@/styles/Home.module.css";

interface Image {
    albumId: number;
    id: number;
    title: string;
    url: string;
    thumbnailUrl: string;
}

export default function Home() {
    const [images, setImages] = useState([]);
    const [selectedImage, setSelectedImage] = useState<Image | null>(null);

    useEffect(() => {
        fetch("https://jsonplaceholder.typicode.com/photos")
            .then(res => res.json())
            .then(data => setImages(data.slice(0, 10)));
    }, [setImages]);

    return (
        <>
            <Head>
                <title>Image Selector</title>
                <meta
                    name="description"
                    content="Select image thumbnails to see the original image"
                />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <main className={styles.main}>
                <section className={styles.thumnnailContainer}>
                    {images.map((image: Image) => {
                        const className = `${image === selectedImage ? styles.selected : ""}`;
                        return (
                            <img
                                key={image.id}
                                src={image.thumbnailUrl}
                                alt={image.title}
                                onClick={() => setSelectedImage(image)}
                                className={className}
                            />
                        );
                    })}
                </section>
                <section className={styles.selectedContainer}>
                    {selectedImage ? (
                        <img src={selectedImage.url} alt={selectedImage.title} />
                    ) : (
                        <h1>Select an Image</h1>
                    )}
                </section>
            </main>
        </>
    );
}
