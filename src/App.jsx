import { useReducer } from "react";
import "./App.css";
import Content from "./Content";
import Sidebar from "./Sidebar";
import { TaskContext } from "./context";
import { initialState, taskReducer } from "./reducers/TaskReducer";
function App() {
  const [state, dispatch] = useReducer(taskReducer, initialState);
  return (
    <TaskContext.Provider value={{ state, dispatch }}>
      <div className="bg-gray-900 text-white font-inter">
        <div className="flex h-screen">
          <Sidebar />
          <Content />
        </div>
      </div>
    </TaskContext.Provider>
  );
}

export default App;
