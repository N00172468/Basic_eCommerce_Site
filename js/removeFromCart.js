/**
 * DOM MANIPULATION & EVENT HANDLING
 * 
 * - If the user clicks on the "Remove" button in the cart, the item would then be deleted within the modal.
 */
function deleteContent() {
    console.log('Object removed from Cart: ', $("div", "#cartContent"));
    $("#cartContent").remove();
    $('#exampleModal').modal('toggle')
    
}

$(document).on("click", ".removeBtn", function() {
  var badge = $(".cartBadge")
  var btnTitle = $(".btnTitle");


  // Once user clicks the "Remove" button in the cart, update modal button to this:
  btnTitle.text("Empty");
  badge.text('');
  $(this).removeClass('active');
});