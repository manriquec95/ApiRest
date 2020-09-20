const express = require('express');
const bodyParser = require('body-parser');
const router = express.Router();
const mysqlConnection  = require('../database.js');

router.use(bodyParser.json());

// GET FACTURA ID CLIENTE
router.get('/clientes/:id/facturas', (req, res) => {
  const { cliente_id } = req.params; 
  mysqlConnection.query('SELECT * FROM facturas WHERE cliente_id = ?', [cliente_id], (err, rows, fields) => {
    if(!err) {
      res.json(rows);
    } else {
      console.log(err);
    }
  });  
});

// GET FACTURA ID EMPLEADO
router.get('/empleados/:id/facturas', (req, res) => {
  const{empleado_id} = req.params;
    mysqlConnection.query('SELECT * FROM facturas WHERE empleado_id', [empleado_id], (err, rows, fields) => {
      if(!err) {
        res.json(rows);
      } else {
        console.log(err);
      }
    });  
  });

// GET FACTURA POR ID
router.get('/facturas/:id', (req, res) => {
  const { id } = req.params; 
  mysqlConnection.query('SELECT * FROM facturas WHERE id = ?', [id], (err, rows, fields) => {
    if (!err) {
      res.json(rows[0]);
    } else {
      console.log(err);
    }
  });
});

// DELETE FACTURAS
router.delete('/facturas/:id', (req, res) => {
  const { id } = req.params;
  mysqlConnection.query('DELETE FROM facturas WHERE id = ?', [id], (err, rows, fields) => {
    if(!err) {
      res.json({status: 'Factura Eliminada'});
    } else {
      console.log(err);
    }
  });
});

// INSERT FACTURA
router.post('/facturas', (req, res) => {
  const sql = 'INSERT INTO facturas SET ?';
  const facturaObj={
    cliente_id : req.body.cliente_id,
    empleado_id : req.body.empleado_id,
    creado : req.body.creado,
    estado : req.body.estado
  }
  mysqlConnection.query(sql, facturaObj, (err, rows, fields) => {
    if(!err) {
      res.json({status: 'Factura Agregada'});
    } else {
      console.log(err);
    }
  });
});

// UPDATE FACTURA
router.put('/facturas/:id', (req, res) => {
  const { id } = req.params;
  const { cliente_id, empleado_id, creado, estado} = req.body;
  const sql = `UPDATE facturas SET cliente_id = '${cliente_id}', empleado_id = '${empleado_id}', 
  creado = '${creado}', estado = '${estado}' WHERE id = ${id} `;

  mysqlConnection.query(sql, (err, rows, fields) => {
    if(!err) {
      res.json({status: 'Factura Actualizada'});
    } else {
      console.log(err);
    }
  });
});

module.exports = router;