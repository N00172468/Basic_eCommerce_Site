$(document).ready(function() {
  console.log("Testing, 123");

  /**
   * REQUESTING TO JSON FILE
   * 
   * @ref - https://www.codegrepper.com/code-examples/delphi/read+json+file+with+vanilla+javascript
   * 
   * - Fetching data from JSON File.
   */
  $.getJSON("watches.json", function(json) {
  
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
   * - Changing the left canvas background colour depending if it's the "For Him"/"For Her" section.
   */
  $('#men').css("background-color", "#839deb");
  $('#women').css("background-color", "#e73895");
});

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
