getPhones();

// Lấy data từ API
function getPhones(searchValue) {
    getPhoneAPI(searchValue)
        .then(response => {
            // gọi API thành công
            const phones = response.data.map(phone => {
                return new Phone(
                    phone.id,
                    phone.name,
                    phone.price,
                    phone.screen,
                    phone.backCamera,
                    phone.frontCamera,
                    phone.img,
                    phone.desc,
                    phone.type
                );
            });

            renderPhones(phones);
        })
        .catch(error => {
            // gọi API thất bại
            // alert("Failed to get API");
        });
}

// Hiển thị danh sách phone ra table
function renderPhones(phones) {
    let html = phones.reduce((result, phone, index) => {
        return (result +
            `
            <tr>
                <td>${index + 1}</td>
                <td>${phone.name}</td>
                <td>${phone.price.toLocaleString()}</td>
                <td><img src=${phone.img} with="70" height="70"/></td>
                <td>${phone.desc}</td>
                <td>
                    <button class="btn btn-primary btnEdit">Edit<i class="fa-regular fa-pen-to-square ml-2"></i></i></button>
                    <button class="btn btn-danger btnDelete">Delete<i class="fa-regular fa-trash-can ml-2"></i></button>
                </td>
            </tr>
            `
        );
    }, "")

    getEle("#phoneList").innerHTML = html;
}


// DOM
// Tìm sản phẩm dựa theo tên
getEle("#txtSearch").addEventListener("keydown", e => {
    // console.log(e);
    if (e.key !== "Enter") return;

    const searchValue = e.target.value;
    getPhones(searchValue);
})

getEle("#btnOpenForm").addEventListener("click", () => {
    // khi click mở form thì ẩn nút Update
    getEle("#btnUpdate").style.display = "none";
})
























// HELPERS
function getEle(selector) {
    return document.querySelector(selector);
}