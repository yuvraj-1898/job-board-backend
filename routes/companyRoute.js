const {getCompanydetails,createCompany } = require("../controllers/companyController");
const authMiddleware =require("../middleware/authMiddleware");
const express = require("express");
const router=express.Router();

router.post('/createCompany',authMiddleware,createCompany);
router.get('/getCompanyDetails/:id',authMiddleware,getCompanydetails);

module.exports=router;