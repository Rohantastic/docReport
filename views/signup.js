document.getElementById('button').addEventListener('click', async (e) => {
    e.preventDefault();
    const name = document.getElementById('name').value;
    const password = document.getElementById('password').value;
    const aadhar = document.getElementById('aadhar').value;
    const email = document.getElementById('email').value;
    const phone = document.getElementById('phone').value;
    const checkbox = document.getElementById('is-doctor').checked;
    console.log('checkbox',checkbox);
    document.getElementById('name').value = "";
    document.getElementById('password').value = "";
    document.getElementById('aadhar').value = "";
    document.getElementById('email').value = "";
    document.getElementById('phone').value = "";
    
    try {
        console.log("signup page");
        const response = await axios.post("http://localhost:3000/signup", { name, password, aadhar, email, phone,checkbox});
        if (response.data.success == true) {
            console.log("signed up");
            window.location.href = "/login";
        }
    } catch (e) {
        console.log(e)
    }
});

document.getElementById('redirectToLogin').addEventListener('click', (e) => {
    e.preventDefault();

    window.location.href = "/login";
})