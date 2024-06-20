import APIService from "../../../../service/APIService.js";

/** @type {import('./$types').RequestHandler} */
export async function POST({cookies,request}) {
    const apiService = new APIService(cookies);
    const response = await apiService.postTryGambling(await request.json());
    if(!response || response.status === 400) {
        return new Response(null,{status:response.status})
    }
    return new Response(JSON.stringify({data:response.body.data,status: 200}),{status: 200})
}