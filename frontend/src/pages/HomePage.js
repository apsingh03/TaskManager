import React, { useEffect, useState } from "react";
import Header from "../components/Header";

import { useSelector, useDispatch } from "react-redux";
import {
  createTaskAsync,
  deleteTaskAsync,
  getAllTasksAsync,
  updateTaskAsync,
} from "../Redux/Slices/TasksSlice";
import { toast } from "react-toastify";
import TasksTable from "../components/TasksTable";
import { useNavigate } from "react-router-dom";

const HomePage = () => {
  const navigate = useNavigate();
  const tasksRedux = useSelector((state) => state.tasks);
  const authRedux = useSelector((state) => state.auth);

  const dispatch = useDispatch();
  const [isLoading, setisLoading] = useState(false);
  const [taskTitle, settaskTitle] = useState("");
  const [taskDescription, settaskDescription] = useState("");
  const [taskRadio, settaskRadio] = useState("");

  const [updateTargetRow, setupdateTargetRow] = useState("");
  const [updateBtn, setupdateBtn] = useState(false);
  const [updateTaskRadio, setupdateTaskRadio] = useState("");

  // pagination
  const totalPagesRedux = tasksRedux.data?.totalPages;
  const paginationArray = Array.from(Array(totalPagesRedux).keys()).splice(1);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setitemsPerPage] = useState("2");

  // console.log("tasksRedux ", tasksRedux);

  async function handleAddTasks(event) {
    event.preventDefault();
    setisLoading(true);
    // console.log("handleAddTasks");
    const title = event.target.taskTitle.value;
    const desc = event.target.taskDesc.value;
    const statusRadio = event.target.taskStatusRadios.value;

    const actionResult = await dispatch(
      createTaskAsync({
        title,
        desc,
        statusRadio,
      })
    );

    if (actionResult.payload.msg === "Title Exists") {
      toast.error(actionResult.payload.msg);
      document.querySelector("#taskTitle").value = "";
      setisLoading(false);
      navigate(0);
    }

    if (actionResult.payload.msg === "Added") {
      toast.success(actionResult.payload.msg);
      document.querySelector("#taskTitle").value = "";
      document.querySelector("#taskDesc").value = "";

      setisLoading(false);
    }
  }

  useEffect(() => {
    dispatch(
      getAllTasksAsync({
        currentPage,
        pageSize: itemsPerPage,
      })
    );
  }, [itemsPerPage, currentPage]);

  return (
    <>
      <Header />

      <div className="addtasks">
        <div className="card">
          <form onSubmit={handleAddTasks}>
            <div className="d-flex flex-row justify-content-center p-2 ">
              <h4 className=" text-dark px-3 ">Add Your Tasks </h4>
              {isLoading || tasksRedux.isLoading ? (
                <div className="spinner-border" role="status"></div>
              ) : null}
            </div>

            <div className="col-12 row">
              <div className="col-12 col-md-4  form-group mb-3">
                <label htmlFor="taskTitle">Title</label>
                <input
                  type="text"
                  required
                  className="form-control"
                  id="taskTitle"
                  name="taskTitle"
                />
              </div>

              <div className="col-12 col-md-4 form-group mb-3">
                <label htmlFor="taskDesc"> Description</label>
                <input
                  type="text"
                  className="form-control"
                  required
                  id="taskDesc"
                  name="taskDesc"
                />
              </div>

              <div className="col-12 col-md-4 d-flex flex-row justify-content-evenly">
                <div className="mt-3">
                  <div className="form-check">
                    <input
                      className="form-check-input"
                      type="radio"
                      name="taskStatusRadios"
                      id="taskCompleted"
                      value="Completed"
                      required
                      checked={taskRadio === "Completed"}
                      onChange={(e) => settaskRadio(e.target.value)}
                    />
                    <label className="form-check-label" htmlFor="taskCompleted">
                      Completed
                    </label>
                  </div>

                  <div className="form-check">
                    <input
                      className="form-check-input"
                      type="radio"
                      name="taskStatusRadios"
                      id="taskNotCompleted"
                      value="Not Completed"
                      checked={taskRadio === "Not Completed"}
                      onChange={(e) => settaskRadio(e.target.value)}
                    />
                    <label
                      className="form-check-label"
                      htmlFor="taskNotCompleted"
                    >
                      Not Completed
                    </label>
                  </div>
                </div>

                <button type="submit" className="btn btn-primary">
                  Add Task
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>

      <div className="dashboard">
        <h4 className="text-center"> Tasks Dashboard</h4>

        <TasksTable
          apiData={tasksRedux.data.tasks && tasksRedux.data.tasks}
          updateTargetRow={updateTargetRow}
          settaskTitle={settaskTitle}
          taskTitle={taskTitle}
          settaskDescription={settaskDescription}
          taskDescription={taskDescription}
          updateTaskRadio={updateTaskRadio}
          setupdateTaskRadio={setupdateTaskRadio}
          setupdateBtn={setupdateBtn}
          updateBtn={updateBtn}
          setupdateTargetRow={setupdateTargetRow}
          setisLoading={setisLoading}
        />

        <div className="d-flex flex-row justify-content-evenly">
          <nav aria-label="...">
            <ul className="pagination">
              <li
                className={
                  currentPage === 1 ? "page-item disabled" : "page-item"
                }
              >
                <a
                  className="page-link"
                  onClick={() => setCurrentPage(currentPage - 1)}
                  href="#"
                  tabIndex="-1"
                >
                  Previous
                </a>
              </li>

              {paginationArray &&
                paginationArray.map((data, index) => {
                  return (
                    <li
                      className={
                        currentPage === data ? "page-item active" : "page-item "
                      }
                      key={index}
                    >
                      <a
                        style={{ cursor: "pointer" }}
                        onClick={() => setCurrentPage(data)}
                        className="page-link"
                      >
                        {data}
                      </a>
                    </li>
                  );
                })}

              <li
                className={
                  currentPage === totalPagesRedux
                    ? "page-item disabled"
                    : "page-item"
                }
              >
                <a
                  className="page-link"
                  onClick={() => setCurrentPage(currentPage + 1)}
                  href="#"
                  tabIndex="-1"
                >
                  Next
                </a>
              </li>
            </ul>
          </nav>

          <div>
            <select
              className="form-select"
              onChange={(e) => setitemsPerPage(e.target.value)}
            >
              <option>Select Items Per Page</option>
              <option value="2">2</option>
              <option value="4">4</option>
              <option value="6">6</option>
            </select>
          </div>
        </div>
      </div>
    </>
  );
};

export default HomePage;
