let backendServer = "http://localhost:8000";
let userToBeRemovedId = 0;

$(document).ready(function () {
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

  $("#addUserForm").submit(function (e) {
    e.preventDefault();
  });

  $("#addUser").click(function () {
    addUser();
  });

  $("#deleteUser").click(function () {
    confirmDeleteUser();
  });

  getAllUsers();
});

function getAllUsers() {
  var form = new FormData();

  var settings = {
    url: backendServer + "/users",
    method: "GET",
    timeout: 0,
    processData: false,
    mimeType: "multipart/form-data",
    contentType: false,
  };

  $.ajax(settings).done(function (response) {
    let users = JSON.parse(response);
    console.log(users);
    let tableBody = "";

    if (users.length == 0) {
      $('.table.table-striped.table-hover').hide();
      $('.table.table-striped.table-hover').before('<div class="no-user-div">Ainda não existem usuários cadastrados.</div>');
    } else {
      $.each(users, function (key, value) {
        let row = `
        <tr id="${value.id}">
          <td>
            <span class="custom-checkbox">
              <input
                type="checkbox"
                id="checkbox1"
                name="options[]"
                value="1"
              />
              <label for="checkbox1"></label>
            </span>
          </td>
          <td>${value.name}</td>
          <td>${value.email}</td>
          <td>${value.username}</td>
          <td>${value.type}</td>
          <td>${value.active == 1 ? "Sim" : "Não"}</td>
          <td>
            <!-- <a href="#editEmployeeModal" class="edit" data-toggle="modal">
              <i class="material-icons" data-toggle="tooltip" title="Edit">&#xE254;</i>
            </a> -->
            <a href="#deleteEmployeeModal" class="delete" data-toggle="modal">
              <i class="material-icons" data-toggle="tooltip" title="Delete" onclick="userToBeRemoved(${
                value.id
              });">&#xE872;</i>
            </a>
          </td>
        </tr>
      `;

        tableBody += row;
      });
    }
    // console.log(tableBody);
    $("#maintable").append(tableBody);
  });
}

function addUser() {
  if (
    !$("#addUserFormLogin").val() ||
    !$("#addUserFormPassword").val() ||
    !$("#addUserFormName").val() ||
    !$("#addUserFormEmail").val() ||
    !$("#addUserFormType").val()
  ) {
    alert("Todos os campos são obrigatórios!");
  } else if ($("#addUserFormEmail").val().indexOf("@") < 1) {
    alert("Preencha o campo de email corretamente");
  } else {
    console.log("entrou no else");
    var settings = {
      url: backendServer + "/users",
      method: "POST",
      timeout: 0,
      headers: {
        "Content-Type": "application/json",
      },
      data: JSON.stringify({
        username: $("#addUserFormLogin").val(),
        password: $("#addUserFormPassword").val(),
        name: $("#addUserFormName").val(),
        email: $("#addUserFormEmail").val(),
        type: $("#addUserFormType").val(),
        active: true,
      }),
    };

    $.ajax(settings).done(function (response) {
      console.log(response);
      if (!alert("Usuário adicionado com sucesso!")) {
        window.location.reload();
      }
    });
  }
}

function userToBeRemoved(value) {
  console.log("User to be removed: ", value);
  userToBeRemovedId = value;
}

function confirmDeleteUser() {
  console.log("Removing the user: ", userToBeRemovedId);
  var settings = {
    url: backendServer + "/users/" + userToBeRemovedId,
    method: "DELETE",
    timeout: 0,
  };

  $.ajax(settings).done(function (response) {
    console.log(response);
    if (!alert("Usuário removido com sucesso!")) {
      window.location.reload();
    }
  });
}
