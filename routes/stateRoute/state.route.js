const express = require('express');
const router = express.Router();
const {createState,getState,getStatusState,getStateById,updateState} = require('../../controller/stateController/state.contoller');

/////////////////////////////   Create a new State  //////////////////////////////

router.post('/state', createState);

////////////////////////////////  Get State ById //////////////////////////////////

router.get('/:id', getStateById);

////////////////////////////////  update  //////////////////////////////////

router.put('/:id', updateState);

////////////////////////////////  Get all State //////////////////////////////////

router.get('/', getState);

////////////////////////////////  Get status State //////////////////////////////////

router.put('/:id/status', getStatusState);



module.exports = router;
