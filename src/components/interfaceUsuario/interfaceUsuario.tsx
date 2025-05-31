import { DndContext, useDroppable } from "@dnd-kit/core";
import { useState } from "react";
import { Caixa } from "../caixa/caixa";
import './interfaceUsuario.css';

interface CaixaType {
    id: string;
    palavra: string;
}

function constroiCaixasPadrao(): CaixaType[] {
    return [
        { id: '1', palavra: 'Abrir' },
        { id: '2', palavra: 'lrbhfweufhefhweuiofhe' },
        { id: '3', palavra: 'Mover' },
        { id: '4', palavra: 'Movrttrter' },
        { id: '5', palavra: 'Mover' },
        { id: '6', palavra: 'Mover' },
        { id: '7', palavra: 'yhytjhyytjyjy' },
        { id: '8', palavra: 'Moukukver' },
        { id: '9', palavra: 'Movetgeeer' },
        { id: '10', palavra: 'Mover' },
        { id: '11', palavra: 'Movyjyjyter' },
        { id: '12', palavra: 'Moveyjhtyjtjtyjr' },
        { id: '13', palavra: 'Movyjtyjtyjtjtyjyer' },
        { id: '14', palavra: 'Movyjtyjyjtyjer' },
        { id: '15', palavra: 'Movrhjyjyjyttyjter' },
        { id: '16', palavra: 'Morthtuver' },
        { id: '17', palavra: 'Mover' },
        { id: '18', palavra: 'Movyjtyjer' },
        { id: '19', palavra: 'Abrir' },
        { id: '20', palavra: 'lrbhfweufhefhweuiofhe' },
        { id: '21', palavra: 'Movrgergrreger' },
        { id: '22', palavra: 'Morstghtghrhsver' },
        { id: '23', palavra: 'Moverthstttttttttr' },
        { id: '24', palavra: 'Myh5hhover' },
        { id: '25', palavra: 'Mogyetnertgertnergmkrver' },
        { id: '26', palavra: 'Movgreg regergrgergergeger' },
        { id: '27', palavra: 'uifohsuofhishfsd' },
        { id: '28', palavra: 'aeevvveeveve' },
        { id: '29', palavra: 'aevvvvv' },
        { id: '30', palavra: 'aveeeee' },
        { id: '31', palavra: 'aevvvvvvvv' },
        { id: '32', palavra: 'aveeeeeeeeeeveve' },
        { id: '33', palavra: 'ajjjjyttttttttttttttttttttttttttj' },
        { id: '34', palavra: 'agrggrghhhdgh' },
        { id: '35', palavra: 'ahghghghgh' },
        { id: '36', palavra: 'ayjjjjjjjjjjjjjjjjjjjjjjjjjjjjj' },
        { id: '38', palavra: 'ghgfhfghfghfghghfgha' },
        { id: '39', palavra: 'aghfghfghgfhgg' },
        { id: '40', palavra: 'aghfghfhfghfg' },
    ];
}
export function InterfaceUsuario() {
    const [caixasDisponiveis, setCaixasDisponiveis] = useState<CaixaType[]>(constroiCaixasPadrao());
    const [caixasNaLinha, setCaixasNaLinha] = useState<CaixaType[]>([]);

    function onDragEnd(event: any) {
        const { active, over } = event;
        console.log(active.id + "        " + over.id)
        if (over && over.id === 'linhaCodigo') {
            const caixaArrastada = caixasDisponiveis.find((caixa) => caixa.id === active.id);
            if (caixaArrastada) {
                setCaixasNaLinha((prev) => [...prev, caixaArrastada]);
                setCaixasDisponiveis((prev) => prev.filter((c) => c.id !== active.id));
            }
        }
        if (over && over.id === 'areaDisponivel') {
            const caixaArrastada = caixasNaLinha.find((caixa) => caixa.id === active.id);
            if (caixaArrastada) {
                setCaixasNaLinha((prev) => prev.filter((c) => c.id !== active.id));
                setCaixasDisponiveis((prev) => [...prev, caixaArrastada])
            }
        }

    }

    return (
        <>
            <div className='view'></div>
            <h2 className='nome'>Faça Isso</h2>
            <DndContext onDragEnd={onDragEnd}>
                <LinhaCodigo caixasNaLinha={caixasNaLinha} />
                <AreaDisponivel caixasDisponiveis={caixasDisponiveis} />
            </DndContext>
        </>
    );

}





function AreaDisponivel({ caixasDisponiveis }: { caixasDisponiveis: CaixaType[]; }) {
    const { setNodeRef } = useDroppable({ id: 'areaDisponivel' });

    return (
        <div ref={setNodeRef} className="areaDisponivel">
            <div className='gridInterno'>
                {caixasDisponiveis.map((caixa) => (
                    <Caixa key={caixa.id} caixa={caixa} />
                ))}
            </div>
        </div>
    )

}

function LinhaCodigo({ caixasNaLinha }: { caixasNaLinha: CaixaType[]; }) {
    const { setNodeRef } = useDroppable({ id: 'linhaCodigo' });

    return (
        <div ref={setNodeRef} className="container">
            <div className='gridInterno'>
                {caixasNaLinha.map((caixa) => (
                    <Caixa key={caixa.id} caixa={caixa} />
                ))}
            </div>
        </div>
    );
}