const db = require("../models/");
const bcrypt = require("bcrypt");

// Tables
const Users = db.users;
const Tasks = db.tasks;

const Sequelize = db.Sequelize;
const sequelize = db.sequelize;

const getTasks = async (req, res) => {
  try {
    const currentPage = parseInt(req.query.currentPage) || 1;
    const itemsPerPage = parseInt(req.query.pageSize) || 5;

    // console.log("get all taks ", currentPage, itemsPerPage);
    const query = await Tasks.findAndCountAll({
      offset: (currentPage - 1) * itemsPerPage,
      limit: itemsPerPage,
    });
    const totalPages = Math.ceil(query.count / itemsPerPage);

    res.status(200).send({
      totalPages,
      tasks: query.rows,
    });
  } catch (error) {
    res.status(500).send(error.message);
  }
};

const createTask = async (req, res) => {
  try {
    const title = req.body.title;

    const titleExist = await Tasks.findOne({ where: { title } });

    if (titleExist) {
      res.status(200).send({ msg: "Title Exists" });
    } else {
      const user_id = req.user.id;
      const description = req.body.desc;
      const status = req.body.statusRadio;
      const query = await Tasks.create({
        title,
        description,
        status,
        user_id,
        createdAt: Date.now(),
      });

      res
        .status(200)
        .send({ msg: "Added", data: { title, description, status } });
    }
  } catch (error) {
    res.status(500).send(error.message);
  }
};

const updateTask = async (req, res) => {
  try {
    const id = req.body.id;
    const title = req.body.title;
    const description = req.body.description;
    const status = req.body.status;

    console.log(id, title, description, status);

    const query = await Tasks.update(
      { title, description, status, updatedAt: Date.now() },
      { where: { id } }
    );

    res.status(200).send({ msg: "Updated" });
  } catch (error) {
    res.status(500).send(error.message);
  }
};

const deleteTask = async (req, res) => {
  try {
    //   console.log( "Delete Id - " , req.params.taskId);
    const query = await Tasks.destroy({ where: { id: req.params.taskId } });
    // res.status(200).send(`Delete Req ${req.params.taskId}`);
    res.status(200).send({ msg: `Task Deleted` });
  } catch (error) {
    res.status(500).send(error.message);
  }
};

module.exports = {
  getTasks,
  createTask,
  deleteTask,
  updateTask,
};
