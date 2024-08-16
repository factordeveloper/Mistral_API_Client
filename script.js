document.getElementById('sendButton').addEventListener('click', function() {
    const prompt = document.getElementById('promptInput').value;
    const apiKey = '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'; // Reemplaza esto con tu clave de API real

    if (prompt.trim() === '') {
        alert('Please enter a prompt.');
        return;
    }

    const url = 'https://api-inference.huggingface.co/models/mistralai/Mistral-Nemo-Instruct-2407/v1/chat/completions';

    const requestBody = {
        model: 'mistralai/Mistral-Nemo-Instruct-2407',
        messages: [
            {
                role: 'user',
                content: prompt
            }
        ],
        max_tokens: 500,
        stream: false
    };

    fetch(url, {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${apiKey}`,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(requestBody)
    })
    .then(response => response.json())
    .then(data => {
        const responseContainer = document.getElementById('responseContainer');
        if (data.error) {
            responseContainer.textContent = `Error: ${data.error.message}`;
        } else {
            // Assuming the response is in data.choices[0].message.content
            responseContainer.textContent = data.choices[0].message.content;
        }
    })
    .catch(error => {
        console.error('Error:', error);
        document.getElementById('responseContainer').textContent = 'Error: ' + error;
    });
});
