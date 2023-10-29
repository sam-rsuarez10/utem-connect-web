import axios from "@/axios";

export async function fetchUserInfo(fetch = false, username, authToken) {

    if (!fetch)
        return;

    try {
        const response = await axios.get('/user-api/user-info/' + username, {
            headers: {
                Authorization: 'Token ' + authToken,
            },
        });

        return response;
    } catch (error) {
        console.error('error fetching user info: ', error);
        throw error;
    }
}
