var express = require('express');
var jwt = require('jsonwebtoken');
var bcrypt = require('bcrypt');
var mysql = require('mysql');
var app = express();
const bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var nodemailer = require('nodemailer');
const saltRounds = 10;

app.use(express.json())
app.set('view engine', 'ejs');
app.use(cookieParser())
app.engine('html', require('ejs').renderFile);
app.use(bodyParser.urlencoded({extended:true}))

var con = mysql.createConnection({
    host: "localhost",
    user:'root',
    database: "internshala",
	password: "",
    debug : false,
    dateStrings : true
  });

function isLoggedIn(req, res, next){
    var cookie = req.cookies;
     if(cookie){
         var token = cookie.accesstoken;
         jwt.verify(token, "thisisthesecretkey", (err,decoded)=>{
             if(err){
                 req.user=false;
             }
             else{
                 req.user = decoded.id;
             }
         });
    }
    else{
         req.user=false;
    }
    next();
}  

app.get('/', isLoggedIn, function(req,res){
    if(req.user==false){var LoggedIn = false;}
    else{LoggedIn = true;}
    con.query(`SELECT * from internship`,function(err,result){
        res.render('index.ejs',{LoggedIn: LoggedIn, result:result})
    })
});

app.post('/', isLoggedIn, function(req,res){
    if(req.user==false){var LoggedIn = false;}
    else{LoggedIn = true;}
    con.query(`SELECT * from internship where stipend = '${req.body.stipend}', profile = '${req.body.profile}', city = '${req.body.location}'`,function(err,result){
        res.render('index.ejs',{LoggedIn: LoggedIn, result:result})
    })
});

app.get('/studentlogin', isLoggedIn, function(req,res){
    if(req.user==false){var LoggedIn = false;}
    else{LoggedIn = true;}
    res.render('studentlogin.ejs',{LoggedIn:LoggedIn})
});

app.post('/studentlogin', isLoggedIn, function(req,res){
    if(req.user==false){var LoggedIn = false;}
    else{LoggedIn = true;}
    var email = req.body.email;
    var password = req.body.password;
        if(!email || !password){
            res.render('studentlogin.ejs',{message:'Fill all details.',LoggedIn:LoggedIn})
        }else{
        con.query(`SELECT * FROM student_registeration WHERE email = '${email}'`,function(err,result){
                if(result.length === 0){
                    res.render('studentlogin.ejs',{message:'email not registered',LoggedIn:LoggedIn})
                }else{
                    bcrypt.compare(password, result[0].password, function(err, correct) {    
                        if(correct==true){   
                            var token=jwt.sign({id:result[0].sno}, "thisisthesecretkey", {
                                expiresIn: "30d",
                            });
                            res.cookie('accesstoken', token, { maxAge: 1000*60*60*24*30, httpOnly:true});
                            res.redirect('/')
                    }
                })
                }
        
            
        })
        }
  
});

app.get('/studentregister',isLoggedIn, function(req,res){
    if(req.user==false){var LoggedIn = false;}
    else{LoggedIn = true;}
    res.render('studentregister.ejs',{message:'',LoggedIn:LoggedIn})
});

app.post('/studentregister', isLoggedIn, function(req,res){
    if(req.user==false){var LoggedIn = false;}
    else{LoggedIn = true;}
    var email = req.body.email;
    var fname = req.body.fname;
    var lname = req.body.lname;
    var password = req.body.password;

    if(!email || !password || !fname || !lname){
        res.render('studentregister.ejs',{message:'please fill all details',LoggedIn:LoggedIn})
    }else{
        con.query(`SELECT * FROM student_registeration WHERE email = '${email}'`,function(err,result){
            if(result.length > 0){
                res.render('studentregister.ejs',{message:'Email already in use.',LoggedIn:LoggedIn})
            }else{
                bcrypt.hash(password, saltRounds, function(err, hash){
                con.query(`INSERT INTO student_registeration (email, fname, lname, password) VALUES ('${req.body.email}','${req.body.fname}','${req.body.lname}', '${hash}')`)
                con.query(`CREATE table '${fname}' (
                    designation varchar(50),
                    firstname varchar(50),
                    lastname varchar(50),
                    initials varchar(10),
                    mobilenumber int(100),
                    firstcity varchar(50),
                    secondcity varchar(50),
                    bloglink varchar(255),
                    githublink varchar(255),
                    playstore varchar(255),
                    behance varchar(255)
                    
                ) `)
                return res.redirect('/');            
                });
            }
        })
    }
});

