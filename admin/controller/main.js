getPhones();

// Lấy data từ server
function getPhones(searchValue) {
    getPhoneAPI(searchValue)
        .then(response => {
            // console.log(response);
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
            console.log("Failed to get data");
        });
}


// Xóa data bên server
function deletePhones(phoneId) {
    // khi click vào nút Delete thì sẽ hiển thị alert thông báo xác nhận có muốn xóa data không
    // sử dụng thư viện SweetAlert2
    Swal.fire({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!'
    })
        .then(result => {
            // console.log(result);
            // data sẽ chỉ được xóa khi và chỉ khi user click nút confirm (Yes, delete it!)
            if (result.isConfirmed) {
                deletePhoneAPI(phoneId)
                    .then(() => {
                        // update lại danh sách sau khi xóa
                        getPhones();
                        // sẽ hiển thị thông báo xác nhận xóa thành công
                        Swal.fire(
                            'Deleted!',
                            'Your data has been deleted.',
                            'success'
                        )
                    })
                    .catch(error => {
                        console.log("Failed to delete data");
                    });
            }
        })
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
                <td><img src=${phone.img} with="100px" height="100px" alt="phone img"/></td>
                <td>${phone.desc}</td>
                <td>
                    <button class="btn btn-primary btn__edit">Edit<i class="fa-regular fa-pen-to-square ml-2"></i></i></button>
                    <button class="btn btn-danger btn__delete ml-2" id="btnDelete" onclick="deletePhones(${phone.id})">Delete<i class="fa-regular fa-trash-can ml-2"></i></button>
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

    const searchVal = e.target.value;
    getPhones(searchVal);
})

getEle("#btnOpenForm").addEventListener("click", () => {
    // khi click mở form thì ẩn nút Update
    getEle("#btnUpdate").style.display = "none";
})


// HELPERS
function getEle(selector) {
    return document.querySelector(selector);
}