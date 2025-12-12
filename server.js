'use strict';
const express     = require('express');
const bodyParser  = require('body-parser');
const fccTesting  = require('./freeCodeCamp/fcctesting.js');
const app         = express();
const bcrypt = require('bcrypt');
const cors = require('cors');
app.use(cors());

fccTesting(app);
const saltRounds = 12;
const myPlaintextPassword = 'sUperpassw0rd!';
const someOtherPlaintextPassword = 'pass123';

//START_ASYNC
bcrypt.hash(myPlaintextPassword, saltRounds, (err, hash) => {
  if (err) {
    console.error(err);
  } else {
    console.log("Hash generado:", hash);

    // Comparar la contraseña correcta
    bcrypt.compare(myPlaintextPassword, hash, (err, res) => {
      if (err) console.error(err);
      else console.log("Comparación con contraseña correcta:", res); // true
    });

    // Comparar con otra contraseña
    bcrypt.compare(someOtherPlaintextPassword, hash, (err, res) => {
      if (err) console.error(err);
      else console.log("Comparación con contraseña incorrecta:", res); // false
    });
  }
});
//END_ASYNC

//START_SYNC
try {
  // Generar hash sincrónico
  const hashSync = bcrypt.hashSync(myPlaintextPassword, saltRounds);
  console.log("Hash sincrónico generado:", hashSync);

  // Comparar la misma contraseña → true
  const resultTrue = bcrypt.compareSync(myPlaintextPassword, hashSync);
  console.log("Comparación sincrónica con contraseña correcta:", resultTrue); // true

  // Comparar otra contraseña → false
  const resultFalse = bcrypt.compareSync(someOtherPlaintextPassword, hashSync);
  console.log("Comparación sincrónica con contraseña incorrecta:", resultFalse); // false

} catch (err) {
  console.error(err);
}
//END_SYNC

const PORT = process.env.PORT || 5000;
app.listen(PORT, '0.0.0.0', () => {
    console.log("Listening on port:", PORT)
});
