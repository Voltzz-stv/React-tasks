import axios from "axios";

const API_BASE_URL = "https://react-task-a7cc0-default-rtdb.firebaseio.com/";

export const getItems = async () => {
  try {
    const response = await axios.get(API_BASE_URL + "items.json");
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
    const data = await getItems();
    const index = data.forEach((item, index) => {
      if (item.id === itemId) {
        console.log(index);
        return index;
      }
    });
    await fetch(`${API_BASE_URL}/items/${index}.json`, { method: "DELETE" });
    return;
  } catch (error) {
    throw new Error("Error deleting item");
  }
};
