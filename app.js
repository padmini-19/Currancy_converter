const BASE_URL =
"https://latest.currency-api.pages.dev/v1/currencies";
const dropdowns = document.querySelectorAll(".dropdown select");
const btn = document.querySelector("form button");
const fromCurr = document.querySelector(".from select");
const toCurr = document.querySelector(".to select");
const msg = document.querySelector(".msg");

  for(let select of dropdowns){
    for(let codes in countryList){
        let newoption = document.createElement("option");
        newoption.innerText = codes;
        newoption.value = codes;
        if (select.name === "from" && codes === "USD") {
      newoption.selected = "selected";
    } else if (select.name === "to" && codes === "INR") {
      newoption.selected = "selected";
    }
        select.append(newoption);
    }
    select.addEventListener("change", (element) => {
  updateFlag(element.target);
});
}
const updateExchangeRate = async () => {
  let amount = document.querySelector(".amount input");
  let amtVal = amount.value;

  if (amtVal === "" || amtVal < 1) {
    amtVal = 1;
    amount.value = "1";
  }

  const URL = `${BASE_URL}/${fromCurr.value.toLowerCase()}.json`;

  let response = await fetch(URL);
  let data = await response.json();

  let rate = data[fromCurr.value.toLowerCase()][toCurr.value.toLowerCase()];

  let finalAmount = (amtVal * rate).toFixed(2);

  msg.innerText =
    `${amtVal} ${fromCurr.value} = ${finalAmount} ${toCurr.value}`;
};


const updateFlag = (element) => {
  let currCode = element.value;
  let countryCode = countryList[currCode];
  let newSrc = `https://flagsapi.com/${countryCode}/flat/64.png`;
  let img = element.parentElement.querySelector("img");
  img.src = newSrc;
};

btn.addEventListener("click", (evt) => {
  evt.preventDefault();
  updateExchangeRate();
});

window.addEventListener("load", () => {
  updateExchangeRate();
});


