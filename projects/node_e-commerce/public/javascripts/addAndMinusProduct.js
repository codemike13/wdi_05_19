let amount = parseInt($('#total').text())
let price = parseFloat($('#priceValue').val())

$("#minus").click(function () {
    if (amount === 1) {
        $('#total').text(amount)
        $('#quantity').val(amount)
        $('#priceValue').val(price)
        // return;
    } else {
        $('#total').text(--amount)
        $('#quantity').val(amount)
        $('#priceValue').val((price * amount).toFixed(2))
    }
})
$("#plus").click(function () {
    $('#total').text(++amount)
    $('#quantity').val(amount)
    $('#priceValue').val((price * amount).toFixed(2))

})

