import { data } from "./data.js";

document.querySelectorAll("[data-content]").forEach((el) => {
  const path = el.dataset.content.split(".");

  const value = path.reduce((obj, key) => obj?.[key], data);

  el.textContent = value ?? "";
});