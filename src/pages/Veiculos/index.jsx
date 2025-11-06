import { useState } from "react";
import VeiculoList from "./VeiculoList";
import VeiculoForm from "./VeiculoForm";

export default function VeiculosPage() {
  const [edit, setEdit] = useState(null);
  const [reload, setReload] = useState(false);

  const handleSaved = () => {
    setEdit(null);
    setReload(!reload);
  };

  return (
    <div style={{ padding: 20 }}>
      {edit ? (
        <VeiculoForm veiculo={edit} onSaved={handleSaved} onClose={() => setEdit(null)} />
      ) : (
        <VeiculoList key={reload} onEdit={setEdit} />
      )}
    </div>
  );
}