var source = $("#stockTemplate").html();
var template = Handlebars.compile(source);

$(document).ready(function() {

    $('#getquote').bind("click", function() {

        var ticker = $('#stockinput').val();

        var today = new Date();
        today.setDate(today.getDate() - 3);
        var yesterday = new Date(today);
        yesterday.setDate(today.getDate() - 1);
        var formattedTodayDate = today.toISOString().slice(0, 10);
        var formattedYesterdayDate = yesterday.toISOString().slice(0, 10);

        var settings = {
            "async": true,
            "crossDomain": true,
            "url": "https://stockvider.p.mashape.com/indicator/DATA/" + ticker + '/?end_date=' + formattedTodayDate + '&start_date=' + formattedYesterdayDate,
            "method": "GET",
            "headers": {
                "content-type": "application/csv",
                "x-mashape-key": "Bs5BvTwMeNmshIVgyxatfWRfPMkNp1Dmi30jsnLUNZ8zyDyBW8",
                "cache-control": "no-cache"
            }
        }

        $.ajax(settings).done(function(response) {

            if (response.Error !== undefined) {

                $('#searchstockResult').html('<font color="red">' + response.Error + '</font>');

            } else {

                var result;

                if (response.Dataset === undefined) {

                    result = "No Updates on Stock Market Today";

                } else {

                    var today = response.Dataset[0].High;
                    var previous = response.Dataset[1].High;

                    result = template({
                        Today: today,
                        Previous: previous
                    });

                    
                }
               
                $('#searchstockResult').html(result);
            }
           
        });
    });
        $('#getcurrency').bind("click", function() {

            var inputcurrencyAmt = $('#inputcurrency').val();

            var inrRate = currencydata.to_amount;

            var result = currencytemplate({
                currencyresult: inrRate * inputcurrencyAmt
            });
            $('#getcurrencyresult').html(result);
        });

});


