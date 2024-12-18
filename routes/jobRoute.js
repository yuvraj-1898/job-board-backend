const {postJob,getJobDetails,getAllJobs} =require("../controllers/jobController");

const express=require("express");
const authMiddleware = require("../middleware/authMiddleware");

const router=express.Router();

router.post('/postJob',authMiddleware,postJob);
router.post('/getJobDetails/:id',authMiddleware,getJobDetails);
router.get('/getAllJobs',authMiddleware,getAllJobs);


module.exports=router;