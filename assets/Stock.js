var source = $("#stockTemplate").html();
var template = Handlebars.compile(source);

var sourceCurrency = $("#currencyconvertorTemplate").html();
var currencytemplate = Handlebars.compile(sourceCurrency);

$(document).ready(function() {

   
    $('#getquote').bind("click", function () {

        //var settings = {
        //    "async": true,
        //    "crossDomain": true,
        //    "url": "http://stockvider.p.mashape.com/indicator/DATA/AAPL/",
        //    "method": "GET",
        //    "headers": {
        //        "content-type": "application/csv",
        //        "x-mashape-key": "Bs5BvTwMeNmshIVgyxatfWRfPMkNp1Dmi30jsnLUNZ8zyDyBW8",
        //        "cache-control": "no-cache"
        //    }
        //}

        //$.ajax(settings).done(function (response) {

        //    var today = response.Dataset[0].High;
        //    var previous = response.Dataset[1].High;

        //    var result = template({
        //        Today: today,
        //        Previous: previous
        //    });

            var today = data.Dataset[0].High;
            var previous = data.Dataset[1].High;

            var result = template({
                Today: today,
                Previous: previous
            });
            $('#getquoteresult').html(result);
        });

    $('#getcurrency').bind("click", function () {

        var inputcurrencyAmt = $('#inputcurrency').val();

        var inrRate = currencydata.to_amount;

        var result = currencytemplate({
            currencyresult: inrRate * inputcurrencyAmt
    });
        $('#getcurrencyresult').html(result);
    });

    });

var currencydata = {
    "from": "USD",
    "to": "INR",
    "from_amount": 1,
    "to_amount": 67.769026762035
};

var data = {
    "Query": {
        "Stock": "AAPL",
        "Indicator": "Raw_data",
        "Start_date": "1900-01-01",
        "End_date": "2050-01-01"
    },
       "Information": {
           "Stock": "AAPL",
           "Oldest_date": "1980-12-12",
           "Newest_date": "2016-02-03",
           "Refreshed_at": "2016-02-03"
       },
       "Dataset": [
           {
               "Volume": "44913700.000",
               "High": "96.840",
               "Low": "94.080",
               "Date": "2016-02-03",
               "Close": "96.350",
               "Open": "95.000"
           },
           {
               "Volume": "36180980.000",
               "High": "96.040",
               "Low": "94.280",
               "Date": "2016-02-02",
               "Close": "94.480",
               "Open": "95.420"
           }]
};

//Handlebars.registerHelper('fullName', function (person) {
//    return person.firstName + " " + person.lastName;
//});


