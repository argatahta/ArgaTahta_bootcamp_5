const express = require("express");
const productdb = require("../models/product");

const router = express.Router();

module.exports = function () {

    
    router.get("/", (req, res) => {
        //query product
        let query = {}

        if (req.query.category) {
            query.category = req.query.category.toLowerCase()
        }
        if (req.query.category == "All Category") {
            delete query.category
        }
        //end of query product
        console.log(req.query.category)

        productdb.find(query, (error, result) => {
            if (error) {
                res.status(500).json(error);
            } else {
                res.json(result);
            }
        }).sort("-_id")
    })

    router.get("/cart", (req, res) => {
        //query product
        query={_id:{ $in: [
            req.query.id
        ]}}

        productdb.find(query, (error, result) => {
            if (error) {
                res.status(500).json(error);
            } else {
                res.json(result);
            }
        })
    })

    router.get("/:id", (req, res) => {
        productdb.findById(req.params.id, (error, result) => {
            if (error) {
                res.status(500).json(error);
            } else {
                res.json(result);
            }
        })
    })

    

    router.post("/", (req, res) => {

        if (!req.files.productPict) {
            return res.status(400).send("No files were uploaded");
        }

        let image = req.files.productPict;
        //extLast mengambil extension dari file
        let ext = image.name.split(".");
        let extLast = ext[ext.length - 1].toLowerCase();


        if (extLast == "png" || extLast == "jpg" || extLast == "jpeg" || extLast == "bmp" || extLast == "gif") {

            let imageName = Date.now() + "." + extLast;

            image.mv("./public/product/" + imageName, (error) => {
                if (error) return res.status(500).send(error);

                let newObj = new productdb({
                    name: req.body.name.toLowerCase(),
                    price: req.body.price,
                    description: req.body.description,
                    category: req.body.category,
                    productPict: "http://localhost:3000/product/" + imageName,
                    
                });

                newObj.save((error) => {
                    if (error) {
                        res.status(500).send(error);
                    } else {
                        res.json(newObj);
                    }
                });
            });

        } else {
            return res.status(400).send("File must be png, jpg, jpeg only")
        };
    });
    return router;
};