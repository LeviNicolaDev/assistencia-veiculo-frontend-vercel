import { useState } from "react";
import AssociacoesList from "./AssociacaoList";
import AssociacoesForm from "./AssociacaoForm";

export default function AssociacoesPage() {
  const [editAssociacao, setEditAssociacao] = useState(null);
  const [showForm, setShowForm] = useState(false);

  const handleNova = () => {
    setEditAssociacao(null);
    setShowForm(true);
  };

  const handleEdit = (associacao) => {
    setEditAssociacao(associacao);
    setShowForm(true);
  };

  const handleSaved = () => {
    setShowForm(false);
  };

  return (
    <div>
      {showForm ? (
        <AssociacoesForm
          associacao={editAssociacao}
          onClose={() => setShowForm(false)}
          onSaved={handleSaved}
        />
      ) : (
        <AssociacoesList onNova={handleNova} onEdit={handleEdit} />
      )}
    </div>
  );
}
