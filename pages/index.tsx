import type { NextPage } from 'next'
import Head from 'next/head'
import axios from 'axios'
import styles from '../styles/Home.module.css'
import { FormEvent, useState } from 'react'
import { Dots } from "react-activity";
import "react-activity/dist/Dots.css";

const Home: NextPage = () => {
  const [url, setUrl] = useState('')
  const [loading, setLoading] = useState(false)

  const handleReset = () => {
      setUrl('')
  }

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    try {
      setLoading(true)
      const response = await axios.post('https://downloader-youtube.herokuapp.com/download', {url}, {responseType: 'blob'})
      
      handleReset()
      setLoading(false)
      const fileURL = window.URL.createObjectURL(new Blob([response.data]));
      const fileLink = document.createElement('a');
      fileLink.href = fileURL;
      //const fileName = response.headers['content-disposition']?.substring(22, 52);
      fileLink.setAttribute('download', 'download.mp4');
      document.body.appendChild(fileLink);
      fileLink.innerText = 'Download'
      fileLink.click();
      fileLink.remove();
    } catch (error) {
      console.log(error)
      setLoading(false)
    }
  }

  return (
    <div className={styles.container}>
      <Head>
        <title>Youtube Downloader</title>
        <meta name="description" content="Download videos from youtube" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.heading1}>Youtube Downloader</h1>

        <form className={styles.form} onSubmit={handleSubmit}>
          <input className={styles.InputForm} type="text" required onChange={e => setUrl(e.target.value)} value={url}/>
          <button className={styles.buttonDownload} type='submit'> {loading ? <Dots /> : 'Download'}</button>
        </form>
      </main>
    </div>
  )
}

export default Home
