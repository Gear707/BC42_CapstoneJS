// Lấy data từ server & hiển thị danh sách ngay sau khi mở web
getPhones();


// Lấy data từ server
async function getPhones(searchVal) {
    try {
        // gọi API thành công
        const { data: phones } = await getPhoneAPI(searchVal);
        console.log(phones);
        // hiển thị danh sách data lên UI
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
    };

    try {
        // gửi request tạo data mới cho server
        await generatePhoneAPI(phone);

        // tắt form sau khi tạo xong data mới
        getEle("#btnAdd").setAttribute("data-dismiss", "modal");

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

        // xóa tất cả input trong form
        resetForm("phoneForm");
    } catch (error) {
        // tạo data mới thất bại
        console.log("Failed to add new data", error);
    }
})


// Xóa data bên server
async function deletePhones(phoneID) {
    try {
        // khi click vào nút Delete thì sẽ hiển thị alert thông báo xác nhận có muốn xóa data không
        // sử dụng thư viện SweetAlert2 & gán thuộc tính isConfirmed cho biến result
        const { isConfirmed: result } = await Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Yes, delete it!'
        });
        // data sẽ chỉ được xóa khi và chỉ khi user click nút confirm (result === true)
        if (result) {
            // thực hiện xóa data
            await deletePhoneAPI(phoneID);

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
        // xóa data thất bại
        console.log("Failed to delete data", error);
    }
}


// Hiển thị chi tiết 1 sản phẩm bất kì lên form sau khi click nút Edit
async function selectPhone(phoneID) {
    getEle("#btnAdd").style.display = "none";
    getEle("#btnUpdate").style.display = "inline-block"

    try {
        // lấy data dựa theo ID từ server
        const { data: phone } = await getPhoneAPIByID(phoneID);

        // hiển thị thông tin của từng thuộc tính lên field của form
        getEle("#name").value = phone.name;
        getEle("#price").value = phone.price;
        getEle("#screen").value = phone.screen;
        getEle("#bCam").value = phone.backCamera;
        getEle("#fCam").value = phone.frontCamera;
        getEle("#img").value = phone.img;
        getEle("#desc").value = phone.desc;
        getEle("#type").value = phone.type;

        // tạo thuộc tính onclick có value gọi hàm updatePhone với tham số là ID của data đã lấy
        getEle("#btnUpdate").setAttribute("onclick", `updatePhone(${phone.id})`);

    } catch (error) {
        // lấy data bằng ID thất bại
        console.log("Failed to get data by ID", error);
    }
}


// Cập nhật thông tin data
async function updatePhone(phoneID) {
    const phone = {
        name: getEle("#name").value,
        price: getEle("#price").value,
        screen: getEle("#screen").value,
        backCamera: getEle("#bCam").value,
        frontCamera: getEle("#fCam").value,
        img: getEle("#img").value,
        desc: getEle("#desc").value,
        type: getEle("#type").value
    };

    try {
        // gửi request cập nhật data cho server
        await updatePhoneAPI(phoneID, phone);

        // lấy danh sách data sau khi cập nhật & hiển thị lên UI
        getPhones();

        // hiển thị thông báo cập nhật thành công
        Swal.fire({
            position: 'top-end',
            icon: 'success',
            title: 'Your data has been updated',
            showConfirmButton: false,
            timer: 1500
        });

        // xóa tất cả input trong form
        resetForm("phoneForm");
    } catch (error) {
        // cập nhật data thất bại
        console.log("Failed to update data", error);
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
                <td class="text-center"><img src=${phone.img} with="150px" height="150px" alt="phone image"/></td>
                <td>${phone.desc}</td>
                <td class="text-center">
                    <button class="btn btn-primary" data-toggle="modal" data-target="#phoneModal" onclick="selectPhone(${phone.id})">Edit<i class="fa-regular fa-pen-to-square ml-2"></i></i></button>
                    <button class="btn btn-danger ml-2" onclick="deletePhones(${phone.id})">Delete<i class="fa-regular fa-trash-can ml-2"></i></button>
                </td>
            </tr>
            `
        );
    }, "");

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
    getEle("#btnUpdate").style.display = "none";
    getEle("#btnAdd").style.display = "inline-block";
})

// HELPERS
function getEle(selector) {
    return document.querySelector(selector);
}

function resetForm(formID) {
    return document.getElementById(formID).reset();
}