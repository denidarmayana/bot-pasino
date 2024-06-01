"use strict"
const balance = document.getElementById("balance");
const usernames = document.getElementById("username");
usernames.innerHTML = localStorage.getItem('username')
let saldo;
const hidden_base_trade = document.getElementById("hidden_base_trade");
const base_trade = document.getElementById("base_trade");
const shoot_input = document.getElementById("shoot_input");
const boom_input = document.getElementById("boom_input");
const on_win_marti = document.getElementById("on_win_marti");
const on_lose_marti = document.getElementById("on_lose_marti");
const profite_global = document.getElementById("profite_global");
const delay2 = document.getElementById("delay_time");
const mystop = document.getElementById('mystop');
const low_ball = document.getElementById('low_ball');
const ch_mins = document.getElementById('ch_mins');
const ch_maxs = document.getElementById('ch_maxs');
const mybalance = document.getElementById('mybalance');
const roll_trk = document.getElementById('roll_trk');
const roll_trk_txt = document.getElementById('roll_trk_txt');
const win_trk = document.getElementById('win_trk');
const lose_trk = document.getElementById('lose_trk');
const stop_ons_win = document.getElementById('stop_ons_win');
const reset_marti_if_wins = document.getElementById('reset_marti_if_wins');
const reset_win_trade = document.getElementById("reset_win_trade")
const if_wines = document.getElementById("if_wines")
const and_boomwin = document.getElementById("and_boomwin")
const reset_marti_if_loses = document.getElementById("reset_marti_if_loses")
const if_loses = document.getElementById("if_loses")
const and_boom = document.getElementById("and_boom")
const rt_trades = document.getElementById("rt_trades")
const prof_glob = document.getElementById("prof_glob")
const res_proft = document.getElementById("res_proft")
var res_trade = document.getElementById('res_trade');
const btn_start = document.getElementById("btn_start")
const btn_stop = document.getElementById("btn_stop")

let bet = parseFloat(hidden_base_trade.value).toFixed(8);
let wayaewayae=0;
let profit_sesion = 0;
let profit_chart = 0;
let profit_globals = 0;
let lose_tr = 0;
let win_tr = 0;
let win = 0;
let lose = 0;
let iflosebom = 0;

let predic = 1;
let plow = Math.ceil(1);
let pheight = Math.floor(2);
let type;
let resetonlose = 0;
let logic;
let roll_win = 0;
let roll_lose = 0;
let ifloss = 0;
let ceksend=1;
let ifwins = 0;
let mod=0;
let stop_ons_wins = false;
const socket = new WebSocket('ws://108.181.201.185:8080/wss');
socket.addEventListener('open', (event) => {
  	var auth_socket = JSON.stringify({method:"initialization",socket_token:localStorage.getItem('socket')})
	socket.send(auth_socket)
	var get_balance = JSON.stringify({method:"get_balance",coin:"DOGE"})
	socket.send(get_balance)
});

