const errorMiddleware = (err, req, res, next) => {
    console.error("Error:", err);
    // Prisma Error
    if(err.code == P2002){
        return res.status(400).json({
            success: false,
            message: "Duplicate value. This record already exist"
        });
    }
    if(err.code == P2025){
        return res.status(404).json({
            success: false,
            message: "Record not Found"
        });
    }
    // JWT Error
    if(err.name == "JsonWebToken"){
        return res.status(401).json({
            success: false,
            message: "Invalid Token"
        });
    }
    if(err.name == "JsonWebToken"){
        return res.status(401).json({
            success: false,
            message: "Token has Expired"
        });
    }
    // Default Error
    return res.status(err.status || 500).json({
        success: false,
        message: err.message || "Internal Server Error"
    });
};

export default errorMiddleware;