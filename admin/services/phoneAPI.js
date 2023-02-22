const BASE_URL = "https://63e86417cbdc565873852d8b.mockapi.io/api/products";

// Lấy data từ phía server
function getPhoneAPI(searchVal) {
    return axios({
        method: "GET",
        url: BASE_URL,
        params: {
            name: searchVal || undefined
        }
    });
}


// Xóa data bên phía server
function deletePhoneAPI(phoneId) {
    return axios({
        method: "DELETE",
        url: `${BASE_URL}/${phoneId}`
    });
}