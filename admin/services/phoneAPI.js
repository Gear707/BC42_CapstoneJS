const BASE_URL = "https://63e86417cbdc565873852d8b.mockapi.io/api/products";

// Lấy tất cả data từ server
function getPhoneAPI(searchVal) {
    return axios({
        method: "GET",
        url: BASE_URL,
        params: {
            name: searchVal || undefined
        }
    });
}


// Tạo mới data & lưu vào server
function generatePhoneAPI(phone) {
    return axios({
        method: "POST",
        url: BASE_URL,
        data: phone
    });
}


// Xóa data bên phía server
function deletePhoneAPI(phoneID) {
    return axios({
        method: "DELETE",
        url: `${BASE_URL}/${phoneID}`
    });
}


// Lấy data dựa theo id
function getPhoneAPIByID(phoneID) {
    return axios({
        method: "GET",
        url: `${BASE_URL}/${phoneID}`
    });
}


// Cập nhật data cho server
function updatePhoneAPI(phoneID, phone) {
    return axios({
        method: "PUT",
        url: `${BASE_URL}/${phoneID}`,
        data: phone
    });
}