import User from "../models/user.js";


const signUp = async (req, res) => {
    const {name,  email, password,confirmPassword, language ,role } = req.body; 
    if (confirmPassword !== password) return res.status(404).json({ msg: "Password not matches" })

    console.log(req.body);
    
    try {
        const exists = await User.findOne({email});
        if(exists){
            return res.status(403).json({msg:"Email Already in Use Try Another"});
        }
        const lower = language.toLowerCase();
        console.log(lower);
        const user = await User.create({ name, email, password,language : lower, role});
        
        const token = user.createJWT();
        return res.status(200).json({ name: user.name, userId: user._id, token, language : user.language});
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({ msg: "Internal Server Error" })
    }
}


const signIn = async (req, res) => {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
        return res.status(202).json({ msg: "Invalid Email" });
    }
    const isCorrect = await user.comparePassword(password);
    if (!isCorrect) {
       return res.status(202).json({ msg: "Invalid Credentials" });
    } 
    const token = user.createJWT();
    return res.status(200).json({ name: user.name, userId: user._id, token, language : user.language});
}


const userDetails = async(req,res) => {
    const {userId} = req.user;
    try{
        const user = await User.findOne({_id : userId});
        return res.status(202).json({name : user.name, language : user.language, score : user.score , badge : user.badge, testsCompleted : user.testsCompleted, role : user.role})
    }
    catch(error){
        console.log(error.message);
        return res.status(500).json({msg : 'internal server error'})
    }
}

const updateDetails = async(req,res) => {
    const {userId} = req.user;

    // will use same endpoint to update user's language or reset his/her progress

    const {lang, reset} = req.body;

    try{
        let updatedUser;
        if(lang){
          updatedUser =  await User.findOneAndUpdate({_id : userId}, {language : lang.toLowerCase()}, {new : true});
        }
        else{
            updatedUser = await User.findOneAndUpdate({_id : userId}, {score : 0, testsCompleted: 0, badge : null}, {new : true});
        }
        
        return res.status(202).json({msg : "Profile updated successfully", updatedUser})
    }
    catch(error){
        console.log(error.message);
        return res.status(500).json({msg : 'internal server error'})
    }
}


export { signUp,signIn, userDetails, updateDetails};

