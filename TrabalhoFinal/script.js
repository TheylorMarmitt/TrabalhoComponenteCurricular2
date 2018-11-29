
(function() {

    var listaFuncionarios = [];
    var listaCidades = [];
    var listaProfissoes = [];

    // salva funcionario
    function salvarFuncionario(){
        var funcionario = {};

        funcionario.nome = $("#nome-funcionario").val();
        funcionario.cpf = $("#cpf-funcionario").val();
        funcionario.nascimento = $("#data-funcionario").val();
        funcionario.cidade = $("#cidade-funcionario").val();
        funcionario.salario = $("#salario-funcionario").val();

        let id = $("#id-funcionario").val();

        if(id == undefined || id == ''){
            funcionario.id = new Date().getTime();
            listaFuncionarios.push(funcionario);
        } else {
            let idNumber = parseInt(id);
            let funcionarioExistente = findFuncionarioById(idNumber);

            if(funcionarioExistente){
                funcionarioExistente.nome = funcionario.nome;
                funcionarioExistente.cpf = funcionario.cpf;
                funcionarioExistente.nascimento = funcionario.nascimento;
                funcionarioExistente.cidade = funcionario.cidade;
                funcionarioExistente.salario = funcionario.salario;
            }
        }
        gravaNoLocalStorageFuncionario()
        renderizaFuncionario();
        return false;
    }
    // salva cidade
    function salvarCidade(){
        var cidade = {};

        cidade.nome = $("#nome-cidade").val();
        cidade.estado = $("#estado").val();
        let id = $("#id-cidade").val();

        if(id == undefined || id == ''){
            cidade.id = new Date().getTime();
            listaCidades.push(cidade);
        } else {
            let idNumber = parseInt(id);
            let cidadeExistente = findCidadeById(idNumber);

            if(cidadeExistente){
                cidadeExistente.nome = cidade.nome;
                cidadeExistente.estado = cidade.estado;

            }
        }
        gravaNoLocalStorageCidade()
        renderizaCidade();
        return false;
    }

    // salva profissao
    function salvarProfissao(){
        var profissao = {};

        profissao.funcao = $("#funcao").val();
        profissao.area = $("#area").val();
        profissao.salario = $("#salario").val();
        let id = $("#id-profissao").val();

        if(id == undefined || id == ''){
            profissao.id = new Date().getTime();
            listaProfissoes.push(profissao);
        } else {
            let idNumber = parseInt(id);
            let profissaoExistente = findProfissaoById(idNumber);

            if(cidadeExistente){
                profissaoExistente.funcao = profissao.funcao;
                profissaoExistente.area = profissao.area;
                profissaoExistente.salario = profissao.salario;

            }
        }
        gravaNoLocalStorageProfissao()
        renderizaProfissao();
        return false;
    }

    // limpa funcionario
    function limparFuncionario(){
        $("#formulario-funcionario input").val('');
    }
    // limpa cidade
    function limparCidade(){
        $("#formulario-cidade input").val('');
    }
    // limpa profissao
    function limparProfissao(){
        $("#formulario-profissao input").val('');
    }

    // renderiza Funcionario
    function renderizaFuncionario(){
        const tbody = $("#corpo-funcionario");

        tbody.html('');

        for(let i=0; i<listaFuncionarios.length; i++){

            const funcionario = listaFuncionarios[i];

            let tr = $('<tr>');

            let tdNome = $('<td>').text(funcionario.nome);
            let tdCpf = $('<td>').text(funcionario.cpf);
            let tdNascimento = $('<td>').text(funcionario.nascimento);
            let tdCidade = $('<td>').text(funcionario.cidade);
            let tdSalario = $('<td>').text(funcionario.salario);

            let tdOpcoes = $('<td>');

            tr.append(tdNome)
                .append(tdCpf)
                .append(tdNascimento)
                .append(tdCidade)
                .append(tdSalario)
                .append(tdOpcoes);

            let btnEditar = $('<button>').text('Editar');

            let btnExcluir = $('<button>').text('Excluir');

            btnEditar.click(function(){
                editarFuncionario(produto.id);
            });

            const fn_exc = function(){
                excluirFuncionario(produto.id);
            };
            btnExcluir.click(fn_exc);

            tdOpcoes.append(btnEditar).append(btnExcluir);
            tbody.append(tr);
        }
    }

    // renderiza Cidade
    function renderizaCidade(){
        const tbody = $("#corpo-cidade");

        tbody.html('');

        for(let i=0; i<listaCidades.length; i++){

            const cidade = listaCidades[i];

            let tr = $('<tr>');

            let tdNome = $('<td>').text(cidade.nome);
            let tdEstado = $('<td>').text(cidade.estado);
            let tdOpcoes = $('<td>');

            tr.append(tdNome)
                .append(tdEstado)
                .append(tdOpcoes);

            let btnEditar = $('<button>').text('Editar');

            let btnExcluir = $('<button>').text('Excluir');

            btnEditar.click(function(){
                editarCidade(cidade.id);
            });

            btnExcluir.click(function(){
                excluirCidade(cidade.id);
            });

            tdOpcoes.append(btnEditar).append(btnExcluir);
            tbody.append(tr);
        }
    }
    // renderiza profissao
    function renderizaProfissao(){
        const tbody = $("#corpo-profissao");

        tbody.html('');

        for(let i=0; i<listaProfissoes.length; i++){

            const profissao = listaProfissoes[i];

            let tr = $('<tr>');

            let tdFuncao = $('<td>').text(profissao.funcao);
            let tdArea = $('<td>').text(profissao.area);
            let tdSalario = $('<td>').text(profissao.salario);
            let tdOpcoes = $('<td>');

            tr.append(tdFuncao)
                .append(tdArea)
                .append(tdSalario)
                .append(tdOpcoes);

            let btnEditar = $('<button>').text('Editar');

            let btnExcluir = $('<button>').text('Excluir');

            btnEditar.click(function(){
                editarProfissao(profissao.id);
            });

            btnExcluir.click(function(){
                excluirProfissao(profissao.id);
            });

            tdOpcoes.append(btnEditar).append(btnExcluir);
            tbody.append(tr);
        }
    }

    // edita funcionario
    function editarFuncionario(id){
        let funcionario = findFuncionarioById(id);

         if(funcionario){
             $("#nome-funcionario").val(funcionario.nome);
             $("#cpf-funcionario").val(funcionario.cpf);
             $("#data-funcionario").val(funcionario.data);
             $("#cidade-funcionario").val(funcionario.cidade);
             $("#salario-funcionario").val(funcionario.salario);
             $("#id-produto").val(funcionario.id);
         }else{
             alert('Não foi possível encontrar o funcionario');
         }
     }

     // exclui funcionario
     function excluirFuncionario(id){
         listaFuncionarios = listaFuncionarios
             .filter(function(value){
                 return value.id != id;
             });
        gravaNoLocalStorageFuncionario()
        renderizaFuncionario();
    }
    // edita cidade
    function editarCidade(id){
        let cidade = findCidadeById(id);

         if(cidade){
             $("#nome-cidade").val(cidade.nome);
             $("#estado").val(cidade.estado);
             $("#id-cidade").val(cidade.id);
         }else{
             alert('Não foi possível encontrar a cidade');
         }
     }

     // exclui cidade
     function excluirCidade(id){
        listaCidades = listaCidades
            .filter(function(value){
                return value.id != id;
            });
        gravaNoLocalStorageCidade()
        renderizaCidade();
    }

    // edita Profissao
    function editarProfissao(id){
        let profissao = findProfissaoById(id);
        if(profissao){
            $("#funcao").val(profissao.funcao);
            $("#area").val(profissao.area);
            $("#salario").val(profissao.salario);
            $("#id-cidade").val(profissao.id);
        }else{
            alert('Não foi possível encontrar a profissao');
        }
    }
    // exclui profissao
    function excluirProfissao(id){
    listaProfissoes = listaProfissoes
        .filter(function(value){
            return value.id != id;
        });
        gravaNoLocalStorageProfissao()
        renderizaProfissao();
    }

     function findFuncionarioById(id){
        let funcionarios = listaFuncionarios
            .filter(function(value){
                return value.id == id;
            });

        if(funcionarios.length == 0){
            return undefined;
        }else{
            return funcionarios[0];
        }

    }

    function findCidadeById(id){
        let cidades = listaCidades
            .filter(function(value){
                return value.id == id;
            });

        if(cidades.length == 0){
            return undefined;
        }else{
            return cidades[0];
        }

    }

    function findProfissaoById(id){
        let profissoes = listaProfissoes
            .filter(function(value){
                return value.id == id;
            });

        if(profissoes.length == 0){
            return undefined;
        }else{
            return profissoes[0];
        }

    }

    buscaDoLocalStorageFuncionario();
    renderizaFuncionario();
    buscaDoLocalStorageCidade();
    renderizaCidade();
    buscaDoLocalStorageProfissao();
    renderizaProfissao();

    $("#formulario-funcionario").on("submit", function(evt){
        salvarFuncionario();
        evt.stopPropagation();
        evt.preventDefault();
    });

    $('#formulario-funcionario input').each(function(index, element){
        element.oninvalid = function(){
            const msg = $(this).data('custom-message');
            if(msg){
                this.setCustomValidity("");
                if (!this.validity.valid) {
                    this.setCustomValidity(msg);
                }
            }
        }
    });

    $("#formulario-cidade").on("submit", function(evt){
        salvarCidade();
        evt.stopPropagation();
        evt.preventDefault();
    });

    $('#formulario-cidade input').each(function(index, element){
        element.oninvalid = function(){
            const msg = $(this).data('custom-message');
            if(msg){
                this.setCustomValidity("");
                if (!this.validity.valid) {
                    this.setCustomValidity(msg);
                }
            }
        }
    });

    $("#formulario-profissao").on("submit", function(evt){
        salvarProfissao();
        evt.stopPropagation();
        evt.preventDefault();
    });

    $('#formulario-profissao input').each(function(index, element){
        element.oninvalid = function(){
            const msg = $(this).data('custom-message');
            if(msg){
                this.setCustomValidity("");
                if (!this.validity.valid) {
                    this.setCustomValidity(msg);
                }
            }
        }
    });

    /// funcionario
    function gravaNoLocalStorageFuncionario(){
        const listaEmJSON = JSON.stringify(listaFuncionarios);
        localStorage.setItem("lista", listaEmJSON);
    }

    function buscaDoLocalStorageFuncionario(){
        const listaStorage = localStorage.getItem("lista");
        listaFuncionarios = JSON.parse(listaStorage) || [];
    }

    //// cidade
    function gravaNoLocalStorageCidade(){
        const listaEmJSON = JSON.stringify(listaCidades);
        localStorage.setItem("lista", listaEmJSON);
    }

    function buscaDoLocalStorageCidade(){
        const listaStorage = localStorage.getItem("lista");
        listaCidades = JSON.parse(listaStorage) || [];
    }

    // profissao
    function gravaNoLocalStorageProfissao(){
        const listaEmJSON = JSON.stringify(listaProfissoes);
        localStorage.setItem("lista", listaEmJSON);
    }

    function buscaDoLocalStorageProfissao(){
        const listaStorage = localStorage.getItem("lista");
        listaProfissoes = JSON.parse(listaStorage) || [];
    }

    /// botoes menu

    $("#btn-cadastro-funcionario").click(function(){

    });

    $("#btn-cadastro-cidade").click(function(){

    });

    $("#btn-cadastro-profissao").click(function(){

    });


})();
