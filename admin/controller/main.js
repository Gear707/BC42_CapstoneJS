// Lấy data từ server & hiển thị danh sách ngay sau khi mở web
getPhones();


// Lấy data từ server
async function getPhones(searchVal) {
    try {
        const {data: phones} = await getPhoneAPI(searchVal);
        console.log(phones);
        renderPhones(phones);
    } catch (error) {
        // gọi API thất bại
        console.log("Failed to get data", error);
    }
}


// Xóa data bên server
async function deletePhones(phoneId) {
    try {
        // khi click vào nút Delete thì sẽ hiển thị alert thông báo xác nhận có muốn xóa data không
        // sử dụng thư viện SweetAlert2 & gán thuộc tính isConfirmed cho biến result
        const {isConfirmed: result} = await Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
        });
        // data sẽ chỉ được xóa khi và chỉ khi user click nút confirm (result === true)
        if (result) {
            // thực hiện xóa data
            await deletePhoneAPI(phoneId);
            // update lại danh sách sau khi xóa
            getPhones();
            // hiển thị thông báo xác nhận xóa thành công
            Swal.fire(
                'Deleted!',
                'Your data has been deleted.',
                'success'
            )
        }
    } catch (error) {
        console.log("Failed to delete data", error);
    }
}


// Hiển thị danh sách phone ra table
function renderPhones(phones) {
    let html = phones.reduce((result, phone) => {
        return (result +
            `
            <tr>
                <td>${phone.id}</td>
                <td>${phone.name}</td>
                <td>${phone.price.toLocaleString()}</td>
                <td><img src=${phone.img} with="100px" height="100px" alt="phone img"/></td>
                <td>${phone.desc}</td>
                <td>
                    <button class="btn btn-primary btn__edit" data-toggle="modal" data-target="#phoneModal">Edit<i class="fa-regular fa-pen-to-square ml-2"></i></i></button>
                    <button class="btn btn-danger btn__delete ml-2" onclick="deletePhones(${phone.id})">Delete<i class="fa-regular fa-trash-can ml-2"></i></button>
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