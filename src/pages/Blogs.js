import styles from "@/styles/Blogs.module.css";
import Link from 'next/link';
import React, { useState } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
// import axios from "axios";
import fs from 'fs';
import path from 'path';
const Blogs = (props) => {
    const [blogState, setBlogState] = useState(props.Allblog)
    function markup(cont) {
        return { __html: cont }
    }
    return (
        <div>
            <main className={styles.blogmain}>
                <div className="blogscontainer">
                 
                        {blogState?.map((val) => {

                            return (
                                <div className={styles.blogitem} key={val.slugs}>
                                    <Link href={`/blogPost/${val.slugs}`}><h3>{val?.title}</h3></Link>
                                    {<div dangerouslySetInnerHTML={markup(val?.metaDesc.substr(0, 400))} ></div>}
                                </div>
                            )
                        })}

                </div>
            </main>

        </div>
    )
}
// export async function getServerSideProps(context) {
//     console.log(context)
//     const blogsData=await axios.get("http://localhost:3000/api/blogs")
//     const myBlogs=await blogsData.data
//     return {
//       props: {myBlogs},
//     }
//   }
export async function getStaticProps(context) {
    const filePath = path.join(process.cwd(), 'src', 'blogdata');
    let Allblog = []
    let fileContent;
    const files = fs.readdirSync(filePath);
    for (let i = 0; i < files.length; i++) {
        const item = files[i]
         fileContent = fs.readFileSync(`src/blogdata/${item}`, 'utf-8');
        Allblog.push(JSON.parse(fileContent))

    }
    // console.log(context)
    // const blogsData=await axios.get("http://localhost:3000/api/blogs")
    // const myBlogs=await blogsData.data
    return {
        props: { Allblog},
    }
}
export default Blogs