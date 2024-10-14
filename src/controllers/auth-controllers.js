const usersModel = require("../models/users-model");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const HttpError = require("../errors/HttpError");

module.exports = {
  // POST /auth/register
  register: (req, res) => {
    const { name, email, password } = req.body;

    if (
      typeof name !== "string" ||
      typeof email !== "string" ||
      typeof password !== "string"
    ) {
      return res
        .status(400)
        .json({ message: "Todos os campos são obrigatórios" });
    }

    const existingUser = usersModel.getUserByEmail(email);
    if (existingUser) {
      throw new HttpError(400, "Email já cadastrado!");
    }

    const newUser = usersModel.createUser(name, email, password);
    res.status(201).json({ ...newUser, password: undefined });
  },
  // POST /auth/login
  login: (req, res) => {
    const { email, password } = req.body;

    if (typeof email !== "string" || typeof password !== "string") {
      return res
        .status(400)
        .json({ message: "Todos os campos são obrigatórios" });
    }

    const user = usersModel.getUserByEmail(email);
    if (!user) {
      return res.status(400).json({ message: "Usuário não encontrado" });
    }

    const isValidPassword = bcrypt.compareSync(password, user.password);

    if (!isValidPassword) {
      return res.status(400).json({ message: "Credenciais inválidas" });
    }

    const payLoad = { id: user.id, email: user.email };
    const token = jwt.sign(payLoad, process.env.JWT_KEY, {
      expiresIn: "1d",
    });

    res.json({ token });
  },
};
