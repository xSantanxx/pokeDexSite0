const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const app = express();
app.use(bodyParser.json());
const port = 3000;

const {MongoClient, ServerApiVersion} = require('mongodb');
const uri = url;
let sendData;

const storeThings = [];
let objSaved;
let userSent;
let userEmail;
let errorMsg;

let db;
let coll;

let stor1;
let stor2;

app.use(cors());


const client = new MongoClient(uri, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    }
});

async function run() {
    try{
        
        //connect the client to the server
        await client.connect();
        //send a ping to confirm a successful connection
        await client.db("admin").command({ping: 1});

        db = client.db("pokedexfiles");
        coll = db.collection("users");

        // console.log(db);
        // console.log(coll);

        console.log("Pinged your deployment. You're connected to the server");

        app.listen(port, () => {
            console.log(`backend running on ${port}`);
        });


        // return{db, coll};


        // console.log(userSent.email);

        // retrieveInfo(coll,userEmail);

        // const check = userSent.email === objSaved.email;
        // const checkPass = userSent.password === objSaved.password;
        // console.log(check);
        // console.log(checkPass);


        // // console.log(userSent);
        // // console.log(userSent.email);
        // // console.log(userSent.password);
        // if(check && checkPass){
        //     // res.send(objSaved.email + " , welcome to our system");
        //     res.send(objSaved)
        // } else {
        //     errorMsg = "there has been an error, please re-enter your details";
        //     res.send(errorMsg);
        // }

        // await sendInfo(coll, objSaved);

        // await retrieveInfo(coll,userEmail);
    } finally {
        // await client.close();
    }
}

app.get('/deleteAccount', async(req,res) => {
    const q = {email: userEmail.email};

    console.log(userEmail.email);

    const savedInfo = await coll.deleteOne({email: userEmail.email});
    console.log(savedInfo);

    let objToSent = JSON.stringify({error: "Your account has been deleted"});
    res.send(objToSent);

})


app.get('/loadPokemon', async(req, res) => {

    const q = {email: userEmail.email};

    const o = {
        projection: {pNickname: 1, pokemon: 1}
    };

    const savedInfo = await coll.findOne(q,o);

    if(savedInfo == null){
        let objToSent = JSON.stringify({error: "There's no Pokemon avaliable within your file"});
        res.send(objToSent)
    } else {
        res.send(savedInfo);
    }

})
// app.post('/saveArr', async(req, res) =>{
//     console.log(req.body);
//     await coll.updateOne(
//         {email: userEmail.email}, {
//             $set: {"pokemonData": req.body}
//         }
//     );

//     res.send('done');
// })

app.post('/savePokemon', async(req, res) => {

    const userSent2 = req.body;
    console.log(userSent2);

    const nickName = userSent2.pNickname;
    // console.log(nickName);
    // console.log(userSent2.pokemon);

    // console.log(userEmail.email);

    await coll.updateOne(
        { email: userEmail.email }, {
            $push: { "pNickname": userSent2.pNickname, "pokemon": userSent2.pokemon}
        }
    )

    // userEmail = '';


    res.send("Saved your information");
})



app.post('/editPassword', async(req, res) => {
    let info = req.body;

    const q = {password: info.oldp};

    const o = {
        projection: {email: 1, password: 1}
    };

    const checkInfoSent1 = await coll.findOne(q,o);

    console.log(checkInfoSent1);

    if(checkInfoSent1 == null){
        let objToSent = JSON.stringify({error: "That was the incorrect password"})
        res.send(objToSent);
    } else {
        const update =  await coll.updateOne(
            { email: checkInfoSent1.email}, {
                $set: {"password": info.newp}
            }
        )
        let objToSent = JSON.stringify({valid: "Your password has changed"});
        res.send(objToSent);
    }
})



