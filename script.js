/* Coloquei minha constante que acessa o container da lista de tarefas fora das
funções, assim posso chamar ela quando precisar em cada função. */
const taskListContainer = document.querySelector('#lista-tarefas');

// Requisito 12 (função que verifica e retorna meu localStorage)
function getTasks() {
  // JSON.parse - retorna como array
  const tasks = JSON.parse(localStorage.getItem('tasks'));

  if (tasks !== null) {
    return tasks;
  }

  return [];
}

// Requisito 12 (função que adc na tela meu localStorage)
/** Source: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/forEach
Troquei o "for...of" por "forEach" para resolver erros do lint e deu certo!! usei a dica de uma thread
onde Felipe Eleotero de Souza deu a sugestão. */
function buildTaskList() {
  const tasks = getTasks();

  if (tasks.length > 0) {
    tasks.forEach((item) => {
      const listItem = document.createElement('li');

      listItem.className = 'task';

      if (item.completed === true) {
        listItem.classList.add('completed');
      }

      listItem.innerText = item.name;
      taskListContainer.appendChild(listItem);
    });
  }
}

buildTaskList();

// Requisitos 5 e 6
function addTask() {
  const buttonAddInput = document.querySelector('#criar-tarefa');

  buttonAddInput.addEventListener('click', () => {
    const input = document.querySelector('#texto-tarefa');

    /** Source: https://www.w3schools.com/tags/att_input_value.asp
    .value acessa o valor do meu input e verifica se ele é string vazia. */
    if (input.value === '') {
      return;
    }

    const listItem = document.createElement('li');

    listItem.className = 'task';
    listItem.innerText = input.value;
    taskListContainer.appendChild(listItem);
    input.value = '';
  });
}

addTask();

// Requisito 7
function selectTask() {
  taskListContainer.addEventListener('click', (event) => {
    const { target } = event;

    if (target.classList.contains('task')) {
      const selectedItem = document.querySelector('.task-selected');

      // Requisito 8 (assim quando clicar no prox. item remove a seleção do anterior).
      if (selectedItem !== null) {
        selectedItem.classList.remove('task-selected');
      }

      // Adc uma class 'task-selected' com css pronto.
      target.classList.add('task-selected');
    }
  });
}

selectTask();

// Requisito 9
/** Source: https://developer.mozilla.org/en-US/docs/Web/API/Element/dblclick_event */
function markTaskComplete() {
  taskListContainer.addEventListener('dblclick', (event) => {
    const { target } = event;

    if (target.classList.contains('task')) {
      if (target.classList.contains('completed')) {
        target.classList.remove('completed');

        return;
      }

      // Adc uma class 'completed' com css pronto.
      target.classList.add('completed');
    }
  });
}

markTaskComplete();

// Requisito 10
function clearTaskList() {
  const buttonClearList = document.querySelector('#apaga-tudo');

  buttonClearList.addEventListener('click', () => {
    const listTask = document.querySelectorAll('.task');

    if (listTask !== null) {
      listTask.forEach((item) => {
        // Removo cada um dos "filhos" itens do meu container da lista de tarefas.
        taskListContainer.removeChild(item);
      });
    }
  });
}

clearTaskList();

// Requisito 11
function clearCompletedTasks() {
  const buttonClearCompletedTasks = document.querySelector('#remover-finalizados');

  buttonClearCompletedTasks.addEventListener('click', () => {
    const listCompletedTasks = document.querySelectorAll('.completed');

    if (listCompletedTasks !== null) {
      listCompletedTasks.forEach((item) => {
        /* Removo cada um dos "filhos" itens marcados como completos do meu container
        da lista de tarefas. */
        taskListContainer.removeChild(item);
      });
    }
  });
}

clearCompletedTasks();

// Requisito 12 (botão salvar, já salva minha lista no localStorage)
function saveTasks() {
  const buttonSaveTasks = document.querySelector('#salvar-tarefas');

  buttonSaveTasks.addEventListener('click', () => {
    const tasks = [];
    const taskListItems = taskListContainer.children;

    for (let i = 0; i < taskListItems.length; i += 1) {
      tasks.push({
        name: taskListItems[i].innerText,
        completed: taskListItems[i].classList.contains('completed'), // return false or true;
      });
    }

    localStorage.setItem('tasks', JSON.stringify(tasks));
  });
}

saveTasks();

// Requisito 13
/** Source: https://pt.stackoverflow.com/questions/150305/como-mudar-a-posi%C3%A7%C3%A3o-de-um-elemento-html-com-javascript
 * Source: https://developer.mozilla.org/pt-BR/docs/Web/API/Node/insertBefore */

// (função mover para cima)
function moveItemUp() {
  const buttonMoveUp = document.querySelector('#mover-cima');

  buttonMoveUp.addEventListener('click', () => {
    const selectedItem = document.querySelector('.task-selected');

    if (selectedItem === taskListContainer.firstChild) {
      return;
    }

    if (selectedItem !== null) {
      taskListContainer.insertBefore(selectedItem, selectedItem.previousSibling);
    }
  });
}

moveItemUp();

// (função mover para baixo)
/** Source: https://stackoverflow.com/questions/4793604/how-to-insert-an-element-after-another-element-in-javascript-without-using-a-lib/4793630#4793630 */
function moveItemDown() {
  const buttonMoveDown = document.querySelector('#mover-baixo');

  buttonMoveDown.addEventListener('click', () => {
    const selectedItem = document.querySelector('.task-selected');

    if (selectedItem === taskListContainer.lastChild) {
      return;
    }

    if (selectedItem !== null) {
      taskListContainer.insertBefore(selectedItem.nextSibling, selectedItem);
    }
  });
}

moveItemDown();

// Requisito 14
function removeSelectedTask() {
  const buttonRemoveSelectedTask = document.querySelector('#remover-selecionado');

  buttonRemoveSelectedTask.addEventListener('click', () => {
    const selectedItem = document.querySelector('.task-selected');

    if (selectedItem !== null) {
      /* Removo o "filho" item que está com a class selectedItem criada no requisito 7
      do meu container da lista de tarefas. */
      taskListContainer.removeChild(selectedItem);
    }
  });
}

removeSelectedTask();
