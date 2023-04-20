const bcrypt = require("bcrypt");
const { User, Sequelize, sequelize } = require("../../../models");
module.exports = async (req, res) => {
    const name = req.body.name;
    const profession = req.body.profession;
    const avatar = req.body.avatar;
    const role = req.body.role;
    const email = req.body.email;
    const password = req.body.password;
    if (!req.body.email || email.length <= 0) {
        return res.status(400).json({ status: "error", message: "email cannot null" });
    } else {
        const findUser = await User.findOne({
            attribute: ["email"],
            where: {
                email: email,
            },
        });
        if (!req.body.role || role.length <= 0) {
            return res.status(400).json({ status: "error", message: "role cannot null" });
        } else if (role !== "admin" && role !== "student") {
            return res.status(400).json({ status: "error", message: "invalid role" });
        } else if (!req.body.name || name.length <= 0) {
            return res.status(400).json({ status: "error", message: "name cannot null" });
        } else if (findUser) {
            return res.status(400).json({ status: "error", message: "Email is registered" });
        } else if (!req.body.password || password.length <= 0) {
            return res.status(400).json({ status: "error", message: "password cannot null" });
        } else {
            const specialCharRegex = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/;
            let containChar, containNumber, containUpper;
            containNumber = /\d/.test(password);
            containChar = specialCharRegex.test(password);
            containUpper = /[A-Z]/.test(password);
            if (!containNumber) {
                return res.status(400).json({ status: "error", message: "password must have number" });
            } else if (!containChar) {
                return res.status(400).json({ status: "error", message: "password must have character" });
            } else if (!containUpper) {
                return res.status(400).json({ status: "error", message: "password must have Upper case" });
            }
            const newUser = {
                name: name,
                role: role,
                avatar: avatar,
                profession: profession,
                email: email,
                password: bcrypt.hashSync(password, 15),
            };
            User.create(newUser).then((user) => {
                return res.json({ status: "success", message: "register success" });
            })
            .catch((error) => {
                console.log("gagal register")
                return res.status(400).json({ status: "error", message: "register failed" });
            });
        }
    }
};
