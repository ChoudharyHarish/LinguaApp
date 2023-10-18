import mongoose from "mongoose";
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';


const badgeSchema = new mongoose.Schema({
    name: String,     // NoviceArtisto ApprenticeSketcher MasterDoodler ArtisticProdigy GrandCartoonist
    icon: String,     
  });

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    language : {
        type : String,
        default : 'English',
    },
    badge : badgeSchema,
    testsCompleted : {
        type :Number,
        default:0
    },
    role: {
        type: String,
        default: "user",
        enum: ["user", "admin"],
    },
})


UserSchema.pre('save', async function () {
    const salt = await bcrypt.genSalt(10)
    this.password = await bcrypt.hash(this.password, salt)
  })



UserSchema.methods.createJWT = function () {
    return jwt.sign({ userId: this._id, name : this.name, role : this.role }, process.env.JWT_SECRET, { expiresIn: '1h' });
}

UserSchema.methods.comparePassword = async function (candidatePassword) {
    const isMatch = await bcrypt.compare(candidatePassword, this.password)
    return isMatch;
  }



const User = new mongoose.model('User',UserSchema);
export default User;