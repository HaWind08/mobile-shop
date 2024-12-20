// update quantity in cart
const inputQuantity = document.querySelectorAll("input[name='quantity']");
if(inputQuantity.length > 0) {
    inputQuantity.forEach(input => {
        input.addEventListener("change", () => {
            const productId = input.getAttribute("product-id");
            const quantity = input.value;

            window.location.href = `/cart/update/${productId}/${quantity}`;
        });
    });
}

// end update quantity in cart