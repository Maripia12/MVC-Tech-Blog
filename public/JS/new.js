const postFormHandler = async (event) => {
  event.preventDefault();

  const title = document.querySelector('input[name="post-title"]').value;
  const body = document.querySelector('textarea[name="post-body"]').value;

  console.log(title);

  fetch("/api/post", {
    method: "post",
    body: JSON.stringify({
      title,
      body
    }),
    headers: { "Content-type": "application/json" },
  })
    .then(function () {
      document.location.replace("/dashboard");
    })
    .catch((err) => console.log(err));
};

document.querySelector("#new-post").addEventListener("submit", postFormHandler);
