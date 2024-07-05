const express = require('express');
const router = express.Router();
const {registerKarigar,getkarigars,getKarigar,createKarigarProduct}= require('../../controller/karigarController/karigar.controller')
    
//Register
router.post('/karigar',registerKarigar)
//karigar with category
router.post('/karigar_product',createKarigarProduct)

//get Karigar
router.get('/',getkarigars)
//Logout
router.get('/:id',getKarigar)







module.exports = router;
