const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bcrypt = require("bcrypt") 
const mongoURL = "mongodb+srv://gustavosilva:3sCHZAUN3MDq46hP@bancoprojetofaculdade.98cpa.mongodb.net/?retryWrites=true&w=majority&appName=BancoProjetoFaculdade";
const dotenv = require("dotenv")

dotenv.config()

const app = express();
app.use(cors());
app.use(express.json());

console.log(mongoURL)
mongoose.connect(mongoURL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(
  () => {console.log("conectou")}
).catch(
  () => {console.log("não conectou")}
);

const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true  },
  password: { type: String, required:true },
});
userSchema.pre("save",async function (next) {
  if(!this.isModified("password")) return next()
    this.password = await bcrypt.hash(this.password,10) 
  next()
})
userSchema.methods.comparePassword = function (password) {
  return bcrypt.compare(password,this.password)
}

const user = mongoose.model('user', userSchema);

const TaskSchema = new mongoose.Schema({
  title: { type: String, required: true },
  completed: { type: Boolean, default: false },
});
const Task = mongoose.model('Task', TaskSchema);


app.get('/tasks', async (req, res) => {
  const tasks = await Task.find();
  res.json(tasks);
});

app.post('/tasks', async (req, res) => {
  const newTask = new Task(req.body);
  await newTask.save();
  res.json(newTask);
});

app.post("/login", async(req, res) => {
  const {email, password} = req.body
  try {
    const logUser =await user.findOne({email})
    if(!logUser) return res.status(400).json({message:"e-mail não encontrado"})
    const isPasswordValid = await logUser.comparePassword(password)
    if(!isPasswordValid) return res.status(400).json({message:"Senha Incorreta"})
      return res.status(200).json({message:"Login Bem Sucedido"})
  } catch (error) {
    console.log(error)
    return res.status(500).json({message:"Login Mal Sucedido"})
  }
}) 

app.post('/register', async (req, res) => {
  const {email, password} = req.body
  console.log(email,password)
  try {
    const userExist =await user.findOne({email})
    if(userExist) return res.status(400).json({message:"e-mail já cadastrado"})
      const newUser = new user({email, password})
      await newUser.save();
      res.status(201).json({message:"Usuario cadastrado com sucesso!"})
  } catch (error) {
    return res.status(500).json({message:"Error ao cadastrar usuario."})
  }
});

app.put('/tasks/:id', async (req, res) => {
  const updatedTask = await Task.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(updatedTask);
});

app.delete('/tasks/:id', async (req, res) => {
  await Task.findByIdAndDelete(req.params.id);
  res.json({ message: 'Task deleted' });
});

app.listen(3001, () => {
  console.log('Server running on http://localhost:3001');
});