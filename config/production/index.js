var config = {
    db : {
        mysql : {
            host     : 'localhost',
            user     : 'root',
            database : 'appdb', // you can change 'appdb' as you wish
            password : 'yourPasswordHere' // you have to change this on your MySQL's root password
        },
        mongo : 'mongodb://localhost/ourProject' // you can change 'ourProject' on you own
    },
    redis : {
        port : 6379,
        host : '127.0.0.1'
    },
    port : 3000,
    sms : {
        api_id : 'YOUR_API_ID',  //You're given this by sms.ru
        test : 1
    },
    sessionSecret: 'secretKey'
};

module.exports =  config;