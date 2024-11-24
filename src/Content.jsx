import { useContext, useState } from "react";
import Add from "./content/Add";
import Done from "./content/Done";
import Header from "./content/Header";
import Progress from "./content/Progress";
import Revised from "./content/Revised";
import Todo from "./content/Todo";
import { TaskContext } from "./context";
import { Data } from "./data/tasks";

export default function Content() {
  const [showModal, setShowModal] = useState(false);
  const [editTask, setEditTask] = useState(null);
  const { state, dispatch } = useContext(TaskContext);

  const handleAdd = (e, newTask, isAdd) => {
    e.preventDefault();
    if (isAdd) {
      dispatch({
        type: "Add_Task",
        payload: newTask,
      });
    } else {
      dispatch({
        type: "Edit_Task",
        payload: newTask,
      });
    }

    setShowModal(false);
    setEditTask(null);
  };

  const handleEdit = (task) => {
    setEditTask(task);
    setShowModal(true);
  };

  const handleDelete = (taskId) => {
    dispatch({
      type: "Delete_Task",
      payload: { id: taskId },
    });
  };

  function handleSearch(searchTerm) {
    if (searchTerm.trim() === "") {
      dispatch({ type: "Set_Tasks", payload: Data });
    } else {
      const filtered = state.tasks.filter((task) =>
        task.title.toLowerCase().includes(searchTerm.toLowerCase())
      );
      dispatch({ type: "Set_Tasks", payload: filtered });
    }
  }

  return (
    <main className="flex-1 overflow-y-auto overflow-x-hidden">
      <Header onSearch={handleSearch} />
      <div className="mx-auto max-w-7xl p-6">
        {showModal && (
          <Add
            onClose={() => {
              setShowModal(false);
              setEditTask(null);
            }}
            onShow={showModal}
            editTask={editTask}
            onSave={handleAdd}
          />
        )}
        {state.tasks.length == 0 ? (
          <h1 className="flex min-h-screen items-center justify-center font-bold text-6xl">
            Task List is empty!
          </h1>
        ) : (
          !showModal && (
            <>
              <Add onOpen={() => setShowModal(true)} />
              <div className="-mx-2 mb-6 flex flex-wrap">
                <Todo edit={handleEdit} onDelete={handleDelete} />
                <Progress edit={handleEdit} onDelete={handleDelete} />
                <Done edit={handleEdit} onDelete={handleDelete} />
                <Revised edit={handleEdit} onDelete={handleDelete} />
              </div>
            </>
          )
        )}
      </div>
    </main>
  );
}
