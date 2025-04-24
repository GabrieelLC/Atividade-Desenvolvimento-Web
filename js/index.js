const usuario = JSON.parse(localStorage.getItem('usuario'));
if (usuario) {
  document.getElementById("nomeUsuario").textContent = `Olá, ${usuario.nome}!`;
}

const tarefas = JSON.parse(localStorage.getItem('tarefas')) || [];
const lista = document.getElementById('listaTarefas');

function renderizarTarefas() {
  lista.innerHTML = '';
  tarefas.forEach((tarefa, index) => {
    const item = document.createElement('li');
    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.checked = tarefa.concluida;
    checkbox.onchange = () => {
      tarefa.concluida = checkbox.checked;
      salvar();
    };
    const texto = document.createElement('span');
    texto.textContent = tarefa.texto;
    if (tarefa.concluida) texto.style.textDecoration = 'line-through';
    const btn = document.createElement('button');
    btn.textContent = 'Remover';
    btn.onclick = () => {
      tarefas.splice(index, 1);
      salvar();
    };
    item.append(checkbox, texto, btn);
    lista.appendChild(item);
  });
}

window.adicionarTarefa = () => {
  const input = document.getElementById('novaTarefa');
  const texto = input.value.trim();
  if (texto) {
    tarefas.push({ texto, concluida: false });
    input.value = '';
    salvar();
  }
}

function salvar() {
  localStorage.setItem('tarefas', JSON.stringify(tarefas));
  renderizarTarefas();
}

renderizarTarefas();
