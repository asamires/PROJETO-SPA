    // Os dados ficam apenas na memória.
    // Se a página for atualizada, eles serão apagados.
    const demandas = [];

    const app = document.querySelector("#app");
    const botoesMenu = document.querySelectorAll("nav button");

    function marcarMenuAtivo(rota) {
      botoesMenu.forEach(botao => {
        botao.classList.toggle("ativo", botao.dataset.rota === rota);
      });
    }

    function irPara(rota) {
      marcarMenuAtivo(rota);

      if (rota === "inicio") mostrarInicio();
      if (rota === "demandas") mostrarDemandas();
      if (rota === "lista") mostrarLista();
      if (rota === "sobre") mostrarSobre();
    }

    function mostrarInicio() {
      app.innerHTML = `
        <h1>Bem-vindo(a) ao Registro de Demandas Concluídas!</h1>
        <p>
        Este sistema foi desenvolvido para facilitar o registro e a 
        organização das demandas concluídas, permitindo acompanhar as 
        atividades realizadas e manter um histórico dos serviços entregues.
        </p>

        <p>
          Assim que concluir uma demanda, registre as seguintes informações:
        </p>
        <p>
          Título da demanda: nome ou identificação da atividade realizada.
        </p>
        <p>
          Cliente: cliente ao qual a demanda pertence.
        </p>

        <p>
          Detalhamento: descrição das atividades executadas e das soluções implementadas.
        </p>

        <div class="contador">
          Demandas cadastradas nesta sessão: <strong>${demandas.length}</strong>
        </div>

        <div class="acoes">
          <button class="botao" id="btnCadastrar">Cadastrar demanda</button>
          <button class="botao secundario" id="btnVerDemandas">Ver demandas</button>
        </div>
      `;

      document.querySelector("#btnCadastrar")
        .addEventListener("click", () => irPara("demandas"));

      document.querySelector("#btnVerDemandas")
        .addEventListener("click", () => irPara("lista"));
    }

    function mostrarDemandas() {
      app.innerHTML = `
        <h1>Inserir Demandas</h1>

        <form id="formDemanda">
          <div class="campo">
            <label for="Título">Título</label>
            <input id="Título" type="text" placeholder="Digite a sua demanda" required />
          </div>

          <div class="campo">
            <label for="Cliente">Cliente</label>
            <input id="Cliente" type="text" placeholder="Digite o nome do cliente" required />
          </div>

          <div class="campo">
            <label for="Detalhamento">Detalhamento</label>
            <input id="Detalhamento" type="text" placeholder="Digite o detalhamento da demanda" required />
          </div>

         <div class="campo">
            <label for="Demanda completa?">Demanda Completa</label>
            
              <label>
             <input type="radio" name="aprovacao" value="Sim">
              Sim
             </label>

             <label>
              <input type="radio" name="aprovacao" value="Não">
              Não
             </label>   

          <button class="botao" type="submit">Enviar demanda concluída</button>
          <div id="mensagem"></div>
        </form>
      `;

      document.querySelector("#formDemanda").addEventListener("submit", function(evento) {
        evento.preventDefault();

        const título = document.querySelector("#Título").value.trim();
        const cliente = document.querySelector("#Cliente").value.trim();
        const detalhamento = document.querySelector("#Detalhamento").value.trim();
        const aprovacao = document.querySelector('input[name="aprovacao"]:checked').value;

        demandas.push({
          título,
          cliente,
          detalhamento,
          finalizada: aprovacao === "Sim"
        });

        document.querySelector("#mensagem").innerHTML =
          `<div class="mensagem">Demanda cadastrada com sucesso.</div>`;

        evento.target.reset();
      });
    }

    function mostrarLista() {
      app.innerHTML = `
        <h1>Lista de Demandas</h1>
        <p>Demandas finalizadas durante o período.</p>
        <div id="conteudoLista"></div>
      `;

      renderizarTabela();
    }

    function renderizarTabela() {
      const conteudo = document.querySelector("#conteudoLista");

      if (demandas.length === 0) {
        conteudo.innerHTML = `
          <div class="vazio">
            Nenhuma demanda cadastrada ainda.
          </div>
        `;
        return;
      }

      let linhas = "";

      demandas.forEach((demanda, indice) => {
        linhas += `
          <tr>
            <td>${demanda.título}</td>
            <td>${demanda.cliente}</td>
            <td>${demanda.detalhamento}</td>
            <td>${demanda.finalizada}</td>
            <td>
              <button class="excluir" data-indice="${indice}">Excluir</button>
            </td>
          </tr>
        `;
      });

      conteudo.innerHTML = `
        <table>
          <thead>
            <tr>
              <th>Título</th>
              <th>Cliente</th>
              <th>Detalhamento</th>
              <th>Demanda Finalizada?</th>
            </tr>
          </thead>
          <tbody>
            ${linhas}
          </tbody>
        </table>
      `;

      document.querySelectorAll(".excluir").forEach(botao => {
        botao.addEventListener("click", function() {
          const indice = Number(this.dataset.indice);
          demandas.splice(indice, 1);
          renderizarTabela();
        });
      });
    }

    function mostrarSobre() {
      app.innerHTML = `
        <h1>Sobre a atividade</h1>

    <p>
    A atividade foi concluída com sucesso, passando por alterações e melhorias
    conforme as orientações e solicitações do professor.
    </p>

    <p>
    Durante o desenvolvimento, foram implementadas e testadas novas funcionalidades,
    como a inserção de opções de seleção "Sim" ou "Não", além de atualizações
    nas páginas e nos recursos do sistema.
    </p>

    <p>
    Também foi realizada a reorganização do projeto, separando corretamente
    os arquivos HTML, CSS e JavaScript em suas respectivas pastas, facilitando
    a manutenção, a leitura e a compreensão do código.
    </p>

    <p>
    As modificações permitiram aprimorar a estrutura, a organização e a
    funcionalidade do sistema, atendendo aos requisitos propostos para a atividade.
    </p>
      `;
    }

    botoesMenu.forEach(botao => {
      botao.addEventListener("click", () => {
        irPara(botao.dataset.rota);
      });
    });

    mostrarInicio();
  