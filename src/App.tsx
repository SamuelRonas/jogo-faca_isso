// App.tsx
import React, { useState } from 'react';
import './App.css';
import { DndContext, useDraggable, useDroppable } from '@dnd-kit/core';
import { Caixa } from './components/caixa/caixa';
import { motion, AnimatePresence, Reorder } from 'framer-motion';

interface CaixaType {
  id: string;
  palavra: string;
}

function constroiCaixas(): CaixaType[] {
  return [
    { id: '1', palavra: 'Abrir' },
    { id: '2', palavra: 'Fechar' },
    { id: '3', palavra: 'Mover' },
  ];
}

function App() {
  const [caixasDisponiveis, setCaixasDisponiveis] = useState<CaixaType[]>(constroiCaixas());
  const [caixasNaLinha, setCaixasNaLinha] = useState<CaixaType[]>([]);

  function onDragEnd(event: any) {
    const { active, over } = event;
    if (over && over.id === 'linhaCodigo') {
      const caixaArrastada = caixasDisponiveis.find((caixa) => caixa.id === active.id);
      if (caixaArrastada) {
        setCaixasNaLinha((prev) => [...prev, caixaArrastada]);
        setCaixasDisponiveis((prev) => prev.filter((c) => c.id !== active.id));
      }
    }
  }

  return (
    <DndContext onDragEnd={onDragEnd}>
      <div className="container">
        <div className="areaDisponivel">
          <h2>Caixas Disponíveis</h2>
          {caixasDisponiveis.map((caixa) => (
            <CaixaDraggable key={caixa.id} caixa={caixa} />
          ))}
        </div>

        <LinhaCodigo caixasNaLinha={caixasNaLinha} setCaixasNaLinha={setCaixasNaLinha} />
      </div>
    </DndContext>
  );
}

function LinhaCodigo({
  caixasNaLinha,
  setCaixasNaLinha,
}: {
  caixasNaLinha: CaixaType[];
  setCaixasNaLinha: React.Dispatch<React.SetStateAction<CaixaType[]>>;
}) {
  const { setNodeRef } = useDroppable({
    id: 'linhaCodigo',
  });

  return (
    <div ref={setNodeRef} className="linhaCodigo">
      <h2>Linha de Código</h2>
      <Reorder.Group
        axis="x"
        values={caixasNaLinha}
        onReorder={setCaixasNaLinha}
        className="reorder-group"
      >
        <AnimatePresence>
          {caixasNaLinha.map((caixa) => (
            <Reorder.Item
              key={caixa.id}
              value={caixa}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ duration: 0.3 }}
              className="caixaNaLinha"
            >
              <Caixa caixa={caixa} />
            </Reorder.Item>
          ))}
        </AnimatePresence>
      </Reorder.Group>
    </div>
  );
}

function CaixaDraggable({ caixa }: { caixa: CaixaType }) {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: caixa.id,
  });

  const style = {
    transform: transform
      ? `translate3d(${transform.x}px, ${transform.y}px, 0)`
      : undefined,
    zIndex: 999,
  };

  return (
    <motion.div
      ref={setNodeRef}
      style={style}
      {...listeners}
      {...attributes}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className="caixaDraggable"
    >
      <Caixa caixa={caixa} />
    </motion.div>
  );
}

export default App;
