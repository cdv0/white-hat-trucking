import { data } from "./data.js";



document.querySelectorAll("[data-content]").forEach((el) => {
  const path = el.dataset.content.split(".");

  const value = path.reduce((obj, key) => obj?.[key], data);

  el.textContent = value ?? "";
});



const featuresList = document.querySelector("#features-list");

featuresList.innerHTML = data.about.table
  .map((feature, index) => `
    <div class="feature">
      <span class="feature-number">
        ${String(index + 1).padStart(2, "0")}
      </span>

      <div class="feature-content">
        <h4 style="text-transform: uppercase; font-weight: 400;">${feature.label}</h4>
        <p class="subtext">${feature.subtext}</p>
      </div>
    </div>
  `)
  .join("");