
import './caixa.css'

export interface CaixaProps {
    caixa: {
        id: string,
        palavra: string;
    }
}


export function Caixa({ caixa }: CaixaProps){

    return(
        <div className="caixa">
            <p>{caixa.palavra}</p>
        </div>
    )

}