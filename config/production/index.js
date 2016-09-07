var config = {
    db : {
        mysql : {
            host     : 'localhost',
            user     : 'root',
            database : 'appdb', // можете заменить 'appdb' на свое название
            password : 'yourPasswordHere' // замените это на root пароль
        },                                // от MySQL Server
        mongo : 'mongodb://localhost/ourProject' // можете заменить 'ourProject'
    },                                           // на свое название
    redis : {
        port : 6379,
        host : '127.0.0.1'
    },
    port : 3000,
    sms : {
        api_id : 'YOUR_API_ID',  //Выдается при регистрации на sms.ru
        test : 1
    }
};

module.exports =  config;