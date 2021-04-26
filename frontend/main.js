$(document).ready(function () {

  console.log('Starting!');
  // Activate tooltip
  $('[data-toggle="tooltip"]').tooltip();

  // Select/Deselect checkboxes
  var checkbox = $('table tbody input[type="checkbox"]');
  $("#selectAll").click(function () {
    if (this.checked) {
      checkbox.each(function () {
        this.checked = true;
      });
    } else {
      checkbox.each(function () {
        this.checked = false;
      });
    }
  });
  checkbox.click(function () {
    if (!this.checked) {
      $("#selectAll").prop("checked", false);
    }
  });

  var form = new FormData();
  
  var settings = {
    "url": "http://localhost:8000/users",
    "method": "GET",
    "timeout": 0,
    "processData": false,
    "mimeType": "multipart/form-data",
    "contentType": false
  };
  
  $.ajax(settings).done(function (response) {
    console.log('retorno: ', response);
  });
});
