import styles from "@/styles/Blogs.module.css";
import Link from 'next/link';
import React, { useState } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
// import axios from "axios";
import fs from 'fs';
import path from 'path';
import axios from "axios";
const Blogs = (props) => {
    const [blogState, setBlogState] = useState(props.Allblog)
    const [count, setCount] = useState(2)
    function markup(cont) {
        return { __html: cont }
    }

    const fetchData = async () => {
        try {
            const response = await axios.get(`http://localhost:3000/api/blogs/?count=${count + 2}`);
            const data = response.data;
            setCount(count + 2);

           
            setBlogState(data);

        
        } catch (error) {
            console.error("Error fetching blogs", error);
        }
    }






    return (
        <div>
            <main className={styles.blogmain}>
                <div className="blogscontainer">
                    <InfiniteScroll
                        dataLength={blogState.length} // Number of items loaded so far
                        next={fetchData} // Function to load more data
                        hasMore={blogState.length < props.allcount}  // Adjust this condition

                        loader={<h4>Loading...</h4>}
                        endMessage={<p style={{ textAlign: 'center' }}>Yay! You have seen it all</p>}
                    >
                        {blogState?.map((val) => {

                            return (
                                <div className={styles.blogitem} key={val.slugs}>
                                    <Link href={`/blogPost/${val.slugs}`}><h3>{val?.title}</h3></Link>
                                    {<div dangerouslySetInnerHTML={markup(val?.metaDesc.substr(0, 400))} ></div>}
                                </div>
                            )
                        })}
                    </InfiniteScroll>

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
    const allcount=files.length;
    for (let i = 0; i < 2; i++) {
        const item = files[i]
         fileContent = fs.readFileSync(`src/blogdata/${item}`, 'utf-8');
        Allblog.push(JSON.parse(fileContent))

    }
    // console.log(context)
    // const blogsData=await axios.get("http://localhost:3000/api/blogs")
    // const myBlogs=await blogsData.data
    return {
        props: { Allblog ,allcount},
    }
}
export default Blogs