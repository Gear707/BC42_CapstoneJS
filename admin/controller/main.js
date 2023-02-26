// Lấy data từ server & hiển thị danh sách ngay sau khi mở web
getPhones();


// Lấy data từ server
async function getPhones(searchVal) {
    try {
        // gọi API thành công
        const response = await getPhoneAPI(searchVal);
        console.log(response);

        // map về class Phone đã được khởi tạo
        const phone = response.data.map(phone => {
            return new Phone (
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
        console.log(phone);

        // hiển thị danh sách data lên UI
        renderPhones(phone);
    } catch (error) {
        // gọi API thất bại
        console.log(error);
        alertFail("Failed to get data");
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

        // update lại danh sách sau khi tạo mới
        await getPhones();

        // hiển thị thông báo tạo mới thành công
        alertSuccess("New data has been created");

        // xóa tất cả input trong form
        resetForm("phoneForm");
    } catch (error) {
        // tạo data mới thất bại
        console.log(error);
        alertFail("Failed to add new data");
    }
})


// Xóa data bên server
async function deletePhone(phoneID) {
    try {
        // hiển thị alert thông báo xác nhận có muốn xóa data không
        const { isConfirmed: result } = await warningDelete();
        console.log(result);
        // data sẽ chỉ được xóa khi và chỉ khi user click nút confirm (result === true)
        if (result) {
            // thực hiện xóa data
            await deletePhoneAPI(phoneID);

            // update lại danh sách sau khi xóa
            await getPhones();

            // hiển thị thông báo xác nhận xóa thành công
            alertSuccess("Your data has been deleted");
        }
    } catch (error) {
        // xóa data thất bại
        console.log(error);
        alertFail("Failed to delete data");
    }
}


// Hiển thị chi tiết 1 sản phẩm bất kì lên form sau khi click nút Edit
async function selectPhone(phoneID) {
    // ẩn nút Add
    getEle("#btnAdd").style.display = "none";

    // hiện nút Update
    getEle("#btnUpdate").style.display = "inline-block";

    // thêm thuộc tính tắt form sau khi click nút Update
    getEle("#btnUpdate").setAttribute("data-dismiss", "modal");

    try {
        // lấy data dựa theo ID từ server
        const {data: phone} = await getPhoneAPIByID(phoneID);
        console.log(phone);

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
        console.log(error);
        alertFail("Failed to get data by ID");
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
        await getPhones();

        // hiển thị thông báo cập nhật thành công
        alertSuccess("Your data has been updated");

        // xóa tất cả input trong form
        resetForm("phoneForm");
    } catch (error) {
        // cập nhật data thất bại
        console.log(error);
        alertFail("Failed to update data");
    }
}


// Hiển thị danh sách phone ra table
function renderPhones(phones) {
    let html = phones.reduce((result, phone) => {
        return (result +
            `
            <tr>
                <th scope="row">${phone.id}</th>
                <td>${phone.name}</td>
                <td class="text-center">${phone.price.toLocaleString()}</td>
                <td class="text-center"><img src=${phone.img} with="150px" height="150px" alt="phone image"/></td>
                <td>${phone.desc}</td>
                <td class="text-center">
                    <button class="btn btn-primary my-1" data-toggle="modal" data-target="#phoneModal" onclick="selectPhone(${phone.id})">Edit<i class="fa-regular fa-pen-to-square ml-2"></i></button>
                    <button class="btn btn-danger my-1" onclick="deletePhone(${phone.id})">Delete<i class="fa-regular fa-trash-can ml-2"></i></button>
                </td>
            </tr>
            `
        );
    }, "");

    getEle("#phoneList").innerHTML = html;
}


// DOM
// Tìm sản phẩm dựa theo tên
getEle("#txtSearch").addEventListener("keydown", event => {
    try {
        console.log(event);
        if (event.key !== "Enter") return;

        const searchVal = event.target.value;
        getPhones(searchVal);
    } catch (error) {
        console.log(error);
        alertFail("Failed to search data");
    }

})

getEle("#btnOpenForm").addEventListener("click", () => {
    // ẩn nút Update
    getEle("#btnUpdate").style.display = "none";
    // hiện nút Add
    getEle("#btnAdd").style.display = "inline-block";
    // thêm thuộc tính tắt form sau khi click nút Add
    getEle("#btnAdd").setAttribute("data-dismiss", "modal");
})

getEle("#btnClose").addEventListener("click", () => {
    // cứ mỗi lần click nút Close thì sẽ reset toàn bộ các field trong form
    resetForm("phoneForm");
})


// HELPERS
function getEle(selector) {
    return document.querySelector(selector);
}

function resetForm(formID) {
    return document.getElementById(formID).reset();
}