// Event listener for when a message is received from the server
socket.addEventListener('message', (event) => {
	
	var json = JSON.parse(event.data);
	if (json.action == "update_balance") {
		balance.innerHTML = json.user_balance
		saldo = json.user_balance
		var balacefee=saldo - (saldo*3/100)
		localStorage.setItem("balacefee",balacefee);
	}
	if (json.action == "authenticated") {
		//console.log(event.data)
	}
	if (json.action == "bet_update") {
		console.log(event.data)

		if (json.error == null) {
			type = get_chance(plow, pheight,0);
			console.log(event.data)
			let profitNow = parseFloat(json.profit);
	        let profites = parseFloat(profite_global.textContent );
	        profites += profitNow;
	      	profite_global.innerHTML = parseFloat(profites).toFixed(8);
	      	if (json.win == 1) {
	      		win++;
		        roll_win++;
		        lose = 0;
		        iflosebom = 0;
		        roll_lose = 0;
		        ifloss = 0
		        ifwins++;
		        roll_trk_txt.innerHTML = win;
		        saldo = parseFloat(json.balance).toFixed(8);
		        balance.innerHTML = saldo
		        var net = parseInt(parseFloat(json.profit)*parseInt(100000000));
		        var nets = parseInt(parseFloat(profit_globals.textContent)*parseInt(100000000));
		        var set = parseInt(parseFloat(profit_sesion)*parseInt(100000000));
		        profit_globals = Math.trunc(nets + net)/100000000;
		        profit_sesion = Math.trunc(set + net)/100000000;
		        var html ='<tr><td width="15%"><span class="badge w-100 badge-success mb-1 text-start">'+(type == 1 ? "LOW" : "HIGH")+'</span></td><td><span class="badge w-100 badge-success mb-1 text-start">'+parseFloat(hidden_base_trade.value).toFixed(8)+'</span></td><td><span class="badge w-100 badge-success mb-1 text-start">'+parseFloat(json.profit).toFixed(8)+'</span></td></tr>';
		        res_trade.insertAdjacentHTML('afterbegin', html);
		        var table = document.getElementById('tabelutama');
		        var totalRowCount = table.rows.length;
		        if(stop_ons_wins){
	                stop_ons_wins = false
	                stop_trade();
	                return (false);
	            }
	            if(on_win_marti.value > 0){
	                var currVal = hidden_base_trade.value;
	                var newVal = parseFloat(+(currVal) + +((on_win_marti.value / 100) * +(currVal))).toFixed(8);
	                hidden_base_trade.value = newVal;
	            }
	            if(reset_marti_if_wins.value > 0){
	                if(win == reset_marti_if_wins.value){
	                  hidden_base_trade.value = base_trade.value
	                  win = 0;
	                  lose = 0;
	                  var balaceafter = balance.textContent;
	      			  var balacefee=balaceafter-(balaceafter*2/100)
	       			  localStorage.setItem("balacefee",balacefee);
	       			  ceksend=1;
	                }
	            }
	            if(reset_win_trade.value > 0){
	                var pollz = parseInt(parseFloat(reset_win_trade.value).toFixed(8)*parseInt(100000000));
	                var hus = parseInt(parseFloat(bet)*parseInt(100000000));
	                if(hus >= pollz){
	                  hidden_base_trade.value = base_trade.value
	                  win = 0;
	                  lose = 0;
	                  var balaceafter = balance.textContent;
	      			  var balacefee=balaceafter-(balaceafter*2/100)
	       			  localStorage.setItem("balacefee",balacefee);
	       			  ceksend=1;
	                }
	            }
	            if($("input[name='reset_win_profit']").val() > 0){
	                var pollz = parseInt(parseFloat($("input[name='reset_win_profit']").val()).toFixed(8)*parseInt(100000000));
	                var hus = parseInt(parseFloat(jsn.profit)*parseInt(100000000));
	                if(hus >= pollz){
	                  hidden_base_trade.value = base_trade.value
	                  win = 0;
	                  lose = 0;
	                  var balaceafter= balance.textContent
	      			  var balacefee=balaceafter-(balaceafter*2/100)
	       			  localStorage.setItem("balacefee",balacefee);
	       			  ceksend=1;
	                }
	            }
	            if(if_wines.value > 0){
	            	if(and_boomwin.value > 0){
	                    var cscs = parseInt(parseFloat(hidden_base_trade.value).toFixed(8)*parseInt(100000000));
	                    var scsc = parseInt(parseFloat(and_boomwin.value).toFixed(8)*parseInt(100000000));
	                    if(scsc > cscs){
	                        if(ifwins == if_wines.value){
	                        	hidden_base_trade.value = and_boomwin.value
	                        }
	                    }
	                }
	            }
	            var cmin = Math.ceil(ch_mins.value);
				var cmax = Math.floor(ch_maxs.value);
				var chance = get_chance(cmin, cmax, 0);
	            var settings = {
				    "url": "./trade",
				    "method": "POST",
				    "timeout": 0,
				    "headers": {
				        "Content-Type": "application/json"
				    },
				    "data": JSON.stringify({
				        "base_trade": hidden_base_trade.value,
				        "chance": chance
				    }),
				  };
				  $.ajax(settings).done(function (response) {
				  	if (mystop.checked == false) {
				  		setTimeout(()=>{
					  		var sendTrade = JSON.stringify({
						  		method:"place_bet",
						  		bet_amt: parseFloat(hidden_base_trade.value).toFixed(8),
						  		coin:"DOGE",
						  		client_seed : generateClientSeed(),
						  		type:type,
						  		payout:parseFloat(response.payout).toFixed(5),
						  		winning_chance:response.chance,
						  		profit:parseFloat(response.profite).toFixed(8)
						  	})
						  	socket.send(sendTrade)
						  },delay2.value)
				  	}
				  })
	      	}else{
	      		lose++;
	            
	            iflosebom++;
	            resetonlose++;
	            roll_lose++;
	            ifloss++;
	            ifwins=0;
	            win = 0;
	           
	            roll_win = 0;
	            roll_trk_txt.innerHTML = lose;
	            saldo = parseFloat(json.balance).toFixed(8);
	            balance.innerHTML = saldo
	            profit_globals = parseFloat(profit_globals.textContent).toFixed(8) - bet;
	            profit_sesion = parseFloat(profit_sesion).toFixed(8) - bet;
	            var html ='<tr><td width="15%"><span class="badge w-100 badge-danger mb-1 text-start">'+(type == 1 ? "LOW" : "HIGH")+'</span></td><td><span class="badge w-100 badge-danger mb-1 text-start">'+parseFloat(hidden_base_trade.value).toFixed(8)+'</span></td><td><span class="badge w-100 badge-danger mb-1 text-start">'+parseFloat(json.profit).toFixed(8)+'</span></td></tr>';
	            res_trade.insertAdjacentHTML('afterbegin', html);
	            var table = document.getElementById('tabelutama');
	            var totalRowCount = table.rows.length;
	            if(on_lose_marti.value > 0){
	                var currVal = hidden_base_trade.value
	                var newVal = parseFloat(+(currVal) + +((on_lose_marti.value / 100) * +(currVal))).toFixed(8);
	                hidden_base_trade.value = newVal
	            }
	            if(reset_marti_if_loses.value > 0){
	                if(lose == reset_marti_if_loses.value){
	                	hidden_base_trade.value = base_trade.value
	                  	win = 0;
	                  	lose = 0;
	                   	var balaceafter=balance.textContent;
	      				var balacefee=balaceafter-(balaceafter*2/100)
	       				localStorage.setItem("balacefee",balacefee);
	       				ceksend=1;
	                }
	            }
	            if(if_loses.value > 0){
	                if(and_boom.value > 0){
	                  var cscs = parseInt(parseFloat(hidden_base_trade.value).toFixed(8)*parseInt(100000000));
	                  var scsc = parseInt(parseFloat(and_boom.value).toFixed(8)*parseInt(100000000));
	                  if(scsc > cscs){
	                    if(ifloss == if_loses.value){
	                      hidden_base_trade.value = and_boom.value
	                    }
	                  }
	                }
	            }
	            var cmin = Math.ceil(ch_mins.value);
				var cmax = Math.floor(ch_maxs.value);
				var chance = get_chance(cmin, cmax, 0);
	            var settings = {
				    "url": "./trade",
				    "method": "POST",
				    "timeout": 0,
				    "headers": {
				        "Content-Type": "application/json"
				    },
				    "data": JSON.stringify({
				        "base_trade": hidden_base_trade.value,
				        "chance": chance
				    }),
				  };
				  $.ajax(settings).done(function (response) {
				  	if (mystop.checked == false) {
				  		setTimeout(()=>{
					  		var sendTrade = JSON.stringify({
						  		method:"place_bet",
						  		bet_amt: parseFloat(hidden_base_trade.value).toFixed(8),
						  		coin:"DOGE",
						  		client_seed : generateClientSeed(),
						  		type:type,
						  		payout:parseFloat(response.payout).toFixed(5),
						  		winning_chance:response.chance,
						  		profit:parseFloat(response.profite).toFixed(8)
						  	})
						  	socket.send(sendTrade)
						  },delay2.value)
				  	}
				  	
				  })
	        }
	        

		}else{
			var cmin = Math.ceil(ch_mins.value);
			var cmax = Math.floor(ch_maxs.value);
			var chance = get_chance(cmin, cmax, 0);
			var settings = {
			    "url": "./trade",
			    "method": "POST",
			    "timeout": 0,
			    "headers": {
			        "Content-Type": "application/json"
			    },
			    "data": JSON.stringify({
			        "base_trade": hidden_base_trade.value,
			        "chance": chance
			    }),
			  };
			  $.ajax(settings).done(function (response) {
			  	if (mystop.checked == false) {
			  		setTimeout(()=>{
				  		var sendTrade = JSON.stringify({
					  		method:"place_bet",
					  		bet_amt: parseFloat(hidden_base_trade.value).toFixed(8),
					  		coin:"DOGE",
					  		client_seed : generateClientSeed(),
					  		type:type,
					  		payout:parseFloat(response.payout).toFixed(5),
					  		winning_chance:response.chance,
					  		profit:parseFloat(response.profite).toFixed(8)
					  	})
					  	socket.send(sendTrade)
					  },delay2.value)
			  	}
			  	
			  })
		}
		if(roll_lose >= lose_tr){
		    lose_tr = roll_lose;
		    lose_trk.innerHTML = lose_tr
		}
		  
		if(roll_win >= win_tr){
		    win_tr = roll_win;
		    win_trk.innerHTML = win_tr
		}
	}
	
});
// Event listener for when there is an error with the WebSocket connection
socket.addEventListener('error', (event) => {
  
});
// Event listener for when the connection is closed
socket.addEventListener('close', (event) => {
  
});


