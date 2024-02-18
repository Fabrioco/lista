import { useState, useEffect } from "react";

const Lista = () => {
  const [valorInput, setValorInput] = useState("");
  const [items, setItems] = useState([]);
  const [valueCheckbox, setValueCheckbox] = useState(false);

  useEffect(() => {
    const storedItems = JSON.parse(localStorage.getItem("tarefas") || "[]");
    setItems(storedItems);
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (valorInput.trim() !== "") {
      const novoItem = valorInput.trim();
      setItems([...items, novoItem]);

      localStorage.setItem("tarefas", JSON.stringify([...items, novoItem]));

      setValorInput("");
    } else {
      alert("O valor não pode ser vazio");
    }
  };

  const handleDelete = (index) => {
    const novosItems = [...items];
    novosItems.splice(index, 1);
    setItems(novosItems);

    localStorage.setItem("tarefas", JSON.stringify(novosItems));
  };

  const handleEdit = (index, novoTexto) => {
    const novosItems = [...items];
    novosItems[index] = novoTexto;
    setItems(novosItems);
    localStorage.setItem("tarefas", JSON.stringify(novosItems));
  };

  return (
    <div className="container">
      <form onSubmit={handleSubmit}>
        <div>
          <h1>Minhas Tarefas</h1>
        </div>
        <label htmlFor="tarefa">Próxima tarefa</label>
        <input
          type="text"
          name="tarefa"
          id="tarefa"
          value={valorInput}
          onChange={(e) => setValorInput(e.target.value)}
          style={{
            backgroundColor: "#fff",
            padding: "10px",
            borderRadius: "3px",
            outline: "1px solid #000",
          }}
        />
        <button type="submit">Salvar</button>
      </form>
      <div className={items.length > 0 ? "book" : "hidden"}>
        <h2>Bloco de notas</h2>
        <ul>
          {items.map((item, index) => (
            <li key={index}>
              <input
                type="text"
                value={item}
                onChange={(e) => handleEdit(index, e.target.value)}
              />
              <input
                className="checkbox"
                style={{ cursor: "pointer" }}
                type="checkbox"
                onChange={() => setValueCheckbox(!valueCheckbox)}
                checked={valueCheckbox}
              />
              {valueCheckbox && (
                <button onClick={() => handleDelete(index)}>Apagar</button>
              )}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Lista;