app.get('/employerlogin', isLoggedIn, function(req,res){
    if(req.user==false){var LoggedIn = false;}
    else{LoggedIn = true;}
    res.render('employerlogin.ejs',{LoggedIn:LoggedIn})
});

app.post('/employerlogin', isLoggedIn, function(req,res){
    if(req.user==false){var LoggedIn = false;}
    else{LoggedIn = true;}
    var email = req.body.email;
    var password = req.body.password;
        if(!email || !password){
            res.render('employerlogin.ejs',{message:'Fill all details.'})
        }else{
        con.query(`SELECT * FROM employer_registration WHERE email = '${email}'`,function(err,result){
                if(result.length === 0){
                    res.render('employerlogin.ejs',{message:'email not registered',LoggedIn:LoggedIn})
                }else{
                    bcrypt.compare(password, result[0].password, function(err, correct) {    
                        if(correct==true){   
                            var token=jwt.sign({id:result[0].sno}, "thisisthesecretkey", {
                                expiresIn: "30d",
                            });
                            res.cookie('accesstoken', token, { maxAge: 1000*60*60*24*30, httpOnly:true});
                            res.redirect('/home/employer')
                    }
                })
                }
        
            
        })
        }
});

app.get('/employerregister', isLoggedIn, function(req,res){
    if(req.user==false){var LoggedIn = false;}
    else{LoggedIn = true;}
    res.render('employerregister.ejs',{message:'',LoggedIn:LoggedIn})
});

app.post('/employerregister', isLoggedIn, function(req,res){
    if(req.user==false){var LoggedIn = false;}
    else{LoggedIn = true;}
    var email = req.body.email;
    var phone = req.body.phone;
    var fname = req.body.fname;
    var lname = req.body.lname;
    var password = req.body.password;

    if(!email || !phone || !password || !fname || !lname){
        res.render('employerregister.ejs',{message:'please fill all details',LoggedIn:LoggedIn})
    }else{
        con.query(`SELECT * FROM employer_registration WHERE email = '${email}'`,function(err,result){
            if(result.length > 0){
                res.render('employerregister.ejs',{message:'Email already in use.',LoggedIn:LoggedIn})
            }else{
                bcrypt.hash(password, saltRounds, function(err, hash){
                con.query(`INSERT INTO employer_registration (email, phone, fname, lname, password) VALUES ('${req.body.email}', '${req.body.phone}','${req.body.fname}','${req.body.lname}', '${hash}')`)

                // async function main() {
                // let testAccount = await nodemailer.createTestAccount();

                // let transporter = nodemailer.createTransport({
                //     host: "smtp.ethereal.email",
                //     port: 587,
                //     secure: false, // true for 465, false for other ports
                //     auth: {
                //     user: testAccount.user, // generated ethereal user
                //     pass: testAccount.pass, // generated ethereal password
                //     },
                // });
                // let info = await transporter.sendMail({
                //     from: '"Fred Foo 👻" <foo@example.com>', // sender address
                //     to: "bar@example.com, baz@example.com", // list of receivers
                //     subject: "Hello ✔", // Subject line
                //     text: "Hello world?", // plain text body
                //     html: "<b>Hello world?</b>", // html body
                // });

                // console.log("Message sent: %s", info.messageId);
                // console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
                // }

                // main().catch(console.error);

               
                res.redirect('/')
                });
            }
        })
    }
    
    
});

app.get('/home/employer',isLoggedIn, function(req,res){
    if(req.user==false){var LoggedIn = false;}
    else{LoggedIn = true;}
    if(req.user==false){
        res.redirect('/')
    }else{
        res.render('employer.ejs',{LoggedIn:LoggedIn})
    }
    
})

app.get('/internship/form',isLoggedIn, function(req,res){
    if(req.user==false){var LoggedIn = false;}
    else{LoggedIn = true;}
    res.render('internshipform.ejs',{LoggedIn:LoggedIn})
})

