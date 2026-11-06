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




const servicesList = document.querySelector("#services-list");

servicesList.innerHTML = data.services
  .map((service, index) => `
    <div class="service">
      <img src="./truck.svg" width="32px" height="32px"/>
      <div class="service-content">
        <h3 style="text-transform: uppercase;">${service.label}</h4>
        <p class="subtext">${service.text}</p>
      </div>
    </div>
  `)
  .join("");




const form = document.querySelector("#contact-form");
const textarea = form.querySelector("textarea");
const charCount = form.querySelector(".char-count");
const toast = document.querySelector("#toast");
const submitButton = document.querySelector('button[form="contact-form"][type="submit"]');
const clearButton = document.querySelector('button[form="contact-form"][type="reset"]');

let toastTimeout;

textarea.addEventListener("input", () => {
    charCount.textContent = `${textarea.value.length}/300`;
});

form.addEventListener("reset", () => {
    charCount.textContent = "0/300";
});

form.addEventListener("submit", async (event) => {
    event.preventDefault();

    submitButton.disabled = true;
    clearButton.disabled = true;
    submitButton.textContent = "SENDING...";

    try {
        const response = await fetch(form.action, {
            method: "POST",
            body: new FormData(form),
            headers: {
                "Accept": "application/json"
            }
        });

        if (!response.ok) {
            throw new Error("Submission failed");
        }

        form.reset();
        showToast("Your message has been sent successfully!");
    } catch (error) {
        console.error(error);
        showToast("Failed to send message. Please try again.");
    } finally {
        submitButton.disabled = false;
        clearButton.disabled = false;
        submitButton.textContent = "SUBMIT";
    }
});

function showToast(message) {
    clearTimeout(toastTimeout);

    toast.textContent = message;
    toast.classList.add("show");

    toastTimeout = setTimeout(() => {
        toast.classList.remove("show");
    }, 3000);
}
