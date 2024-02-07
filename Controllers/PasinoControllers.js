const Pasino = require('../pasino')
const Tabel = require("../utils/Tabel")

module.exports = {
	Login :  async (req,res)=>{
		try {
		  const { email,password } = req.body;
		  const resultDB = await Tabel.LoginUsers(email,password);
		  //const resultDB = await Pasino.Login.action(email,password);
	      if (resultDB.code == 200) {
	      	res.json({ code: 200, message: resultDB.message, data: resultDB.data });
	      }else{
	      	res.json({ code: 203, message: resultDB.message, data: null });
	      }
	    } catch (error) {
	      console.error(error);
	      res.json({ code: 200, message: "An error occurred, please try again", data: error });
	    }
	},
	Auth :  async (req,res)=>{
		try {
		  const { email,password } = req.body;
		  const resultDB = await Pasino.Login.action(email,password);
	      if (resultDB.success == true) {
	      	res.json({ code: 200, message: resultDB.message, data: resultDB.token });
	      }else{
	      	res.json({ code: 203, message: resultDB.message, data: null });
	      }
	    } catch (error) {
	      console.error(error);
	      res.json({ code: 200, message: "An error occurred, please try again", data: error });
	    }
	},
	Register :  async (req,res)=>{
		try {
		  const {username,email,password } = req.body;
	      const result = await Pasino.Register.action(username,email,password);
	      if (result.success == true) {
	      	await Tabel.InsertUsers(username,email,password);
	      	res.json({ code: 200, message: result.message, data: result.token });
	      }else{
	      	res.json({ code: 203, message: result.message, data: null });
	      }
	      
	    } catch (error) {
	      console.error(error);
	      res.json({ code: 203, message: "An error occurred, please try again", data: error });
	    }
	},
	Token :  async (req,res)=>{
		try {
		  const {token } = req.body;
	      const result = await Pasino.Token.action(token);
	      if (result.success == true) {
	      	res.json({ code: 200, message: "Socket token successfully created", data: result.socket_token });
	      }else{
	      	res.json({ code: 203, message: result.message, data: null });
	      }
	    } catch (error) {
	      console.error(error);
	      res.json({ code: 200, message: "An error occurred, please try again", data: error });
	    }
	},
	Deposit :  async (req,res)=>{
		try {
		  const {token,coin } = req.body;
	      const result = await Pasino.Deposit.action(token,coin);
	      if (result.success == true) {
	      	res.json({ code: 200, message: "Coin wallet address created successfully", data: {address:result.address,qr:result.qr} });
	      }else{
	      	res.json({ code: 203, message: result.message, data: null });
	      }
	    } catch (error) {
	      console.error(error);
	      res.json({ code: 200, message: "An error occurred, please try again", data: error });
	    }
	},
	Withdraw :  async (req,res)=>{
		try {
		  const {token,coin,address,amount } = req.body;
	      const result = await Pasino.Withdraw.action(token,coin,address,amount);
	      if (result.success == true) {
	      	res.json({ code: 200, message: result.message, data: null });
	      }else{
	      	res.json({ code: 203, message: result.message, data: null });
	      }
	    } catch (error) {
	      console.error(error);
	      res.json({ code: 200, message: "An error occurred, please try again", data: error });
	    }
	},
	Transfer :  async (req,res)=>{
		try {
		  const {token,coin,username,amount } = req.body;
	      const result = await Pasino.Transfer.action(token,coin,username,amount);
	      if (result.success == true) {
	      	res.json({ code: 200, message: result.message, data: null });
	      }else{
	      	res.json({ code: 203, message: result.message, data: null });
	      }
	    } catch (error) {
	      console.error(error);
	      res.json({ code: 200, message: "An error occurred, please try again", data: error });
	    }
	},
}