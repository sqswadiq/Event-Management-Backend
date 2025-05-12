const users = require('../model/userModel')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')


exports.addUserController = async (req, res) => {
    console.log("inside addUserController");

    const { userName, email, password, } = req.body
    console.log(userName, email, password);


    try {
        const existingUser = await users.findOne({ email })
        if (existingUser) {
            res.status(406).json("User Already Exist")
        }
        else {
            const encryptedPass = await bcrypt.hash(password, 10)
            const newUser = new users({ userName, email, password: encryptedPass, phoneNo: "" })
            await newUser.save()
            res.status(200).json(newUser)
        }
    } catch (error) {
        res.status(401).json(error)
    }
}
exports.loginUserController = async (req, res) => {
    console.log("inside loginUserController");

    const { email, password } = req.body
    console.log(email, password);


    try {
        const existingUser = await users.findOne({ email })

        if (existingUser) {
            console.log(existingUser);
            // login to admin with plain password)
            if (existingUser.role == 'admin' && password == 'admin123') {
                const token = jwt.sign({ userId: existingUser._id }, process.env.JWT_PASSWORD);
                console.log("Admin loggined suuccessfully");
                return res.status(200).json({ token, user: existingUser });
            }
            const passMatch = await bcrypt.compare(password, existingUser.password)
            if (passMatch) {
                console.log(passMatch, "password ok");

                const token = jwt.sign({ userId: existingUser._id }, process.env.JWT_PASSWORD)
                console.log(token);

                res.status(200).json({ token, user: existingUser })
            }
            else {

                res.status(404).json("invalid username or password")
            }
        }
        else {

            res.status(404).json("invalid username or password")
        }
    } catch (error) {
        res.status(401).json(error)
    }
}
exports.getUserController = async (req, res) => {
    console.log("inside getUserController");

    const { userId } = req.params;

    try {
        const existingUser = await users.findById(userId)

        if (existingUser) {
            res.status(200).json(existingUser);
        } else {
            res.status(404).json("User not found");
        }

    } catch (error) {
        console.error("Error in getUserController:", error);
        res.status(500).json(error);
    }
};
exports.updateUserController = async (req, res) => {
    console.log("inside updateUserController");
    const { userId } = req.params
    const { userName, email, phoneNo } = req.body;

    try {
        const existingUser = await users.findById(userId)

        if (!existingUser) {
            res.status(404).json("User Not Found")
        }

        // update fields
        existingUser.userName = userName || existingUser.userName
        existingUser.email = email || existingUser.email
        existingUser.phoneNo = phoneNo ? phoneNo : ""


        await existingUser.save()
        res.status(200).json(existingUser)
    } catch (error) {
        res.status(401).json(error)

    }

}

exports.getAllUserController = async (req, res) => {
    console.log("inside getAllUserController");

    try {
        const allUsers = await users.find({ role: "user" })
        res.status(200).json(allUsers)
    } catch (error) {
        res.status(401).json(error)
    }
}
exports.deleteUserController = async (req, res) => {
    console.log("inside deleteUserController");

    const { userId } = req.params

    try {
        const deletedUser = await users.findByIdAndDelete(userId)

        if (!deletedUser) {
            res.status(404).json({ message: "User not found" })
        }
        res.status(200).json(deletedUser)
    } catch (error) {
        res.status(401).json(error)
    }

}

exports.changePasswordController = async (req, res) => {
    console.log("inside changepasswordController");

    const { userId, oldPassword, newPassword, confirmNewPassword } = req.body;
    try {
        const user = await users.findById(userId)
        if (!user) {
            return res.status(404).json("User not found");
        }

        // Compare the old password with the password in DB
        const isMatch=await bcrypt.compare(oldPassword,user.password)
        if (!isMatch) {
            return res.status(401).json("Old password is incorrect");
        }

        // Check  newPassword and confirmNewPassword 
        if (newPassword !== confirmNewPassword) {
            return res.status(400).json("New passwords do not match");
        }

        const hashedPassword=await bcrypt.hash(newPassword,10)

        user.password=hashedPassword
        await user.save()
        res.status(200).json("Password changed Successfully")

    } catch (error) {
        res.status(500).json(error)
    }

}
