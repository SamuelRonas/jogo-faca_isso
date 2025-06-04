import { useSortable } from "@dnd-kit/sortable";
import type { CaixaType } from "../InterfaceUsuario/interfaceUsuario";
import { CSS } from "@dnd-kit/utilities";
import './caixa.css'

interface CaixaProps {
  caixa: CaixaType;
  aoClicar: () => void;
}

export function Caixa({ caixa, aoClicar }: CaixaProps) {
   const {
        attributes,
        listeners,
        setNodeRef,
        transform,
        transition,
        isDragging,
    } = useSortable({ id: caixa.id });

    const style: React.CSSProperties = {
        transform: CSS.Transform.toString(transform),
        transition,
        zIndex: isDragging ? 999 : 1,
        opacity: isDragging ? 0.5 : 1,
    };


  return (
    <div ref={setNodeRef} style={style} {...attributes} {...listeners} className="caixa" onClick={aoClicar}>
      {caixa.palavra}
    </div>
  );
}
