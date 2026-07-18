const form = document.getElementById("contactForm");

const setInvalid = (field, on) => {
    field.closest(".field").classList.toggle("invalid", on);
};

form.addEventListener("submit", async function (e) {

    e.preventDefault();

    let ok = true;

    const required = form.querySelectorAll("[required]");

    required.forEach((f) => {

        const empty = !f.value.trim();

        const badEmail =
            f.type === "email" &&
            f.value &&
            !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(f.value);

        const invalid = empty || badEmail;

        setInvalid(f, invalid);

        if (invalid) ok = false;

    });

    if (!ok) {
        const firstBad = form.querySelector(".field.invalid input, .field.invalid select, .field.invalid textarea");
        if (firstBad) firstBad.focus();
        return;
    }

    const formData = new FormData(form);

    try {

        const response = await fetch("send-mail.php", {
            method: "POST",
            body: formData
        });

        const result = (await response.text()).trim();

        if (result === "success") {

            form.reset();

            const success = document.getElementById("formSuccess");

            success.style.display = "block";

            setTimeout(() => {
                success.style.display = "none";
            }, 5000);

        }

    } catch (err) {
        console.error(err);
    }

});

form.querySelectorAll("[required]").forEach((f) => {
    f.addEventListener("input", () => {
        setInvalid(f, false);
    });
});