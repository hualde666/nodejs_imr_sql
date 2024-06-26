import sql from 'mssql'

const dbSettings = {
  user: 'myadmin', // update me
  password: '03570357sA',// update me
  server: 'AIRIN\\SQLEXPRESS', // update me
  database: 'IMRSISDBF',
  host: 'localhost',
  port: 1433,
  options: {
    // If you are on Microsoft Azure, you need encryption:
    //   host: 'localhost',

    encrypt: true,
    //   database: 'IMRSISDBF', // update me
    trustServerCertificate: true
  }

}
export const getConnection = async () => {
  try {
    const pool = await sql.connect(dbSettings)
    //    const result = await pool.request().query("SELECT TOP 2 CODIGO, DESCRIPCION,DISPONIBLE,PRECIO FROM PRODUCTOS")
    //    console.log(result)
    return pool
  } catch (error) {
    console.error(error)
  }

}
