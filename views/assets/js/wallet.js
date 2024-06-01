"use strict"
const address_wallet = document.getElementById("address_wallet");
const qr_wallet = document.getElementById("qr_wallet");

const wallet_wd = document.getElementById("wallet_wd");
const amount_wd = document.getElementById("amount_wd");
const submit_wd = document.getElementById("save_wd");

const user_tf = document.getElementById("wallet_tf");
const amount_tf = document.getElementById("amount_tf");
const submit_tf = document.getElementById("save_tf");
const token = localStorage.getItem('token')
console.log(token)
var settings = {
    "url": "./api/deposit",
    "method": "POST",
    "timeout": 0,
    "headers": {
        "Content-Type": "application/json"
    },
    "data": JSON.stringify({
        "token": token,
        "coin": "DOGE"
    }),
};

$.ajax(settings).done(function (response) {
	address_wallet.value = response.data.address
	qr_wallet.src = response.data.qr
});



submit_wd.addEventListener("click",function () {
	if (wallet_wd.value == "") {
		toastError("Address Wallet can't be empty");
	}else if (amount_wd.value == "") {
		toastError("Amount can't be empty");
	}else{
		submit_wd.innerHTML = '<i class="fa fa-refresh fa-spin"></i>';
		submit_wd.disable = true;
		var settings = {
		    "url": "./api/withdraw",
		    "method": "POST",
		    "timeout": 0,
		    "headers": {
		        "Content-Type": "application/json"
		    },
		    "data": JSON.stringify({
		        "token": token,
		        "coin": "DOGE",
		        "address":wallet_wd.value,
		        "amount":amount_wd.value,
		    }),
		};

		$.ajax(settings).done(function (response) {
			if (response.code == 200) {
                toastSuccess(response.message)
                setTimeout(()=>{
                	window.location.href="./wallet"
                },1500)
            }else{
                toastError(response.message)
            }
		});

	}
})

submit_tf.addEventListener("click",function () {
	if (user_tf.value == "") {
		toastError("Username can't be empty");
	}else if (amount_tf.value == "") {
		toastError("Amount can't be empty");
	}else{
		submit_wd.innerHTML = '<i class="fa fa-refresh fa-spin"></i>';
		submit_wd.disable = true;
		var settings = {
		    "url": "./api/transfer",
		    "method": "POST",
		    "timeout": 0,
		    "headers": {
		        "Content-Type": "application/json"
		    },
		    "data": JSON.stringify({
		        "token": token,
		        "coin": "DOGE",
		        "username":user_tf.value,
		        "amount":amount_tf.value,
		    }),
		};

		$.ajax(settings).done(function (response) {
			console.log(user_tf.value,amount_tf.value)
			if (response.code == 200) {
                toastSuccess(response.message)
                setTimeout(()=>{
                	window.location.href="./wallet"
                },1500)
            }else{
                toastError(response.message)
            }
		});

	}
})