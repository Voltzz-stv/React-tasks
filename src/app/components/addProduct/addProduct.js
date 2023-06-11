"use client";
import { useRef } from "react";
import axios from "axios";
import styles from "./addProduct.module.css";
import { redirect } from "next/dist/server/api-utils";
const FormPage = () => {
  const titleRef = useRef("");
  const descriptionRef = useRef("");
  const imageUrlRef = useRef("");
  const idRef = useRef("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = {
      title: titleRef.current.value,
      description: descriptionRef.current.value,
      imageUrl: imageUrlRef.current.value,
      id: idRef.current.value,
    };

    const jsonData = await JSON.stringify(formData);
    console.log(jsonData);

    try {
      // Send form data to your API endpoint
      await axios.post(
        "https://react-task-a7cc0-default-rtdb.firebaseio.com/items.json",
        jsonData
      );

      // Clear form fields
      titleRef.current.value = "";
      descriptionRef.current.value = "";
      imageUrlRef.current.value = "";
      idRef.current.value = "";
      redirect(200, "/");
      // Do something after successful form submission
      console.log("Form submitted successfully!");
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  return (
    <div className={styles.container}>
      <h1>Add Product</h1>
      <form onSubmit={handleSubmit}>
        <div className={styles.formgroup}>
          <label htmlFor="title">Title:</label>
          <input
            type="text"
            id="title"
            ref={titleRef}
            className={styles.forminput}
          />
        </div>
        <div className={styles.formgroup}>
          <label htmlFor="description">Description:</label>
          <input
            type="text"
            id="description"
            ref={descriptionRef}
            className={styles.forminput}
          />
        </div>
        <div className={styles.formgroup}>
          <label htmlFor="imageUrl">Image URL:</label>
          <input
            type="text"
            id="imageUrl"
            ref={imageUrlRef}
            className={styles.forminput}
          />
        </div>
        <div className={styles.formgroup}>
          <label htmlFor="id">ID:</label>
          <input type="text" id="id" ref={idRef} className={styles.forminput} />
        </div>
        <button type="submit" className={styles.submitbtn}>
          Submit
        </button>
      </form>
    </div>
  );
};

export default FormPage;
