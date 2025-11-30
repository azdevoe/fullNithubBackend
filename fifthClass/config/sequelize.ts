import { Sequelize } from "sequelize"
export const sequelize = new Sequelize('fifthClass','postgres','Devbodegram@gmail8',{
    host:'localhost',
    dialect:'postgres',
    logging: true
})