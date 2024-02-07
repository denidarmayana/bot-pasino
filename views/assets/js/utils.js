"use strict"

function success(message) {
    toastr.options.showMethod = 'slideDown';
    toastr.options.hideMethod = 'slideUp';
    toastr.options.closeMethod = 'slideUp';
    toastr.success(message);
}

function errors(message) {
    toastr.options.showMethod = 'slideDown';
    toastr.options.hideMethod = 'slideUp';
    toastr.options.closeMethod = 'slideUp';
    toastr.error(message);
}
function toastSuccess(message) {
    Toastify({
          text: message,
          duration: 2500,
          gravity: "top", 
          position: "right",
          stopOnFocus: true,
          style: {
            background: "#56c760",
            borderRadius: "10px",
            width: "100%",
          }
    }).showToast();
}
function toastError(message) {
    Toastify({
          text: message,
          duration: 2500,
          gravity: "top", 
          position: "center",
          stopOnFocus: true,
          style: {
            background: "#f75a5b",
            borderRadius: "10px",
            width: "100%",
           
          }
    }).showToast();
}
function toastSuccess(message) {
    Toastify({
          text: message,
          duration: 2500,
          gravity: "top", 
          position: "right",
          stopOnFocus: true,
          style: {
            background: "#56c760",
            borderRadius: "15px",
          },
      onClick: function(){} // Callback after click
    }).showToast();
}
function actionLogin(email, password, callback) {
    var settings = {
        "url": "./api/auth",
        "method": "POST",
        "timeout": 0,
        "headers": {
            "Content-Type": "application/json"
        },
        "data": JSON.stringify({
            "email": email,
            "password": password
        }),
    };

    $.ajax(settings).done(function (response) {
        callback(response);
    });
}
function actionRegister(username,email,password, callback) {
    var settings = {
        "url": "./api/register",
        "method": "POST",
        "timeout": 0,
        "headers": {
            "Content-Type": "application/json"
        },
        "data": JSON.stringify({
        	"username":username,
            "email": email,
            "password": password
        }),
    };

    $.ajax(settings).done(function (response) {
        callback(response);
    });
}
function get_chance(min, max, decimals) {
    const str = (Math.random() * (max - min) + min).toFixed(decimals);
    return parseFloat(str);
}
function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}
