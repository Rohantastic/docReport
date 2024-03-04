function showAddOptions() {
    document.getElementById('add-options').style.display = 'block';
    document.getElementById('view-all-items').style.display = 'none';
}

function viewAllItems() {
    document.getElementById('add-options').style.display = 'none';
    document.getElementById('view-all-items').style.display = 'block';
    document.getElementById('view-all-items-button').addEventListener('click', async (e) => {
        document.getElementById('add-new-items').style.display = 'none';
        e.preventDefault();
        const config = {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`,
                'Content-Type': 'multipart/form-data'
            }
        }
        try {
            const response = await axios.get("http://localhost:3000/get-reports", config);
            console.log("All reports");
            console.log(response.data.response[0]);
            const list_of_items_div = document.getElementById('list_of_items_div');
            list_of_items_div.innerHTML = '';

            response.data.response.forEach(element => {
                const liElement = document.createElement('li');
                liElement.innerHTML = `
                    <span>${element.reportId}</span> |
                    <img src="/uploads/${element.scan_link}" alt="${element.doctorName} Image" style="width: 50px; height: 50px;"> |
                    <span><span style="color:red; font-weight: bold; font-family: 'Courier New', Courier, monospace;">Doctor:</span>${element.doctorName}</span> |
                    <span><span style="color:red; font-weight: bold; font-family: 'Courier New', Courier, monospace;">Diagnosis:</span>${element.diagnosis}</span> |
                    <span><span style="color:red; font-weight: bold; font-family: 'Courier New', Courier, monospace;">Prescription:</span>${element.prescription}</span>
                    
                `

                list_of_items_div.appendChild(liElement);
            });

        } catch (e) {
            console.log(e);
        }

    });

}

async function addNewDoctorItem() {

    document.getElementById('add-new-items').style.display = 'block';
}


document.getElementById('add-new-items-button').addEventListener('click', async (e) => {
    e.preventDefault();
    const doctorName = document.getElementById('doctor-drop-down').value;
    const diagnosis = document.getElementById('diagnosis').value;
    const prescription = document.getElementById('prescription').value;
    const scanFilesInput = document.getElementById('scan-files');
    const scanFiles = scanFilesInput.files[0];
    const token = localStorage.getItem('token');
    const config = {
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'multipart/form-data'
        }
    }
    try {
        const response = await axios.post("http://localhost:3000/add-new-doctor",
            { doctorName, diagnosis, prescription, scanFiles }, config);

        if (response.data.success === true) {
            alert(`You're ID is: ${response.data.id}`);
        }
    } catch (e) {
        console.log(e);
    }

});


document.getElementById('chatbot-send-button').addEventListener('click',async (e)=>{
    const chat_input = document.getElementById('chat-input').value;

    try{
        const response = await axios.post('http://localhost:3000/chat-bot',{
            chat_input
        });

        const textResponse = response.data.botResponse;
        console.log(textResponse);
    }catch(e){
        console.log(e);
    }
});