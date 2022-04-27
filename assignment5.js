// REQUIRES
const express = require("express");
const app = express();
app.use(express.json());
const fs = require("fs");

// just like a simple web server like Apache web server
// we are mapping file system paths to the app's virtual paths
app.use("/js", express.static("./public/js"));
app.use("/css", express.static("./public/css"));
app.use("/img", express.static("./public/img"));

app.get("/", function (req, res) {
    console.log(process.env);
    // retrieve and send an HTML document from the file system
    let doc = fs.readFileSync("./app/html/index.html", "utf8");
    res.send(doc);
});


app.get("/appetizer", function (req, res) {

    let formatOfResponse1 = req.query["format"];

    if (formatOfResponse1 == "html") {
        res.setHeader("Content-Type", "text/html");
        res.send(fs.readFileSync("./app/data/appetizer.html", "utf8"));

    } else {
        res.send({ status: "fail", msg: "Wrong format!" });
    }
});


app.get("/dessert", function (req, res) {

    let formatOfResponse2 = req.query["format"];

        if (formatOfResponse2 == "json") {
            res.setHeader("Content-Type", "application/json");
            res.send(fs.readFileSync("./app/data/dessert.js", "utf8"));

        } else {
            // just send JSON message
            res.send({ status: "fail", msg: "Wrong format!" });
        }
    });

        // for page not found (i.e., 404)
        app.use(function (req, res, next) {
            // this could be a separate file too - but you'd have to make sure that you have the path
            // correct, otherewise, you'd get a 404 on the 404 (actually a 500 on the 404)
            res.status(404).send("<html><head><title>Page not found!</title></head><body><p>Nothing here.</p></body></html>");
        });

        // RUN SERVER
        let port = 8000;
        app.listen(port, function () {
            console.log("Example app listening on port " + port + "!");
        });
