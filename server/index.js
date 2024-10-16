import express from 'express';
import cors from "cors";
import bodyParser from 'body-parser';
import env from "dotenv";
import pg from "pg";
import bcrypt from "bcrypt";
import session from 'express-session';
import passport from 'passport';
import LocalStrategy from "passport-local";
import Razorpay from "razorpay";
import crypto from "crypto";
import sendEmail from "./sendEmai.js";
import verifyTeam from './teamVerify.js';
import ForgetPass from './ForgetPass.js';
import RedisStore from 'connect-redis';
import redis from 'redis';



env.config();

// Connect to Database...............
const db = new pg.Client({
    connectionString: process.env.DATABASE_URL,
    ssl: { rejectUnauthorized: false },
});


db.connect((err) => {
    if (err) {
        console.log("not connected", err)
    }
    else {
        console.log("connected")

    }
});
const app = express();
const port = process.env.PORT;
// const __dirname = path.resolve();

// Middleware.............
app.use(cors({
    origin: process.env.CORS_ORIGIN,  // Allow frontend origin
    methods: ['GET', 'POST'],         // Allow specific HTTP methods
    credentials: true,
}));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));


// Session Cookies......
const redisClient = redis.createClient();
app.use(session({
    store: new RedisStore({ client: redisClient }),
    secret: process.env.SERCRET_KEY,
    resave: false,
    saveUninitialized: false,
    cookie: { secure: true } // Set to true if using HTTPS
}));

// Passport Initialize......
passport.use(passport.initialize());
passport.use(passport.session());

// Saltrounds for Salting......
const saltrounds = Number(process.env.SALTVALUE)

// Payment....................................................

app.post('/order', async (req, res) => {
    try {
        const razorpay = new Razorpay({
            key_id: process.env.RAZORPAY_KEY_ID,
            key_secret: process.env.RAZORPAY_KEY_SECRET,
        });

        const options = req.body;
        const order = await razorpay.orders.create(options);
        if (!order) {
            return res.status(500).send("error")

        }
        else {
            res.json(order)
        }
    }
    catch (error) {
        // console.log(error);
        return res.status(500).send("error")
    }
});

app.post('/verify-payment', (req, res) => {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;

    // Construct the signature string
    const generatedSignature = crypto.createHmac('sha256', process.env.RAZORPAY_KEY_SECRET)
        .update(razorpay_order_id + "|" + razorpay_payment_id)
        .digest('hex');

    // Compare generated signature with the received signature
    if (generatedSignature === razorpay_signature) {
        res.json({ status: 'success', message: 'Payment is valid' });
    } else {
        res.json({ status: 'failed', message: 'Payment validation failed' });
    }
});

// Routes
app.get("/", async (req, res) => {
    try {

        // console.log("Fetching events...");
        const response = await db.query("SELECT * FROM events ORDER BY id DESC");
        const result = response.rows;
        res.json(result);
    } catch (error) {
        console.log("Database query error:", error);
        res.status(500).json("Database query failed");
    }
});


app.post("/participate", async (req, res) => {
    const { Id } = req.body
    try {
        const response = await db.query("SELECT * FROM events WHERE id=$1", [Id])
        const result = response.rows[0];
        res.json(result)
    } catch (error) {
        console.log("error");
    }
});

app.post("/addEvent", async (req, res) => {
    // console.log(req.body.addevent.name)
    const { name, date, time, venueName, prize, registrationFee, registrationDeadline, image, organizerName, organizerContact, email, NumMember } = req.body.addevent;

    try {

        await db.query(
            "INSERT INTO events (event_name, organizer_name, image, fee, winner, organizer_contact, registration_deadline, location, date, time,organizer_email, nummember) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10,$11,$12)", [name, organizerName, image, registrationFee, prize, organizerContact, registrationDeadline, venueName, date, time, email, NumMember]
        );
        res.json("event added")
    } catch (error) {
        console.log(error)
    }
});

app.post("/verify-email", async (req, res) => {
    const { ema, pas } = req.body

    try {
        const response = await db.query("SELECT * FROM members WHERE email=$1", [ema])
        const result = response.rows;

        if (result.length === 0) {
            res.status(200).json('User registered! Please verify your email.');
            await sendEmail(ema, pas);

        } else {

            res.json("account exits");
        }
    } catch (error) {
        console.log(error)
    }


})

app.get("/signup/:ema/:pas", async (req, res) => {
    const { ema, pas } = req.params
    res.render("./verification.ejs", { link: 'https://gaming-1.onrender.com/' });
    try {
        const response = await db.query("SELECT * FROM members WHERE email=$1", [ema])
        const result = response.rows;

        if (result.length === 0) {

            bcrypt.hash(pas, saltrounds, async (err, hash) => {
                if (err) {
                    console.log("error hashing passowrd", err);
                } else {
                    await db.query("INSERT INTO members (email,password) VALUES($1,$2)", [ema, hash])
                    console.log("account created")
                }
            });
        } else {

            console.log("account exits");
        }
    } catch (error) {
        console.log(error)
    }
})

app.post("/delete", async (req, res) => {
    const { id } = req.body;

    try {
        await db.query("DELETE FROM events WHERE id=$1", [id]);
        res.json("Deleted");

    } catch (error) {
        res.json(error);
    }
})

app.post("/update", async (req, res) => {

    // Destructure addevent and Id separately
    const { name, date, time, venueName, prize, registrationFee, registrationDeadline, image, organizerName, organizerContact, NumMember } = req.body.addevent;
    const { Id } = req.body;

    try {
        await db.query(
            "UPDATE events SET event_name = $1, organizer_name = $2, image = $3, fee = $4, winner = $5, organizer_contact = $6, registration_deadline = $7, location = $8, date = $9, time = $10,  nummember=$11 WHERE id = $12",
            [name, organizerName, image, registrationFee, prize, organizerContact, registrationDeadline, venueName, date, time, NumMember, Id]
        );
        res.json("Event updated successfully");
    } catch (error) {

        res.json("hello", error);
    }
});

