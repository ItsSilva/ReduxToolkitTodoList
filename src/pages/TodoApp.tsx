import { useSelector, useDispatch } from "react-redux";
import type { RootState } from "../redux/store";
import { saveTasks, editTask, deleteTask } from "../redux/slices/toDoSlice";
import { useState } from "react";

type Task = {
  id: number;
  title: string;
  description: string;
};

const TodoApp = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [editingId, setEditingId] = useState<number | null>(null);

  const tasks = useSelector((state: RootState) => state.toDo.tasks);
  
  const dispatch = useDispatch();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    if (!title.trim()) {
      alert("El título es requerido");
      return;
    }

    if (editingId !== null) {
      dispatch(editTask({
        id: editingId,
        title: title.trim(),
        description: description.trim(),
      }));
      setEditingId(null);
    } else {
      const newTask: Task = {
        id: Date.now(),
        title: title.trim(),
        description: description.trim(),
      };
      dispatch(saveTasks(newTask));
    }

    setTitle("");
    setDescription("");
  };

  const handleEdit = (task: Task) => {
    setTitle(task.title);
    setDescription(task.description);
    setEditingId(task.id);
  };

  const handleDelete = (id: number) => {
    if (window.confirm("¿Estás seguro de que deseas eliminar esta tarea?")) {
      dispatch(deleteTask(id));
      if (editingId === id) {
        setEditingId(null);
        setTitle("");
        setDescription("");
      }
    }
  };

  const handleCancel = () => {
    setEditingId(null);
    setTitle("");
    setDescription("");
  };

  return (
    <div>
      <h1>Mi Lista de Tareas</h1>

      <form onSubmit={handleSubmit}>
        <div>
          <input
            type="text"
            placeholder="Escribe el título de tu tarea"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        
        <div>
          <textarea
            placeholder="Escribe una descripción (opcional)"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
        
        <div>
          <button type="submit">
            {editingId ? "Guardar Cambios" : "Agregar Tarea"}
          </button>
          
          {editingId && (
            <button type="button" onClick={handleCancel}>
              Cancelar
            </button>
          )}
        </div>
      </form>

      <div>
        <h2>Mis Tareas ({tasks.length})</h2>
        
        {tasks.length === 0 ? (
          <p>No tienes tareas. ¡Agrega tu primera tarea!</p>
        ) : (
          <div>
            {tasks.map((task) => (
              <div key={task.id}>
                <div>
                  <h3>{task.title}</h3>
                  {task.description && <p>{task.description}</p>}
                </div>
                
                <div>
                  <button onClick={() => handleEdit(task)}>
                    Editar
                  </button>
                  <button onClick={() => handleDelete(task.id)}>
                    Eliminar
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default TodoApp;