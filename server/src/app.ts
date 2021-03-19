import Express from 'express'
import path from 'path'
import router from './routes/index'
import layouts from 'express-ejs-layouts'
import mongoose from "mongoose"
import dotenv from "dotenv";
dotenv.config();

const options = {
  autoIndex: false,
  poolSize: 10,
  bufferMaxEntries: 0,
  useNewUrlParser: true,
  useUnifiedTopology: true,
};
mongoose.connect(
  `mongodb://${process.env.DB_USER}:${process.env.DB_PASS}@${process.env.HOST}:${process.env.DB_PORT}/${process.env.DB_NAME}`,
  options
)
mongoose.Promise = global.Promise

const app = Express()
const port = 3000

app.set('view engine', 'ejs')
app.set('views', path.resolve(__dirname, 'views'))
app.use(layouts)
app.use(Express.static(__dirname + '/public'))
app.use('/', router)

app.listen(port, () => {
  console.log('server start')
})