app.post("/edit", async (req, res) => {
    const { Id } = req.body;

    try {
        const response = await db.query("SELECT * FROM events WHERE id=$1", [Id]);
        const result = response.rows;

        res.json(result[0])
    } catch (error) {
        res.json(error)
    }
})
// PASSPORT CONFIGURATION..........................

passport.use(new LocalStrategy(async (username, password, done) => {
    try {
        const result = await db.query("SELECT * FROM members WHERE email=$1", [username]);
        const user = result.rows[0];

        if (!user) {
            try {
                const response = await db.query("SELECT * FROM admin WHERE useremail=$1", [username])
                const result = response.rows;

                if (result.length === 0) {
                    return done(null, false, { message: "Not Exist" });
                }
                else {
                    const hashpassword = result[0].userpassword;
                    bcrypt.compare(password, hashpassword, (err, admin) => {
                        if (err) {

                            return done(err);
                        }
                        if (admin) {
                            return done(null, result[0], { message: "Admin Exists" })
                        } else {
                            return done(null, false, { message: "Wrong Admin Password" })
                        }
                    })
                }
            } catch (error) {
                return done(error);
            }
            // return done(null, false, { message: "incorrect email" });
        } else {
            const hashpassword = user.password;
            bcrypt.compare(password, hashpassword, (err, result) => {
                if (err) {
                    res.json("error comparing passowrd", err);
                }
                if (result) {

                    return done(null, user, { message: "user hai" });
                } else {
                    return done(null, false, { message: "wrong password" })
                }
            })
        }

    } catch (error) {
        return done(err);
    }


}))


passport.serializeUser((user, done) => {
    return done(null, user.id);

});

passport.deserializeUser(async (id, done) => {
    try {
        const result = await db.query("SELECT * FROM members id=$1", [id]);
        const user = result.rows[0];
        if (!user) {
            return done(null.false);
        }
        return done(null, user);
    } catch (error) {
        return done(error);
    }
});

app.post("/register", (req, res, next) => {
    passport.authenticate('local', (err, user, info) => {
        if (err) {
            return next(err); // If there's an error, pass it to the next middleware
        }
        if (!user) {
            // If no user is found, send the failure message (info.message) back to the client
            if (info.message === "Not Exist") {
                res.json({ message: "no account" })

            } else if (info.message === "Wrong Admin Password") {
                res.json({ message: "Wrong Admin Password" })
            }
            else if (info.message === "wrong password") {
                res.json({ message: "wrong password" })
            }
        } else {
            if (info.message === "Admin Exists") {
                const useremail = user.useremail;
                res.json({ message: "Admin Exists", adminEmail: useremail });
                // res.redirect("/login", { adminEmail: useremail })

            }
            else {
                res.json({ message: "logined" });
            }



        }
    })(req, res, next);
});

app.post("/eventMai", async (req, res) => {

    const { TeamName, LeaderName, LeaderEmail, Event_name, teamMembers } = req.body.formData;
    await verifyTeam(teamMembers);
    try {
        await db.query(
            "INSERT INTO register (team_name, leader_name, leader_email,team_members,event_name) VALUES ($1, $2, $3, $4, $5)", [TeamName, LeaderName, LeaderEmail, teamMembers.length, Event_name]
        );
        teamMembers.map(async (member) => {
            await db.query(
                "INSERT INTO team_members (team_name, leader_name,event_name,member_name,member_email) VALUES ($1, $2, $3, $4, $5)", [TeamName, LeaderName, Event_name, member.name, member.email]
            );

        });
        res.json("Participated")



    } catch (error) {

        res.status(500).send("error sending team Details")
    }
});

app.get("/member-verify/:email", (req, res) => {
    res.render("./teamverification.ejs", { link: 'https://gaming-1.onrender.com/' });
})

app.post("/forget-password", async (req, res) => {

    const { mail, pass } = req.body
    try {

        const response = await db.query("SELECT * FROM members WHERE email=$1", [mail])
        const result = response.rows;

        if (result.length === 0) {
            res.json("account does not exist");
        } else {
            bcrypt.hash(pass, saltrounds, async (err, hash) => {
                if (err) {
                    res.status(500).json("error hashing passowrd", err);
                } else {

                    await ForgetPass(mail, hash)
                    res.status(200).json('verify');
                }
            });
        }
    } catch (error) {
        res.status(500).json("Error changing Password. Please try again later!")
    }
})

app.get("/change/:mail/:hash", async (req, res) => {
    const { mail, hash } = req.params
    console.log("change");
    try {
        await db.query("UPDATE members SET password=$1 WHERE email=$2", [hash, mail])

        res.render("./passverification.ejs", { link: 'https://gaming-1.onrender.com/' });
    } catch (error) {

        res.status(500).json(error)
    }
})

app.post("/team-validate", async (req, res) => {
    const { LeaderEmail, Event_name } = req.body;

    try {
        const response = await db.query("SELECT * FROM register WHERE leader_email=$1", [LeaderEmail])
        const result = response.rows;

        if (result.length === 0) {
            return res.json("No team exist");
        }

        let participated = false;
        // Iterate over the result to check if any event matches the Event_name
        result.forEach((event) => {
            if (event.event_name === Event_name) {
                participated = true;
            }
        });
        if (participated) {
            return res.json("Participated");
        } else {
            return res.json("No Participation");
        }
    } catch (error) {
        return res.status(500).json({ error: "An error occurred during team validation" });
    }
});

app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});
