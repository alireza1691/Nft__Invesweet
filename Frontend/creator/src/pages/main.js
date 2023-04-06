import Head from 'next/head'
import Image from 'next/image'
// import { Inter } from 'next/font/google'
import styles from '@/styles/Home.module.css'
import Navbar from '../../components/Navbar'
import Footer from '../../components/Footer'
import Link from 'next/link'
import mint from './mint'

// const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  return (
    <>
      <Head>
        <title>Fou online shop</title>
        <meta name="description" content="Coffe online shop" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      
      <div className={styles.title}>
        <h1>Main page</h1>
        <p className={styles.text}>some text for test</p>
        <Link className={styles.tbn} href='./products'>Products</Link>
      </div>
      
    </>
  )
}
