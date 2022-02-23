import NextAuth from "next-auth"
import EmailProvider from "next-auth/providers/email";
import SequelizeAdapter,  { models }  from "@next-auth/sequelize-adapter"
import { Sequelize, DataTypes } from "sequelize"
const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: 'database.sqlite'
})
export default NextAuth({
  debug: true,
    adapter: SequelizeAdapter(sequelize, {
      synchronize: true,
      models: {
      User: sequelize.define("user", {
        ...models.User,
        phoneNumber: DataTypes.STRING,
      }),
    },
    }),
    providers: [
        EmailProvider({
          server: {
            host: "127.0.0.1",
            auth: null,
            secure: false,
            port: 1025,
            tls: { rejectUnauthorized: false },
          },
        }),
    ],
    secret: process.env.NEXTAUTH_SECRET,
    session: {
        strategy: "database"
    }
})
