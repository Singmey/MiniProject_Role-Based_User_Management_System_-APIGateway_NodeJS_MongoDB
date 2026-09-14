const schema_mongoose = require('mongoose');

const PersonSchema = schema_mongoose.Schema(
    {
        name: { type: String },
        email: { type: String },
        password: { type: String },
        phone: { type: Number },
        role: { type: String }
    }, 
    {
        timestamps: true
    }
    );

module.exports = schema_mongoose.model('person_collection', PersonSchema);