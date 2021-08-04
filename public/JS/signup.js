const signupFormHandler = async (event) => {
  event.preventDefault();

  const user = document.querySelector("#username-signup");
  const password = document.querySelector("#password-signup");



  const response = await fetch("/api/user", {
    method: "POST",
    body: JSON.stringify({
      username: user.value,
      password: password.value,
    }),
    headers: { "Content-type": "application/json" },
  });

  if (response.ok) {
    document.location.replace("/dashboard");
  } else {
    alert("Failed to sign up");
  }
};

document
  .querySelector("#signup")
  .addEventListener("submit", signupFormHandler);
