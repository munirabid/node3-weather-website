fetch("http://localhost:3000/weather?address=paris").then((response) => {
  response.json().then((data) => {
    if (data.error) {
      console.log(data.error);
      return;
    }
    console.log(data);
  });
});

const weatherForm = document.querySelector("form");
const search = document.querySelector("input");
const message1 = document.querySelector("#message1");
const message2 = document.querySelector("#message2");
weatherForm.addEventListener("submit", (e) => {
  e.preventDefault();
  message1.textContent = "Loading";
  message2.textContent = "";

  const location = search.value;
  fetch("/weather?address=" + location + "").then((response) => {
    response.json().then((data) => {
      if (data.error) {
        console.log(data.error);
        message1.textContent = data.error;
        return;
      }
      message1.textContent = data.location;
      message2.textContent = data.response;
    });
  });
});
