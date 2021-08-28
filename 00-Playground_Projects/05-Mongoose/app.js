/**
 * This code is implementation of the code found here : https://mongoosejs.com/docs/index.html
 * Title : Mongoose Quick Start 
 * Run : node app.js 
 * Output : List of documents saved to playground-mongoose Database
 */
const mongoose = require("mongoose");

mongoose.connect("mongodb+srv://amuhammad:24Aug1989@arif-cluster0.r4goo.mongodb.net/playground-mongoose?authSource=admin&replicaSet=Arif-Cluster0-shard-0&readPreference=primary&appname=MongoDB%20Compass&ssl=true", { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log("connected");

        // Test database 
        const kittySchema = new mongoose.Schema({
            name: String
        })

        // NOTE: methods must be added to the schema before compiling it with mongoose.model()
        kittySchema.methods.speak = function() {
            const greeting = this.name ?
                "Meow name is " + this.name :
                "I don't have a name";
            console.log(greeting);
        }
        kittySchema.methods.saved = function() {
            const greeting = this.name + ' has been saved to the Database'
            console.log(greeting);
        }
        const Kitten = new mongoose.model('Kitten', kittySchema)
        const silence = new Kitten({ name: 'Silence' });
        console.log(silence.name); // 'Silence'

        const fluffy = new Kitten({ name: 'fluffy' });
        fluffy.speak();

        // Save to Database 
        fluffy.save(function(err, fluffy) {
            if (err) return console.error(err);
            fluffy.saved();
        });

        // Show the list of all kittens
        Kitten.find((err, docs) => {
            if (err) {
                console.log(`Error: ` + err)
            } else {
                if (docs.length === 0) {
                    console.log("No docs found")
                } else {
                    console.log(docs)
                }
            }
        });

    }).catch((err) => {
        console.log("Error connecting to MongoDB", err)
    })