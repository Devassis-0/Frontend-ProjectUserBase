import { useEffect, useState } from "react";
import axios from "axios";

function App() {
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [idade, setIdade] = useState("");
  const [usuarios, setUsuarios] = useState([]);
  const [mensagem, setMensagem] = useState("");

  const carregarUsuarios = async () => {
    try {
      const res = await axios.get("http://localhost:8000/usuarios/");
      setUsuarios(res.data);
    } catch (error) {
      console.error("Erro ao buscar usuários", error);
    }
  };

  useEffect(() => {
    carregarUsuarios();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:8000/usuarios/", {
        nome,
        email,
        idade: parseInt(idade),
      });
      setMensagem("Usuário cadastrado com sucesso!");
      setNome("");
      setEmail("");
      setIdade("");
      carregarUsuarios();
    } catch (err) {
      setMensagem(err.response.data.detail || "Erro ao cadastrar");
    }
  };

  return (
    <div className="max-w-xl mx-auto mt-10 p-4 bg-white shadow rounded-xl">
      <h1 className="text-2xl font-bold mb-4">Cadastro de Usuário</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input type="text" value={nome} onChange={(e) => setNome(e.target.value)} placeholder="Nome" className="w-full border p-2 rounded" />
        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" className="w-full border p-2 rounded" />
        <input type="number" value={idade} onChange={(e) => setIdade(e.target.value)} placeholder="Idade" className="w-full border p-2 rounded" />
        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">Cadastrar</button>
      </form>
      {mensagem && <p className="mt-4 text-center text-sm">{mensagem}</p>}
      <div className="mt-6">
        <h2 className="text-lg font-semibold">Usuários Cadastrados:</h2>
        <ul className="mt-2">
          {usuarios.map((u, i) => (
            <li key={i} className="border-b py-1">{u.nome} - {u.email} ({u.idade} anos)</li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default App;
