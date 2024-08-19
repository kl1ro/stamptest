import {PrismaClient} from "@prisma/client"
const prisma = globalThis.prisma || new PrismaClient()
if(process.env.STATUS == "production") globalThis.prisma = prisma
export default prisma