
import { useDraggable } from '@dnd-kit/core';
import './caixa.css'
import { motion } from 'framer-motion';

export interface CaixaProps {
    caixa: {
        id: string,
        palavra: string;
    }
}


export function Caixa({ caixa }: CaixaProps){
       const { attributes, listeners, setNodeRef, transform } = useDraggable({
            id: caixa.id,
          });

            const style = {
    transform: transform
      ? `translate3d(${transform.x}px, ${transform.y}px, 0)`
      : undefined,
    zIndex: 999,
  };

    return(
         <motion.div
              ref={setNodeRef}
              style={style}
              {...listeners}
              {...attributes}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="caixa"
            >
              <p>{caixa.palavra}</p>
            </motion.div>
    )

}