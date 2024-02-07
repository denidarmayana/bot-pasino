"use strict"

let menu_active = 'home';

const menu_home = document.getElementById("menu_home");
const menu_setting = document.getElementById("menu_setting");
const menu_wallet = document.getElementById("menu_wallet");
const menu_account = document.getElementById("menu_account");
const view_home = document.getElementById("view_home");
const view_setting = document.getElementById("view_setting");
const view_wallet = document.getElementById("view_wallet");
const view_account = document.getElementById("view_account");

function updateUI() {
    switch(menu_active){
        case "home":
            menu_home.classList.add("active");
            menu_setting.classList.remove("active");
            menu_wallet.classList.remove("active");
            menu_account.classList.remove("active");
            view_home.style.display ="block";
            view_setting.style.display ="none";
            view_wallet.style.display ="none";
            view_account.style.display ="none";
            break;

        case "setting":
            menu_home.classList.remove("active");
            menu_setting.classList.add("active");
            menu_wallet.classList.remove("active");
            menu_account.classList.remove("active");
            view_home.style.display = "none";
            view_setting.style.display = "block";
            view_wallet.style.display = "none";
            view_account.style.display = "none";
            break;
        case "wallet":
            menu_home.classList.remove("active");
            menu_setting.classList.remove("active");
            menu_wallet.classList.add("active");
            menu_account.classList.remove("active");
            view_home.style.display = "none";
            view_setting.style.display = "none";
            view_wallet.style.display = "block";
            view_account.style.display = "none";
            break;
        case "account":
            menu_home.classList.remove("active");
            menu_setting.classList.remove("active");
            menu_wallet.classList.remove("active");
            menu_account.classList.add("active");
            view_home.style.display ="none";
            view_setting.style.display ="none";
            view_wallet.style.display ="none";
            view_account.style.display ="block";
            break;
    }
}

menu_home.addEventListener("click",()=>{
	menu_active = "home"
	updateUI()
})
menu_setting.addEventListener("click",()=>{
	menu_active = "setting"
	updateUI()
})
menu_wallet.addEventListener("click",()=>{
	menu_active = "wallet"
	updateUI()
})
menu_account.addEventListener("click",()=>{
	menu_active = "account"
	updateUI()
})
updateUI();