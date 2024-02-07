"use strict"
let username = localStorage.getItem('username');
let password = localStorage.getItem('password');
let email = localStorage.getItem('email');
if (username == null || password == null) {
    window.location.href = "./auth"
}else{
    var settings = {
        "url": "./api/auths",
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
        var settings = {
            "url": "./api/token",
            "method": "POST",
            "timeout": 0,
            "headers": {
                "Content-Type": "application/json"
            },
            "data": JSON.stringify({
                "token": response.data
            }),
        };

        $.ajax(settings).done(function (response) {
            localStorage.setItem('socket', response.data);
        });
        localStorage.setItem('token', response.data);
    });
}