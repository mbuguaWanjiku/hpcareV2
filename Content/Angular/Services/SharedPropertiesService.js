//shared prpoerties clousers
app.service('validation', function () {
    var message;

    return {
        getProperty: function () {
            return message;
        },
        setProperty: function(value) {
            message = value;
        }
    };
});