import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import { motion } from 'framer-motion'
import { useState,useEffect } from 'react'

export default function Home() {
  const [mouseDownAt, setMouseDownAt] = useState(0);
  const [percentage, setPrecentage] = useState(0);
  const [prevPercentage, setPrevPercentage] = useState(0);
  const [nextPercentageState, setNextPercentageState] = useState(0);

  const handleOnDown = (e) => {
    setMouseDownAt(e.clientX)
  }
  const handleOnUp = () => {
    setMouseDownAt(0);
    setPrevPercentage(percentage);
  }

  const handleOnMove = (e) => {
    if(mouseDownAt === 0) return;
    const mouseDelta = mouseDownAt - e.clientX, maxDelta = window.innerWidth / 2; 
    const percentageLocal = (mouseDelta / maxDelta) * -100,
          nextPercentageUnconstrained = prevPercentage + percentageLocal,
          nextPercentage = Math.max(Math.min(nextPercentageUnconstrained, 0), -100);
    setPrecentage(nextPercentage);
  }



  useEffect(() => {
    if(typeof window){
      window.addEventListener("mousedown", handleOnDown);
      window.addEventListener("mouseup", handleOnUp);
      window.addEventListener("mousemove", handleOnMove);
    }
  }, [])



  return (
    <div 
      className={styles.container} 
      style={{overflow: "hidden"}}
      onMouseDown={handleOnDown}
      onMouseUp={handleOnDown}
      onMouseMove={handleOnMove}
    >
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <motion.div  
        className={styles.card_container}
        animate={{transform: `translate(${percentage}%, -50%)`}}
      >
        <motion.img
          className={styles.img} 
          src="https://images.unsplash.com/photo-1670594454637-fa0c1d3225c0?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHwyfHx8ZW58MHx8fHw%3D&auto=format&fit=crop&w=500&q=60"
          draggable={false}
        />
        <motion.img
          className={styles.img} 
          src="https://images.unsplash.com/photo-1670509917257-ea50fa82f5fa?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw5fHx8ZW58MHx8fHw%3D&auto=format&fit=crop&w=500&q=60"
          draggable={false}
        />
        <motion.img
          className={styles.img} 
          src="https://images.unsplash.com/photo-1670520616455-843979f02d11?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHwxNHx8fGVufDB8fHx8&auto=format&fit=crop&w=500&q=60"
          draggable={false}
        />
        <motion.img
          className={styles.img} 
          src="https://images.unsplash.com/photo-1670594454637-fa0c1d3225c0?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHwyfHx8ZW58MHx8fHw%3D&auto=format&fit=crop&w=500&q=60"
          draggable={false}
        />
        <motion.img
          className={styles.img} 
          src="https://images.unsplash.com/photo-1670509917257-ea50fa82f5fa?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw5fHx8ZW58MHx8fHw%3D&auto=format&fit=crop&w=500&q=60"
          draggable={false}
        />
        <motion.img
          className={styles.img} 
          src="https://images.unsplash.com/photo-1670520616455-843979f02d11?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHwxNHx8fGVufDB8fHx8&auto=format&fit=crop&w=500&q=60"
          draggable={false}
        />
        <motion.img
          className={styles.img} 
          src="https://images.unsplash.com/photo-1670520616455-843979f02d11?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHwxNHx8fGVufDB8fHx8&auto=format&fit=crop&w=500&q=60"
          draggable={false}
        />
        <motion.img
          className={styles.img} 
          src="https://images.unsplash.com/photo-1670509917257-ea50fa82f5fa?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw5fHx8ZW58MHx8fHw%3D&auto=format&fit=crop&w=500&q=60"
          draggable={false}
        />
        <motion.img
          className={styles.img} 
          src="https://images.unsplash.com/photo-1670594454637-fa0c1d3225c0?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHwyfHx8ZW58MHx8fHw%3D&auto=format&fit=crop&w=500&q=60"
          draggable={false}
        />
        <motion.img
          className={styles.img} 
          src="https://images.unsplash.com/photo-1670509917257-ea50fa82f5fa?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw5fHx8ZW58MHx8fHw%3D&auto=format&fit=crop&w=500&q=60"
          draggable={false}
        />
      </motion.div>

    </div>
  )
}