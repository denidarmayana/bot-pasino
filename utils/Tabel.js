const { query } = require('./database');
module.exports = {
	InsertUsers : async(username,email,password)=>{
		try {
	      const result = await query('INSERT INTO `users`(`username`, `email`, `password`) VALUES (?,?,?)',
	      	[username,email,password]);
	      return result;
	    } catch (error) {
	      return error;
	    }
	},
	LoginUsers : async(email,password)=>{
		try {
	      const result = await query('SELECT * FROM `users` WHERE `username` = ? AND password = ?',[email,password]);
	      if (result.length == 0) {
	      	return { code: 203, message: "It seems that you have entered an invalid username / email address or password.", data: null }
	      }else{
	      	return { code: 200, message: "You have been successfully logged in.", data: result[0].email }
	      }
	    } catch (error) {
	      return error;
	    }
	}
}