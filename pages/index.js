import styles from "../styles/Home.module.css"
import {motion, AnimatePresence} from "framer-motion"

export default function Home() {
  return (
    <div className={styles.container}>
      <AnimatePresence>
        <motion.h1 
          className={styles.header}
          initial={{opacity: 0, y: -70}}
          animate={{opacity: 1, y: 0}}
          exit={{opacity: 0, y:-70}}
          transition={{duration: 1}}
        >
          {"Kima's Workshop."}
        </motion.h1>
        <motion.p
          className={styles.sum}
          initial={{opacity: 0}}
          animate={{opacity: 1}}
          exit={{opacity: 0}}
          transition={{duration: 2}}
        >
          This project is my personal go-to space for when I want to try new things,
          in the hopes of using them in the future.
          <br></br>
          <br></br>
          If you ever are interested in how I wrote these small features, feel free to check
          them on my <a href="https://github.com/kimacchi/playground" target="_blank" rel="noreferrer">github.</a>
        </motion.p>
        <motion.div 
          className={styles.list}
          initial={{opacity: 0, y: 70}}
          animate={{opacity: 1, y: 0}}
          exit={{opacity: 0, y:70}}
          transition={{duration: 1}}
        >
          <p>List of subpages.</p>
          <a href="/carousel">Carousel</a>
        </motion.div>
      </AnimatePresence>
    </div>
  )
}
