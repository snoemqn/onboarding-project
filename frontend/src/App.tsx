import React, { useState, useEffect } from "react";
import Modal from "./components/Modal";
import axios from "axios";


const todosURL = "/api/todos/"
const defaultItem = { id: "", title: "", description: "", completed: false }

const App = () => {
  const [viewCompleted, setViewCompleted] = useState<Boolean>(false);
  const [todoList, setTodoList] = useState<TodoItem[]>([]);
  const [modal, setModal] = useState<Boolean>(false);
  const [activeItem, setActiveItem] = useState<TodoItem>(defaultItem);

  useEffect(() => refreshList(), [])

  const refreshList = () => {
    axios
      .get(todosURL)
      .then((res) => setTodoList(res.data))
      .catch((err) => console.log(err));

    setActiveItem(defaultItem);
  };

  const toggle = () => {
    setModal(!modal);
  }

  const handleSubmit = (item: TodoItem) => {
    toggle();

    if (item.id) {
      axios
        .put(`${todosURL}${item.id}/`, item)
        .then((res) => refreshList());
      return;
    }
      axios
        .post(todosURL, item)
        .then((res) => refreshList());
    };

  const handleDelete = (item: TodoItem) => {
    axios
      .delete(`${todosURL}${item.id}/`)
      .then((res) => refreshList());
  };

  const createItem = () => {
    setActiveItem(defaultItem);
    toggle()
  };

  const editItem = (item: TodoItem) => {
    setActiveItem(item);
    toggle()
  };

  const renderTabList = () => {
    return (
      <div className="nav nav-tabs">
        <span
          onClick={() => setViewCompleted(true)}
          className={viewCompleted ? "nav-link active" : "nav-link"}
        >
          Complete
        </span>
        <span
          onClick={() => setViewCompleted(false)}
          className={viewCompleted ? "nav-link" : "nav-link active"}
        >
          Incomplete
        </span>
      </div>
    );
  };

  const renderItems = () => {
    const newItems = todoList.filter(
      (item) => item.completed === viewCompleted
    );

    return newItems.map((item) => (
      <li
        key={item.id}
        className="list-group-item d-flex justify-content-between align-items-center"
      >
        <span
          className={`todo-title mr-2 ${
            viewCompleted ? "completed-todo" : ""
          }`}
          title={item.description}
        >
          {item.title}
        </span>
        <span>
          <button
            className="btn btn-secondary mr-2"
            onClick={() => editItem(item)}
          >
            Edit
          </button>
          <button
            className="btn btn-danger"
            onClick={() => handleDelete(item)}
          >
            Delete
          </button>
        </span>
      </li>
    ));
  };

  return (
    <main className="container">
      <h1 className="text-white text-uppercase text-center my-4">Todo app</h1>
      <div className="row">
        <div className="col-md-6 col-sm-10 mx-auto p-0">
          <div className="card p-3">
            <div className="mb-4">
              <button
                className="btn btn-primary"
                onClick={createItem}
              >
                Add task
              </button>
            </div>
            {renderTabList()}
            <ul className="list-group list-group-flush border-top-0">
              {renderItems()}
            </ul>
          </div>
        </div>
      </div>
      {modal ? (
        <Modal
          activeItem={activeItem}
          toggle={toggle}
          onSave={handleSubmit}
        />
      ) : null}
    </main>
  );
}

export default App;
