import { StartAPIServer } from "./api/api.js"; // Sempre colocar extenção do module (não é igual golang :<)
import { config } from 'dotenv'
import { connect_db } from "../db/database.js";
config()
 

async function main() {
    // App listening
    StartAPIServer();

    // DB connection
    connect_db();
}
main().catch(console.dir)