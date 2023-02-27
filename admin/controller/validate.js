// Input validation
function validateData() {
    let isValid = true;
    const emptyStr = "This field can't be empty";
    // regex chỉ cho phép nhập số
    const nums = /^[0-9]*$/;
    // regex chỉ cho phép nhập đúng URL của 1 hình ảnh
    const imgURL = /^(http)?s?:?(\/\/[^"']*\.(?:png|jpg|jpeg|gif|png|svg))$/;

    // kiểm tra name
    let name = getEle("#name").value;
    if (!name) {
        isValid = false;
        getEle("#notiName").innerHTML = emptyStr;
    }
    else {
        getEle("#notiName").innerHTML = '';
    }

    // kiểm tra price
    let price = getEle("#price").value;
    if (!price) {
        isValid = false;
        getEle("#notiPrice").innerHTML = emptyStr;
    }
    else if (!price.match(nums)) {
        isValid = false;
        getEle("#notiPrice").innerHTML = 'Price must be numbers and no space allowed';
    }
    else {
        getEle("#notiPrice").innerHTML = '';
    }

    // kiểm tra screen
    let screen = getEle("#screen").value;
    if (!screen) {
        isValid = false;
        getEle("#notiScreen").innerHTML = emptyStr;
    }
    else {
        getEle("#notiScreen").innerHTML = '';
    }

    // kiểm tra backCamera
    let bCam = getEle("#bCam").value;
    if (!bCam) {
        isValid = false;
        getEle("#notiBCam").innerHTML = emptyStr;
    }
    else {
        getEle("#notiBCam").innerHTML = '';
    }

    // kiểm tra frontCamera
    let fCam = getEle("#fCam").value;
    if (!fCam) {
        isValid = false;
        getEle("#notiFCam").innerHTML = emptyStr;
    }
    else {
        getEle("#notiFCam").innerHTML = '';
    }

    // kiểm tra URL hình ảnh
    let img = getEle("#img").value;
    if (!img) {
        isValid = false;
        getEle("#notiImg").innerHTML = emptyStr;
    }
    else if (!img.match(imgURL)) {
        isValid = false;
        getEle("#notiImg").innerHTML = 'Input must be an URL of an image';
    }
    else {
        getEle("#notiImg").innerHTML = '';
    }

    // kiểm tra desc
    let desc = getEle("#desc").value;
    if (!desc) {
        isValid = false;
        getEle("#notiDesc").innerHTML = emptyStr;
    }
    else {
        getEle("#notiDesc").innerHTML = '';
    }

    // kiểm tra type
    let type = getEle("#type").value;
    if (type === "Select brand") {
        isValid = false;
        getEle("#notiType").innerHTML = "Please choose a brand";
    }
    else {
        getEle("#notiType").innerHTML = '';
    }

    return isValid;
}