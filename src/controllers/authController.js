import prisma from '../database/prisma';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

module.exports = {
    signInBreakPoint: async (req,res) => {
        try {
            const { name,username,email,password } = req.body;
            const salt = await bcrypt.genSalt(10);
            const hash = await bcrypt.hash(password, salt);
            const user = await prisma.user.create({
                data: {
                    name: name,
                    username: username,
                    email: email,
                    password: hash
                }
            });

            const token = jwt.sign({id: user.id},'secret',{
                expiresIn: 60 * 60 * 60 * 24
            });
            
            return res.json({
                res: true,
                auth: true,
                token: token    
            });
        } catch (error) {
            return res.json({
                res: false,
                auth: false,
                token: false    
            });
        }
    },
    logInBreakPoint: async (req,res) => {
        try {
            const { email,password } = req.body;
            const user = await prisma.user.findFirst({
                where: {
                    email: email
                }
            })

            const verify = bcrypt.compare(password, user.password);

            if (!verify) {
                return res.json({
                    res: false,
                    auth: false,
                    token: false    
                });
            }

            const token = jwt.sign({id: user.id},'secret',{
                expiresIn: 60 * 60 * 60 * 24
            });
            
            return res.json({
                res: true,
                auth: true,
                token: token    
            });
        } catch (error) {
            return res.json({
                res: false,
                auth: false,
                token: false    
            });
        }
    },
}