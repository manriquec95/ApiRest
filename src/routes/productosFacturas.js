const express = require('express');
const bodyParser = require('body-parser');
const router = express.Router();
const mysqlConnection  = require('../database.js');

router.use(bodyParser.json());

// GET PRODUCTO
router.get('/facturas/:id/productos', (req, res) => {
  const {producto_id} = req.params;
  mysqlConnection.query('SELECT * FROM productos_factura WHERE producto_id = ?', [producto_id], (err, rows, fields) => {
    if(!err) {
      res.json(rows);
    } else {
      console.log(err);
    }
  });  
});


// DELETE PRODUCTO
router.delete('/facturas/:id/detalle?id_producto', (req, res) => {
  const { producto_id } = req.params;
  mysqlConnection.query('DELETE FROM productos_factura WHERE producto_id = ?', [producto_id], (err, rows, fields) => {
    if(!err) {
      res.json({status: 'Producto Eliminado'});
    } else {
      console.log(err);
    }
  });
});

// INSERT PRODUCTO
router.post('/facturas/:id/detalle', (req, res) => {
  const sql = 'INSERT INTO productos_factura SET ?';
  const prodfacObj={
    producto_id : req.body.producto_id,
    factura_id : req.body.factura_id,
    cantidad : req.body.cantidad,
    subtotal : req.body.subtotal,
    creado_por : req.body.creado_por
  }
  mysqlConnection.query(sql, prodfacObj, (err, rows, fields) => {
    if(!err) {
      res.json({status: 'Producto Agregado'});
    } else {
      console.log(err);
    }
  });
});


module.exports = router;