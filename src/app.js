import express from 'express';
import productosRoutes from './routes/productos.routes.js'
const app = express()
//  para entender las solicitudes en formato json
app.use(express.json())
app.use(productosRoutes)
export default app