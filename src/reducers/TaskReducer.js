import { Data } from "../data/tasks";
const initialState = {
  tasks: [...Data],
};
const formatDate = (date) => {
  return date
    ? new Date(date).toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      })
    : "";
};

const taskReducer = (state, action) => {
  switch (action.type) {
    case "Add_Task": {
      const formatedDate = formatDate(action.payload.date);
      const taskformatedDate = { ...action.payload, date: formatedDate };

      return {
        tasks: [...state.tasks, taskformatedDate],
      };
    }

    case "Edit_Task": {
      const formattedEditDate = formatDate(action.payload.date);
      const taskWithFormattedEditDate = {
        ...action.payload,
        date: formattedEditDate,
      };
      return {
        tasks: state.tasks.map((task) =>
          task.id === action.payload.id ? taskWithFormattedEditDate : task
        ),
      };
    }

    case "Delete_Task":
      return {
        ...state,
        tasks: state.tasks.filter((item) => item.id !== action.payload.id),
      };

    case "Set_Tasks":
      return {
        tasks: action.payload,
      };

    default:
      return state;
  }
};

export { initialState, taskReducer };
