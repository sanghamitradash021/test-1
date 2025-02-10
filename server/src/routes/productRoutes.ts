import express from "express"
import controller from "./controller/productController"


router.post("/new", (req, res) => {
    controller.add(req, res);
});
