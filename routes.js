const express = require('express');
const router = express.Router();
// Set Route for Home
router.get('/searchPatient', function(req, res, next) {
  res.render('views/home/searchPatient.html');
});
module.exports = router;
