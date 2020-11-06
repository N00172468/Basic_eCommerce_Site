$(document).ready(function() {
  console.log("Testing, 123");

  /**
   * REQUESTING TO JSON FILE
   * 
   * @ref - https://www.codegrepper.com/code-examples/delphi/read+json+file+with+vanilla+javascript
   * 
   * - Getting data from JSON File.
   * - Count as AJAX?
   */
  $.getJSON("watches.json", function(json) {
    console.log('Objects: ', json); // This will show the info it in firebug console
  
    // var myJSON = JSON.stringify(json);
    // console.log('JSON: ', myJSON);

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
              onclick="fillEmptyCanvas(${JSON.stringify(item).replace(/"/g, '\'') /**<----- This turns json into a string and replaces these "" with these '' : The reason for this is to stop it breaking the HTML, the /"/g is regex and means all " in the string. '\'' is just ' in quotes but we have to use \ to stop it from closing the quotes*/})">
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
      $("img", "#men").mouseenter(function(e) {
        $(this).css("width", "290");
      }).mouseout(function(e) {
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
      $("img", "#women").mouseenter(function(e) {
        $(this).css("width", "290");
      }).mouseout(function(e) {
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
 * SELECTING & FILTERING ELEMENTS
 */
function fillEmptyCanvas(item){
  console.log('Chosen Object: ', $("div", "#emptyCanvas"));
  
  $("#emptyCanvas").html(`
    <div class="row emptyCanvas">
      <div class="col">
        <img src="${item.image}" width="350"/>
      </div>
      
      <div class="col emptyCanvas viewContent">
        <p>
        <span class="darkGold">${item.name}</span> 
  
        <br/> 
        ${item.manufacturer}
  
        <br />
        €${item.price}
  
        <br/>
        <button 
          class="btn btn-outline-dark loginBtn" 
          type="button"
          onclick="fillEmptyCart(${JSON.stringify(item).replace(/"/g, '\'')})">
            Add to Cart
        </button>
      </p>
      </div>
    </div>

  `);
};

/**
 * CART MODAL
 */
function fillEmptyCart(item){
  $("#cart").html(`
    <button type="button" class="btn btn-outline-dark loginBtn" data-toggle="modal" data-target="#exampleModal">
      <a class="rightNav" href="#" id="cart">
        Cart 
        <svg width="1em" height="1em" viewBox="0 0 16 16" class="bi bi-bag-plus" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
          <path fill-rule="evenodd" d="M8 1a2.5 2.5 0 0 0-2.5 2.5V4h5v-.5A2.5 2.5 0 0 0 8 1zm3.5 3v-.5a3.5 3.5 0 1 0-7 0V4H1v10a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V4h-3.5zM2 5v9a1 1 0 0 0 1 1h10a1 1 0 0 0 1-1V5H2z"/>
          <path fill-rule="evenodd" d="M8 7.5a.5.5 0 0 1 .5.5v1.5H10a.5.5 0 0 1 0 1H8.5V12a.5.5 0 0 1-1 0v-1.5H6a.5.5 0 0 1 0-1h1.5V8a.5.5 0 0 1 .5-.5z"/>
        </svg>
      </a>
    </button>
    
    <div class="modal fade" id="exampleModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLabel">Cart</h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">

            <div class="row emptyCanvas">
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
          
                <br/>
                <button class="btn btn-outline-danger loginBtn" type="button">
                  Remove
                </button>
              </p>
              </div>
            </div>

          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
            <button type="button" class="btn btn-primary">Checkout</button>
          </div>
        </div>
      </div>
    </div>
  `);
}



