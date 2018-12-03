
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

        // seleciona a cidade selecionada
        $("#cidade-funcionario option:selected").each(function() {
            funcionario.cidade = $(this).val();
        }); 

        funcionario.salario = $("#salario-funcionario").text();
        
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
        gravaNoLocalStorageFuncionario();
        renderizaFuncionario();
        limparFuncionario();
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
        gravaNoLocalStorageCidade();
        renderizaCidade();
        renderizaFuncionario();
        limparCidade();
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

            if(profissaoExistente){
                profissaoExistente.funcao = profissao.funcao;
                profissaoExistente.area = profissao.area;
                profissaoExistente.salario = profissao.salario;

            }
        }

        gravaNoLocalStorageProfissao();
        renderizaProfissao();
        limparProfissao();
        return false;
    }

    // limpa funcionario
    function limparFuncionario(){
        $("#formulario-funcionario input").val('');
        $("#cidade-funcionario").empty();
        $("#salario-funcionario").empty();
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

        const tbodyFuncionario = $("#corpo-funcionario");

        tbodyFuncionario.html('');

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
                editarFuncionario(funcionario.id);
            });

            const fn_exc = function(){
                excluirFuncionario(funcionario.id);
            };
            btnExcluir.click(fn_exc);

            tdOpcoes.append(btnEditar).append(btnExcluir);
            tbodyFuncionario.append(tr);
           
        }
    }

    // renderiza Cidade
    function renderizaCidade(){
        const tbodyCidade = $("#corpo-cidade");

        tbodyCidade.html('');

        for(let i=0; i<listaCidades.length; i++){

            const cidade = listaCidades[i];

            let tr = $('<tr>');

            let tdNome = $('<td>').text(cidade.nome).addClass("cidadeAdd");
            let tdEstado = $('<td>').text(cidade.estado).addClass("estadoAdd");
            let tdOpcoes = $('<td>');

            tr.append(tdNome)
                .append(tdEstado)
                .append(tdOpcoes);

            $('#cidade-funcionario').append('<option id='+cidade.id+'>'+cidade.nome+'</option>');

            let btnEditar = $('<button>').text('Editar');

            let btnExcluir = $('<button>').text('Excluir');

            btnEditar.click(function(){
                editarCidade(cidade.id);
            });

            btnExcluir.click(function(){
                excluirCidade(cidade.id);
            });

            tdOpcoes.append(btnEditar).append(btnExcluir);
            tbodyCidade.append(tr);
        }
    }
    // renderiza profissao
    function renderizaProfissao(){
        const tbodyProfissao = $("#corpo-profissao");

        tbodyProfissao.html('');

        for(let i=0; i<listaProfissoes.length; i++){

            const profissao = listaProfissoes[i];

            let tr = $('<tr>');

            let tdFuncao = $('<td>').text(profissao.funcao).addClass("funcaoAdd");
            let tdArea = $('<td>').text(profissao.area).addClass("areaAdd");
            let tdSalario = $('<td>').text(profissao.salario).addClass("salario");
            let tdOpcoes = $('<td>');

            tr.append(tdFuncao)
                .append(tdArea)
                .append(tdSalario)
                .append(tdOpcoes);

            $('#funcao-funcionario').append('<option id='+profissao.id+'>'+profissao.funcao+'</option>');

            let btnEditar = $('<button>').text('Editar');

            let btnExcluir = $('<button>').text('Excluir');

            btnEditar.click(function(){
                editarProfissao(profissao.id);
            });

            btnExcluir.click(function(){
                excluirProfissao(profissao.id);
            });

            tdOpcoes.append(btnEditar).append(btnExcluir);
            tbodyProfissao.append(tr);

            
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
             $("#id-funcionario").val(funcionario.id);

             $("#funcao-funcionario").val(funcionario.funcao);
             $("#area-funcionario").val(funcionario.area);
             $("#estado-funcionario").val(funcionario.estado);
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
        gravaNoLocalStorageFuncionario();
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
        gravaNoLocalStorageCidade();
        renderizaCidade();
    }

    // edita Profissao
    function editarProfissao(id){
        let profissao = findProfissaoById(id);
        if(profissao){
            $("#funcao").val(profissao.funcao);
            $("#area").val(profissao.area);
            $("#salario").val(profissao.salario);
            $("#id-profissao").val(profissao.id);
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
        gravaNoLocalStorageProfissao();
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
        const listaEmJSONFuncionario = JSON.stringify(listaFuncionarios);
        localStorage.setItem("listaFuncionario", listaEmJSONFuncionario);
    }

    function buscaDoLocalStorageFuncionario(){
        const listaStorageFuncionario = localStorage.getItem("listaFuncionario");
        listaFuncionarios = JSON.parse(listaStorageFuncionario) || [];
    }

    //// cidade
    function gravaNoLocalStorageCidade(){
        const listaEmJSONCidade = JSON.stringify(listaCidades);
        localStorage.setItem("listaCidade", listaEmJSONCidade);
    }

    function buscaDoLocalStorageCidade(){
        const listaStorageCidade = localStorage.getItem("listaCidade");
        listaCidades = JSON.parse(listaStorageCidade) || [];
    }

    // profissao
    function gravaNoLocalStorageProfissao(){
        const listaEmJSONProfissao = JSON.stringify(listaProfissoes);
        localStorage.setItem("listaProfissao", listaEmJSONProfissao);
    }

    function buscaDoLocalStorageProfissao(){
        const listaStorageProfissao = localStorage.getItem("listaProfissao");
        listaProfissoes = JSON.parse(listaStorageProfissao) || [];
    }

    buscaDoLocalStorageFuncionario();
    renderizaFuncionario();
    buscaDoLocalStorageCidade();
    buscaDoLocalStorageProfissao();
    renderizaCidade();
    renderizaProfissao();

    //////////////////////////////////////////


    function populaSelectCidade(){
        renderizaCidade();
       // $("#tabelaCidade #corpo-cidade tr").each(function(){
       //     cidadeNome = $(this).find('td').eq(0).text();
       //     cidadeEstado = $(this).find('td').eq(1).text();
       //     $('#cidade-funcionario').append('<option>'+cidadeNome+'-'+cidadeEstado+'</option>');
       //})
        
    }
    
    function populaSelectProfissao(){
        renderizaProfissao();
    }

    // seleciona os dados do select
    $( "#funcao-funcionario" ).change(function() {
        var id = $(this).find(':selected').attr('id');
        if(id != undefined){
            let profissao = findProfissaoById(id);
            $("#salario-funcionario").text(profissao.salario);
        }else{
            alert("selecione uma opção válida");
        }
    });

    $( "#cidade-funcionario" ).change(function() {
        var id = $(this).find(':selected').attr('id');
        if(id == undefined){
            alert("selecione uma opção válida");
        }else{
            $("#cidade-funcionario option:selected").each(function() {
                let cidadeSel = $(this).val();
                $("#cidade-funcionario").val(cidadeSel);
            });             
        }
    });


    // botoes menu

    $("#div-funcionario").hide();
    $("#div-cidade").hide();
    $("#div-profissao").hide();

    $("#btn-cadastro-funcionario").click(function(){
        //limpa o select para nao duplicar valores
        $("#cidade-funcionario").empty();
        $("#funcao-funcionario").empty(); 
        $('#funcao-funcionario').append('<option selected="selected">Selecione a profissão</option>');
        $('#cidade-funcionario').append('<option selected="selected">Selecione a cidade</option>');
        //popula o select
        populaSelectCidade();
        populaSelectProfissao();
        $("#div-funcionario").show();
        $("#div-cidade").hide();
        $("#div-profissao").hide();
    });

    $("#btn-cadastro-cidade").click(function(){
        $("#div-funcionario").hide();
        $("#div-cidade").show();
        $("#div-profissao").hide();
    });

    $("#btn-cadastro-profissao").click(function(){
        $("#div-funcionario").hide();
        $("#div-cidade").hide();
        $("#div-profissao").show();
    });


})();