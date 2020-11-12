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
});