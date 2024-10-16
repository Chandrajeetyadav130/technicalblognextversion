// import { useRouter } from 'next/router'
import { useState, useEffect } from 'react';
import axios from 'axios';
import styles from "@/styles/Blogs.module.css";
import fs from 'fs';
import path from 'path';
export default function Page(props) {

  const [blogs, setBlogs] = useState(props?.data)
  // const router = useRouter()
  // const { slugs } = router.query
  // useEffect(() => {
  //   if (!router.isReady) return
  //   axios.get(`http://localhost:3000/api/getBlogs?slugs=${slugs}`)
  //     .then((val) => {
  //       console.log(val)
  //       setBlogs(val?.data)
  //     }).catch((error) => {
  //       console.log(error)
  //     })
  // }, [router.isReady])

 function markup(cont){
  return {__html:cont}
 }

  return (
    <div className={styles.slugcontainer} >
      <h3>{blogs && blogs?.title}</h3>
      {blogs &&  <div dangerouslySetInnerHTML={markup(blogs?.content)} ></div>}

    </div>
  );
}



export async function getStaticPaths() {
  return {
    paths: [
      { params: { slugs: 'javascriptblog' } },
      { params: { slugs: 'nextjsblog' } },
      { params: { slugs: 'reactjsblog' } },
      { params: { slugs: 'typecriptblog' } },
      { params: { slugs: 'pythonblog' } },
      { params: { slugs: 'mongodbblog' } },
      { params: { slugs: 'htmlblog' } },
      { params: { slugs: 'es6blog' } },
      { params: { slugs: 'cssblog' } },

    ],
  
    fallback: false, // false or "blocking"
  }
}
// export async function getServerSideProps(context) {
//   // console.log(context)
//   const { slugs } = context.query
//   const blogsData=await axios.get(`http://localhost:3000/api/getBlogs?slugs=${slugs}`)
//   const myBlogs=await blogsData.data
//   return {
//     props: {myBlogs},
//   }
// }
export async function getStaticProps(context) {
  const filePath = path.join(process.cwd(), `src/blogdata/${context.params.slugs}.json`);
  console.log("slug run")
  const fileContent = fs.readFileSync(filePath, 'utf-8'); 
  const data = JSON.parse(fileContent);
  return { props: { data } }
}