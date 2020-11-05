/**
 * SELECTING & FILTERING ELEMENTS
 */
function fillBigCanvas(item){
  console.log('Chosen: ', $("div", "#BigCanvas"));
  $("#BigCanvas").html(`
    <img src="${item.image}" width="250"/>
    ${item.name}

  
  `);
};


$(document).ready(function() {
  console.log("Testing, 123");

  /**
   * REQUESTING JSON
   * 
   * @ref - https://www.codegrepper.com/code-examples/delphi/read+json+file+with+vanilla+javascript
   * 
   * - Getting data from JSON File.
   * - Count as AJAX?
   */
  $.getJSON("watches.json", function(json) {
    console.log('Objects', json); // This will show the info it in firebug console
  
    // Buttons have an onlcick that runs a function
    // We want to change the HTML of BigCanvas when a button is clicked
    //

    var myJSON = JSON.stringify(json);
    console.log('JSON', myJSON);

    

    // If #men then run this:
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
              onclick="fillBigCanvas(${JSON.stringify(item).replace(/"/g, '\'') /**<----- This turns json into a string and replaces these "" with these '' : The reason for this is to stop it breaking the HTML, the /"/g is regex and means all " in the string. '\'' is just ' in quotes but we have to use \ to stop it from closing the quotes*/})">
                View
            </button>
            
            <button class="btn btn-outline-dark loginBtn" type="button">
              Add to Cart
            </button>
          </p>
        </div>
        
        <hr class="divider" />
        `
      );

      // Animation Function:
      $("img", "#men").mouseenter(function(e) {
        $(this).css("width", "250");
      }).mouseout(function(e) {
        $(this).css("width", "150");
      });
    });

    // If #women then run this:
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
              onclick="fillBigCanvas(${JSON.stringify(item).replace(/"/g, '\'')})">
                View
            </button>
            
            <button class="btn btn-outline-dark loginBtn" type="button">
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


