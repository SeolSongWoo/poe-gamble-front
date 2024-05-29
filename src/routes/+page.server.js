import APIService from "../service/APIService.js";

/** @type {import('./$types').PageServerLoad} */
export async function load({ request }) {
    const inventoryData = await APIService.getUserCards();
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