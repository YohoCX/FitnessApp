import * as promise from "bluebird"; // best promise library today
import pgPromise, { IDatabase } from "pg-promise";
import config from "../config";
import UserService from "../services/UserService";
import AuthService from "../services/AuthService";
import AuthModel from "../services/models/AuthModel";
import UserModel from "../services/models/UserModel";

interface IExtensions {
    auth: {
        query: typeof AuthModel,
        service: AuthService
    },
    user: {
        query: typeof UserModel,
        service: UserService
    }
}

export type ExtendedDatabase = IDatabase<IExtensions> & IExtensions

const initOptions: any = {
    capSQL: true,
    // Using a custom promise library, instead of the default ES6 Promise:
    promiseLib: promise,

    // Extending the database protocol with our custom repositories;
    // API: http://vitaly-t.github.io/pg-promise/global.html#event:extend
    extend(db: ExtendedDatabase, dc: any) {
        // Database Context (dc) is mainly needed for extending multiple databases with different access API.

        // Do not use 'require()' here, because this event occurs for every task and transaction being executed,
        // which should be as fast as possible.
        //  TODO: Create repo classes that include only SQL queries as methods and extend obj with repos
        db.auth = {
            query: AuthModel,
            service: new AuthService({db, pgp}),
        };
        db.user = {
            query: UserModel,
            service: new UserService({db, pgp}),
        };
    }
};

const pgp = pgPromise(initOptions)

const connectionObject = {
    host: config.database.host,
    database: config.database.name,
    user: config.database.user,
    password: config.database.password,
    port: config.database.port,
}

const db: ExtendedDatabase = pgp(connectionObject)

export default db
export { pgp }
