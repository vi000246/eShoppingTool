$(function(){
    getExchangeRate();
    loadShoesChart();
    //查匯率
    $("#price").keyup(function() {
        calculateExchangeRate();
    });
    //算長度
    $("#ft,#inch").keyup(function() {
        calculateLength();
    });
    $("#lb,#oz").keyup(function() {
        calculateWeight();
    });
    //change事件好像監聽不到
    // $("#Currency").on('change', function() { 
    //     calculateExchangeRate();
    // });
});

function calculateWeight(){
    var lb = $("#lb").val();
    var oz = $("#oz").val();
    var answer = (parseFloat(lb)|| 0) * 453.6 + (parseFloat(oz)|| 0) * 28.35;
    answer = answer.toFixed(2);
    $("#weightResult").html(answer);
}

function calculateLength(){
    var ft = $("#ft").val();
    var inch = $("#inch").val();
    if(inch.indexOf(",")>-1){
        $("#ft").val("");
        $("#ft").prop('disabled', true);
        var arr = inch.split(',');
        var answer = "";
        console.log(arr);
        for (let i = 0; i < arr.length; ++i) {
            answer += ((parseFloat(arr[i])|| 0) * 2.54).toFixed(2);
            if(i != (arr.length-1)){
                answer +=" x ";
            }
        }

        $("#lengthResult").html(answer);
    }else{
        $("#ft").prop('disabled', false);
        var answer = (parseFloat(ft)|| 0) * 30.48 + (parseFloat(inch)|| 0) * 2.54;
        answer = answer.toFixed(2);
        $("#lengthResult").html(answer);
    }

    
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

function loadShoesChart(){
    $.getJSON("shoesChart.json", function(json) {
        console.log(json); // this will show the info it in firebug console
    });
}