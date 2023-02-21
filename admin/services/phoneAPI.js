const BASE_URL = "https://63e86417cbdc565873852d8b.mockapi.io/api/product";

function getPhoneAPI(searchValue){
    return axios({
        method: "GET",
        url: BASE_URL,
        params: {
            name: searchValue || undefined
        }
    });
}