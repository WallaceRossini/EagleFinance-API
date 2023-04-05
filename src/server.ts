import app from './app'
import router from './router'

const PORT = process.env.PORT ? Number(process.env.PORT) : 4000

app.use(router)

app.listen(PORT, () => {
  console.log(`HTTP Server Running ${PORT}`)
} )