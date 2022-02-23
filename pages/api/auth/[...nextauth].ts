import NextAuth from "next-auth"
import EmailProvider from "next-auth/providers/email";
import SequelizeAdapter,  { models }  from "@next-auth/sequelize-adapter"
import { Sequelize, DataTypes } from "sequelize"
import type { NextApiRequest, NextApiResponse } from "next"

const sequelize = new Sequelize("sqlite::memory:")

export default async function auth(req: NextApiRequest, res: NextApiResponse) {
  return await NextAuth(req, res, {

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
}
