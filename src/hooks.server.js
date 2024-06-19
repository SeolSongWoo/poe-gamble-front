import {redirect} from "@sveltejs/kit";

/** @type {import('@sveltejs/kit').Handle} */
export async function handle({ event, resolve }) {
    const token = event.cookies.get('Authorization');
    const authPassURL = ['/register', '/login','/']
    if(authPassURL.includes(event.url.pathname)) {
        return resolve(event);
    }

    if (!token) {
        throw redirect(302, '/login');
    }

    const response = await resolve(event);
    return response;
}

/** @type {import('@sveltejs/kit').HandleServerError} */
export async function handleError({ error, event }) {
    // 에러 핸들링 로직을 여기에 추가할 수 있습니다.
    console.error('Error occurred during request:', error);
    return {
        message: 'An error occurred',
        status: error.status || 500,
    };
}