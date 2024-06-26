import { getConnection } from '../database/conexion.js'

import sql from "mssql"

export const getProductos = async (req, res) => {

    const pool = await getConnection()
    try {


        await pool
            .request()

            .query("SELECT TOP 100 ID,CODIGO,DESCRIPCION,DISPONIBLE,PRECIO FROM PRODUCTOS ORDER BY DESCRIPCION ", function (err, result) {
                if (err) {
                    console.log(err);
                    return res.status(500).send('Error en el servidor');
                } else {

                    if (result.rowsAffected[0] > 0) {

                        res.json(result)
                        // console.log(result)

                    }
                    else {
                        console.log('No hay registro')
                        res.status(404).send('No se encontraron registros');
                    }
                }
            }
            )
    } catch (err) {
        res.send(JSON.stringify("Error while querying database :- " + err))
        console.log("Error while querying database :- " + err)
    }


}

export const getUnProducto = async (req, res) => {


    const pool = await getConnection()

    try {
        pool
            .request()

            .input("id", sql.Int, req.params.id)
            .query("SELECT ID,CODIGO,DESCRIPCION,DISPONIBLE FROM PRODUCTOS WHERE ID = @id",
                function (err, result) {
                    if (err) {
                        console.log(err);
                        return res.status(500).send('Error en el servidor');
                    } else {

                        if (result.rowsAffected[0] > 0) {
                            console.log('******************************')
                            res.json(result)
                        }
                        else {
                            console.log('No hay registro')
                            res.status(404).send('No se encontraron registros');
                        }
                    }
                }
            )
    } catch (err) {
        res.send(JSON.stringify("Error while querying database :- " + err))
        console.log("Error while querying database :- " + err)
    }

}

// }


export const crearProducto = async (req, res) => {
    const pool = await getConnection()
    console.log(req.body)

    try {
        pool
            .request()

            .input("codigo", sql.VarChar, req.body.codigo)
            .input("descripcion", sql.VarChar, req.body.descripcion)
            .input("disponible", sql.Decimal, req.body.disponible)
            .input("precio", sql.Decimal, req.body.precio)
            .query("INSERT  INTO PRODUCTOS (CODIGO,DESCRIPCION,DISPONIBLE,PRECIO) VALUES (@codigo,@descripcion,@disponible,@precio); SELECT SCOPE_IDENTITY() AS id; ",
                function (err, result) {
                    if (err) {
                        console.log(err);
                        return res.status(500).send('Error en el servidor');
                    } else {

                        if (result.rowsAffected[0] > 0) {
                            console.log(result)

                            res.json({ message: "Producto CREADO" })
                        }
                        else {
                            console.log('No hay registro')
                            res.status(404).send('No se encontraron producto');
                        }
                    }
                }
            )
    } catch (err) {
        res.send(JSON.stringify("Error while querying database :- " + err))
        console.log("Error while querying database :- " + err)
    }

}

export const modiProducto = async (req, res) => {
    const pool = await getConnection()
    console.log(req.body.descripcion)

    try {
        pool
            .request()

            .input("id", sql.Int, req.params.id)
            .input("descripcion", sql.VarChar, req.body.descripcion)
            .query("UPDATE  PRODUCTOS SET DESCRIPCION = @descripcion WHERE ID = @id",
                function (err, result) {
                    if (err) {
                        console.log(err);
                        return res.status(500).send('Error en el servidor');
                    } else {

                        if (result.rowsAffected[0] > 0) {

                            res.json({ message: "Producto MPDIFICADO" })
                        }
                        else {
                            console.log('No hay registro')
                            res.status(404).send('No se encontraron producto');
                        }
                    }
                }
            )
    } catch (err) {
        res.send(JSON.stringify("Error while querying database :- " + err))
        console.log("Error while querying database :- " + err)
    }


}

export const borrarProducto = async (req, res) => {
    const pool = await getConnection()

    try {
        pool
            .request()

            .input("id", sql.Int, req.params.id)
            .query("DELETE  FROM PRODUCTOS WHERE ID = @id",
                function (err, result) {
                    if (err) {
                        console.log(err);
                        return res.status(500).send('Error en el servidor');
                    } else {

                        if (result.rowsAffected[0] > 0) {

                            res.json({ message: "Producto eliminado" })
                        }
                        else {
                            console.log('No hay registro')
                            res.status(404).send('No se encontraron producto');
                        }
                    }
                }
            )
    } catch (err) {
        res.send(JSON.stringify("Error while querying database :- " + err))
        console.log("Error while querying database :- " + err)
    }


}