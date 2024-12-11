
// button stock
const buttonStocks = document.querySelectorAll(".button-stock");
if (buttonStocks) {
    buttonStocks.forEach(button => {
        button.addEventListener("click", (e) => {
            e.preventDefault();
            const input = document.querySelector("input[name='quantity']");
            const action = button.classList.contains("button-left") ? "decrease" : "increase";
            let currentValue = parseInt(input.value) || 1;
            const min = parseInt(input.min) || 1;
            const max = parseInt(input.max) || Infinity;

            if (action === "increase" && currentValue < max) {
                input.value = currentValue + 1;
            } else if (action === "decrease" && currentValue > min) {
                input.value = currentValue - 1;
            };
        });
    });
}
// end button stock

// sort
const sort = document.querySelector("[sort]");
if (sort) {
    let url = new URL(window.location.href);
    const buttonSelect = sort.querySelectorAll("[sort-select]");
    const buttonClear = sort.querySelector("[sort-clear]");

    const currentValue = `${url.searchParams.get("sortKey")}-${url.searchParams.get("sortValue")}`;
    buttonSelect.forEach(button => {
        if (button.getAttribute("data-value") === currentValue) {
            button.classList.add("active");
        }
    });

    buttonSelect.forEach(button => {
        button.addEventListener("click", () => {
            const value = button.getAttribute("data-value")
            const [sortKey, sortValue] = value.split("-");

            url.searchParams.set("sortKey", sortKey);
            url.searchParams.set("sortValue", sortValue);
            window.location.href = url.href;
        });
    });

    buttonClear.addEventListener("click", () => {
        url.searchParams.delete("sortKey");
        url.searchParams.delete("sortValue");
        window.location.href = url.href;
    });
}

// End sort