// Define an interface that describes the structure of your DB config
interface DbConfig {
  HOST: string;
  USER: string;
  PASSWORD: string;
  DB: string;
  dialect: string;
  pool: {
    max: number;
    min: number;
    acquire: number;
    idle: number;
  };
}

// Create a config object with the `DbConfig` type
const dbConfig: DbConfig = {
  HOST: "localhost",
  USER: "root",
  PASSWORD: "root",
  DB: "custweb",
  dialect: "mysql",
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  }
};

export default dbConfig;
