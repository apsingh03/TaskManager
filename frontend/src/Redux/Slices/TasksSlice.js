import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

// const HOSTNAME = process.env.REACT_APP_BACKENDHOSTNAME;
const HOSTNAME = "http://localhost:8000";
const token = localStorage.getItem("loggedDataToken");

export const getAllTasksAsync = createAsyncThunk(
  "tasks/getAllTasks",
  async ({ currentPage, pageSize }) => {
    try {
      const response = await axios.get(
        `${HOSTNAME}/tasks/task?currentPage=${currentPage}&pageSize=${pageSize}`,
        {
          headers: { Authorization: `${token}` },
        }
      );
      //   console.log( "response - " , response.data );
      return response.data;
    } catch (error) {
      console.log("getAllTasksAsync Error - ", error.response);
    }
  }
);

export const createTaskAsync = createAsyncThunk(
  "tasks/createTask",
  async ({ title, desc, statusRadio }) => {
    try {
      //   console.log(`${HOSTNAME}/tasks/task/`);
      const response = await axios.post(
        `${HOSTNAME}/tasks/task/`,
        {
          title,
          desc,
          statusRadio,
        },
        {
          headers: { Authorization: `${token}` },
        }
      );
      //   console.log(" resopnse data ", response.data);
      return response.data;
    } catch (error) {
      console.log("createTaskAsync Error - ", error.response);
    }
  }
);

export const updateTaskAsync = createAsyncThunk(
  "tasks/updateTask",
  async ({ id, title, description, status }) => {
    try {
      //   console.log(`${HOSTNAME}/tasks/task/`);
      const response = await axios.put(
        `${HOSTNAME}/tasks/task/`,
        {
          id,
          title,
          description,
          status,
        },
        {
          headers: { Authorization: `${token}` },
        }
      );
      //   console.log(" resopnse data ", response.data);
      return response.data;
    } catch (error) {
      console.log("updateTaskAsync Error - ", error.response);
    }
  }
);

export const deleteTaskAsync = createAsyncThunk(
  "tasks/deleteTasks",
  async ({ taskId }) => {
    try {
      //   console.log("----> ", taskId);
      const response = await axios.delete(`${HOSTNAME}/tasks/task/${taskId}/`, {
        headers: { Authorization: `${token}` },
      });
      //   console.log( response.data );
      return response.data;
    } catch (error) {
      console.log("deleteTaskAsync Error  ", error.response);
    }
  }
);

const initialState = {
  data: [],
  isLoading: false,
  isError: false,
};

export const tasksSlice = createSlice({
  name: "tasks",
  initialState,
  reducers: {},

  extraReducers: (builder) => {
    builder
      .addCase(getAllTasksAsync.pending, (state, action) => {
        state.isLoading = true;
      })

      .addCase(getAllTasksAsync.fulfilled, (state, action) => {
        state.isLoading = false;
        state.data = action.payload;
      })

      .addCase(getAllTasksAsync.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
      })

      .addCase(createTaskAsync.pending, (state, action) => {
        state.isLoading = true;
      })

      .addCase(createTaskAsync.fulfilled, (state, action) => {
        state.isLoading = false;
        // console.log(action.payload.data);
        state.data.tasks.unshift(action.payload.data);
      })

      .addCase(createTaskAsync.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
      })

      .addCase(deleteTaskAsync.pending, (state, action) => {
        state.isLoading = true;
      })

      .addCase(deleteTaskAsync.fulfilled, (state, action) => {
        state.isLoading = false;
        // console.log(action.meta.arg.taskId);

        const deleteId = action.meta.arg.taskId;

        const idx = state.data.tasks.findIndex((data) => {
          return data.id === deleteId;
        });

        state.data.tasks.splice(idx, 1);
      })

      .addCase(deleteTaskAsync.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
      });
  },
});

export default tasksSlice.reducer;
