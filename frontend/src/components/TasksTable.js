import React from "react";
import { toast } from "react-toastify";

import { useSelector, useDispatch } from "react-redux";
import { deleteTaskAsync, updateTaskAsync } from "../Redux/Slices/TasksSlice";
const TasksTable = ({
  apiData,
  updateTargetRow,
  settaskTitle,
  taskTitle,
  settaskDescription,
  taskDescription,
  updateTaskRadio,
  setupdateTaskRadio,
  setupdateBtn,
  updateBtn,
  setupdateTargetRow,
  setisLoading,
}) => {
  const dispatch = useDispatch();
  const deleteTask = async (taskId) => {
    setisLoading(true);
    const actionResult = await dispatch(
      deleteTaskAsync({
        taskId,
      })
    );

    if (actionResult.payload.msg === "Task Deleted") {
      toast.error(actionResult.payload.msg);

      setisLoading(false);
    }
  };

  const updateTask = async (id, title, description, status) => {
    setisLoading(true);

    const actionResult = await dispatch(
      updateTaskAsync({
        id,
        title,
        description,
        status,
      })
    );

    if (actionResult.payload.msg === "Updated") {
      toast.success(actionResult.payload.msg);
      setupdateBtn(false);
      setupdateTargetRow(id);
      setisLoading(false);
    }
  };

  return (
    <>
      <div class="table-responsive">
        <table className="table">
          <thead className="thead-dark">
            <tr>
              <th scope="col">S.No</th>
              <th scope="col">Title</th>
              <th scope="col">Description</th>
              <th scope="col">Status</th>
              <th scope="col">Actions</th>
            </tr>
          </thead>
          <tbody>
            {apiData &&
              apiData.map((data, index) => {
                return (
                  <tr key={index}>
                    <th scope="row"> {index + 1} </th>
                    <td>
                      {updateTargetRow === data.id ? (
                        <input
                          style={{
                            border:
                              updateBtn === false ? "none" : "1px solid #000",
                          }}
                          type="text"
                          onChange={(e) => settaskTitle(e.target.value)}
                          value={taskTitle}
                        />
                      ) : null}
                      {(updateTargetRow === data.id) === false ? data.id : null}{" "}
                      {(updateTargetRow === data.id) === false
                        ? data.title
                        : null}
                    </td>

                    <td>
                      {updateTargetRow === data.id ? (
                        <input
                          style={{
                            border:
                              updateBtn === false ? "none" : "1px solid #000",
                          }}
                          type="text"
                          onChange={(e) => settaskDescription(e.target.value)}
                          value={taskDescription}
                        />
                      ) : (
                        data.description
                      )}
                      {/* {(updateTargetRow === data.id) === false
                        ? data.description
                        : null} */}
                    </td>
                    <td>
                      {updateTargetRow === data.id ? (
                        <div className="">
                          <div className="form-check">
                            <input
                              className="form-check-input"
                              type="radio"
                              name={`updateTaskRadio${data.id}`}
                              id={`updateTaskCompleted${data.id}`}
                              value="Completed"
                              required
                              checked={updateTaskRadio === "Completed"}
                              onChange={(e) =>
                                setupdateTaskRadio(e.target.value)
                              }
                            />
                            <label
                              className="form-check-label"
                              htmlFor={`updateTaskCompleted${data.id}`}
                            >
                              Completed
                            </label>
                          </div>

                          <div className="form-check">
                            <input
                              className="form-check-input"
                              type="radio"
                              name={`updateTaskRadio${data.id}`}
                              id={`updateTaskNotCompleted${data.id}`}
                              value="Not Completed"
                              checked={updateTaskRadio === "Not Completed"}
                              onChange={(e) =>
                                setupdateTaskRadio(e.target.value)
                              }
                            />
                            <label
                              className="form-check-label"
                              htmlFor={`updateTaskNotCompleted${data.id}`}
                            >
                              Not Completed
                            </label>
                          </div>
                        </div>
                      ) : (
                        data.status
                      )}
                    </td>

                    <td>
                      <div className="d-flex flex-row">
                        {updateBtn === false ? (
                          <button
                            className="btn btn-primary mx-3"
                            onClick={() => [
                              setupdateBtn(true),
                              setupdateTargetRow(data.id),
                            ]}
                          >
                            Update
                          </button>
                        ) : null}

                        {updateBtn === true ? (
                          <button
                            className="btn btn-warning mx-3"
                            onClick={() => [
                              setupdateBtn(false),
                              setupdateTargetRow(data.id),
                            ]}
                          >
                            Cancel
                          </button>
                        ) : null}

                        {updateBtn === true ? (
                          <button
                            className="btn btn-primary mx-3"
                            onClick={() =>
                              updateTask(
                                data.id,
                                taskTitle,
                                taskDescription,
                                updateTaskRadio
                              )
                            }
                          >
                            Submit
                          </button>
                        ) : null}

                        <button
                          className="btn btn-danger"
                          onClick={() => deleteTask(data.id)}
                        >
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default TasksTable;
