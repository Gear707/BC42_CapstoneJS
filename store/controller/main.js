getProducts();
let productList = [];
let cartList = getCartList();
renderCart(cartList);
totals(cartList);
getCount(cartList);

function getProducts(searchValue) {
  apiGetProducts(searchValue)
    .then((response) => {
      productList = response.data;
      renderProducts(productList);
    })
    .catch((error) => {
      alert("API get products error");
    });
}

// hàm hiển thị product
function renderProducts(products) {
  let html = products.reduce((result, product) => {
    return (
      result +
      `
      <div class="col-lg-3 col-md-6">
      <div class="card text-black h-100">
      <div class="content-overlay"></div>
        <img src="${product.img}" class="card-img" alt="Phone Image">
        <div class="content-details">
        <h3 class="pb-5">Specifications</h3>
              <div class="d-flex justify-content-start py-1">
            <span class="text-light"><b>Screen:</b> ${product.screen}</span>
          </div>
          <di5v class="d-flex justify-content-start py-1">
            <span class="text-light"><b>Back Camera:</b> ${product.backCamera}</span>
          </di5v>
          <div class="d-flex justify-content-start py-1">
            <span class="text-light"><b>Front Camera:</b> ${product.frontCamera}</span>
          </div>
  
          <p class="pt-5"><u>click here for more details</u></p>
        </div>
        <div class="card-body">
          <div class="text-center">
            <h5 class="card-title pt-3">${product.name}</h5>
            <span class="text-muted mb-2">${product.price}</span>
            <span class="text-danger"><s>$520</s></span>
          </div>
          <div class="mt-3 brand-box text-center">
            <span>${product.type}</span>
          </div>
          <div class="d-flex justify-content-start pt-3">
            <span><b>Description:</b> ${product.desc}</span>
          </div>
          <div class="d-flex justify-content-between pt-3">
            <div class="text-warning">
                <i class="fa fa-star"></i>
                <i class="fa fa-star"></i>
                <i class="fa fa-star"></i>
                <i class="fa fa-star"></i>
                <i class="fa fa-star"></i>
            </div>
            <span class="text-success"><b>In Stock</b></span>
          </div>
          <button type="button" class="btn btn-block w-50" onclick="getCarts('${product.id}')">Add to cart</button>
        </div>
      </div>
    </div>
        `
    );
  }, "");
  document.getElementById("phoneList").innerHTML = html;
}

function getCarts(productID) {
  const cartItem = productList.filter((item) => item.id === productID);
  let item = new ProductCart(
    cartItem[0].id,
    cartItem[0].name,
    cartItem[0].price,
    cartItem[0].screen,
    cartItem[0].backCamera,
    cartItem[0].frontCamera,
    cartItem[0].img,
    cartItem[0].desc,
    cartItem[0].type,
    1
  );
  if (!cartList.some((val) => val.id === productID)) {
    cartList.push(item);
  } else {
    let index = cartList.findIndex((val) => val.id === productID);
    cartList[index].quantity += 1;
  }
  renderCart(cartList);
  getCount(cartList);
  totals(cartList);
  storeCartlist();
}
// hàm hiển thị cart
function renderCart(products) {
  let html = products.reduce((result, productCart) => {
    return (
      result +
      `
      <div class="product">
        <div class="product__1">
          <div class="product__thumbnail">
            <img src="${productCart.img}" alt="Italian Trulli">
          </div>
          <div class="product__details">
            <div style="margin-bottom: 8px;"><b>${productCart.name}</b></div>
            <div style="font-size: 90%;">Screen: <span class="tertiary">${
              productCart.screen
            }</span></div>
            <div style="font-size: 90%;">Back Camera: <span class="tertiary">${
              productCart.backCamera
            }</span></div>
            <div style="font-size: 90%;">Front Camera: <span class="tertiary">${
              productCart.frontCamera
            }</span></div>
            <div style="margin-top: 8px;"><a href="#!" onclick="btnRemove('${
              productCart.id
            }')">Remove</a></div>
          </div>
        </div>
        <div class="product__2">
          <div class="qty">
            <span><b>Quantity:</b></span> &nbsp; &nbsp;
            <span class="minus bg-dark" onclick="btnMinus('${
              productCart.id
            }')">-</span>
            <span class="quantityResult mx-2">${productCart.quantity}</span>
            <span class="plus bg-dark" onclick="btnAdd('${
              productCart.id
            }')">+</span>
          </div>
          <div class="product__price"><b>$${productCart.calcTotal()}</b></div>
        </div>
      </div>
      `
    );
  }, "");
  document.getElementById("cartList").innerHTML = html;
}

