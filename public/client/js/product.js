
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