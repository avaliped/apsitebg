import { useEffect, useRef, useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import miniPautaParcial from '../assets/documentos/mini-pauta-parcial.png';
import estatisticaTrimestral from '../assets/documentos/estatistica-trimestral.png';
import miniPautaConsolidada from '../assets/documentos/mini-pauta-consolidada.png';
import boletimConsolidado from '../assets/documentos/boletim-estatistico-consolidado.png';
import actaCoordenacao from '../assets/documentos/acta-coordenacao-lingua-portuguesa.jpg';
import justificativoFaltas from '../assets/documentos/justificativo-de-faltas.png';
import avalipedNoTelemovel from '../assets/documentos/avaliped-no-telemovel.png';
import pautaFinalDemonstracao from '../assets/documentos/pauta-final-demonstracao.png';

const documentos = [
  {
    titulo: 'AvaliPed no telemóvel',
    descricao: 'Visão da gestão avaliativa, pedagógica e dos documentos no telemóvel.',
    imagem: avalipedNoTelemovel,
  },
  {
    titulo: 'Mini-Pauta Parcial',
    descricao: 'Pauta nominal do trimestre, com classificação, valor por extenso e situação de cada aluno.',
    imagem: miniPautaParcial,
  },
  {
    titulo: 'Estatística Trimestral',
    descricao: 'Quadro A4 com o resumo estatístico e os indicadores de rendimento do trimestre.',
    imagem: estatisticaTrimestral,
  },
  {
    titulo: 'Mini-Pauta Consolidada',
    descricao: 'Agrega os três trimestres, a média final e a situação anual de cada aluno.',
    imagem: miniPautaConsolidada,
  },
  {
    titulo: 'Pauta Final · Exemplo fictício',
    descricao: 'Modelo de pauta final com classificações por disciplina e espaços para assinaturas.',
    imagem: pautaFinalDemonstracao,
  },
  {
    titulo: 'Boletim Estatístico Consolidado',
    descricao: 'Documento estatístico global dos três trimestres, com contagens anuais por sexo.',
    imagem: boletimConsolidado,
  },
  {
    titulo: 'Acta da Coordenação da Disciplina',
    descricao: 'Acta com presenças, objectivos, temas por semana e acções importantes da disciplina.',
    imagem: actaCoordenacao,
  },
  {
    titulo: 'Justificativo de Faltas',
    descricao: 'Pedido de justificação de faltas do professor, pronto para imprimir ou guardar em PDF.',
    imagem: justificativoFaltas,
  },
];

export function DocumentGallery() {
  const trackRef = useRef<HTMLDivElement>(null);
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    const onScroll = () => setIndex(Math.round(track.scrollLeft / track.clientWidth));
    track.addEventListener('scroll', onScroll, { passive: true });
    return () => track.removeEventListener('scroll', onScroll);
  }, []);

  const goTo = (next: number) => {
    const track = trackRef.current;
    if (!track) return;
    const target = Math.max(0, Math.min(documentos.length - 1, next));
    track.scrollTo({ left: target * track.clientWidth, behavior: 'smooth' });
    setIndex(target);
  };

  return (
    <div className="doc-gallery">
      <button
        type="button"
        className="doc-gallery-arrow doc-gallery-prev"
        onClick={() => goTo(index - 1)}
        disabled={index === 0}
        aria-label="Documento anterior"
      >
        <ChevronLeft size={22} />
      </button>

      <div className="doc-gallery-track" ref={trackRef} aria-label="Galeria de documentos">
        {documentos.map((doc, i) => (
          <figure className="doc-gallery-slide" key={doc.titulo}>
            <img
              src={doc.imagem}
              alt={`${doc.titulo}, modelo fictício gerado pelo AvaliPed (${i + 1} de ${documentos.length})`}
              loading="lazy"
            />
            <figcaption>
              <strong>{doc.titulo}</strong>
              <span>{doc.descricao}</span>
            </figcaption>
          </figure>
        ))}
      </div>

      <button
        type="button"
        className="doc-gallery-arrow doc-gallery-next"
        onClick={() => goTo(index + 1)}
        disabled={index === documentos.length - 1}
        aria-label="Documento seguinte"
      >
        <ChevronRight size={22} />
      </button>

      <div className="doc-gallery-dots">
        {documentos.map((doc, i) => (
          <button
            key={doc.titulo}
            type="button"
            className={i === index ? 'is-active' : ''}
            onClick={() => goTo(i)}
            aria-label={`Ver ${doc.titulo}`}
            aria-current={i === index}
          />
        ))}
      </div>
    </div>
  );
}
