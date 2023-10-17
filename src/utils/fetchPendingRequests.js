import axios from "@/axios";

export async function fetchPendingRequests(fetch = false, authToken) {

    if (!fetch)
        return;

    try {
        const response = await axios.get('/connect-api/pending-requests', {
            headers: {
                Authorization: `Token ${authToken}`,
            }
        });

        return response;
    } catch (error) {
        console.error('error fetching pending requests: ', error);
        throw error;
    }

}