import APIService from "../../service/APIService.js";
import {error, redirect} from "@sveltejs/kit";

/** @type {import('./$types').PageServerLoad} */
export async function load({cookies, request }) {
    const apiService = new APIService(cookies);
    const response = await apiService.getUserCards();
    if(!response || response.status === 500) {
        throw error(500, {
            message: 'SERVER ERROR!!!'
        })
    }else if(response.body.status === 401) {
        redirect(302, '/login');
    }

    return response.body;
}
