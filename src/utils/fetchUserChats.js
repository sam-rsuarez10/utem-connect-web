import axios from "@/axios";

export async function fetchUserChats(fetch = false, authToken){
    if (!fetch)
        return;

    try {
        const response = await axios.get('/chat-api/chats', {
            headers: {
                Authorization: `Token ${authToken}`,
            }
        });

        return response;
    } catch (error) {
        console.error('error fetching user chats: ', error);
        throw error;
    }
};