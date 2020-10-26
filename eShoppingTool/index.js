$(function(){
    getExchangeRate();
    //查匯率
    $("#calculateExchangeRateBtn").click(function() {
        var currency = $("#Currency").val();
        var price = $("#price").val()
        
    });
});

function getExchangeRate(){
    $.ajax({
        type: "GET",
        url: 'https://rate.bot.com.tw/xrt',
        success: function (data) {
            var html = new DOMParser().parseFromString(data, "text/html");
            var currencyMap = new Map();
            $(".table  tr",html).each(function(i,obj) {
                //找出幣別
                var currency = $(obj).find("td.currency > div > div:eq(2)").text().trim();
                if(currency){
                    //找出匯率
                    var rate = $($(obj).find("td.rate-content-cash")[0]).text();
                    if(rate && !isNaN(rate)){
                        currencyMap.set(currency,rate);
                    }
                }
                
                
            });
            //將找到的幣別跟匯率存進map
            console.log(currencyMap);
        },
        error: function (xhr, ajaxOptions, thrownError) {
            console.log('xHR: ' + xhr);
            console.log('ajaxOption: ' + ajaxOptions);
            console.log('thrownError: ' + thrownError);
        }
       });
}