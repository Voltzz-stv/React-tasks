"use client";
import { useState } from "react";
import styles from "./Todo.module.css";

export default function Todo() {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState("");

  const handleInputChange = (event) => {
    setNewTodo(event.target.value);
  };

  const handleFormSubmit = (event) => {
    event.preventDefault();
    if (newTodo.trim() !== "") {
      setTodos([...todos, { id: Date.now(), text: newTodo, completed: false }]);
      setNewTodo("");
    }
  };

  const handleTodoClick = (id) => {
    setTodos((prevTodos) =>
      prevTodos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  const handleTodoRemove = (id) => {
    setTodos((prevTodos) => prevTodos.filter((todo) => todo.id !== id));
  };

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Todo App</h2>
      <form className={styles.form} onSubmit={handleFormSubmit}>
        <input
          className={styles.input}
          type="text"
          value={newTodo}
          onChange={handleInputChange}
          placeholder="Enter a new todo"
        />
        <button className={styles.button} type="submit">
          Add Todo
        </button>
      </form>
      <ul className={styles.list}>
        {todos.map((todo) => (
          <li
            key={todo.id}
            className={`${styles.item} ${
              todo.completed ? styles.completed : ""
            }`}
          >
            <span
              className={styles.text}
              onClick={() => handleTodoClick(todo.id)}
            >
              {todo.text}
            </span>
            <button
              className={styles.removeButton}
              onClick={() => handleTodoRemove(todo.id)}
            >
              Remove
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
