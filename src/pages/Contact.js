import React from 'react'
import axios from 'axios'

import styles from "@/styles/Contact.module.css";
import { useForm } from 'react-hook-form';
const Contact = () => {

  let defaultval={
    name: "",
    email: "",
    phone: "",
    desc: ""
  }
  const { register, handleSubmit,reset, formState: { errors } } = useForm({mode: "onChange",defaultval});

  const onSubmit = (data) => {

    console.log(data);
    axios.post("http://localhost:3000/api/postContact/",

      {
        method: "POST",
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      }
    ).then((val) => {
      console.log("contact useHookForm", val)
      alert("Response submitted successfully ")
      reset()
    }).catch((error) => {
      console.log(error)
    })
  };
  // console.log(errors?.email?.message)
  return (
    <div className={styles.ContactContainer}>

      <form onSubmit={handleSubmit(onSubmit)} className={styles.formcontainer} >
        <h1 className={styles.headings}>Contact</h1>

        <div className={styles.inputcontainer}>
          <label htmlFor='name'>Name</label>
          <input className={styles.conntactInput}
            id="name"
            {...register("name", { required: true, maxLength: 20 })}

          />
          {errors.name && <p className={styles.ContactErrorr}>Name is required and should not exceed 20 characters.</p>}
        </div>
        <div className={styles.inputcontainer}>
          <label htmlFor='email'>Email</label>
          <input className={styles.conntactInput} id='email'
            {...register("email", {
              required: "Email is required",
              pattern: {
                value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                message: "Email is not valid",
              },
            })}


          />
          {errors.email && <p className={styles.ContactErrorr}>{errors.email.message}</p>}
        </div>
        <div className={styles.inputcontainer}>
          <label>Phone</label>
          <input className={styles.conntactInput}
            id='phone'
            {...register("phone", { required: true,
              maxLength: {
                value: 20,
                message: "Phone number cannot exceed 20 characters",
              },
              pattern: {
                value: /^[0-9]+$/, // Regular expression for numbers only
                message: "Phone number must contain only digits",
              }
             })}


          />
          {errors.phone && <p>Please provide valid phone number .</p>}

        </div>
        <div className={styles.inputcontainer}>
          <textarea className={styles.contactTextArea}

            placeholder="Leave a comment here" id="desc" />

        </div>
        <div className={styles.contactBtncontainer}>
          <button className={styles.contactBtn} type='text'>submit</button>
        </div>
      </form>
    </div>


  )
}

export default Contact

