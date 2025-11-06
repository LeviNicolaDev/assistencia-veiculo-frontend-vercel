import { useState } from "react";
import PlanoList from "./PlanoList";
import PlanoForm from "./PlanoForm";

export default function PlanosPage() {
  const [edit, setEdit] = useState(null);
  const [reload, setReload] = useState(false);

  const handleSaved = () => {
    setEdit(null);
    setReload(!reload);
  };

  return (
    <div style={{ padding: 20 }}>
      {edit ? (
        <PlanoForm plano={edit} onSaved={handleSaved} onClose={() => setEdit(null)} />
      ) : (
        <PlanoList key={reload} onEdit={setEdit} />
      )}
    </div>
  );
}
