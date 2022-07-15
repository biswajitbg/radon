const collegeModel = require('../model/collegeModel');
const internModel = require('../model/internModel');

const keyValid = function (value) {
    if (typeof value === "undefined" || value === null) return false;
    return true;
};

const createCollege = async function (req, res) {
    try {
        let data = req.body
        if (!Object.keys(data).length) {
            return res.status(400).send({ status: false, msg: "Write something in body" })
        }
        let { name, fullName, logoLink } = data;
        //<!----------------Abbrv name Regex-------------------------->
        if (!keyValid(data.name)) return res.status(400).send({ status: false, message: "Please enter abbrv of college" })
        name = /^[a-zA-Z.]{2,10}$/.test(data.name)
        let duplicateAbbrv = await collegeModel.findOne({ name: data.name })
        if (duplicateAbbrv) return res.status(400).send({ status: false, msg: "College Abbrv Already Exist." })

        if (!name) {
            res.status(400).send({ msg: "Please enter alphabets only for abbrv and maximum legth should be 10" })
        }
        //<!-----------------Full name Regex------------------------->        
        if (!keyValid(data.fullName)) return res.status(400).send({ status: false, message: "Please enter full name of college" })
        fullName = /^[A-Za-z_ ]{2,50}$/.test(data.fullName)
        if (!fullName) {
            res.status(400).send({ msg: "Please enter alphabets only for full name of college and maximum length should be 50" })
        }
        //<!-----------------Logolink Regex------------------------->        
        if (!keyValid(data.logoLink)) return res.status(400).send({ status: false, message: "Please enter valid logo link" })
        logoLink = /^(http(s?):)([/|.|\w|\s|-])*\.(?:jpeg|png)$/.test(data.logoLink)
        if (!logoLink) {
            res.status(400).send({ msg: "Please enter valid logo link" })
        }
        let savedCollege = await collegeModel.create(data)
        { res.status(201).send({ status: true, message: savedCollege }) }
    }
    catch (err) {
        res.status(500).send({ msg: err.message })
    }
}
module.exports.createCollege = createCollege

// // //<!-------------------------------Create Intern API---------------------------------------------------->
const createIntern = async function (req, res) {
    try {
        let data = req.body;
        if (!Object.keys(data).length) {
            return res.status(400).send({ status: false, msg: "Write something in body" })
        }
        if (!data.name)
            return res.status(400).send({ status: false, message: "Please provide  your name" })
        if (!/^[a-zA-Z_ ]+$/.test(data.name))
            return res.status(400).send({ msg: "wrong format of name" })

        if (!data.email)
            return res.status(400).send({ status: false, msg: "Please provide email" })
        email = /^[A-Za-z0-9_]{3,}@[A-Za-z]{3,}[.]{1}[A-Za-z.]{2,6}$/.test(data.email)
        if (!email)
            res.status(400).send({ msg: "Please enter valid format of email" })
        let checkEmail = await internModel.find({ email: data.email })
        if (checkEmail.length)
            return res.status(400).send({ msg: "Email already exists" })

        if (!data.mobile)
            return res.status(400).send({ status: false, msg: "Plese enter mobile number" })
        mobile = /^[6,9]\d{9}$/.test(data.mobile);
        if (!mobile)
            res.status(400).send({ msg: "Please enter valid format of mobile" })
        let checkMobile = await internModel.find({ mobile: data.mobile })
        if (checkMobile.length)
            return res.status(400).send({ msg: "Mobile already exists" })

        let checkCollegeId = await collegeModel.findOne({name:data.collegeName})
            if (!checkCollegeId) {
                return res.status(400).send({status:false, message:"college not found"})
            }
    
        req.body.collegeId = checkCollegeId._id;

        let createIntern = await internModel.create(data)
        res.status(201).send({ status: true, data: createIntern })
    }
    catch (err) {
        console.log(err)
        res.status(500).send({ msg: err.message })
    }
}
module.exports.createIntern = createIntern
// //<!-----------------------------Get College Details------------------------------------>
const getCollegeDetails = async (req, res) => {
    try {
        let collegeName = req.query.collegeName;
        if (!collegeName) {
            return res.status(400).send({ status: false, message: "college name not entered" })
        }
        let collegeDetail = await collegeModel.findOne({ name: collegeName, isDeleted: false });
        if (!collegeDetail) {
            return res.status(400).send({ status: false, message: "no details for such college" })
        }
        let internDetails = await internModel.find({ collegeId: collegeDetail._id, isDeleted: false }).select({ _id: 1, name: 1, email: 1, mobile: 1 })

        if (internDetails.length == 0) {
            return res.status(400).send({ status: false, message: "no interns found" });
        }
        let finalDetail = {};
        finalDetail.name = collegeDetail.name;
        finalDetail.fullName = collegeDetail.fullName;
        finalDetail.logoLink = collegeDetail.logoLink;
        finalDetail.interns = internDetails

        res.status(200).send({ status: true, data: finalDetail })
    } catch (err) {
        res.status(500).send({ status: false, message: err.message })
    }
}
module.exports.getCollegeDetails = getCollegeDetails