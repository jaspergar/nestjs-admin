import { MysqlConnectionOptions } from "typeorm/driver/mysql/MysqlConnectionOptions"

 const config : MysqlConnectionOptions = {

     type : "mysql",
     host : "db",
     port : 3306,
     username : "root",
     password : "",
     database: 'admin',
    //  entities : ["dist/**/*.entity{.ts,.js}"],
    //  autoLoadEntities: true,
     synchronize : true,
    //  migrations:[
    //      'dist/src/db/migrations/*.js'
    //  ],
    //  cli:{
    //     migrationsDir: 'src/db/migrations'
    //  }
    
}

export default config