import Head from 'next/head'
import styles from '../styles/Carousel.module.scss'
import { useState, useRef } from 'react'
import Image from "next/image"
import { v4 } from 'uuid'

// storing the images in an array for convenience.
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
    // declaring our state variables to then use for percentage calculations.
  const [mouseDownAt, setMouseDownAt] = useState(0);
  const [percentage, setPrecentage] = useState(0);
  const [prevPercentage, setPrevPercentage] = useState(0);
  const [nextPercentage, setNextPercentage] = useState(0);

    // creating a reference for our main div element to animate using plain
    // DOM animate function.
  const ref = useRef();
    // creating an array referance for our images which we can then access 
    // sperately by specifying their index from the array. 
  const imgRef = useRef([]);

    // setting our mouse position relative to our main div.
  const handleOnDown = (e) => {
    setMouseDownAt(e.clientX)
  }

    // when releasing the mouse button, we set our mouse position to zero in order
    // for our math calculations to be correct no matter where we start dragging
    // our mouse from
  const handleOnUp = () => {
    setMouseDownAt(0);
    // we also set our current percentage of scroll since we will use this later on
    // to continue scrolling from where we left.
    setPrevPercentage(percentage);
  }

  const handleOnMove = (e) => {
    // we exit the function when our mouse position is 0 since that means we
    // are not dragging.
    if(mouseDownAt === 0) return;


    // we calculate the percentage of our scroll progress relative to the
    // mouse position.
    const mouseDelta = mouseDownAt - e.clientX;
    const maxDelta = window.innerWidth / 2;
    const percentageLocal = (mouseDelta / maxDelta)* -100;
    const nextPercentageUnconstrained = prevPercentage + percentageLocal;
    const nextPercentageLocal = Math.max(Math.min(nextPercentageUnconstrained, 0), -100);

    // we set our current percentage value to the one we calculated.
    setPrecentage(nextPercentageLocal);

    // we animate our div relative to the percentage.
    ref.current.animate({
      transform: `translate(${nextPercentageLocal}%, -50%)`
    }, { duration: 1200, fill: "forwards" })

    // we animate each of our images to move on scroll.
    // imgRef.current.map((e) => {
    //   e.animate({
    //     objectPosition: `${100 +  nextPercentageLocal}% center`
    //   }, { duration: 1200, fill: "forwards" });
    // })
  }
    // we set our event listeners to the root.
    // since we use nextjs, there is a chance that our rendered content will
    // be in the server side, where it cannot access the window element.
    // thus we check if we are in the server side by simply checking whether or
    // not our window element is undefined.
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
      <div  
        className={styles.card_container}
        style={{transform: `translate(0%, -50%)`}}
        ref={ref}
      >
       {
        images.map((e, index)=>{
          return (
            <div key={v4()} className={styles.img}>
              <Image 
                src={e.url}
                key={e.key}
                className={styles.img}
                draggable={false}
                ref={(el) => (imgRef.current[index] = el)}
                alt="image"
                fill
                // width={300}
                // height={500}
              />
            </div>
          )
        })
       }
      </div>

    </div>
  )
}
