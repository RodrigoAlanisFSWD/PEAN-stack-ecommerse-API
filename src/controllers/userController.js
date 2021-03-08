import prisma from '../database/prisma';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

module.exports = {
    profileBreakPoint: async (req,res) => {
        try {
            const user = await prisma.user.findUnique({
                where: {
                    id: req.user
                },
                select: {
                    name: true,
                    username: true,
                    email: true,
                    role: true
                }
            });

            return res.json({
                res: true,
                auth: true,
                data: user
            })
        } catch (error) {
            console.log(error);
            return res.json({
                res: false,
                auth: true,
                data: "Error"
            })
        }
    }
}