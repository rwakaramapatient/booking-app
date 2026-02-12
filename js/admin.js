const form = document.querySelector("#serviceForm");
const nameInput = document.querySelector("#serviceName");
const priceInput = document.querySelector("#servicePrice");
const listEl = document.querySelector("#serviceList");

function getServices() {
  return JSON.parse(localStorage.getItem("services")) || [];
}

function saveServices(services) {
  localStorage.setItem("services", JSON.stringify(services));
}

function render() {
  const services = getServices();
  listEl.innerHTML = "";

  for (const s of services) {
    const li = document.createElement("li");
    li.textContent = `${s.name} — ${s.price} RWF`;
    listEl.appendChild(li);
  }
}

form.addEventListener("submit", (e) => {
  e.preventDefault();

  const name = nameInput.value.trim();
  const price = Number(priceInput.value);

  if (!name) return;

  const services = getServices();
  services.push({ id: Date.now(), name, price });
  saveServices(services);

  form.reset();
  render();
});

render();
