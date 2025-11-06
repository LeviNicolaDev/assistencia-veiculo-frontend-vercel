import { useState } from "react";
import EmpresaList from "./EmpresaList";
import EmpresaForm from "./EmpresaForm";

export default function EmpresasPage() {
  const [edit, setEdit] = useState(null);
  const [reload, setReload] = useState(false);

  const handleSaved = () => {
    setEdit(null);
    setReload(!reload);
  };

  return (
    <div style={{ padding: 20 }}>
      {edit ? (
        <EmpresaForm empresa={edit} onSaved={handleSaved} onClose={() => setEdit(null)} />
      ) : (
        <EmpresaList key={reload} onEdit={setEdit} />
      )}
    </div>
  );
}