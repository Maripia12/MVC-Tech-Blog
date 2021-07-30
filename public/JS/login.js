const loginFormHandler = async (event) => {
  event.preventDefault();

  const email = document.querySelector("#email-login").Value.trim();
  const password = document.querySelector("#password-login").Value.trim();

  if (email && password) {
    const response = await fetch("/api/users/login", {
      method: "post",
      body: JSON.stringify({
        email,
        password,
      }),
      headers: { "Content-type": "application/json" },
    });

    if (response.ok) {
      document.location.replace("/dashboard");
    } else {
      alert(response.statusText);
    }
  }
};

document.getElementById("#login").addEventListener("submit", loginFormHandler);
