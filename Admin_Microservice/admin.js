const express = require('express');
const app = express();

const dbconnect = require('./dbconnect.js');
const PersonModel = require('./person_schema.js');

/* 
{ "email": "admin@gmail.com",
  "password": "987654",
  "role": "admin"
}
*/

app.get('/searchuser', async (req, res) => {
    try {
    const { query } = req.query; 

    const user = await PersonModel.findOne({
        $or: [
            { name: { $regex: query, $options: 'i' } },
            { email: { $regex: query, $options: 'i' } }
        ]
    });

    if (!user) {
        return res.status(404).send({ message: 'User not found' });
    }
    res.status(200).send(user);

    } catch (err) {
        res.status(500).send({ message: err.message });
    }
});

// VIEW ALL API
app.get('/viewalluser', async (req, res) => {
    try {
        const users = await PersonModel.find({});
        res.status(200).send(users);
    } catch (err) {
        res.status(500).send({ message: err.message });
    }
});

// DELETE API - by email
app.delete('/deluser', async (req, res) => {
    try {
        const { email } = req.query; // e.g. /deluser?email=singmey@gmail.com

        const deletedUser = await PersonModel.findOneAndDelete({ email: email });

        if (!deletedUser) {
            return res.status(404).send({ message: 'User not found' });
        }
        res.status(200).send({ message: 'User deleted successfully' });

    } catch (err) {
        res.status(500).send({ message: err.message });
    }
});

// START THE EXPRESS SERVER. 5004 is the PORT NUMBER
app.listen(5004, () =>
    console.log('EXPRESS Server Started at Port No: 5004'));


