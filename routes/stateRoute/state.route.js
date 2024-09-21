const express = require('express');
const router = express.Router();
const {createState,getState,getStatusState} = require('../../controller/stateController/state.contoller');

/////////////////////////////   Create a new State  //////////////////////////////

router.post('/state', createState);

////////////////////////////////  Get all State //////////////////////////////////

router.get('/', getState);

////////////////////////////////  Get status State //////////////////////////////////

router.put('/:id/status', getStatusState);



module.exports = router;
