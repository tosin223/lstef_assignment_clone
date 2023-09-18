/**
 * Created by Babatunde on 25/10/2017.
 */
document.addEventListener("DOMContentLoaded", function(event) {
    document.getElementById("submit").addEventListener("click", function() {

        var email = (jQuery("#email").val());
        var fname = (jQuery("#fullname").val());
        var phone = (jQuery("#phonenumber").val());
        var amount = (jQuery("#amount").val());
        var curr = jQuery("#select_currency").val();

        var chargeResponse = "";
        var trxref = "rave-checkout-1519024422";
           // pubkey = "FLWPUBK-33de7ae20a8f1a1a2daafb5c07a5da59-X";
        var PBFKey = "FLWPUBK-33de7ae20a8f1a1a2daafb5c07a5da59-X";
        getpaidSetup({
            customer_email: email,//
            amount: amount,
            currency: curr,
            customer_phone:phone,
            customer_firstname:fname,
            country: "NG",
            custom_logo: "https://lsetf.ng/sites/files/lsetf-flutter.png",
            custom_description:"",
            custom_title: "LAGOS STATE EMPLOYMENT TRUST FUND",
            txref: trxref,
            PBFPubKey: PBFKey,
            onclose: function(response) {},
            callback: function(response) {
            
                if(response.data.data.responsecode =='00') {
                    var name = fname;
                    var respcode = response.data.data.responsecode;
                    var respmsg = response.data.data.responsemessage;                    ;
                    var ip = response.data.tx.IP;
                    var AccountId = response.data.tx.AccountId;
                    var acctvalrespcode = response.data.tx.acctvalrespcode;
                    var amount = response.data.tx.amount;
                    var appfee = response.data.tx.appfee;
                    var authModelUsed = response.data.tx.authModelUsed;
                    var currency = response.data.tx.currency;
                    var flwRef = response.data.tx.flwRef;
                    var transactionId = response.data.tx.id;
                    var orderRef = response.data.tx.orderRef;
                    var paymentId = response.data.tx.paymentId;
                    var paymentType = response.data.tx.paymentType;
                    var txRef = response.data.tx.txRef;
                    var updatedAt = response.data.tx.updatedAt;
                    var fullname = response.data.tx.customer.fullName;
                    var embedToken = response.data.tx.chargeToken.embed_token;
                    var user_token = response.data.tx.chargeToken.user_token;

                    var  _data = {
                        'name':fname,
                        'user_token': user_token,
                        'embed_token': embedToken,
                        'fullname': fullname,
                        'updatedAt': updatedAt,
                        'txRef': txRef,
                        'paymentType': paymentType,
                        'paymentId': paymentId,
                        'orderRef': orderRef,
                        'transactionId': transactionId,
                        'flwRef': flwRef,
                        'currency': currency,
                        'authModelUsed': authModelUsed,
                        'appfee': appfee,
                        'amount': amount,
                        'acctvalrespcode': acctvalrespcode,
                        'accountId': AccountId,
                        'ip': ip,
                        'respcode': respcode,
                        'respmsg': respmsg,
                        'phonenumber': phone,
                        'email':email
                    };
                    var castTojson = JSON.stringify(_data);
                    jQuery.ajax({
                        url: "https://lsetf.ng/api/sendpayment.php",
                        type: "POST",
                        data: castTojson,
                        contentType: "application/x-www-form-urlencoded",
                        success: function(data) {
                            
                            var parsed = jQuery.parseJSON(JSON.stringify(data));


                        },
                        error: function(resp) {
                            console.log(resp);
                        }
                    });

                } else {
                    // redirect to a failure page.
                }
            }
        });
    });
});