function shootTrade() {
    hidden_base_trade.value = shoot_input.value;
    toastSuccess("ngeshoot niyeh");
    console.log("ngeshoot niyeh")
}
function boomTrade() {
    hidden_base_trade.value = boom_input.value;
    console.log("ngeboom niyeh")
    toastSuccess("ngeboom niyeh");
}
function resetTrade() {
    hidden_base_trade.value = base_trade.value;
    console.log("ngereset niyeh")
    toastSuccess("ngereset niyeh");
}
function stopOnWinClick() {
    stop_ons_wins = true;
    console.log("stop on win niyeh")
    toastSuccess("stop on win niyeh");
}
function stop_trade(){
	btn_stop.style.display = "none"
	btn_start.style.display = "block"
	mystop.checked = true;
	toastSuccess("dahan ah");
}
function generateClientSeed() {
  let length = 64
  const characters = 'abcdefghijklmnopqrstuvwxyz0123456789';
  let clientSeed = '';
  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    clientSeed += characters.charAt(randomIndex);
  }

  return clientSeed;
}
function startTrade() {
	btn_stop.style.display = "block"
	btn_start.style.display = "none"
	toastSuccess("Gaskeun ah");
    if (isNaN(parseFloat(base_trade.value).toFixed(8))) {
    	toastError("NaN trade value")
    	return (false);
    }else{
      if(parseFloat(base_trade.value).toFixed(8) <= 0){
        toastError("Empty base trade value");
        return (false);
      }
    }
    // cek base Trade

    if (isNaN(parseFloat(shoot_input.value).toFixed(8))) {
    	toastError("NaN trade value")
    	return (false);
    }else{
      if(parseFloat(shoot_input.value).toFixed(8) <= 0){
        toastError("Empty Shoot value");
        return (false);
      }
    }
    // cek Shoot

    if (isNaN(parseFloat(boom_input.value).toFixed(8))) {
    	toastError("NaN trade value")
    	return (false);
    }else{
      if(parseFloat(boom_input.value).toFixed(8) <= 0){
        toastError("Empty Shoot value");
        return (false);
      }
    }
    // cek Shoot

    if (isNaN(parseFloat(on_win_marti.value).toFixed(8))) {
    	toastError("NaN trade value")
    	return (false);
    }else{
      if(parseFloat(on_win_marti.value).toFixed(8) <= 0){
        toastError("Empty Shoot value");
        return (false);
      }
    }
    // cek marti win

    if (isNaN(parseFloat(on_lose_marti.value).toFixed(8))) {
    	toastError("NaN trade value")
    	return (false);
    }else{
      if(parseFloat(on_lose_marti.value).toFixed(8) <= 0){
        toastError("Empty Shoot value");
        return (false);
      }
    }
    // cek marti lose

    hidden_base_trade.value = base_trade.value;

    function starts() {
    	if(delay2.value < 500){
  			var delay = 500;
        }else{
            var delay = delay2.value
        }
        
        var delay = delay2.value
        if(mystop.checked){
	        stop_trade();
	        mystop.checked = false
	        return (false);
	    }
	    if (low_ball.value > 0) {
			var pollzx = parseInt(parseFloat(low_ball.value).toFixed(8)*parseInt(100000000));
			var husx = parseInt(parseFloat(saldo)*parseInt(100000000));
		  if (husx < pollzx) {
		  	toastSuccess('Balance Below Active');
		  	stop_trade();
		  	return (false);
		  }
		}
		var cmin = Math.ceil(ch_mins.value);
		var cmax = Math.floor(ch_maxs.value);
		var bet = hidden_base_trade.value;
		var chance = get_chance(cmin, cmax, 0);
		var tebs = parseInt(parseFloat(hidden_base_trade.value)*parseInt(100000000));
		var bels = parseInt(parseFloat(saldo)*parseInt(100000000));
		if(saldo < 0.000001){
		  	mystop.checked = true;
		  	stop_trade();
		  	toastError('insufficient balance');
		  	return (false);
		}

		if(saldo < localStorage.getItem("balacefee") && ceksend == 1){
		  	mod = 1;
		  	ceksend = 0;
		}else{
		  	mod = 0;
		}

		  if(tebs > bels){
		  	bet = saldo;
		  	mod=1;	  
		  }
			    
		  if(balance.textContent <= 0){
		    mystop.checked = false
		    stop_trade();
		    toastError('insufficient balance');
		    return (false);
		  }
			
		  
		  type = get_chance(plow, pheight,0);
		  var settings = {
		    "url": "./trade",
		    "method": "POST",
		    "timeout": 0,
		    "headers": {
		        "Content-Type": "application/json"
		    },
		    "data": JSON.stringify({
		        "base_trade": hidden_base_trade.value,
		        "chance": chance
		    }),
		  };

		  $.ajax(settings).done(function (response) {
		  	var sendTrade = JSON.stringify({
		  		method:"place_bet",
		  		bet_amt: parseFloat(hidden_base_trade.value).toFixed(8),
		  		coin:"DOGE",
		  		client_seed : generateClientSeed(),
		  		type:type,
		  		payout:parseFloat(response.payout).toFixed(5),
		  		winning_chance:response.chance,
		  		profit:parseFloat(response.profite).toFixed(8)
		  	})
		  	socket.send(sendTrade)
		  	
		  });
		  
		  if (prof_glob.value > 0) {
		  	var pollz = parseInt(parseFloat(prof_glob.value).toFixed(8)*parseInt(100000000));
		  	var hus = parseInt(parseFloat(profit_global.textContent)*parseInt(100000000));
		  	if (hus > pollz) {
		  		toastError('Profit Global has been reached');
		  		stop_trade();
		          return (false);
		  	}
		  }

		  if (res_proft.value > 0){
			var pollz = parseInt(parseFloat(res_proft.value).toFixed(8)*parseInt(100000000));
		    var hus = parseInt(parseFloat(profit_sesion)*parseInt(100000000));
		    if(hus > pollz ){
		    	profit_sesion = 0;
		    	var balaceafter = balance.textContent
				var balacefee = balaceafter - (balaceafter*2/100)
				localStorage.setItem("balacefee",balacefee);
				ceksend=1;
		      hidden_base_trade.value =base_trade.value
		    }
		  }
	}
    if(mystop.checked){
      stop_trade();
      mystop.checked= false;
    }else{
      starts();
    }
}
