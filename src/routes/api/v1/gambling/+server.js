import APIService from "../../../../service/APIService.js";

/** @type {import('./$types').RequestHandler} */
export async function POST({ request }) {
    const response = await APIService.postTryGambling(await request.json());

    if (response instanceof Error) {
        return new Response(null, { status: 500 });
    } else {
        return new Response(JSON.stringify(response),{status: 200})
    }
}