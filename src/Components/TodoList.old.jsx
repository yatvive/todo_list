import React, { useState } from 'react';
import './TodoList.css';

const TodoList = () => {

    const [todos, setTodos] = useState([]);
    const [headingInput, setHeadingInput] = useState('');
    const [listInputs, setListInputs] = useState({});

    const handleAddTodo = () => {
        if (headingInput.trim() !== '') {
          setTodos([...todos, { heading: headingInput, lists: [] }]);
          setHeadingInput('');
        }
      };

        // Fonction pour gérer l'ajout d'un nouvel élément de liste à une rubrique de tâche spécifique
    const handleAddList = (index) => {
        // Vérifiez si l'entrée pour l'index donné n'est pas vide ou juste des espaces
        if (listInputs[index] && listInputs[index].trim() !== '') {
            const newTodos = [...todos]; // Créez une copie du tableau todos actuel
            newTodos[index].lists.push(listInputs[index]); // Ajoutez le nouvel élément de liste à la liste de la rubrique correspondante
            setTodos(newTodos); // Mettez à jour l'état des todos avec le nouvel élément de liste
            setListInputs({ ...listInputs, [index]: '' }); // Effacez le champ de saisie pour cet index
        }
    };
    // Fonction pour mettre à jour la valeur d'entrée de la liste pour un index de rubrique spécifique
    const handleListInputChange = (index, value) => {
        setListInputs({ ...listInputs, [index]: value }); // Mettez à jour l'état des listInputs pour l'index correspondant
    };

    const handleDeleteTodo = (index) => {
        // Create a shallow copy of the current todos array
        const newTodos = [...todos];
        // Remove the todo at the specified index
        newTodos.splice(index, 1);
        // Update the state with the new array (without the deleted todo)
        setTodos(newTodos);
         };

  return (
    <>
      <div className="todo-container">
        <h1 className="title">My Todo List</h1>
        <div className="input-container">{/* Champ de saisie pour entrer un nouvel en-tête */}
        <input
            type="text"
            className="heading-input"// Classe CSS pour le style
            placeholder="Entrez l'en-tête"// Texte affiché lorsque le champ est vide
            value={headingInput}
            onChange={(e) => {setHeadingInput(e.target.value);}} // Ajouter un gestionnaire d'événements onChange pour mettre à jour l'état headingInput
        />
        {/* Bouton pour ajouter l'en-tête saisi à la liste de tâches */}
        <button className="add-list-button" onClick={handleAddTodo}>Ajouter un en-tête</button>
        </div>
      </div>
      <div className="todo_main">
        {todos.map((todo, index) => ( // Iterate over each todo item in the todos array
        <div key={index} className="todo-card">
            <div className="heading_todo">
            {/* Display the heading text of the current todo item */}
                <h3>{todo.heading}</h3> {/* Display the heading here */}
            {/* Button to delete the current heading by passing its index */}
                <button className="delete-button-heading" onClick={() => handleDeleteTodo(index)}>Delete Heading </button>
            </div>

            <div className="list">
                <ul>
                    {/* Itérez sur chaque élément de liste à l'intérieur de la tâche actuelle */}
                    {todo.lists.map((list, listIndex) => (
                    <li key={listIndex} className='todo_inside_list'>
                        {/* Affichez le contenu texte de l'élément de liste */}
                        <p>{list}</p>
                    </li>
                    ))}
                </ul>
            </div>

            <div className='add_list'>
            {/* Champ de saisie pour ajouter un nouvel élément sous une rubrique spécifique */}
            <input
                type="text"
                className="list-input"
                placeholder="Ajouter Liste"
                value={listInputs[index] || ''}// Utilisez la valeur du tableau listInputs en fonction de l'index de la rubrique actuelle
                onChange={(e) => handleListInputChange(index, e.target.value)}/>
            {/* Bouton pour ajouter l'élément de la liste à la rubrique correspondante */}
            <button className="add-list-button" onClick={() => handleAddList(index)}>Ajouter Liste</button>

            <button className="delete-button-heading" onClick={handleDeleteTodo}>Delete Heading</button>
            </div>


        </div>
    ))}
      </div>
      
    </>
  );
};

export default TodoList;