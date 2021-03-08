import prisma from '../database/prisma';

module.exports = async (req,res,next) => {
    const user = await prisma.user.findUnique({
        where: {
            id: req.user
        }
    })

    if (user.role !== "ADMIN") {
        return res.json({
            res: true,
            auth: false,
            admin: false,
            data: 'NOT ADMIN'            
        })
    }

    next();
}