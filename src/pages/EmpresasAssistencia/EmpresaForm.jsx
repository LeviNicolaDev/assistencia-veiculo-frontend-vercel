import { useEffect, useState } from "react";
import { api } from "../../api/api";

export default function EmpresaForm({ empresa, onClose, onSaved }) {
  const [nome, setNome] = useState(empresa?.nome || "");
  const [endereco, setEndereco] = useState(empresa?.endereco || "");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const payload = { 
      id: empresa?.id ,
      nome, 
      endereco
    };

    try {
      if (empresa?.id) {
        await api.put(`/empresas`, payload);
      } else {
        await api.post("/empresas", payload);
      }
      onSaved();
    } catch (error) {
      if (error.response && error.response.status === 400 && error.response.data.errors) {
        const erros = error.response.data.errors;

        let mensagem = "";
        for (const campo in erros) {
          if (erros.hasOwnProperty(campo)) {
            mensagem += `${erros[campo].join(", \n")}\n`;
          }
        }

        window.alert(mensagem); // mais tarde posso exibir de outra forma no UI
      } else {
        console.error("Erro ao salvar empresa:", error);
        window.alert("Ocorreu um erro ao salvar a empresa.");
      }
    }
  };

  return (
    <form onSubmit={handleSubmit} className="form-container">
      <h3>{empresa?.id ? "Editar Dados da Empresa" : "Nova empresa"}</h3>

      <label>Nome</label>
      <input value={nome} onChange={e => setNome(e.target.value)} placeholder="Nome" />

      <label>Endereço</label>
      <input value={endereco} onChange={e => setEndereco(e.target.value)} placeholder="Endereco" />

      <div className="form-buttons">
        <button type="submit"  className="btn-primary">Salvar</button>
        <button type="button" onClick={onClose} className="btn-secondary">Cancelar</button>
      </div>
    </form>
  );
}
