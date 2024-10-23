const baseUrl = 'http://localhost:9892/googlePlace';


export const search = async (keyword: string | undefined) => {
    if (!keyword) {
        throw new Error("Keyword is required for the API call.");
    }

    const response = await fetch(baseUrl+'/search',{
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({keyword: keyword}),
    });

    if (!response.ok) {
        throw new Error('Failed to fetch places');
    }

    const data = await response.json();
    return data.candidates[0];
};

