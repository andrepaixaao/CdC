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

router.get('/GetFuncao', function(req, res, next){
  cartaoDiagnosticoDAO.getFuncao(function(err,result){
    if (err) {
        res.statusMessage=result.status;
        res.status(result.code).json(err);
        return;
    }
    res.status(result.code).send(result.data);
},next)
});

router.get('/GetSetorAtividade', function(req, res, next){
  cartaoDiagnosticoDAO.getSetorAtividade(function(err,result){
    if (err) {
        res.statusMessage=result.status;
        res.status(result.code).json(err);
        return;
    }
    res.status(result.code).send(result.data);
},next)
});


router.get('/GetTipoPatologia', function(req, res, next){
  cartaoDiagnosticoDAO.getTipoPatologia(function(err,result){
    if (err) {
        res.statusMessage=result.status;
        res.status(result.code).json(err);
        return;
    }
    res.status(result.code).send(result.data);
},next)
});


router.get('/GetPatologia/:id', function(req, res, next){
  cartaoDiagnosticoDAO.getPatologia(req.params.id,function(err,result){
    if (err) {
        res.statusMessage=result.status;
        res.status(result.code).json(err);
        return;
    }
    res.status(result.code).send(result.data);
},next)
});


router.get('/NewSintoma/:id', function(req, res, next){
  cartaoDiagnosticoDAO.newSintoma(req.params.id,function(err,result){
    if (err) {
        res.statusMessage=result.status;
        res.status(result.code).json(err);
        return;
    }
    res.status(result.code).send(result.data);
},next)
});

router.get('/GetSintoma/:id', function(req, res, next){
  cartaoDiagnosticoDAO.getPatologiaEspecifica(req.params.id,function(err,result){
    if (err) {
        res.statusMessage=result.status;
        res.status(result.code).json(err);
        return;
    }
    res.status(result.code).send(result.data);
},next)
});


router.get('/NewTarefa/:id', function(req, res, next){
  cartaoDiagnosticoDAO.newTarefa(req.params.id,function(err,result){
    if (err) {
        res.statusMessage=result.status;
        res.status(result.code).json(err);
        return;
    }
    res.status(result.code).send(result.data);
},next)
});

router.get('/GetSintomas', function(req, res, next){
  cartaoDiagnosticoDAO.getSintomas(function(err,result){
    if (err) {
        res.statusMessage=result.status;
        res.status(result.code).json(err);
        return;
    }
    res.status(result.code).send(result.data);
},next)
});

router.get('/GetTarefas', function(req, res, next){
  cartaoDiagnosticoDAO.getTarefas(function(err,result){
    if (err) {
        res.statusMessage=result.status;
        res.status(result.code).json(err);
        return;
    }
    res.status(result.code).send(result.data);
},next)
});





module.exports = router;