// chốt bill
function totals(cartList) {
  let subTotal = getElement("#subTotal");
  let shipping = getElement("#shipping");
  let tax = getElement("#tax");
  let priceTotal = getElement("#priceTotal");

  let totalPrice = cartList.reduce((total, productCart) => {
    return total + productCart.quantity * parseInt(productCart.price);
  }, 0);
  let totalShipping = cartList.reduce(
    (total, item) => {
      return total;
    },
    cartList.length > 0 ? 10 : 0
  );
  subTotal.innerHTML = `$${totalPrice}`;
  shipping.innerHTML = `$${totalShipping}`;
  tax.innerHTML = `$${totalPrice * 0.1}`;
  priceTotal.innerHTML = `$${totalPrice + totalShipping + totalPrice * 0.1}`;
  storeCartlist();
}

// giảm số lượng
function btnMinus(productID) {
  let index = cartList.findIndex((item) => {
    return item.id === productID;
  });
  if (index === -1) return;
  cartList[index].quantity--;
  if (cartList[index].quantity < 1) {
    cartList.splice(index, 1);
  }
  renderCart(cartList);
  getCount(cartList);
  totals(cartList);
  storeCartlist();
}

// tăng số lượng
function btnAdd(productID) {
  let index = cartList.findIndex((item) => item.id === productID);
  if (index === -1) return;
  cartList[index].quantity += 1;
  renderCart(cartList);
  getCount(cartList);
  totals(cartList);
  storeCartlist();
}

// xoa khoi gio hang
function btnRemove(productID) {
  cartList = cartList.filter((item) => item.id !== productID);
  storeCartlist();
  renderCart(cartList);
  getCount(cartList);
  totals(cartList);
  storeCartlist();
}

// hàm đếm
function getCount(cartList) {
  let count = cartList.reduce((res, productCart) => {
    return res + productCart.quantity;
  }, 0);
  document.getElementById("quantityCart").innerHTML = count;
  storeCartlist();
}

// btn continue
function btnContinue() {
  let cartOverlay = document.getElementById("cart__overlay");
  let cartContents = document.getElementById("cart__contents");
  cartOverlay.classList.remove("d-block");
  cartContents.classList.remove("d-block");

  if (!flag) {
    cartOverlay.style.backgroundColor = "rgba(0, 0, 0, 0.5)";
    cartOverlay.style.zIndex = "100";
    cartContents.style.zIndex = "1000";
    flag = true;
  } else {
    cartOverlay.style.backgroundColor = "";
    cartOverlay.style.zIndex = "-1";
    cartContents.style.zIndex = "0";
    flag = false;
  }
}

function btnEmpty() {
  removeCartList();
  cartList = [];
  renderCart(cartList);
  getCount(cartList);
  totals(cartList);
}
function btnPay() {
  let popUpSuccess = getElement("#popUpSuccess");
  let popUpFail = getElement("#popUpFail");
  let popUpCart = getElement("#popUpCart");
  let cartContents = document.getElementById("cart__contents");
  if (cartList.length > 0) {
    setTimeout(() => {
      popUpCart.classList.add("d-block");
      popUpSuccess.classList.add("d-block");
      popUpCart.style.zIndex = "99999999999999999999";
    }, 100);
    setTimeout(() => {
      popUpCart.classList.remove("d-block");
      popUpSuccess.classList.remove("d-block");
      popUpCart.style.zIndex = "-10";
    }, 2000);
  } else {
    setTimeout(() => {
      popUpCart.classList.add("d-block");
      popUpFail.classList.add("d-block");
      popUpCart.style.zIndex = "99999999999999999999";
    }, 100);
  }
  btnEmpty();
}
function failPay() {
  let popUpFail = getElement("#popUpFail");
  let popUpCart = getElement("#popUpCart");
  popUpFail.classList.remove("d-block");
  popUpCart.classList.remove("d-block");
  popUpCart.style.zIndex = "-10";
}

function searchProudcts() {
  let brands = getElement("#brands").value;

  let searchBrand = productList.filter(
    (products) => brands.toLowerCase() === products.type.toLowerCase()
  );
  if (searchBrand.length > 0) {
    renderProducts(searchBrand);
  } else {
    renderProducts(productList);
  }
}

// lưu cartList xuống localStorage
function storeCartlist() {
  const json = JSON.stringify(cartList);
  localStorage.setItem("cartList", json);
}

function getCartList() {
  const json = localStorage.getItem("cartList");
  if (!json) {
    return [];
  }

  const cartList = JSON.parse(json);

  for (let i = 0; i < cartList.length; i++) {
    const productCart = cartList[i];
    cartList[i] = new ProductCart(
      productCart.id,
      productCart.name,
      productCart.price,
      productCart.screen,
      productCart.backCamera,
      productCart.frontCamera,
      productCart.img,
      productCart.desc,
      productCart.type,
      productCart.quantity
    );
  }

  return cartList;
}

function removeCartList() {
  const json = localStorage.removeItem("cartList");
  if (!json) {
    return [];
  }
}

// ============ Helpers ==============
function getElement(selector) {
  return document.querySelector(selector);
}
