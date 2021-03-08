import prisma from '../database/prisma';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

module.exports = {
    createBreakPoint: async (req,res) => {
        try {
            const { name } = req.body;

            await prisma.category.create({
                data: {
                    name: name,
                }
            })

            return res.json({
                res: true,
                auth: true,
                admin: true,
                data: "Created!"
            })
        } catch (error) {
            console.log(error);
            return res.json({
                res: false,
                auth: true,
                admin: true,
                data: "Error"
            })
        }
    },
    getAllBreakPoint: async (req,res) => {
        try {
            const data = await prisma.category.findMany();

            if (data.length == 0) {
                return res.json({
                    res: true,
                    auth: true,
                    data: "Not Categories Available"
                });
            }

            return res.json({
                res: true,
                auth: true,
                admin: true,
                data: data
            })
        } catch (error) {
            console.log(error);
            return res.json({
                res: false,
                auth: true,
                admin: true,
                data: "Error"
            })
        }
    },
    getPdsBreakPoint: async (req,res) => {
        try {
            const data = await prisma.category.findUnique({
                where: {
                    id: parseInt(req.params.id)
                },
                include: {
                    Product: true
                },
            });

            if (!data) {
                return res.json({
                    res: true,
                    auth: true,
                    data: "Not Product With The Id " + req.params.id
                });
            }

            return res.json({
                res: true,
                auth: true,
                data,
            });
        } catch (error) {
            console.log(error);
            return res.json({
                res: false,
                auth: true,
                data: "Error"
            })
        }
    },
}