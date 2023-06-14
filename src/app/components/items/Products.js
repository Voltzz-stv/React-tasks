"use client";
import { useEffect, useState } from "react";
import { getItems, updateItem, deleteItem } from "../../api/api";
import styles from "./Products.module.css";
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function Products() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getItems();
        const data = await response;
        setItems(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [items]);

  const handleUpdate = async (item) => {
    try {
      router.push({
        pathname: "/pages/addProduct",
        query: {
          title: item.title,
          description: item.description,
          imageUrl: item.imageUrl,
        },
      });
    } catch (error) {
      setError(error.message);
    }
  };

  const handleDelete = async (itemId) => {
    try {
      await deleteItem(itemId);
      const data = await getItems();
      setItems(data);
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
    <div>
      <h1 className={styles.center}>Products List</h1>
      <div className={styles.container}>
        {items.map((item) => (
          <div className={styles.item} key={item._id}>
            <h2 className={styles.center}>{item.title}</h2>
            <Image
              src={item.imageUrl}
              alt={item.title}
              width={300}
              height={200}
              priority
            />
            <p>{item.description}</p>
            <div className={styles.buttonContainer}>
              <div>
                <button
                  className={styles.update}
                  onClick={() => handleUpdate(item)}
                >
                  Update
                </button>
                <button
                  className={styles.delete}
                  onClick={() => handleDelete(item._id)}
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
