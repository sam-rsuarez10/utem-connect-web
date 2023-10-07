import axios from '@/axios';

export async function fetchTopics(fetch = false) {
    if (!fetch) {
        return;
    }

    try {
        const response = await axios.get('/learning-api/topics', {
            headers: {
                Authorization: 'Token a66f357220a8f88926712f4837ae2e6ddf291376',
            },
        });
        return response.data;
    } catch (error) {
        console.error('Error fetching topics:', error);
        throw error;
    }
}