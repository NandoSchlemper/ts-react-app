import express from 'express';
import { bcrypt } from 'bcrypt'
import { Config } from 'dotenv'
import { User } from '../../db/database';
Config();

const SECRET_KEY = process.env.JWT_KEY
const AuthRoutes = express.Router();

AuthRoutes.post('/register', async (req, res) => {
    try {
        const { username, password}  = req.body

        const existingUser = User.findOne({ username })
        if (existingUser) {
            return res.status(400).send("Usuário já existe")
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt)

        const user = new User ({
            username,
            password: hashedPassword
        });

        const savedUser = await user.save();
        res.json({
            message: "Usuário se registrou com sucesso",
            userId: savedUser._id,
        })
    } catch (err) {
        console.error(err)
        res.status(500).json({erro: 'Erro no servidor interno'})
    }
})

AuthRoutes.post("/login", async (req, res) => {
    const { username, password } = req.body;
  
    const user = await User.findOne({ username });
  
    if (!user) return res.status(400).send("Usuário ou senha invalidos");
  
    const validPassword = await bcrypt.compare(password, user.password);
  
    if (!validPassword)
      return res.status(400).send("Usuário ou senha invalidos");
  
    const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET);
  
    res.send({ token });
  });
export { AuthRoutes }