$(function(){
    getExchangeRate();
    //查匯率
    $("#price").keyup(function() {
        calculateExchangeRate();
    });
    //算長度
    $("#ft,#inch").keyup(function() {
        calculateLength();
    });
    //change事件好像監聽不到
    // $("#Currency").on('change', function() { 
    //     calculateExchangeRate();
    // });
});

function calculateLength(){
    var ft = $("#ft").val();
    var inch = $("#inch").val();
    console.log(parseFloat(ft) + "  " + parseFloat(inch));
    var answer = (parseFloat(ft)|| 0) * 30.48 + (parseFloat(inch)|| 0) * 2.54;
    answer = answer.toFixed(2);
    $("#lengthResult").html(answer);
}

function calculateExchangeRate(){
    var currency = $("#Currency").val();
    var price = $("#price").val();
    var rate = window.currencyMap.get(currency.trim());
    console.log(rate+" "+price)
    if(rate && !isNaN(price)){
        var answer = parseFloat(price) * parseFloat(rate);
        answer = answer.toFixed(2);
        //add comma to answer
        $("#exchangeRateResult").html(answer.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","));
    }
}

function getExchangeRate(){
    $.ajax({
        type: "GET",
        url: 'https://rate.bot.com.tw/xrt',
        success: function (data) {
            var html = new DOMParser().parseFromString(data, "text/html");
            window.currencyMap = new Map();
            $(".table  tr",html).each(function(i,obj) {
                //找出幣別
                var currency = $(obj).find("td.currency > div > div:eq(2)").text().trim();
                if(currency){
                    //找出匯率
                    var rate = $($(obj).find("td.rate-content-cash")[0]).text();
                    if(rate && !isNaN(rate)){
                        //取出幣別括號裡的英文簡寫 ex.USD TWD
                        var shortName = currency.match(/\((\w+)\)/);
                        window.currencyMap.set(shortName[1],rate);
                    }
                }
                
                
            });
            //將找到的幣別跟匯率存進map
            console.log(window.currencyMap);
        },
        error: function (xhr, ajaxOptions, thrownError) {
            console.log('xHR: ' + xhr);
            console.log('ajaxOption: ' + ajaxOptions);
            console.log('thrownError: ' + thrownError);
        }
       });
}