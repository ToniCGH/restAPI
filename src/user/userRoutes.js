const { Router } = require("express");

const { userAdd, userLogin, userList, userUpdate, userDelete } = require("./userControllers");
const { hashPassword, checkPassword } = require("../middleware");

const userRouter = Router();

userRouter.post("/user", hashPassword, userAdd);
userRouter.post("/login", checkPassword, userLogin);
userRouter.get("/user", userList);
userRouter.put("/user", userUpdate);
userRouter.delete("/user", userDelete);

module.exports = userRouter;