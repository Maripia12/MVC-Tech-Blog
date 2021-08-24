const loginFormHandler = async (event) => {
  event.preventDefault();

  const username = document.querySelector("#username-login-input").value;
  const password = document.querySelector("#password-login-input").value;

    console.log(username)
 
     fetch("/api/user/login", {
      method: "post",
      body: JSON.stringify({
        username: username,
        password: password
      }),
      headers: { "Content-type": "application/json" },
    }).then(function(){
      document.location.replace('/dashboard');
     
    }).catch(err => console.log(err));

  
  
};

document
  .querySelector("#login")
  .addEventListener("submit", loginFormHandler);

