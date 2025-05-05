const User = require('../models/user.js');
const jwt = require('jsonwebtoken');


const authenticationMid = async (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;

        if (!authHeader || !authHeader.startsWith("Bearer ")) {
            return res.status(401).json({ message: "Yetki hatası: Token gönderilmemiş veya hatalı formatta." });
        }

        const token = authHeader.split(" ")[1];
        const decodedData = jwt.verify(token, "SECRETTOKEN");

        if (!decodedData) {
            return res.status(401).json({ message: "Token doğrulanamadı." });
        }

        req.user = await User.findById(decodedData.id);
        if (!req.user) {
            return res.status(404).json({ message: "Kullanıcı bulunamadı." });
        }

        next();
    } catch (error) {
        let errorMessage = "Sunucu hatası oluştu.";
        
        if (error.name === "JsonWebTokenError") {
            errorMessage = "Token geçersiz.";
        } else if (error.name === "TokenExpiredError") {
            errorMessage = "Token süresi dolmuş.";
        }

        return res.status(401).json({ message: errorMessage, error: error.message });
    }
}


const roleChecked = (...roles) => {
    return(req,res,next) => {
        if (!roles.includes(req.user.role)) {
            return res.status(500).json({message: "Giriş İzniniz Bulunmamaktadır!"})   
        }
        next();
    }
}

module.exports = {authenticationMid, roleChecked}