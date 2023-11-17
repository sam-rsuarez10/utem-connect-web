import axios from "@/axios";

export async function fetchUserConnections(fetch = false, authToken){
    if (!fetch)
        return;

    try {
        const response = await axios.get('/connect-api/connections', {
            headers: {
                Authorization: `Token ${authToken}`,
            }
        });

        return response;
    } catch (error) {
        console.error('error fetching user connections: ', error);
        throw error;
    }
};