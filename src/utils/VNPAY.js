export const VNPAY = (total, orderId) => {
    const vnp_TmnCode = "XN8L1ZKE";
    const vnp_SecureHash = "DSAEULPHKXUNKGCRNTHLPPPGFIGBNNCL";
    const VNPAY_URL = `https://sandbox.vnpayment.vn/paymentv2/vpcpay.html?vnp_Amount=${total * 100}&vnp_Command=pay&vnp_CreateDate=vnp_CreateDate&vnp_CurrCode=VND&vnp_IpAddr=127.0.0.1&vnp_Locale=vn&vnp_OrderInfo=Thanh+toan+don+hang+%3A5&vnp_OrderType=other&vnp_ReturnUrl=https%3A%2F%2Fdomainmerchant.vn%2FReturnUrl&vnp_TmnCode=${vnp_TmnCode}&vnp_TxnRef=5&vnp_Version=2.1.0&vnp_SecureHash=${vnp_SecureHash}`;
    return VNPAY_URL;
};
