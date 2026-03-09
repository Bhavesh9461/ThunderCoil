import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const userSchema = new mongoose.Schema({
    fullName: {
        type: String,
        required: [true, "Full Name is required."]
    },
    email: {
        type: String,
        required: [true, "Email is required."],
        unique: [true, "Email exists already try another."]
    },
    password:{
        type: String,
        required: [true, "Password is required."],
        minlength: 6
    },
    bio: {
        type: String,
        default: "",
    },
    profilePic: {
        type: String,
        default: ""
    },
    nativeLanguage: {
        type: String,
        default: ""
    },
    learningLanguage: {
        type: String,
        default: ""
    },
    location: {
        type: String,
        default: ""
    },
    isOnboarded:{
        type: Boolean,
        default: false
    },

    friends: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
        }
    ]
}, {timestamps:true})
//createdAt, updatedAt


/**
 * @hook pre hook
 * @description it is used to hash password in Schema
 */
userSchema.pre("save", async function() {

    if(!this.isModified("password")) return

    try {
        const salt = await bcrypt.genSalt(10)
        this.password = await bcrypt.hash(this.password, salt)
    } catch (error) {
        console.log(error);
    }
})


/**
 * @description used to compare password at login
 * @way for create a method you have to do like -> userSchema.methods.<methodName>
 */
userSchema.methods.matchPassword = async function (enteredPassword){
    const isPasswordCorrect = await bcrypt.compare(enteredPassword, this.password)
    return isPasswordCorrect;
}

const User = mongoose.model("User", userSchema)

export default User