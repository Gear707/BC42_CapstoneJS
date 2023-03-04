const URL = "https://63e86417cbdc565873852d8b.mockapi.io/api/products";

function apiGetProducts(searchValue) {
  return axios({
    method: "GET",
    url: URL,
    params: {
      name: searchValue || undefined,
    },
  });
}
function apiGetCarts(productID) {
  return axios({
    method: "GET",
    url: `${URL}/${productID}`,
  });
}
