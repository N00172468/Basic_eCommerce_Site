/** 
 * CHECKOUT SIDE-MODAL FORM
 * 
 * @ref - John Dempsey "register-form-02.html"
 * @ref - https://getbootstrap.com/docs/4.0/components/forms/
 * 
 * - Must be in js file and not in separate html file due to how the Checkout modal button is in the cart and the cart itself is in the js file due to how it pulls data from the json. 
 */
const checkoutForm = () => `
  <div class="modal right" id="myModal2" tabindex="-1" role="dialog" aria-labelledby="myModalLabel2">
    <div class="modal-dialog" role="document">
      <div class="modal-content">

        <div class="modal-header justify-content-end">
          <h4 class="modal-title" id="myModalLabel2">Checkout</h4>
        </div>

        <div class="modal-body">

          <form novalidate id='registrationForm' action="#" enctype="multipart/form-data">
            <div class="radiobuttons">
              <div class="form-check">
                <input class="form-check-input" type="radio" name="card_type" id="visa" value="visa">
                <label class="form-check-label" for="visa">
                  VISA
                </label>
              </div>

              <div class="form-check">
                <input class="form-check-input" type="radio" name="card_type" id="mastercard" value="mastercard">
                <label class="form-check-label" for="mastercard">
                  Mastercard
                </label>
              </div>

              <div class="form-check">
                <input class="form-check-input" type="radio" name="card_type" id="amex" value="amex">
                <label class="form-check-label" for="amex">
                  American Express
                </label>
              </div>
              <span class="error"></span>
            </div>

            <br />

            <div class="form-group form-field">
              <label for="card_number">Card Number</label>
              <input aria-label="required" type="number" name="card_number" class="form-control" id="card_number" placeholder="Card Number">
              <span class="error" aria-live="polite"></span>
            </div>

            <div class="form-row">
              <div class="form-group col-md-6 form-field">
                <label for="card_expiry">Card Expiry</label>
                <input type="email" name="card_expiry" class="form-control" id="card_expiry" placeholder="MM/YY" maxlength="5" pattern="[0-9]{2}\/[0-9]{2}">
                <span class="error" aria-live="polite"></span>
              </div>

              <div class="form-group col-md-6 form-field">
                <label for="card_security">Security Code</label>
                <input type="number" name="card_security" class="form-control" id="card_security" placeholder="CVV" min="0" max="9999" step="1">
                <span class="error" aria-live="polite"></span>
              </div>
            </div>

            <div class="form-group form-field">
              <label for="card_name">Cardholder</label>
              <input type="text"  name="card_name" class="form-control" id="card_name" placeholder="Name of Cardholder" maxlength="64">
              <span class="error" aria-live="polite"></span>
            </div>
            
            <div class="form-field">
              <button type="submit" name="submit" value="Submit" class="btn btn-primary">Submit</button>
            </div>
          </form>
        
        </div>

      </div>
    </div>
  </div>
`

/**
 * CREDIT CARD VALIDATION
 *
 * @ref - John Dempsey "register-form-02.js"
 *
 */
function checkCardType() {
  checkCardNumber();
  checkCardSecurity();
}

function checkCardNumber() {
  let constraints = {
    visa: {
      regexp: "^4[0-9]{12}(?:[0-9]{3})?$",
      message:
        "All Visa card numbers start with a 4. New cards have 16 digits; old cards have 13 digits. Please check your VISA card number.",
    },
    mastercard: {
      regexp:
        "^(?:5[1-5][0-9]{2}|222[1-9]|22[3-9][0-9]|2[3-6][0-9]{2}|27[01][0-9]|2720)[0-9]{12}$",
      message:
        "MasterCard numbers either start with 51-55 or 2221-2720. All have 16 digits. Please check your MasterCard card number.",
    },
    amex: {
      regexp: "^3[47][0-9]{13}$",
      message:
        "American Express card numbers start with 34 or 37 and have 15 digits. Please check your American Express card number.",
    },
  };

  let cardNumberField = $("#card_number")[0];
  let cardNumberError = $("#card_number + span.error")[0];
  let cardNumber = cardNumberField.value;
  if (cardNumber.length > 0) {
    let checkedCards = $("input[name=card_type]:checked");
    if (checkedCards.length === 1) {
      let cardTypeField = $("input[name=card_type]:checked")[0];
      let cardType = cardTypeField.value;
      let constraint = new RegExp(constraints[cardType].regexp, "");
      if (!constraint.test(cardNumber)) {
        let message = constraints[cardType].message;
        cardNumberError.textContent = message;
        cardNumberField.setCustomValidity(message);
      } else {
        cardNumberError.textContent = "";
        cardNumberField.setCustomValidity("");
      }
    } else {
      let message = "Select a card type to validate your card number.";
      cardNumberError.textContent = message;
      cardNumberField.setCustomValidity(message);
    }
  }
}

