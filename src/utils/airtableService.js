// Function to create a record in Airtable using fetch API
export const createRecord = async (tableName, recordData) => {
    const airtableApiUrl = `https://api.airtable.com/v0/${import.meta.env.VITE_AIRTABLE_BASE_ID}`;
    const apiKey = import.meta.env.VITE_AIRTABLE_API_KEY;

    // Debugging: Check if the values are correct
    console.log('Airtable API URL:', airtableApiUrl);
    console.log('API Key:', apiKey);
    
    try {
        const response = await fetch(`${airtableApiUrl}/${tableName}`, {
            method: 'POST',
            headers: {
                Authorization: `Bearer ${apiKey}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                fields: recordData, // This will include the record data
            }),
        });

        // Log the response for debugging
        const responseBody = await response.json();
        console.log('Response:', responseBody);

        if (!response.ok) {
            // If there's an error, throw with error message
            throw new Error(`Failed to create record: ${responseBody.error.message}`);
        }

        return responseBody; // Return the full response data
    } catch (error) {
        console.error('Error creating record:', error);
        throw error;
    }
};