app.post('/internship/form',isLoggedIn, function(req,res){
    if(req.user==false){var LoggedIn = false;}
    else{LoggedIn = true;}
    con.query(`INSERT INTO internship (userid, profile, internshiptype, covid19, time, city, openings, startdate, durationnumber, durationspan, responsibility, stipend, currency_internship, amount_internship, fixed_span, nego_currency, nego_amount1, nego_amount2, nego_span, minperfo_currency, minperfo_amount, minperfo_span, incperfo_currency, incperfo_amount, incperfo_why, perks, ppo, skills required, women, questions) VALUES ('${req.user}', '${req.body.sales}', '${req.body.regular}', '${req.body.detail}', '${req.body.parttime}', '${req.body.city}', '${req.body.opening}', '${req.body.immediate}', '${req.body.durationinnumber}', '${req.body.durationin}', '${req.body.responsibility}', '${req.body.stipend}', '${req.body.currency}', '${req.body.duration}', '${req.body.currency}', '${req.body.amount1}', '${req.body.amount}', '${req.body.amount1}', '${req.body.duration}', '${req.body.currency}', '${req.body.duration}', '${req.body.currency}', '${req.body.amount}', '${req.body.incentive}', '${req.body.otherinc}', '${req.body.perks}', '${req.body.ppo}', '${req.body.skills}', '${req.body.women}', '${req.body.question}') `)
    res.render('internshipform.ejs',{LoggedIn:LoggedIn})
})

app.get('/logout', function(req, res){
    res.clearCookie('accesstoken');
    res.redirect('/');
});

app.get('/student/education_details',isLoggedIn,function(req,res){
    if(req.user==false){var LoggedIn = false;}
    else{LoggedIn = true;}
    res.render('educationaldetails.ejs',{LoggedIn:LoggedIn});
});

app.post('/student/education_details',isLoggedIn,function(req,res){
    if(req.user==false){var LoggedIn = false;}
    else{LoggedIn = true;}
    res.render('educationaldetails.ejs',{LoggedIn:LoggedIn});
});

app.get('/student/worksample',isLoggedIn,function(req,res){
    if(req.user==false){var LoggedIn = false;}
    else{LoggedIn = true;}
    res.render('worksample.ejs',{LoggedIn:LoggedIn});
});

app.post('/student/worksample',isLoggedIn,function(req,res){
    if(req.user==false){var LoggedIn = false;}
    else{LoggedIn = true;}
    res.render('worksample.ejs',{LoggedIn:LoggedIn});
});

app.get('/student/skills',isLoggedIn,function(req,res){
    if(req.user==false){var LoggedIn = false;}
    else{LoggedIn = true;}
    res.render('skills.ejs',{LoggedIn:LoggedIn});
});

app.post('/student/skills',isLoggedIn,function(req,res){
    if(req.user==false){var LoggedIn = false;}
    else{LoggedIn = true;}
    res.render('skills.ejs',{LoggedIn:LoggedIn});
});

app.get('/student/personaldetails',isLoggedIn,function(req,res){
    if(req.user==false){var LoggedIn = false;}
    else{LoggedIn = true;}
    res.render('personaldetails.ejs',{LoggedIn:LoggedIn});
});

app.post('/student/personaldetails',isLoggedIn,function(req,res){
    if(req.user==false){var LoggedIn = false;}
    else{LoggedIn = true;}
    res.render('personaldetails.ejs',{LoggedIn:LoggedIn});
});

app.get('/student/experience',isLoggedIn,function(req,res){
    if(req.user==false){var LoggedIn = false;}
    else{LoggedIn = true;}
    res.render('experience.ejs',{LoggedIn:LoggedIn});
});

app.post('/student/experience',isLoggedIn,function(req,res){
    if(req.user==false){var LoggedIn = false;}
    else{LoggedIn = true;}
    res.render('experience.ejs',{LoggedIn:LoggedIn});
});

app.get('/student/preference',isLoggedIn,function(req,res){
    if(req.user==false){var LoggedIn = false;}
    else{LoggedIn = true;}
    res.render('preferences.ejs',{LoggedIn:LoggedIn});
});

app.post('/student/preference',isLoggedIn,function(req,res){
    if(req.user==false){var LoggedIn = false;}
    else{LoggedIn = true;}
    con.query(`SELECT * from preference where userid ='${req.user}'`,function(err, result){
        if(result.length > 0){
            con.query(`UPDATE preference set internshiporjob = '${req.body.internshiporjob}', internshiptype = '${req.body.internshiplooking}', jobtype = '${req.body.joblooking}', preference1 = '${req.body.preference1}', preference2 = '${req.body.preference2}', preference3 = '${req.body.preference3}', yesno = '${req.body.openfor}' where userid = '${req.user}' `)
        }else{
            con.query(`INSERT into preference (userid, internshiporjob, internshiptype, jobtype, preference1, preference2, preference3, yesno ) VALUES ('${req.user}', '${req.body.internshiporjob}','${req.body.internshiplooking}','${req.body.joblooking}','${req.body.preference1}','${req.body.preference2}','${req.body.preference3}','${req.body.openfor}') `)
        }
    })
    res.render('preferences.ejs',{LoggedIn:LoggedIn});
});

app.listen(8000,function(){
    console.log('server is online');
});
