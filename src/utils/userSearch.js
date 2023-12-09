import axios from "@/axios";

export async function searchUsers(firstname, lastname, search, 
    career, keywords, authToken) {

    try {
        let endpoint = `/connect-api/search?`;

        // query params construction
        if (firstname && lastname)
            endpoint += `name=${firstname}&lastname=${lastname}`;

        else if (search)
            endpoint += `search=${search}`;

        if (career)
            endpoint +=`&career=${career}`;

        if (keywords)
            endpoint += `&keywords=${keywords}`;

        const response = await axios.get(endpoint, {
            headers: {
                Authorization: `Token ${authToken}`,
            }
        });

        return response;
    } catch (error) {
        console.error('error fetching user info: ', error);
        throw error;
    }

}