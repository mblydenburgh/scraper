const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const NoteSchema = new Schema({
    body: {
        type: String
    }
});

module.exports = mongoose.model("Note",NoteSchema);