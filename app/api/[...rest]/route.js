import {NextRequest, NextResponse} from "next/server"
import pluralToSingular from "@/libs/pluralToSingular"
import prisma from "@/libs/prisma"

/**
 * @param {NextRequest} req
*/
export async function GET(req) {
	try {
		const tokens = req.nextUrl.pathname.slice(1).split("/")
		const model = pluralToSingular(tokens[1])
		const id = Number(tokens[2])
		const include = req.nextUrl.searchParams.get("include")?.split(",").map(s => s.trim()).reduce((o, i) => ({...o, [i]: true}), {})
		if(!id) return NextResponse.json(await prisma[model].findMany({include, orderBy: {id: "asc"}}))
		else return NextResponse.json(await prisma[model].findFirst({where: {id}, orderBy: {id: "asc"}}))
	}
	catch(e) {
		console.log(e.message)
		return INTERNAL_SERVER_ERROR
	}
}

/**
 * @param {NextRequest} req
*/
export async function POST(req) {
	try {
		const input = await req.json()
		const tokens = req.nextUrl.pathname.slice(1).split("/")
		const model = pluralToSingular(tokens[1])
		return NextResponse.json(await prisma[model].create({data: input}))
	}
	catch(e) {
		console.log(e.message)
		if(e.message == "Cannot read properties of undefined (reading 'create')")
			return NextResponse.json({error: "The specified model doesn't exist"}, {status: 400})
		return INTERNAL_SERVER_ERROR
	}
}

/**
 * @param {NextRequest} req
*/
export async function PATCH(req) {
	try {
		const input = await req.json()
		const tokens = req.nextUrl.pathname.slice(1).split("/")
		const model = pluralToSingular(tokens[1])
		const id = Number(tokens[2])
		return NextResponse.json(await prisma[model].update({where: {id}, data: input}))
	}
	catch(e) {
		console.log(e.message)
		return INTERNAL_SERVER_ERROR
	}
}

/**
 * @param {NextRequest} req
*/
export async function DELETE(req) {
	try {
		const tokens = req.nextUrl.pathname.slice(1).split("/")
		const model = pluralToSingular(tokens[1])
		const id = Number(tokens[2])
		await prisma[model].delete({where: {id}})
		return NextResponse.json({message: "Deleted"})
	}
	catch(e) {
		console.log(e.message)
		return INTERNAL_SERVER_ERROR
	}
}

export const WRONG_METHOD = NextResponse.json({error: "Wrong method"}, {status: 405})
export const INTERNAL_SERVER_ERROR = NextResponse.json({error: "Internal server error"}, {status: 500})