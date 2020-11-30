const md5 = require('md5');
const jwt = require('jsonwebtoken');

require('dotenv').config();


const user_auths = require('../db/database').user_auths;



exports.PostLoginUser = async (req, res) => {

    let email = (req.body.email).trim();
    let password = md5((req.body.password).trim());


    user_auths.findOne({ email: `${email}`, password: `${password}` }, async (err, result) => {
        if (err) return res.status(400);
        if (!result) {
            res.status(400).json({
                message: "Invalid"
            })
        }
        else {
            let data = {
                "email": result.email,
                "_id": result._id
            };
            let Token = generateAccessToken(data);
            let refreshToken = jwt.sign(data, process.env.SECRET_KEY_FOR_REFRESH_TOKEN);
            await user_auths.findByIdAndUpdate({ _id: result._id }, { refreshToken: refreshToken }, (err, result1) => {
                if (err) return res.status(400);

            })
            res.status(200).json({
                "access-token": Token,
                "refresh-token": refreshToken
            });


        }
    });

}





exports.PostSignupUser = async (req, res) => {
    let name = (req.body.name).trim();
    let email = (req.body.email).trim();
    let password = md5((req.body.password).trim());


    user_auths.findOne({ email: `${email}` }, async (err, result) => {
        if (err) return res.status(400);
        if (result) {
            res.status(400).json({
                message: "Invalid"
            })
        }
        else {
            let newUser = new user_auths({ name: `${name}`, email: `${email}`, password: `${password}` });
            await newUser.save((err, result1) => {
                if (err) throw err;
                res.status(200).json({
                    message: "Account Created Successfully"
                })
            })
        }
    });

}


let generateAccessToken = (data) => {
    return jwt.sign(data, process.env.SECRET_KEY_FOR_ACCESS_TOKEN, { expiresIn: '10s' });
}

exports.getToken = async (req, res) => {
    const refreshToken = req.body.token;
    if (refreshToken == null) return res.status(400);

    await jwt.verify(refreshToken, process.env.SECRET_KEY_FOR_REFRESH_TOKEN, (error, decode) => {
        if (error) {
            res.status(500);
        }
        else {
            let id = decode._id;
            user_auths.findById({ _id: id }, (err, result) => {
                if (err) return res.status(400);
                else {
                    if (refreshToken !== result.refreshToken) {
                        res.status(400);
                    }
                    else {
                        let data = {
                            "email": result.email,
                            "_id": result._id
                        };
                        let newAccessToken = generateAccessToken(data);
                        res.status(200).json({
                            "access-token": newAccessToken
                        })
                    }

                }
            })
        }

    })
}




exports.DeleteLogoutUser = async (req, res) => {
    user_auths.findByIdAndUpdate({ _id: req.user }, { $unset: { refreshToken: 1 } }, (err, result) => {
        if (err) {
            res.status(400);
        }
        else{
            if(!result){
                res.status(400);
            }
            else{
                res.status(200).json({
                    message : "Logout Successfully"
                })
            }
        }
    })



}