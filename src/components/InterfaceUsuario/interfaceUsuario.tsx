import { useState } from "react";
import { Caixa } from "../Caixa/caixa";
import './interfaceUsuario.css';
import { DndContext, closestCenter } from "@dnd-kit/core";
import { SortableContext, arrayMove, useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { managerGame } from "../ManagerGame/managerGame";

export interface CaixaType {
    id: string;
    palavra: string;
}

function constroiCaixasPadrao(): CaixaType[] {
    return [
        { id: '1', palavra: 'Mover' },
        { id: '2', palavra: 'Pegar' },
        { id: '3', palavra: 'Soltar' },
        { id: '4', palavra: 'Cima' },
        { id: '5', palavra: 'Baixo' },
        { id: '6', palavra: 'Esquerda' },
        { id: '7', palavra: 'Direita' },
        { id: '8', palavra: 'Número' },
        { id: '9', palavra: 'Letra' },
        { id: '10', palavra: 'Frase' },
        { id: '11', palavra: 'Repetir' },
        { id: '12', palavra: 'Enquanto' },
        { id: '13', palavra: 'Se' },
        { id: '14', palavra: 'Então' },
        { id: '15', palavra: 'Parar' },
        { id: '16', palavra: 'Esperar' },
        { id: '17', palavra: 'Imprimir' },
        { id: '18', palavra: 'Criar' },
        { id: '19', palavra: 'Variável' },
        { id: '20', palavra: 'Valor' },
        { id: '21', palavra: 'Verdadeiro' },
        { id: '22', palavra: 'Falso' },
        { id: '23', palavra: 'Comparar' },
        { id: '24', palavra: 'Soma' },
        { id: '25', palavra: 'Subtrair' },
        { id: '26', palavra: 'Multiplicar' },
        { id: '27', palavra: 'Dividir' },
        { id: '28', palavra: 'Começar' },
        { id: '29', palavra: 'Fim' },
        { id: '30', palavra: 'Contar' },
        { id: '31', palavra: 'Verificar' },
        { id: '32', palavra: 'Função' },
        { id: '33', palavra: 'Chamar' },
        { id: '34', palavra: 'Retornar' },
        { id: '35', palavra: 'Atualizar' },
        { id: '36', palavra: 'Entrada' },
        { id: '37', palavra: 'Saída' },
        { id: '38', palavra: 'Tempo' },
        { id: '39', palavra: 'Condicional' },
        { id: '40', palavra: 'Bloco' },
    ];
}

export function InterfaceUsuario() {
    const [caixasDisponiveis, setCaixasDisponiveis] = useState<CaixaType[]>(constroiCaixasPadrao());
    const [caixasNaLinha, setCaixasNaLinha] = useState<CaixaType[]>([]);

    function moverCaixa(caixa: CaixaType) {
        const estaNaDisponivel = caixasDisponiveis.some((c) => c.id === caixa.id);
        const estaNaLinha = caixasNaLinha.some((c) => c.id === caixa.id);

        if (estaNaDisponivel) {
            setCaixasDisponiveis((prev) => prev.filter((c) => c.id !== caixa.id));
            setCaixasNaLinha((prev) => [caixa, ...prev]);
        } else if (estaNaLinha) {
            setCaixasNaLinha((prev) => prev.filter((c) => c.id !== caixa.id));
            setCaixasDisponiveis((prev) => [caixa, ...prev]);
        }
    }

    function handleDragEnd(event: any) {
        const { active, over } = event;
        if (active.id !== over?.id) {
            const oldIndex = caixasNaLinha.findIndex(c => c.id === active.id);
            const newIndex = caixasNaLinha.findIndex(c => c.id === over.id);
            setCaixasNaLinha(arrayMove(caixasNaLinha, oldIndex, newIndex));
        }
    }

    return (
        <>
            <div className='view'></div>
            <h2 className='nome'>Faça Isso</h2>

            <DndContext collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
                <SortableContext items={caixasNaLinha.map(c => c.id)}>
                    <LinhaCodigo caixasNaLinha={caixasNaLinha} moverCaixa={moverCaixa} />
                </SortableContext>
            </DndContext>
            <button onClick={() => managerGame.posicoesCaixas(caixasNaLinha)} className="iniciar">Iniciar</button>

            <AreaDisponivel caixasDisponiveis={caixasDisponiveis} moverCaixa={moverCaixa} />
        </>
    );
}

function AreaDisponivel({ caixasDisponiveis, moverCaixa }: { caixasDisponiveis: CaixaType[]; moverCaixa: (caixa: CaixaType) => void; }) {
    return (
        <div className="areaDisponivel">
            <div className="gridInterno">
                {caixasDisponiveis.map((caixa) => (
                    <Caixa key={caixa.id} caixa={caixa} aoClicar={() => moverCaixa(caixa)} />
                ))}
            </div>
        </div>
    );
}

function LinhaCodigo({ caixasNaLinha, moverCaixa }: { caixasNaLinha: CaixaType[]; moverCaixa: (caixa: CaixaType) => void; }) {
    return (
        <div className="container">
            <div className="gridInterno">
                {caixasNaLinha.map((caixa) => (
                    <Caixa key={caixa.id} caixa={caixa} aoClicar={(()=> moverCaixa(caixa))} />
                ))}
            </div>
        </div>
    );
}