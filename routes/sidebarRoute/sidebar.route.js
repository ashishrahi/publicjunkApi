const express = require('express');
const router = express.Router();
const {updateSidebar,getSidebarById,createSidebars,getSidebars,updateSidebarStatus,inactiveSidebarStatus, activeSidebarStatus}= require('../../controller/sidebarController/sidebar.controller')

//------------Create a new sidebar

router.post('/create',createSidebars)

//-------------get Sidebars

router.get('/',getSidebars)

//------------- details of Sidebars

router.get('/:id',getSidebarById)


router.put('/:id',updateSidebar)


//-------------get status
router.put('/:id/status',updateSidebarStatus)

router.get('/status/true',activeSidebarStatus)

router.get('/status/false',inactiveSidebarStatus)

module.exports = router;