//working version
app.post('/login', async (req, res) => {

        // res.json(objSaved);
        userSent = req.body;
        userEmail = userSent.email;


        

        // console.log(userEmail);

        const q = {password: userSent.password};

        // console.log(q);

        const o = {
            projection: {_id: 1, password: 1}
        };
        
        //
        const checkInfoSent1 = await coll.findOne(q,o);

        const q2 = {email: userSent.email};
        const o2 = {
            projection: {_id: 1, email: 1, firstname: 1}
        }

        const checkInfoSent2 = await coll.findOne(q2,o2);

        console.log(checkInfoSent1);
        console.log(checkInfoSent2);

        userEmail = checkInfoSent2;
        
        // //email
        // console.log(checkInfoSent2.email);
        // console.log(checkInfoSent2._id);
        // //password
        // console.log(checkInfoSent1.password);
        // console.log(checkInfoSent1._id);


        if(checkInfoSent1 == null){
            console.log("password is wrong");
            let objToSent = JSON.stringify({error : `Error is detected, ${userSent.password} is incorrect`});
            res.send(objToSent);
            if(checkInfoSent2 == null){
                let objToSent = JSON.stringify({error: `Error is detected, ${userSent.email} is incorrect as well`})
                res.send(objToSent);
                console.log("email is wrong too")
            }
        } else if (checkInfoSent2 == null){
            let objToSent = JSON.stringify({error: `Error is detected, ${userSent.email} is incorrect`})
            res.send(objToSent);
            console.log("email is wrong");
        } else {
            res.send(checkInfoSent2);
            console.log("good to go");
        }

        // if(checkInfoSent != null){
        //     console.log("done");
        //     const emailCheck = userSent.email === checkInfoSent.email;
        //     const passCheck = userSent.password === checkInfoSent.password;
        //     console.log(emailCheck);
        //     console.log(passCheck);

        //     const seeIf = userSent && checkInfoSent;
        //     console.log(seeIf);
        // } else {
        //     let string = JSON.parse(checkInfoSent);
        //     console.log(string);
        // }

        // console.log(JSON.parse(checkInfoSent.email));
        // console.log(checkInfoSent.password);


        // let objToSent;

        
        // if(emailCheck && passCheck){
        //     res.send(checkInfoSent.email);
        // } else {
        //     if(emailCheck === null){
        //         objToSent = JSON.stringify({error :`Error is detected, ${userSent.email} is incorrect`});
        //         // console.log(objToSent);
        //         // console.log(objToSent);
        //         // console.log(typeof objToSent);
        //         res.send(objToSent);
        //     } else if (passCheck === null){
        //         objToSent = JSON.stringify({error: `Error is detected, ${userSent.password} is incorrect`});
        //         res.send(objToSent);
        //     }
        // }
        // console.log(coll);

        // retrieveInfo(coll);

        // async function retrieveInfo(coll){

        // try{
        // console.log(coll);

            // const foundInfo = await checkInfoSent.toArray();

            // console.log(foundInfo);

        // } catch (err) {
        //     console.log(err);
        //     }
        // console.log(checkInfoSent);
        }
)


//working version
app.post('/send', async (req, res) => {
    // console.log(req.body);
    // storeThings.push(req.body);
    objSaved = req.body;

    const signUpInfo = await coll.insertOne(objSaved);

    // userEmail = signUpInfo;
    
    // sendInfo(coll, objSaved);
    res.send("congrats, you've sent off your information");
    // console.log(objSaved.email);
})


run();


// async function sendInfo(coll, objSaved){
//     sendData = await coll.insertOne(objSaved);
// }



// MongoClient.connect(uri, async function(err, coll){
//     const checkInfoSent = coll.findOne().project({email: "do@gmail.com"});
//     const foundInfo = await checkInfoSent.toArray();

//     console.log(foundInfo);
// })


// run().catch(console.dir);




// app.use(express.json());


// app.post('/test', (req, res) => {
//     console.log('Received: ', req.body);
//     res.send({message: 'Backend got the info'});
// });







// app.get('/', (req, res) => {
//     // res.send("done");
//     // res.send(storeThings);
//     res.json(objSaved);
// });




// app.get('/backEndServer/message', (req, res) => {
//     res.send({text: 'done'});
// });


// app.get('/', (req, res) => {
//     res.send('Hello World')
// })

// app.listen(port, () => {
//     console.log(`Example app listening on port ${port}`)
// })