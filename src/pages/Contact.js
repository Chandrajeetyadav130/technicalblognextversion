import React from 'react'
import { useState } from 'react'
import axios from 'axios'
import styles from "@/styles/Contact.module.css";

const Contact = () => {
  const [user, setUser] = useState({
    name: "",
    email: "",
    phone: "",
    desc: ""
  })
  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post("http://localhost:3000/api/postContact/",

      {
        method: "POST",
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(user)
      }
    ).then((val) => {
      alert("Response submitted successfully ")
    }).catch((error) => {
      console.log(error)
    })
  }
  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value })
  }
  return (
    <div className={styles.ContactContainer}>

      <form onSubmit={handleSubmit} className={styles.formcontainer} >
        <h1 className={styles.headings}>Contact</h1>

        <div className={styles.inputcontainer}>
          <label htmlFor='name'>Name</label>
          <input className={styles.conntactInput} type='text' name='name' value={user.name} onChange={handleChange} />
        </div>
        <div className={styles.inputcontainer}>
          <label htmlFor='email'>Email</label>
          <input className={styles.conntactInput} type='text' id='email' name='email' value={user.email} onChange={handleChange} />

        </div>
        <div className={styles.inputcontainer}>
          <label>Phone</label>
          <input className={styles.conntactInput} type='number' id='phone' name='phone' value={user.phone} onChange={handleChange} />
        </div>
        <div className={styles.inputcontainer}>
          <textarea className={styles.contactTextArea} name='desc' placeholder="Leave a comment here" value={user.desc} onChange={handleChange} id="desc" />

        </div>
        <div className={styles.contactBtncontainer}>
          <button className={styles.contactBtn} type='text'>submit</button>
        </div>
      </form>
    </div>

  )
}

export default Contact