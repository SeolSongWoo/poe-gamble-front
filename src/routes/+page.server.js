import APIService from "../service/APIService.js";

/** @type {import('./$types').PageServerLoad} */
export async function load({cookies, request }) {
    const inventoryData = await APIService.getUserCards(cookies.get('Authorization'));
    console.log(inventoryData);
    if (inventoryData instanceof Error) {
        return {
            status: 500,
            alert: inventoryData
        };
    }else {
        return inventoryData;
    }
}