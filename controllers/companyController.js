const Company= require("../models/Company");


exports.createCompany=async(req,res)=>{
  
        const {name,description,industry,location,website,logo}=req.body;

        try {
            const company = new Company({
              name,
              description,
              industry,
              location,
              website,
              logo,
              createdBy: req.user.id,
            });
        
            await company.save();
            res.status(201).json({ message: 'Company created successfully', company });
          } catch (error) {
            res.status(500).json({ message: 'Error creating company', error: error.message });
          }
} 

exports.getCompanydetails=async(req,res)=>{
    try {
        const company = await Company.findById(req.params.id);
        if (!company) return res.status(404).json({ message: 'Company not found' });
        res.status(200).json({ company });
      } catch (error) {
        res.status(500).json({ message: 'Error fetching company', error: error.message });
      }
}