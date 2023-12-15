import axios from "@/axios";

export async function fetchPosts(fetch = false, authToken){
    if (!fetch)
        return;

    try {
        const response = await axios.get('/publication-api/posts', {
            headers: {
                Authorization: `Token ${authToken}`,
            }
        });

        return response;
    } catch (error){
        console.error('error fetching user posts: ', error);
        throw error;
    }
}