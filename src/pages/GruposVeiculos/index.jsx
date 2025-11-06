import { useState } from "react";
import GrupoList from "./GrupoList";
import GrupoForm from "./GrupoForm";

export default function GruposPage() {
  const [edit, setEdit] = useState(null);
  const [reload, setReload] = useState(false);

  const handleSaved = () => {
    setEdit(null);
    setReload(!reload);
  };

  return (
    <div style={{ padding: 20 }}>
      {edit ? (
        <GrupoForm grupo={edit} onSaved={handleSaved} onClose={() => setEdit(null)} />
      ) : (
        <GrupoList key={reload} onEdit={setEdit} />
      )}
    </div>
  );
}