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
  let item = new Product(
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
  let html = products.reduce((result, product) => {
    return (
      result +
      `
      <div class="product">
        <div class="product__1">
          <div class="product__thumbnail">
            <img src="${product.img}" alt="Italian Trulli">
          </div>
          <div class="product__details">
            <div style="margin-bottom: 8px;"><b>${product.name}</b></div>
            <div style="font-size: 90%;">Screen: <span class="tertiary">${
              product.screen
            }</span></div>
            <div style="font-size: 90%;">Back Camera: <span class="tertiary">${
              product.backCamera
            }</span></div>
            <div style="font-size: 90%;">Front Camera: <span class="tertiary">${
              product.frontCamera
            }</span></div>
            <div style="margin-top: 8px;"><a href="#!" onclick="btnRemove('${
              product.id
            }')">Remove</a></div>
          </div>
        </div>
        <div class="product__2">
          <div class="qty">
            <span><b>Quantity:</b></span> &nbsp; &nbsp;
            <span class="minus bg-dark" onclick="btnMinus('${
              product.id
            }')">-</span>
            <span class="quantityResult mx-2">${product.quantity}</span>
            <span class="plus bg-dark" onclick="btnAdd('${
              product.id
            }')">+</span>
          </div>
          <div class="product__price"><b>$${product.calcCart()}</b></div>
        </div>
      </div>
      `
    );
  }, "");
  document.getElementById("cartList").innerHTML = html;
}

function totals(cartList) {
  let subTotal = getElement("#subTotal");
  let shipping = getElement("#shipping");
  let tax = getElement("#tax");
  let priceTotal = getElement("#priceTotal");

  let totalPrice = cartList.reduce((total, product) => {
    return (total + product.quantity) * parseInt(product.price);
  }, 0);
  subTotal.innerHTML = `$${totalPrice}`;
  shipping.innerHTML = `$${10}`;
  tax.innerHTML = `$${totalPrice * 0.1}`;
  priceTotal.innerHTML = `$${totalPrice + 10 + totalPrice * 0.1}`;
  storeCartlist()
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
  let count = cartList.reduce((res, product) => {
    return res + product.quantity;
  }, 0);
  document.getElementById("quantityCart").innerHTML = count;
  storeCartlist();
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
    const product = cartList[i];
    cartList[i] = new Product(
      product.id,
      product.name,
      product.price,
      product.screen,
      product.backCamera,
      product.frontCamera,
      product.img,
      product.desc,
      product.type,
      product.quantity
    );
  }

  return cartList;
}

// ============ Helpers ==============
function getElement(selector) {
  return document.querySelector(selector);
}
