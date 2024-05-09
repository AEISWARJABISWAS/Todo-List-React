import React, { useState } from "react";

const AddTodo = () => {
  const [value, setValue] = useState("");
  const [todoList, setTodoList] = useState([]);
  const [editId, setEditId] = useState(null);
  const [editValue, setEditValue] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (value.trim() !== "") {
      setTodoList([...todoList, { value: value, key: Date.now() }]);
      setValue("");
    }
  };
  const handleChange = (e) => setValue(e.target.value);
  const handleDelete = (key) => {
    setTodoList(todoList.filter((item1) => item1.key !== key));
  };

  const handleEdit = (key, value) => {
    setEditId(key);
    setEditValue(value);
  };
  const handleSave = (key) => {
    const updatedTodo = todoList.map((item2) => {
      if (item2.key === key) {
        return { ...item2, value: editValue };
      }
      return item2;
    });
    setTodoList(updatedTodo);
    setEditId(null);
  };
  const handleEditChange = (e) => {
    setEditValue(e.target.value);
  };
  return (
    <div style={{ textAlign: "center" }}>
      <input
        value={value}
        type="text"
        placeholder="add items"
        onChange={handleChange}
      />
      <button onClick={handleSubmit}>Add</button>
      <ol>
        {todoList.length > 0 &&
          todoList.map((item) => (
            <li key={item.key}>
              {editId === item.key ? (
                <input
                  type="text"
                  value={editValue}
                  onChange={handleEditChange}
                />
              ) : (
                <span style={{ marginRight: "30px" }}>{item.value}</span>
              )}
              <button onClick={() => handleDelete(item.key)}>DELETE</button>
              {editId === item.key ? (
                <button onClick={() => handleSave(item.key)}>SAVE</button>
              ) : (
                <button onClick={() => handleEdit(item.key, item.value)}>
                  EDIT
                </button>
              )}
            </li>
          ))}
      </ol>
      {/* <p>{JSON.stringify(todoList)}</p> */}
    </div>
  );
};

export default AddTodo;
