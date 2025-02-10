"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Product_1 = __importDefault(require("./Product"));
const syncTables = async () => {
    try {
        await Product_1.default.sync();
        console.log("product table synced successfully");
    }
    catch (error) {
        console.log("error in syncing tables:", error);
    }
};
exports.default = syncTables;
