const express = require('express');
const app = express();

app.use(express.json());

const dbconnect = require('./dbconnect.js');
const PersonModel = require('./person_schema.js');

// VIEW OWN PROFILE
app.get('/viewprofile', async (req, res) => {
  try {
    const email = req.headers['x-user-email'];

    const user = await PersonModel.findOne({ email: email });
    if (!user) {
      return res.status(404).send({ message: 'User not found' });
    }
    res.status(200).send(user);

  } catch (err) {
    res.status(500).send({ message: err.message });
  }
});

// UPDATE OWN PROFILE
app.put('/updateprofile', async (req, res) => {
  try {
    const email = req.headers['x-user-email'];

    const updatedUser = await PersonModel.findOneAndUpdate(
      { email: email },
      { $set: req.body },
      { new: true }
    );

    if (!updatedUser) {
      return res.status(404).send({ message: 'User not found' });
    }
    res.status(200).send({ message: 'Profile updated successfully', user: updatedUser });

  } catch (err) {
    res.status(500).send({ message: err.message });
  }
});

// START THE EXPRESS SERVER
app.listen(5003, () =>
  console.log('User Service Started at Port No: 5003'));