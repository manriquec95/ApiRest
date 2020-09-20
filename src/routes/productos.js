const express = require('express');
const bodyParser = require('body-parser');
const router = express.Router();
const mysqlConnection  = require('../database.js');

router.use(bodyParser.json());

// GET PRODUCTO
router.get('/productos', (req, res) => {
  mysqlConnection.query('SELECT * FROM productos', (err, rows, fields) => {
    if(!err) {
      res.json(rows);
    } else {
      console.log(err);
    }
  });  
});

// GET PRODUCTO POR ID
router.get('/productos/:id', (req, res) => {
  const { id } = req.params; 
  mysqlConnection.query('SELECT * FROM productos WHERE id = ?', [id], (err, rows, fields) => {
    if (!err) {
      res.json(rows[0]);
    } else {
      console.log(err);
    }
  });
});

// DELETE PRODUCTO
router.delete('/productos/:id', (req, res) => {
  const { id } = req.params;
  mysqlConnection.query('DELETE FROM productos WHERE id = ?', [id], (err, rows, fields) => {
    if(!err) {
      res.json({status: 'Producto Eliminado'});
    } else {
      console.log(err);
    }
  });
});

// INSERT PRODUCTO
router.post('/productos', (req, res) => {
  const sql = 'INSERT INTO productos SET ?';
  const productoObj={
    nombre : req.body.nombre,
    precio : req.body.precio,
    creado_por : req.body.creado_por
  }
  mysqlConnection.query(sql, productoObj, (err, rows, fields) => {
    if(!err) {
      res.json({status: 'Producto Agregado'});
    } else {
      console.log(err);
    }
  });
});

// UPDATE PRODUCTO
router.put('/productos/:id', (req, res) => {
  const { id } = req.params;
  const { nombre, precio, creado_por} = req.body;
  const sql = `UPDATE productos SET nombre = '${nombre}', precio = '${precio}', creado_por = '${creado_por}' WHERE id = ${id} `;

  mysqlConnection.query(sql, (err, rows, fields) => {
    if(!err) {
      res.json({status: 'Producto Actualizado'});
    } else {
      console.log(err);
    }
  });
});

module.exports = router;