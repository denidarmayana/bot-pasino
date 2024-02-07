"use strict"
const base_trade = document.getElementById("base_trade");
const chance_min = document.getElementById("chance_min");
const chance_max = document.getElementById("chance_max");
const shoot = document.getElementById("shoot");
const marti_win = document.getElementById("marti_win");
const if_win_reset = document.getElementById("if_win_reset");
const profite_global = document.getElementById("profite_global");
const delay = document.getElementById("delay");
const boom = document.getElementById("boom");
const marti_los = document.getElementById("marti_los");
const if_los_reset = document.getElementById("if_los_reset");
const save_settings = document.getElementById("save_settings");
const reset_settings = document.getElementById("reset_settings");

save_settings.addEventListener("click",()=>{
	localStorage.setItem('base_trade', base_trade.value);
	localStorage.setItem('chance_min', chance_min.value);
	localStorage.setItem('chance_max', chance_max.value);
	localStorage.setItem('shoot', shoot.value);
	localStorage.setItem('boom', boom.value);
	localStorage.setItem('marti_win', marti_win.value);
	localStorage.setItem('if_win_reset', if_win_reset.value);
	localStorage.setItem('profite_global', profite_global.value);
	localStorage.setItem('delay', delay.value);
	localStorage.setItem('marti_los', marti_los.value);
	localStorage.setItem('if_los_reset', if_los_reset.value);
	success("Trading settings saved successfully")
})

reset_settings.addEventListener("click",()=>{
	localStorage.setItem('base_trade', null);
	localStorage.setItem('chance_min', null);
	localStorage.setItem('chance_max', null);
	localStorage.setItem('shoot', null);
	localStorage.setItem('marti_win', null);
	localStorage.setItem('if_win_reset', null);
	localStorage.setItem('profite_global', null);
	localStorage.setItem('delay', null);
	localStorage.setItem('marti_los', null);
	localStorage.setItem('if_los_reset', null);
	localStorage.setItem('boom', null);
	success("Reset Trading settings successfully")
})