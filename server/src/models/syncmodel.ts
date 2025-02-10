import Product from "./Product"


const syncTables = async () => {
    try {
        await Product.sync()
        console.log("product table synced successfully")
    } catch (error) {
        console.log("error in syncing tables:", error)
    }
}

export default syncTables;
