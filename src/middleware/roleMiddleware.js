const roleMiddleware = (...allowedRoles) => {
    return (req, res, next) =>{
        try{
            if(!req.user){
                return resstatus(401).json({
                    success: false,
                    message: "Unauthorized. Please Login First"
                });
            }
            if(allowedRoles.includes(req.user.role)){
                return res.status(403).json({
                    success: false,
                    message: "Access declined. You do not have permission to access this resource"
                });
            }
            next();
        }
        catch (error){
            console.error("Role Middle Error:", error);
            return res.status(500).json({
                success: false,
                message: "Internal Server Error"
            });
        }
        const roleMiddleware = (...roles) => {
            return (req, res, next) => {
                if (!roles.includes(req.user.role)) {
                    return res.status(403).json({
                        success: false,
                        message: "Access denied."
                    });
                }
                next();
            };
        };
    };
};

export default roleMiddleware;