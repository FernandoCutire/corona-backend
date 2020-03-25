// Servidor en express
const express = require("express");
const app = express();
const port = process.env.PORT || 9000;

// BODY PARSER
const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// import CORS
const cors = require("cors");
app.use(cors());


// Importar el modelo Paciente
const Paciente = require("../models/Paciente");

// CRUD
app.get("/", (req, res) => {
  res.send("SERVER");
});

// ---- Obtener todos los objetos en la coleccion pacientes
app.get("/pacientes", (req, res) => {
  Paciente.find()
    .then(item => res.status(200).send({ mensaje: "Get exitoso", res: item }))
    .catch(err => res.send("Error en get"));
});

// ---- Obtener una paciente segun su ID
app.get("/pacientes/:id", (req, res) => {
  Paciente.findById(req.params.id)
    .then(item => {
      item
        ? res.status(200).send({ mensaje: "GetById exitoso", res: item })
        : res.status(404).send({ mensaje: "No Encontrado", res: item });
    })
    .catch(err => res.status(409).send("Error en getById"));
});

// ----- Crear un objeto paciente y guardar en db
app.post("/crear/paciente", (req, res) => {
  console.log(req.body);
  const nuevaPelicula = new Paciente(req.body);
  nuevaPelicula.save((err, paciente) => {
    return err
      ? res.status(400).send("Hay un error")
      : res.status(200).send({ mensaje: "Paciente creada", res: paciente });
  });
});

// ---- Encontrar y Actualizar el objeto en db
app.put("/update/paciente/:id", (req, res) => {
  const idPelicula = req.params.id;
  // Metodo Find id + update
  Paciente.findByIdAndUpdate(idPelicula, { $set: req.body }, { new: true })
    .then(UpdatePelicula => res.status(200).send(UpdatePelicula))
    .catch(UpdatePelicula => res.status(400).send(UpdatePelicula));
});

// ---- Encontrar y remover objetos
app.delete("/borrar/paciente/:id", (req, res) => {
  Paciente.findByIdAndRemove(req.params.id)
    .then(DeletePelicula => res.status(200).send(DeletePelicula))
    .catch(DeletePelicula => res.status(400).send(DeletePelicula));
});



module.exports = { app, port };
