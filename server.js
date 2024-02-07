const{ server,app, express } = require("./utils/server")
const BigNumber = require('bignumber.js');
const path = require('path')
const bodyParser = require('body-parser')
const router = require('./routes')

const PORT = process.env.PORT || 3000;
  
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');
app.use('/assets', express.static('./views/assets'));
app.use(router)


app.post('/trade', (req, res) => {
	const betAmt = new BigNumber(parseFloat(req.body.base_trade).toFixed(8));
	const winningChance = parseFloat(req.body.chance).toFixed(2);
	const actualPayout = new BigNumber(95).dividedBy(winningChance).toFixed(5);
	const profit = new BigNumber(betAmt).multipliedBy(actualPayout).minus(betAmt).toFixed(8);
	res.json({profite:profit,payout:actualPayout,base:req.body.base_trade,chance:req.body.chance});
});

app.get('/', (req, res) => {
	res.render("home");
});
app.get('/setting', (req, res) => {
	res.render("setting");
});
app.get('/wallet', (req, res) => {
	res.render("wallet");
});
app.get('/profile', (req, res) => {
	res.render("profile");
});
app.get('/auth', (req, res) => {
	res.render("login");
});

app.get('/register', (req, res) => {
	res.render("register");
});

app.get('/socket', (req, res) => {
	res.render("index",{data:req.query});
});

app.get('/manifest.json', (req, res) => {
  const manifestPath = path.join(__dirname, 'views', 'assets', 'manifest.json');
  res.sendFile(manifestPath);
});

server.listen(PORT, () => {
	console.log(`Server listening on port ${PORT}`);
});