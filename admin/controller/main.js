// Lấy data từ server & hiển thị danh sách ngay sau khi mở web
getPhones();


// Lấy data từ server
async function getPhones(searchVal) {
    try {
        const { data: phones } = await getPhoneAPI(searchVal);
        console.log(phones);
        renderPhones(phones);
    } catch (error) {
        // gọi API thất bại
        console.log("Failed to get data", error);
    }
}


// Tạo data mới cho server
getEle("#btnAdd").addEventListener("click", async () => {
    // khởi tạo object với các thuộc tính chứa giá trị user nhập vào
    const phone = {
        name: getEle("#name").value,
        price: getEle("#price").value,
        screen: getEle("#screen").value,
        backCamera: getEle("#bCam").value,
        frontCamera: getEle("#fCam").value,
        img: getEle("#img").value,
        desc: getEle("#desc").value,
        type: getEle("#type").value
    }

    try {
        // gửi request tạo data mới cho server
        await generatePhoneAPI(phone);
        // update lại danh sách sau khi tạo mới
        getPhones();
        // hiển thị thông báo tạo mới thành công
        Swal.fire({
            position: 'top-end',
            icon: 'success',
            title: 'New data has been created',
            showConfirmButton: false,
            timer: 1500
        });
    } catch (error) {
        console.log("Failed to add new data", error);
    }
})


// Xóa data bên server
async function deletePhones(phoneId) {
    try {
        // khi click vào nút Delete thì sẽ hiển thị alert thông báo xác nhận có muốn xóa data không
        // sử dụng thư viện SweetAlert2 & gán thuộc tính isConfirmed cho biến result
        const { isConfirmed: result } = await Swal.fire({
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
            Swal.fire({
                position: 'top-end',
                icon: 'success',
                title: 'Your data has been deleted',
                showConfirmButton: false,
                timer: 1500
            });
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
                <td class="text-center">${phone.id}</td>
                <td>${phone.name}</td>
                <td class="text-center">${phone.price.toLocaleString()}</td>
                <td class="text-center"><img src=${phone.img} with="150px" height="150px" alt="phone img"/></td>
                <td>${phone.desc}</td>
                <td class="text-center">
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