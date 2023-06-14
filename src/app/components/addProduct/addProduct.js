"use client";
import { useRef } from "react";
import axios from "axios";
import styles from "./addProduct.module.css";
import { useRouter } from "next/navigation";

const FormPage = () => {
  const titleRef = useRef("");
  const descriptionRef = useRef("");
  const imageUrlRef = useRef("");
  const idRef = useRef("");
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = {
      title: titleRef.current.value,
      description: descriptionRef.current.value,
      imageUrl: imageUrlRef.current.value,
    };

    try {
      await axios.post(
        "http://localhost:3006/items",
        { formData }
      );

      router.push("/pages/products");
      console.log("Form submitted successfully!");
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.center}>Add Product</h1>
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
        <button type="submit" className={styles.submitbtn}>
          Submit
        </button>
      </form>
    </div>
  );
};

export default FormPage;
