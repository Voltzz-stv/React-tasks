"use client";
import { useEffect, useState } from "react";
import { getItems, updateItem, deleteItem } from "../../api/api";
import styles from "./Products.module.css";
import Image from "next/image";


export default function Products() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getItems();
        setItems(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleUpdate = async (itemId, newData) => {
    try {
      const updatedItem = await updateItem(itemId, newData);
      setItems((prevItems) =>
        prevItems.map((item) =>
          item.id === updatedItem.id ? updatedItem : item
        )
      );
    } catch (error) {
      setError(error.message);
    }
  };

  const handleDelete = async (itemId) => {
    try {
      await deleteItem(itemId);
      setItems((prevItems) => prevItems.filter((item) => item.id !== itemId));
    } catch (error) {
      setError(error.message);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className={styles.container}>
      <h1>Products List</h1>
      {items.map((item) => (
        <div className={styles.item} key={item.id}>
          <h2>{item.title}</h2>
          <Image
            src={item.imageUrl}
            alt={item.title}
            width={300}
            height={200}
          />
          <p>{item.description}</p>
          <div className={styles.buttonContainer}>
            <div>
              <button
                className={styles.update}
                onClick={() => handleUpdate(item.id, { name: "New Name" })}
              >
                Update
              </button>
              <button
                className={styles.delete}
                onClick={() => handleDelete(item.id)}
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
