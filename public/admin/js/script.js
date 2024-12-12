// Eye login
const eyeOpen = document.querySelector(".eye-loginAdmin");
const eyeClose = document.querySelector(".eye-slash-loginAdmin");
const inputPassAdmin = document.querySelector(".input-pass-admin");

if (eyeClose) {
    eyeClose.addEventListener("click", () => {
        eyeClose.classList.add("hidden");
        eyeOpen.classList.remove("hidden");
        inputPassAdmin.setAttribute("type", "text");
    });
}

if (eyeOpen) {
    eyeOpen.addEventListener("click", () => {
        eyeClose.classList.remove("hidden");
        eyeOpen.classList.add("hidden");
        inputPassAdmin.setAttribute("type", "password");
    });
}
// End Eye login

// Upload Image
const uploadImage = document.querySelector("[upload-image]");
if (uploadImage) {
    const uploadImageInput = document.querySelector("[upload-image-input]");
    const uploadImagePreview = document.querySelector("[upload-image-preview]");

    uploadImageInput.addEventListener("change", (e) => {
        const file = e.target.files[0];
        if (file) {
            uploadImagePreview.src = URL.createObjectURL(file);
        }

        const buttonClose = document.querySelector(".close");
        buttonClose.classList.remove("hidden-close");
        buttonClose.addEventListener("click", () => {
            buttonClose.classList.add("hidden-close");
            uploadImageInput.value = "";
            uploadImagePreview.src = "";
        })
    });
}
// End Upload Image

// Pagination
const buttonsPagination = document.querySelectorAll("[button-pagination]");
buttonsPagination.forEach(button => {
    let url = new URL(window.location.href);

    button.addEventListener("click", () => {
        const page = button.getAttribute("button-pagination");

        url.searchParams.set("page", page);

        window.location.href = url.href;
    })
})
// End Pagination

// Delete Product(Item)
const buttonDelete = document.querySelectorAll("[button-delete]");
if (buttonDelete.length > 0) {
    const formDeleteItem = document.querySelector("#form-delete-item");
    const path = formDeleteItem.getAttribute("data-path");

    buttonDelete.forEach(button => {
        button.addEventListener("click", () => {
            const isConfirm = confirm("Bạn có chắc chắn muốn xóa không?");

            if (isConfirm) {
                const id = button.getAttribute("data-id");

                const action = `${path}/${id}?_method=DELETE`;
                formDeleteItem.action = action

                formDeleteItem.submit();
            }
        });
    })
};
// End Delete Product(Item)
