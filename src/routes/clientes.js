const express = require('express');
const bodyParser = require('body-parser');
const router = express.Router();
const mysqlConnection  = require('../database.js');

router.use(bodyParser.json());

// GET CLIENTE
router.get('/clientes', (req, res) => {
  mysqlConnection.query('SELECT * FROM clientes', (err, rows, fields) => {
    if(!err) {
      res.json(rows);
    } else {
      console.log(err);
    }
  });  
});

// GET CLIENTE POR ID
router.get('/clientes/:id', (req, res) => {
  const { id } = req.params; 
  mysqlConnection.query('SELECT * FROM clientes WHERE id = ?', [id], (err, rows, fields) => {
    if (!err) {
      res.json(rows[0]);
    } else {
      console.log(err);
    }
  });
});

// DELETE CLIENTE
router.delete('/clientes/:id', (req, res) => {
  const { id } = req.params;
  mysqlConnection.query('DELETE FROM clientes WHERE id = ?', [id], (err, rows, fields) => {
    if(!err) {
      res.json({status: 'Cliente Eliminado'});
    } else {
      console.log(err);
    }
  });
});

// INSERT CLIENTE
router.post('/clientes', (req, res) => {
  const sql = 'INSERT INTO clientes SET ?';
  const clienteObj={
    nombre : req.body.nombre,
    direccion : req.body.direccion,
    nit : req.body.nit,
    creado_por : req.body.creado_por
  }
  mysqlConnection.query(sql, clienteObj, (err, rows, fields) => {
    if(!err) {
      res.json({status: 'Cliente Agregado'});
    } else {
      console.log(err);
    }
  });
});

// UPDATE CLIENTE
router.put('/clientes/:id', (req, res) => {
  const { id } = req.params;
  const { nombre, direccion, nit, creado_por} = req.body;
  const sql = `UPDATE clientes SET nombre = '${nombre}', direccion = '${direccion}', nit = '${nit}', 
  creado_por = '${creado_por}' WHERE id = ${id} `;

  mysqlConnection.query(sql, (err, rows, fields) => {
    if(!err) {
      res.json({status: 'Cliente Actualizado'});
    } else {
      console.log(err);
    }
  });
});

module.exports = router;