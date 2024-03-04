document.getElementById('button').addEventListener('click',async (e)=>{
    e.preventDefault();
    const email = document.getElementById('emailId').value;
    const password = document.getElementById('password').value;
   try{
    const result = await axios.post("http://localhost:3000/login",{email,password});
    if(result.data.success===true){
        alert("Successfully logged in");
        localStorage.setItem('token',result.data.token);
        console.log(result.data.token);
        window.location.href="/home";
    }
   }catch(e){
        alert(e);
   }
})