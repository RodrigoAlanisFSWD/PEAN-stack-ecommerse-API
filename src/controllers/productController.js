import prisma from '../database/prisma';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

module.exports = {
    createBreakPoint: async (req,res) => {
        try {
            const { name, price, count, category } = req.body;

            await prisma.product.create({
                data: {
                    name: name,
                    price: price,
                    count: count,
                    price: price,
                    categoryId: category
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
            const data = await prisma.product.findMany({
                include: {
                    category: {
                        select: {
                            name: true
                        }
                    }
                },
            });

            if (data.length == 0) {
                return res.json({
                    res: true,
                    auth: true,
                    data: "Not Products Available"
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
    getOneBreakPoint: async (req,res) => {
        try {
            const data = await prisma.product.findUnique({
                where: {
                    id: parseInt(req.params.id)
                },
                include: {
                    category: {
                        select: {
                            name: true
                        }
                    }
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
    deleteBreakPoint: async (req,res) => {
        try {
            const data = await prisma.product.delete({
                where: {
                    id: parseInt(req.params.id)
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
                data: "Product Deleted!"
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
  searchBreakPoint: async (req,res) => {
    try {
      const data = await prisma.product.findMany({
        where: {
          name: {
            contains: req.params.search
          }
        }
      })
      
      return res.json({
        res: true,
        auth: true,
        data
      })
    } catch (err) {
      console.log(err)
      return res.json({
        res: false,
        auth: true,
        data: "Error"
      })
    }
  }
}
