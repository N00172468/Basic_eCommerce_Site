/**
 * SELECTING & FILTERING ELEMENTS
 */
function fillEmptyCanvas(item) {
    console.log('item!!', item)
      console.log('Object being Viewed: ', $("div", "#emptyCanvas"));
      
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