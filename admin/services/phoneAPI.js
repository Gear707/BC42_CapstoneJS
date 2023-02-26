const BASE_URL = "https://63e86417cbdc565873852d8b.mockapi.io/api/products";

// Lấy tất cả data từ server
async function getPhoneAPI(searchVal) {
    try {
        const response = await axios({
            method: "GET",
            url: BASE_URL,
            params: {
                name: searchVal || undefined
            }
        });
        return response.data;
    } catch (error) {
        console.log(error);
    }
}


// Tạo mới data & lưu vào server
async function generatePhoneAPI(phone) {
    try {
        await axios({
            method: "POST",
            url: BASE_URL,
            data: phone
        });
    } catch (error) {
        console.log(error);
    }
}


// Xóa data bên phía server
async function deletePhoneAPI(phoneID) {
    try {
        await axios({
            method: "DELETE",
            url: `${BASE_URL}/${phoneID}`
        });
    } catch (error) {
        console.log(error);
    }
}


// Lấy data dựa theo id
async function getPhoneAPIByID(phoneID) {
    try {
        const response = await axios({
            method: "GET",
            url: `${BASE_URL}/${phoneID}`
        });
        return response.data;
    } catch (error) {
        console.log(error);
    }
}


// Cập nhật data cho server
async function updatePhoneAPI(phoneID, phone) {
    try {
        await axios({
            method: "PUT",
            url: `${BASE_URL}/${phoneID}`,
            data: phone
        });
    } catch (error) {
        console.log(error);
    }
}