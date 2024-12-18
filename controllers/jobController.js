const Job= require("../models/Job");

exports.postJob=async(req,res)=>{
    const { title, description, companyId, location, employmentType, salary } =req.body;

    try {
        const job = new Job({
            title,
            description,
            company: companyId,
            location,
            employmentType,
            salary,
            postedBy: req.user.id,
          });   
          await job.save();
    res.status(201).json({ message: 'Job posted successfully', job });
        
    } catch (error) {
        res.status(500).json({ message: 'Error posting job', error: error.message });
    }
}
exports.getJobDetails=async(req,res)=>{
    const jobId= req.params.id;
    const jobDetails=await Job.findById(jobId);
    if (!jobDetails) return res.status(404).json({ message: 'Job not found' });
    res.status(200).json({ jobDetails });
}
exports.getAllJobs=async(req,res)=>{

    try {
        const allJob=await Job.find();
        res.status(200).json({allJob});
        
    } catch (error) {
        res.status(500).json({ message: 'Error fetching Jobs', error: error.message });
  
}
}