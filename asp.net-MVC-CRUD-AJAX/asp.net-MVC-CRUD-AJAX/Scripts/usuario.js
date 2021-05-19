$(document).ready(function () {
    loadDados();
}); 

function loadDados() {
    $.ajax({
        url: "Home/Get",
        type: "GET",
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        success: function (result) {
            var html = '';
            $.each(result, function (key, item) {
                html += '<div class="info">';
                    html += '<div id="divI">';
                        html += '<p>Nome: <span>' + item.Nome + '</span></p>';
                        html += '<p>E-mail: <span>' + item.Email + '</span></p>';
                    html += '</div>';
                    html += '<div id="divII">';
                        html += '<a href="#" onclick="return details(' + item.Id + ')">Editar</a> | <a href="#" onclick="deletar(' + item.Id + ')">Deletar</a>';
                    html += '</div>';
                html += '</div>';
                html += '<hr />';
            });
            $('#marI').html(html);
        },
        error: function () {
            alert('Erro ao buscar os usuários!');
        }
    });
}

function details(id) {
    $('#Nome').css('border-color', 'lightgrey');
    $('#Email').css('border-color', 'lightgrey');

    $.ajax({
        url: "Home/Details/" + id,
        type: "GET",
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        success: function (result) {
            $('#IdUsu').val(result.Id);
            $('#Nome').val(result.Nome);
            $('#Email').val(result.Email);

            $('#btnAdd').hide();
            $('#btnUpdate').show();
        },
        error: function(){
            alert('Erro ao buscar o usuário!');
        }
    });
}

function add() {
    var res = validate();
    if (res == false) {
        return false;
    }

    var usuario = {
        Nome: $('#Nome').val(),
        Email: $('#Email').val()
    };

    $.ajax({
        url: "/Home/Create",
        data: JSON.stringify(usuario),
        type: "POST",
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        success: function (result) {
            loadDados();
            clear();
            alert('Cadastro Realizado!');
        },
        error: function () {
            alert('Erro no cadastro!');
        }
    });
}

function update() {
    var res = validate();
    if (res == false) {
        return false;
    }

    var usuario = {
        Id: $('#IdUsu').val(),
        Nome: $('#Nome').val(),
        Email: $('#Email').val()
    }

    $.ajax({
        url: "Home/Update",
        data: JSON.stringify(usuario),
        type: "POST",
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        success: function (result) {
            loadDados();
            clear();
            $('#btnAdd').show();
            $('#btnUpdate').hide();

            alert('Atualização Realizado!');
        },
        error: function () {
            alert("Falha na atualização!");
        }
    });
}

function deletar(id) {
    var con = confirm("Deseja excluir?");

    if (con) {
        $.ajax({
            url: "Home/Delete/" + id,
            type: "POST",
            contentType: "application/json;charset=utf-8",
            dataType: "json",
            success: function (result) {
                loadDados();
            },
            error: function () {
                alert('Erro ao excluir o usuário!');
            }
        });
    }
}

function validate() {
    var isValid = true;
    if ($('#Nome').val().trim() == "") {
        $('#Nome').css('border-color', 'Red');
        isValid = false;
    }
    else {
        $('#Nome').css('border-color', 'lightgrey');
    }
    if ($('#Email').val().trim() == "") {
        $('#Email').css('border-color', 'Red');
        isValid = false;
    }
    else {
        $('#Email').css('border-color', 'lightgrey');
    }
    return isValid;
}

function clear() {
    $('#IdUsu').val("");
    $('#Nome').val("");
    $('#Email').val("");  
}