let backendServer = "http://localhost:9001";
let userToBeRemovedId = 0;
let userToBeEdited = 0;

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

  $("#editUser").click(function () {
    updateUser();
  });

  $("#deleteUser").click(function () {
    confirmDeleteUser();
  });

  $(".search-button").click(function () {
    alert("Haha!! You'll have to implement this!");

    let nameToSearch = $(".search-box-input").val();
    getAllUsersByNameLike(nameToSearch);
  });

  getAllUsers();
  clearUserForm();
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
      $(".table.table-striped.table-hover").hide();
      $(".table.table-striped.table-hover").before(
        '<div class="no-user-div">Ainda não existem usuários cadastrados.</div>'
      );
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
            <a href="#editEmployeeModal" class="edit" data-toggle="modal" style="color: grey;">
              <i class="material-icons" data-toggle="tooltip" title="Edit" onclick="loadEditUser(${
                value.id
              });">&#xE254;</i>
            </a>
            <a href="#deleteEmployeeModal" class="delete" data-toggle="modal" style="color: #F08080;">
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

function getAllUsersByNameLike(nameToSearch) {
  console.log(nameToSearch);
  // Construa a request para o endpoint do backend. No retorno, você pode usar renderização na tabela aproveitando o código abaixo:

  // let users = JSON.parse(response);
  // let tableBody = "";

  // if (users.length == 0) {
  //   $(".table.table-striped.table-hover").hide();
  //   $(".table.table-striped.table-hover").before(
  //     '<div class="no-user-div">Ainda não existem usuários cadastrados.</div>'
  //   );
  // } else {
  //   $.each(users, function (key, value) {
  //     let row = `
  //       <tr id="${value.id}">
  //         <td>
  //           <span class="custom-checkbox">
  //             <input
  //               type="checkbox"
  //               id="checkbox1"
  //               name="options[]"
  //               value="1"
  //             />
  //             <label for="checkbox1"></label>
  //           </span>
  //         </td>
  //         <td>${value.name}</td>
  //         <td>${value.email}</td>
  //         <td>${value.username}</td>
  //         <td>${value.type}</td>
  //         <td>${value.active == 1 ? "Sim" : "Não"}</td>
  //         <td>
  //           <a href="#editEmployeeModal" class="edit" data-toggle="modal" style="color: grey;">
  //             <i class="material-icons" data-toggle="tooltip" title="Edit" onclick="loadEditUser(${
  //               value.id
  //             });">&#xE254;</i>
  //           </a>
  //           <a href="#deleteEmployeeModal" class="delete" data-toggle="modal" style="color: #F08080;">
  //             <i class="material-icons" data-toggle="tooltip" title="Delete" onclick="userToBeRemoved(${
  //               value.id
  //             });">&#xE872;</i>
  //           </a>
  //         </td>
  //       </tr>
  //     `;

  //     tableBody += row;
  //   });
  // }
  // // console.log(tableBody);
  // $("#maintable").append(tableBody);
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
        username: $("#addUserFormLogin").val().toUpperCase(),
        password: $("#addUserFormPassword").val(),
        name: $("#addUserFormName").val().toUpperCase(),
        email: $("#addUserFormEmail").val(),
        type: $("#addUserFormType").val().toUpperCase(),
        active: true,
      }),
    };

    $.ajax(settings).done(function (response) {
      console.log(response);
      if (response) {
        if (!alert("Usuário adicionado com sucesso!")) {
          clearUserForm();
          window.location.reload();
        }
      } else {
        alert("Houve um problema ao tentar criar um usuário!")
      }
    });
  }
}

function userToBeRemoved(id) {
  userToBeRemovedId = id;
}

function loadEditUser(id) {
  userToBeEdited = id;
  var form = new FormData();
  var settings = {
    url: backendServer + "/users/" + id,
    method: "GET",
    timeout: 0,
    processData: false,
    mimeType: "multipart/form-data",
    contentType: false,
    data: form,
  };

  $.ajax(settings).done(function (response) {
    let userToBeEdited = JSON.parse(response);
    console.log(userToBeEdited.username);
    if (response) {
      $("#editUserFormLogin").val(userToBeEdited.username);
      $("#editUserFormPassword").val(userToBeEdited.password);
      $("#editUserFormName").val(userToBeEdited.name);
      $("#editUserFormEmail").val(userToBeEdited.email);
      $("#editUserFormType").val(userToBeEdited.type);
    }
  });
}

function updateUser() {
  if (
    !$("#editUserFormLogin").val() ||
    !$("#editUserFormPassword").val() ||
    !$("#editUserFormName").val() ||
    !$("#editUserFormEmail").val() ||
    !$("#editUserFormType").val()
  ) {
    alert("Todos os campos são obrigatórios!");
  } else if ($("#editUserFormEmail").val().indexOf("@") < 1) {
    alert("Preencha o campo de email corretamente");
  } else {
    console.log("entrou no else!");
    var settings = {
      url: backendServer + "/users/" + userToBeEdited,
      method: "PUT",
      timeout: 0,
      headers: {
        "Content-Type": "application/json",
      },
      data: JSON.stringify({
        id: userToBeEdited,
        username: $("#editUserFormLogin").val().toUpperCase(),
        password: $("#editUserFormPassword").val(),
        name: $("#editUserFormName").val().toUpperCase(),
        email: $("#editUserFormEmail").val().toUpperCase(),
        type: $("#editUserFormType").val(),
        active: $("#activeOpts").val().toUpperCase(),
      }),
    };

    $.ajax(settings).done(function (response) {
      console.log(response);
      if (!alert("Usuário atualizado com sucesso!")) {
        window.location.reload();
      }
    });
  }
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

function clearUserForm() {
  $("#addUserFormLogin").val("");
  $("#addUserFormPassword").val("");
  $("#addUserFormName").val("");
  $("#addUserFormEmail").val("");
  $("#addUserFormType").val("");
}
