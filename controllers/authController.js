const bcrypt=require('bcryptjs')
const jwt=require('jsonwebtoken')
const User= require('../models/User');

exports.register =async(req,res)=>{
    const { name,email,password,role }=req.body;

   try {

    let user =await User.findOne({email});
    if(user) return res.status(400).json({ message: 'User already exists' });
    
    const salt=await bcrypt.genSalt(10);
    const hashedPassword=await bcrypt.hash(password,salt);

        // Create user
        user = new User({ name, email, password: hashedPassword, role });
        await user.save();

        res.status(201).json({ message: 'User registered successfully' });
    
   } catch (error) {
    res.status(500).json({ message: 'Server Error', error });
   } 

    
}

exports.login= async(req,res)=>{
    const {email,password}=req.body;
    try {
        let user =await User.findOne({email});
        if(!user) return res.status(400).json({message:"User not Found"});
    
        const matchPass= await bcrypt.compare(password, user.password);
        if(!matchPass) return res.status(400).json({message:"Wrong Password"});
    
        const payload={id:user._id,role:user.role};
        const token=jwt.sign(payload,process.env.JWT_SECRET,{expiresIn:'1h'});
        res.status(200).json({token});
    } catch (error) {
        res.status(500).json({ message: 'Server Error', error });
    }
 
}