getProducts();

function getProducts(searchValue) {
  apiGetProducts(searchValue)
    .then((response) => {
      renderProducts(response.data);
    })
    .catch((error) => {
      alert("API get products error");
    });
}

// hàm hiển thị prodcut
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
  apiGetCarts(productID)
    .then((response) => {
      renderCart(response.data);
    })
    .catch((error) => {
      alert("API get products error");
    });
}
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
      <div style="font-size: 90%;">Screen: <span class="tertiary">${product.screen}</span></div>
      <div style="font-size: 90%;">Back Camera: <span class="tertiary">${product.backCamera}</span></div>
      <div style="font-size: 90%;">Front Camera: <span class="tertiary">${product.frontCamera}</span></div>
      <div style="margin-top: 8px;"><a href="#!" onclick="btnRemove('1')">Remove</a></div>
    </div>
  </div>
  <div class="product__2">
    <div class="qty">
      <span><b>Quantity:</b> </span> &nbsp; &nbsp;
      <span class="minus bg-dark" onclick="btnMinus('1')">-</span>
      <span class="quantityResult mx-2">1</span>
      <span class="plus bg-dark" onclick="btnAdd('1')">+</span>
    </div>
    <div class="product__price"><b>${product.price}/b></div>
  </div>
</div>
      `
    );
  }, "");
  document.getElementById("cartList").innerHTML = html;
}

// ============ Helpers ==============
function getElement(selector) {
  return document.querySelector(selector);
}
