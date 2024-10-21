import React from 'react'
import styles from "@/styles/Home.module.css";
import Link from 'next/link';

const HomePageContent = () => {
  return (

    <>
      <main className={styles.main}>
        <h1>Welcome to Technical Stack</h1>
        <h2>Here you can learn about all the latest technologies like MERN stack Nextjs</h2>
        <p>This blog covers the latest trends and updates in web development, keeping readers informed about new frameworks, libraries, and tools.
        You provide detailed breakdowns of technologies like React, Next.js, Node.js, and others, helping both beginners and seasoned developers stay up-to-date.</p>

        <div className={styles.ctas}>
        </div>
        <Link className={styles.homePageBlogLink} href={"/Blogs"}>Read blog</Link>

      </main>
    </>
  )
}

export default HomePageContent