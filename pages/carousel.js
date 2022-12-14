import Head from 'next/head'
import styles from '../styles/Carousel.module.scss'
import { useState, useRef } from 'react'

const images = [
  {
    key: "1",
    url: "https://images.unsplash.com/photo-1524781289445-ddf8f5695861?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80",
  },
  {
    key: "2",
    url: "https://images.unsplash.com/photo-1610194352361-4c81a6a8967e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1674&q=80"
  },
  {
    key: "3",
    url: "https://images.unsplash.com/photo-1618202133208-2907bebba9e1?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80"
  },
  {
    key: "4",
    url: "https://images.unsplash.com/photo-1495805442109-bf1cf975750b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80"
  },
  {
    key: "5",
    url: "https://images.unsplash.com/photo-1548021682-1720ed403a5b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80"
  },
  {
    key: "6",
    url: "https://images.unsplash.com/photo-1496753480864-3e588e0269b3?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2134&q=80"
  },
  {
    key: "7",
    url: "https://images.unsplash.com/photo-1613346945084-35cccc812dd5?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1759&q=80"
  },
  {
    key: "8",
    url: "https://images.unsplash.com/photo-1516681100942-77d8e7f9dd97?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80"
  },
  {
    key: "9",
    url: "https://images.unsplash.com/photo-1613346945084-35cccc812dd5?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1759&q=80"
  },
  {
    key: "10",
    url:" https://images.unsplash.com/photo-1496753480864-3e588e0269b3?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2134&q=80"
  },
]

export default function Carousel() {
  const [mouseDownAt, setMouseDownAt] = useState(0);
  const [percentage, setPrecentage] = useState(0);
  const [prevPercentage, setPrevPercentage] = useState(0);
  const [nextPercentage, setNextPercentage] = useState(0);

  const ref = useRef();
  const imgRef = useRef([]);

  const handleOnDown = (e) => {
    setMouseDownAt(e.clientX)
  }
  const handleOnUp = () => {
    setMouseDownAt(0);
    setPrevPercentage(percentage);
  }

  const handleOnMove = (e) => {
    if(mouseDownAt === 0) return;


    const mouseDelta = mouseDownAt - e.clientX;
    const maxDelta = window.innerWidth / 2;
    const percentageLocal = (mouseDelta / maxDelta)* -100;
    const nextPercentageUnconstrained = prevPercentage + percentageLocal;
    const nextPercentageLocal = Math.max(Math.min(nextPercentageUnconstrained, 0), -100);

    setPrecentage(nextPercentageLocal);


    ref.current.animate({
      transform: `translate(${nextPercentageLocal}%, -50%)`
    }, { duration: 1200, fill: "forwards" })

    imgRef.current.map((e) => {
      e.animate({
        objectPosition: `${100 +  nextPercentageLocal}% center`
      }, { duration: 1200, fill: "forwards" });
    })
  }



    if(typeof window !== "undefined"){
        window.onmousedown = e => handleOnDown(e);
        window.ontouchstart = e => handleOnDown(e.touches[0]);
        window.onmouseup = e => handleOnUp(e);
        window.ontouchend = e => handleOnUp(e.touches[0]);
        window.onmousemove = e => handleOnMove(e);
        window.ontouchmove = e => handleOnMove(e.touches[0]);
    }

  return (
    <div 
      className={styles.container} 
      style={{overflow: "hidden"}}
    >
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div  
        className={styles.card_container}
        style={{transform: `translate(${0}%, -50%)`}}
        ref={ref}
      >
       {
        images.map((e, index)=>{
          return (
            <img 
              key={e.key}
              src={e.url}
              className={styles.img}
              draggable={false}
              ref={(el) => (imgRef.current[index] = el)}
              alt="image"
            />
          )
        })
       }
      </div>

    </div>
  )
}
