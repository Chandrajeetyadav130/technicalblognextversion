import React from 'react'
import styles from "@/styles/Home.module.css";
import Link from 'next/link';
import { GiHamburgerMenu } from "react-icons/gi";
import { IoMdClose } from "react-icons/io";
import { useEffect, useState } from 'react';
const Navbar = () => {
  const [mobile, setMobile] = useState(false)
  const [sidebar, setSideBar] = useState(false)
  useEffect(() => {
    if (window.innerWidth < 1006) {
      setMobile(true)
    }
  }, [])
  useEffect(() => {
    console.log("mobile")
    console.log(window.innerWidth)
    const handleresize = () => {
      if (window.innerWidth < 1006) {
        setMobile(true)
      }
      else {
        setMobile(false)

      }
    }
    window.addEventListener("resize", handleresize)
    return () => {
      window.removeEventListener("resize", handleresize)
    }
  }, [])
  return (
    <>
      <nav className={styles.mainnav}>
      {mobile && (
       <div className={styles.navbarhambergerAndClose}>
       {
         sidebar ? <IoMdClose color='white' size={25} onClick={() => setSideBar(!sidebar)} /> : <GiHamburgerMenu color='white' size={25} onClick={() => setSideBar(!sidebar)} />
       }
     </div>
     
        )}
        {!mobile && <ul>
          <li><Link href="/">Home</Link></li>
          <li><Link href="/About">About</Link></li>
          <li><Link href="/Contact">Contact</Link></li>
          <li><Link href="/Blogs">Blogs</Link></li>
        </ul>

        }
        <span className={styles.navBrand}>Tech Stack</span>


      </nav>
      <div className={sidebar ? `${styles.sidebar} ${styles.active}` : `${styles.sidebar}`}>
        <ul className={styles.sidebarUl}>
          <li><Link href="/">Home</Link></li>
          <li><Link href="/About">About</Link></li>
          <li><Link href="/Contact">Contact</Link></li>
          <li><Link href="/Blogs">Blogs</Link></li>
        </ul>
      </div>
    </>
  )
}

export default Navbar