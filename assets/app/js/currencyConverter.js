var template;

$(document).ready(function () {

    $.ajax({
        url: 'https://currencyconverter.p.mashape.com/availablecurrencies/',
        dataType: 'json',
        headers: {
            'X-Mashape-Key': 'Bs5BvTwMeNmshIVgyxatfWRfPMkNp1Dmi30jsnLUNZ8zyDyBW8'
        }
    })
	.done(function (data) {

	    for (var i = 0; i < data.length; i++) {
	        var elem = document.createElement('option');
	        $('.currency-selecter')
			.append($(elem)
			.attr('value', data[i].id).text(data[i].description.slice(4)));
	    }
	});

    $('.currency-From').on('keyup', function (e) {
        clearTimeout($.data(this, 'timer'));
        if (e.keyCode == 13) {
            getConvertedCurrencyVal();
        }
        else
            $(this).data('timer', setTimeout(getConvertedCurrencyVal, 200));
    });

    $(".js-currencyFrom").change(function () {
        getConvertedCurrencyVal();
    });

    $(".js-currencyTo").change(function () {
        getConvertedCurrencyVal();
    });

    function getConvertedCurrencyVal() {
        var fromCurrency = $('.js-currencyFrom :selected').val();
        var toCurrency = $('.js-currencyTo :selected').val();

        var fromamount = $('.currency-From').val();

        if (fromamount === '') {
            $('.js-error-message').text("Please Enter Amount to be Converted!!");
        } else {

            $('.js-error-message').text("");
            var amount = parseInt(fromamount);

            $.ajax({
                url: 'https://currencyconverter.p.mashape.com/?from=' + fromCurrency +
                    '&from_amount=' + amount + '&to=' + toCurrency,
                dataType: 'json',
                headers: {
                    'X-Mashape-Key': 'Bs5BvTwMeNmshIVgyxatfWRfPMkNp1Dmi30jsnLUNZ8zyDyBW8'
                }
            })
           .done(function (data) {

               if (data.error !== undefined) {

                   $('.js-error-message').innerHTML("Invalid Input");

               } else {

                   $('.currency-converted-box').val(data.to_amount);
               }
           });
        }
       
    }
});