$(document).ready(function() {
  console.log("Testing, 123");

  /**
   * REQUESTING TO JSON FILE
   * 
   * @ref - https://www.codegrepper.com/code-examples/delphi/read+json+file+with+vanilla+javascript
   * 
   * - Getting data from JSON File.
   */
  $.getJSON("watches.json", function(json) {
    console.log('Objects: ', json); // This will show the info it in firebug console
  
    // If #men, run this:
    json.mens.forEach(item => {
      $('#men').append(
        `
        <hr class="divider" />

        <div class="row">
          <img src="${item.image}" width="150"/>
          <p class="contents">
            ${item.name} 

            <br/>
            ${item.manufacturer}

            <br />
            €${item.price}

            <br/>
            
            <button 
              class="btn btn-outline-dark loginBtn" 
              type="button" 
              onclick="fillEmptyCanvas(${JSON.stringify(item).replace(/"/g, '\'')})">
                View
            </button>
            
            <button 
              class="btn btn-outline-dark loginBtn" 
              type="button"
              onclick="fillEmptyCart(${JSON.stringify(item).replace(/"/g, '\'')})">
                Add to Cart
            </button>
          </p>
        </div>
        
        <hr class="divider" />
        `
      );

      // Animation Function:
      $("img", "#men").mouseenter(function() {
        $(this).css("width", "290");
      }).mouseout(function() {
        $(this).css("width", "150");
      });
    });

    // If #women, run this:
    json.women.forEach(item => {
      $('#women').append(
        `
        <hr class="divider" />

        <div class="row">
          <img src="${item.image}" width="175"/>
          <p class="contents">
            ${item.name} 

            <br/> 
            ${item.manufacturer}

            <br />
            €${item.price}

            <br/>
            <button 
              class="btn btn-outline-dark loginBtn" 
              type="button" 
              onclick="fillEmptyCanvas(${JSON.stringify(item).replace(/"/g, '\'')})">
                View
            </button>
            
            <button 
              class="btn btn-outline-dark loginBtn" 
              type="button"
              onclick="fillEmptyCart(${JSON.stringify(item).replace(/"/g, '\'')})">
              Add to Cart
            </button>
          </p>
        </div>

        <hr class="divider" />
        `
      );

      // Animation Function:
      $("img", "#women").mouseenter(function() {
        $(this).css("width", "290");
      }).mouseout(function() {
        $(this).css("width", "175");
      });
    });

    // Styles:
    $('.contents').css('margin', 'auto');
    $('.contents').css('color', 'black');
    $('.contents').css('font-family', 'Poppins');
    $('.contents').css('font-size', '20px');
  });

  /**
   * DOM MANIPULATION
   * 
   * Changing the left canvas background colour depending if it's the "For Him"/"For Her" section.
   */
  $('#men').css("background-color", "#839deb");
  $('#women').css("background-color", "#e73895");
});

/**
 * CART MODAL
 * 
 * Event Handling
 */
function fillEmptyCart(item) {
  console.log('Object added to Cart: ', $("div", "#cartContent"));

  $("#cart").html(`
    <button type="button" class="btn btn-outline-dark cartBtn loginBtn" data-toggle="modal" data-target="#exampleModal">
      <a class="rightNav" href="#" id="cart">
        <span class="badge cartBadge active">1</span>
        <span class="btnTitle">Item Added</span> 
        <span>
          <svg width="1em" height="1em" viewBox="0 0 16 16" class="bi bi-bag-plus" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
            <path fill-rule="evenodd" d="M8 1a2.5 2.5 0 0 0-2.5 2.5V4h5v-.5A2.5 2.5 0 0 0 8 1zm3.5 3v-.5a3.5 3.5 0 1 0-7 0V4H1v10a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V4h-3.5zM2 5v9a1 1 0 0 0 1 1h10a1 1 0 0 0 1-1V5H2z"/>
            <path fill-rule="evenodd" d="M8 7.5a.5.5 0 0 1 .5.5v1.5H10a.5.5 0 0 1 0 1H8.5V12a.5.5 0 0 1-1 0v-1.5H6a.5.5 0 0 1 0-1h1.5V8a.5.5 0 0 1 .5-.5z"/>
          </svg>
        </span>
      </a>
    </button>
    
    <div class="modal fade" id="exampleModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
      <div class="modal-dialog" role="document">
        <div class="modal-content" style="background-color: #f0f0f0">
          <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLabel">Cart</h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            ${watchHTML(item)}
          </div>

          <div class="modal-footer">
            <button 
              type="button" 
              class="btn btn-primary"
              data-toggle="modal" 
              data-target="#myModal2">
                Checkout
            </button>
            ${checkoutForm()}
          </div>
        </div>
      </div>
    </div>
  `);
}

