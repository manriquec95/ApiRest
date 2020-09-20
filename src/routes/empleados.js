const express = require('express');
const bodyParser = require('body-parser');
const router = express.Router();
const mysqlConnection  = require('../database.js');

router.use(bodyParser.json());

// GET EMPLEADO
router.get('/empleados', (req, res) => {
  mysqlConnection.query('SELECT * FROM empleados', (err, rows, fields) => {
    if(!err) {
      res.json(rows);
    } else {
      console.log(err);
    }
  });  
});

// GET EMPLEADO POR ID
router.get('/empleados/:id', (req, res) => {
  const { id } = req.params; 
  mysqlConnection.query('SELECT * FROM empleados WHERE id = ?', [id], (err, rows, fields) => {
    if (!err) {
      res.json(rows[0]);
    } else {
      console.log(err);
    }
  });
});

// DELETE EMPLEADO
router.delete('/empleados/:id', (req, res) => {
  const { id } = req.params;
  mysqlConnection.query('DELETE FROM empleados WHERE id = ?', [id], (err, rows, fields) => {
    if(!err) {
      res.json({status: 'Empleado Eliminado'});
    } else {
      console.log(err);
    }
  });
});

// INSERT EMPLEADO
router.post('/empleados', (req, res) => {
  const sql = 'INSERT INTO empleados SET ?';
  const empleadoObj={
    nombre : req.body.nombre,
    codigo : req.body.codigo,
    salario : req.body.salario,
    creado_por : req.body.creado_por
  }
  mysqlConnection.query(sql, empleadoObj, (err, rows, fields) => {
    if(!err) {
      res.json({status: 'Empleado Agregado'});
    } else {
      console.log(err);
    }
  });
});

// UPDATE EMPLEADO
router.put('/empleados/:id', (req, res) => {
  const { id } = req.params;
  const { nombre, codigo, salario, creado_por} = req.body;
  const sql = `UPDATE empleados SET nombre = '${nombre}', codigo = '${codigo}', salario = '${salario}', 
  creado_por = '${creado_por}' WHERE id = ${id} `;

  mysqlConnection.query(sql, (err, rows, fields) => {
    if(!err) {
      res.json({status: 'Empleado Actualizado'});
    } else {
      console.log(err);
    }
  });
});

module.exports = router;