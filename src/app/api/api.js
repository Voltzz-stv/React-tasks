import axios from "axios";

// const API_BASE_URL = "https://react-task-a7cc0-default-rtdb.firebaseio.com/";
const API_BASE_URL = "http://localhost:3006/items";

export const getItems = async () => {
  try {
    // const response = await axios.get(API_BASE_URL + "items.json");
    const response = await axios.get(API_BASE_URL);
    // console.log(response.data);
    return response.data;
  } catch (error) {
    throw new Error("Error fetching items");
  }
};

export const updateItem = async (itemId, data) => {
  try {
    const response = await axios.put(`${API_BASE_URL}/items/${itemId}`, data);
    return response.data;
  } catch (error) {
    throw new Error("Error updating item");
  }
};

export const deleteItem = async (itemId) => {
  console.log(itemId);
  try {
    await axios.delete(`${API_BASE_URL}/${itemId}`);
    return;
  } catch (error) {
    throw new Error("Error deleting item");
  }
};
