import { ChangeEvent, FormEvent, useState } from "react";
import styles from "./Task.module.css";
import { PlusCircle } from "phosphor-react";
import clipboard from '../assets/clipboard.svg';
import { Input } from "./Input";


interface Task {
  text: string;
  completed: boolean;
}

export function Task() {
  const [newTask, setNewTask] = useState('');
  const [tasks, setTasks] = useState<Task[]>([]);
  const [tasksCompleted, setTasksCompleted] = useState(0);

  function handleNewTask(event: ChangeEvent<HTMLInputElement>) {
    setNewTask(event.target.value);
  }

  function handleCreateNewTask(event: FormEvent) {
    event.preventDefault();
    setTasks([...tasks, { text: newTask, completed: false }]);

    setNewTask('');
  }

  function deleteTask(taskToDelete: string) {
    const tasksWithoutDeletedOne = tasks.filter(task => {
      return task.text !== taskToDelete
    })
    setTasks(tasksWithoutDeletedOne);
  }

  function changeTask(taskToComplete: string) {
    const taskWithChange = tasks.findIndex(task => {
      return task.text === taskToComplete
    })

    const taskTmp = [...tasks];
    taskTmp[taskWithChange].completed = !taskTmp[taskWithChange].completed;

    setTasks(taskTmp);

    let tasksCompleted = taskTmp.filter(({ completed }) => completed === true)

    setTasksCompleted(tasksCompleted.length);

  }
  return (
    <div className={styles.task}>
      <form onSubmit={handleCreateNewTask} className={styles.newTask}>
        <input
          type="text"
          placeholder="Adicione uma nota tarefa"
          value={newTask}
          onChange={handleNewTask}
        />
        <button type='submit'>
          Criar
          <PlusCircle size={18} />
        </button>

      </form>
      <header>
        <div>
          <span>{`Tarefas criadas ${tasks.length}`}</span>
        </div>
        <div>
          <span>Concluídas </span>
          <span>{`${tasksCompleted} de ${tasks.length}`}</span>
        </div>
      </header>
      {tasks.length === 0 ?
        <div className={styles.emptyTask}>
          <img src={clipboard} alt="Logotipo" />
          <span className="description">
            Você ainda não tem tarefas cadastradas
            Crie tarefas e organize seus itens a fazer
          </span>
        </div>
        :
        tasks.map(task => (
          <Input
            text={task.text}
            completed={task.completed}
            onDeleteTask={deleteTask}
            onChangeTask={changeTask}
          />
        ))
      }
    </div>
  )
}