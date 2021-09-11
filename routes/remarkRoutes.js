const express = require('express');
const remarkController = require('../controllers/remarkController');
const router = express.Router();

router.get('/', remarkController.remark_index);
router.post('/create', remarkController.remark_create_post);
router.get('/create', remarkController.remark_creat_get);
router.get('/:id', remarkController.remark_details);
router.delete('/:id', remarkController.remark_delete);



module. exports = router;