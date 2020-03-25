const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Creando el esquema trabajos
const PacienteSchema = new Schema({
    nombre: {
        type: String,
        trim: true,
        required: true
    },
    telefono: {
        type: String,
        trim: true
    },
    sintomas: {
        type: String,
        trim: true
    }
});

module.exports = mongoose.model("Paciente", PacienteSchema);