/**
 * DELETE FUNCTION
 */
function deleteContent() {
  console.log('Object removed from Cart: ', $("div", "#cartContent"));
  $("#cartContent").remove();
  $('#exampleModal').modal('toggle')
  
}

$(document).on("click", ".removeBtn", function(e) {
  var badge = $(".cartBadge")
  var btnTitle = $(".btnTitle");


  // Once user clicks the "Remove" button in the cart, update modal button to this:
  btnTitle.text("Empty");
  badge.text('');
  $(this).removeClass('active');
  })

// Reusable Component:
const watchHTML = (item) => `
  <div id="cartContent" class="row emptyCanvas">
    <div class="col">
      <img src="${item.image}" width="200"/>
    </div>
  

    <div class="col emptyCanvas viewContent">
      <p>
        <span class="darkGold">${item.name}</span> 

        <br/> 
        ${item.manufacturer}

        <br />
        €${item.price}
      </p>

      <button 
        id="cartContent"
        class="btn btn-outline-danger loginBtn removeBtn" 
        type="button"
        onclick="deleteContent()">
          Remove
      </button>
    </div>
  </div>
`

/** 
 * CHECKOUT SIDE-MODAL FORM
 * 
 * @ref - John Dempsey "register-form-02.html"
 * @ref - https://getbootstrap.com/docs/4.0/components/forms/
 * 
 * - Must be within js file and not separate html file dur to how the Checkout modal button is in the cart and the cart itself is in the js file due to how it pulls data from json. 
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
 * - Includes Nested Loops
 */
// $(document).ready(function () {
  function checkCardType() {
    checkCardNumber();
    checkCardSecurity();
  }

  function checkCardNumber() {
    let constraints = {
      "visa" : {
        "regexp" : '^4[0-9]{12}(?:[0-9]{3})?$',
        "message": 'All Visa card numbers start with a 4. New cards have 16 digits; old cards have 13 digits. Please check your VISA card number.'
      },
      "mastercard" : {
        "regexp" : '^(?:5[1-5][0-9]{2}|222[1-9]|22[3-9][0-9]|2[3-6][0-9]{2}|27[01][0-9]|2720)[0-9]{12}$',
        "message": 'MasterCard numbers either start with 51-55 or 2221-2720. All have 16 digits. Please check your MasterCard card number.'
      },
      "amex" : {
        "regexp" : '^3[47][0-9]{13}$',
        "message": 'American Express card numbers start with 34 or 37 and have 15 digits. Please check your American Express card number.'
      }
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
        }
        else {
          cardNumberError.textContent = "";
          cardNumberField.setCustomValidity("");
        }
      }
      else {
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
    }
    else {
      let month = parseInt($("#card_expiry").val().split("/")[0]);
      let year = parseInt("20" + ($("#card_expiry").val().split("/")[1]));
      let today = new Date();
      let thisMonth = today.getMonth() + 1;
      let thisYear = today.getFullYear();
      if ((year === thisYear && month < thisMonth) || (year < thisYear) || (year > thisYear && !(1 <= month && month <= 12))) {
        let message = `Card Expiry should be valid date in the future.`;
        cardExpiryError.textContent = message;
        cardExpiryField.setCustomValidity(message);
      }
      else {
        cardExpiryError.textContent = "";
      }
    }
  }

  function checkCardSecurity() {
    let constraints = {
      "visa" : {
        "regexp" : '^[0-9]{3}$',
        "message": 'The CVV code for your card should have exactly 3 digits and nothing else. Please check your CVV code.'
      },
      "mastercard" : {
        "regexp" : '^[0-9]{3}$',
        "message": 'The CVV code for your card should have exactly 3 digits and nothing else. Please check your CVV code.'
      },
      "amex" : {
        "regexp" : '^[0-9]{4}$',
        "message": 'The CVV code for your card should have exactly 4 digits and nothing else. Please check your CVV code.'
      }
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
        }
        else {
          cardSecurityError.textContent = "";
          cardSecurityField.setCustomValidity("");
        }
      }

      else {
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
        cardNameError.textContent = `Card name should be at most ${ cardNameField.maxLength } characters; you entered ${ cardNameField.value.length }.`;
      }
    }
    else {
      cardNameError.textContent = "";
    }
  }

  $("input[name=card_type]").on("change", checkCardType);
  $("input#card_number").on("blur", checkCardNumber);
  $("input#card_expiry").on("blur", checkCardExpiry);
  $("input#card_security").on("blur", checkCardSecurity);
  $("input#card_name").on("blur", checkCardName);
// });