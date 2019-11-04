$(() => {

    Stripe.setPublishableKey('pk_test_ZpQDxEv7e07NQhX6rZtXOsMK00Ofjdt9oO')

    const stripeResponseHandler = (status, response) => {
        const $form = $('#payment-form')
        if (response.error) {
            console.log(`Stripe error: ${response.error.message}`);
            $('#payErr').prop("style", "")
            debugger
            $form.find('.payment-errors').text(response.error.message)
            $('#cardSubmit').prop('disabled', false)
        }
        else {
            const token = response.id
            $form.append($('<input type="hidden" name="stripeToken" />').val(token))
            $form.get(0).submit()
        }
    }


    $("#payment-form").submit(function () {
        console.log('Clicked pay')
        event.preventDefault();
        let cardNumber = $('#card-number').val()
        let cvcCode = $('#card-cvc').val()
        let expMonth = $('#card-expiry-month-year').val().slice(0, 2)
        let expYear = $('#card-expiry-month-year').val().slice(2, 4)

        $('#cardSubmit').prop('disabled', true)

        Stripe.card.createToken({
            number: cardNumber,
            cvc: cvcCode,
            exp_month: expMonth,
            exp_year: expYear
        }, stripeResponseHandler)

    });


})