function checkCardExpiry() {
  let cardExpiryField = $("#card_expiry")[0];
  let cardExpiryError = $("#card_expiry + span.error")[0];
  if (!cardExpiryField.validity.valid) {
    if (cardExpiryField.validity.patternMismatch) {
      cardExpiryError.textContent = `Card Expiry should be two digits, a forward slash /, and two digits.`;
    }
  } else {
    let month = parseInt($("#card_expiry").val().split("/")[0]);
    let year = parseInt("20" + $("#card_expiry").val().split("/")[1]);
    let today = new Date();
    let thisMonth = today.getMonth() + 1;
    let thisYear = today.getFullYear();
    if (
      (year === thisYear && month < thisMonth) ||
      year < thisYear ||
      (year > thisYear && !(1 <= month && month <= 12))
    ) {
      let message = `Card Expiry should be valid date in the future.`;
      cardExpiryError.textContent = message;
      cardExpiryField.setCustomValidity(message);
    } else {
      cardExpiryError.textContent = "";
    }
  }
}

function checkCardSecurity() {
  let constraints = {
    visa: {
      regexp: "^[0-9]{3}$",
      message:
        "The CVV code for your card should have exactly 3 digits and nothing else. Please check your CVV code.",
    },
    mastercard: {
      regexp: "^[0-9]{3}$",
      message:
        "The CVV code for your card should have exactly 3 digits and nothing else. Please check your CVV code.",
    },
    amex: {
      regexp: "^[0-9]{4}$",
      message:
        "The CVV code for your card should have exactly 4 digits and nothing else. Please check your CVV code.",
    },
  };

  let cardSecurityField = $("#card_security")[0];
  let cardSecurityError = $("#card_security + span.error")[0];
  let cardSecurity = cardSecurityField.value;
  if (cardSecurity.length > 0) {
    let checkedCards = $("input[name=card_type]:checked");
    if (checkedCards.length === 1) {
      let cardTypeField = $("input[name=card_type]:checked")[0];
      let cardType = cardTypeField.value;
      let constraint = new RegExp(constraints[cardType].regexp, "");
      if (!constraint.test(cardSecurity)) {
        let message = constraints[cardType].message;
        cardSecurityError.textContent = message;
        cardSecurityField.setCustomValidity(message);
      } else {
        cardSecurityError.textContent = "";
        cardSecurityField.setCustomValidity("");
      }
    } else {
      let message = "Select a card type to validate your card number.";
      cardSecurityError.textContent = message;
      cardSecurityField.setCustomValidity(message);
    }
  }
}

function checkCardName() {
  let cardNameField = $("#card_name")[0];
  let cardNameError = $("#card_name + span.error")[0];
  if (!cardNameField.validity.valid) {
    if (cardNameField.validity.tooLong) {
      cardNameError.textContent = `Card name should be at most ${cardNameField.maxLength} characters; you entered ${cardNameField.value.length}.`;
    }
  } else {
    cardNameError.textContent = "";
  }
}

$("input[name=card_type]").on("change", checkCardType);
$("input#card_number").on("blur", checkCardNumber);
$("input#card_expiry").on("blur", checkCardExpiry);
$("input#card_security").on("blur", checkCardSecurity);
$("input#card_name").on("blur", checkCardName);
