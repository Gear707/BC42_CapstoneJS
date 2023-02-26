// Sử dụng thư viện SweetAlert2 để tạo các thông báo alert
const Toast = Swal.mixin({
    toast: true,
    position: 'top-end',
    showConfirmButton: false,
    timer: 2000
})


// Thông báo thực hiện thao tác thành công
function alertSuccess(alert) {
    return Toast.fire({
        icon: 'success',
        title: alert
    })
}


// Thông báo thực hiện thao tác thất bại
function alertFail(alert) {
    return Toast.fire({
        icon: 'error',
        title: alert
    })
}


// Thông báo xác nhận xóa data
function warningDelete() {
    return Swal.fire({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Yes, delete it!'
    });
}