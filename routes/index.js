var express = require('express');
var router = express.Router();
var cartaoDiagnosticoDAO = require("../models/cartaoDiagnosticoDAO");

router.get('/GetGenero', function(req, res, next){
    cartaoDiagnosticoDAO.getGenero(function(err,result){
      if (err) {
          res.statusMessage=result.status;
          res.status(result.code).json(err);
          return;
      }
      res.status(result.code).send(result.data);
  },next)
});


router.get('/GetHabilitacao', function(req, res, next){
  cartaoDiagnosticoDAO.getHabilitacao(function(err,result){
    if (err) {
        res.statusMessage=result.status;
        res.status(result.code).json(err);
        return;
    }
    res.status(result.code).send(result.data);
},next)
});

router.get('/GetLocalidade', function(req, res, next){
  cartaoDiagnosticoDAO.getLocalidade(function(err,result){
    if (err) {
        res.statusMessage=result.status;
        res.status(result.code).json(err);
        return;
    }
    res.status(result.code).send(result.data);
},next)
});



module.exports = router;