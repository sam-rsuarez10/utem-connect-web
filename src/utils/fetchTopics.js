import axios from '@/axios';

export async function fetchTopics(fetch = false) {
    if (!fetch) {
        return; // Exit early if fetch is false
    }

    try {
        const response = await axios.get('http://127.0.0.1:8000/learning-api/topics', {
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