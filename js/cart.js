/**
 * CART MODAL
 * 
 * DOM Manipulation
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