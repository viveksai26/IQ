module.exports.envConfig = {
    host: process.env.RDS_HOSTNAME,
    user: process.env.RDS_USERNAME,
    password: process.env.RDS_PASSWORD,
    port: process.env.RDS_PORT
}
module.exports.localConfig = {
    connectionLimit: 100,
    host: 'ec2-13-126-181-206.ap-south-1.compute.amazonaws.com',
    user: 'vivek',
    password: 'saivivek',
    database: 'iq',
    port: 3306
}