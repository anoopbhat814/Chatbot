require("dotenv").config();
require('./database/databaseConn')
const express = require("express");
const cors = require("cors");
const passport = require("passport");
const { swaggerServe, swaggerSetup } = require("./config");
const authRoute = require("./routes/auth");
const UserRouter = require('./routes/userRouter');
const UserBoxRouter = require('./routes/userChatboxRouter');
const ChatRouter = require('./routes/chatRouter');
const cookieSession = require("cookie-session");
const passportStrategy = require("./passport");
const bodyParser = require("body-parser");
const ResRouter = require("./routes/responseRouter");
const app = express();

app.use(
	cookieSession({
		name: "session",
		keys: ["cyberwolve"],
		maxAge: 24 * 60 * 60 * 100,
	})
);

app.use("/api-docs", swaggerServe, swaggerSetup);

app.use(passport.initialize());
app.use(passport.session());

app.use(
	cors({
		origin: "http://localhost:3000",
		methods: "GET,POST,PUT,DELETE",
		credentials: true,
	})
);


app.use(express.json({ limit: '200mb' }));
  app.use(bodyParser.urlencoded({ extended: false }));
  app.use(bodyParser.json({ limit: "200mb" }));




app.get("/",(req,res)=>{
    res.send("Hello")
})

app.use('/user',UserRouter)
app.use('/chatbox',UserBoxRouter)
app.use('/chat',ChatRouter)
app.use('/response',ResRouter)


app.use("/auth", authRoute);



module.exports=app;


