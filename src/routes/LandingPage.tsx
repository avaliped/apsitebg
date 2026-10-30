import { useEffect, useState, type FormEvent, type ReactNode } from 'react';
import {
  ArrowRight,
  BarChart3,
  Check,
  ClipboardCheck,
  FileSpreadsheet,
  GraduationCap,
  Menu,
  MessageCircle,
  ShieldCheck,
  Sparkles,
  Users,
  X,
} from 'lucide-react';
import { DocumentGallery } from '../components/DocumentGallery';

// Contacto público da pré-venda; pode ser substituído por VITE_WHATSAPP_NUMBER no deploy.
const whatsappNumber = ((import.meta.env.VITE_WHATSAPP_NUMBER as string | undefined) || '244972587167').replace(/\D/g, '');
function WhatsAppLink({ children, className = '', onClick }: { children: ReactNode; className?: string; onClick?: () => void }) {
  return (
    <a href="#adesao" className={className} onClick={(event) => { event.preventDefault(); onClick?.(); }}>
      {children}
    </a>
  );
}

function EnrollmentModal({ onClose }: { onClose: () => void }) {
  const [hasRead, setHasRead] = useState(false);
  useEffect(() => {
    const closeOnEscape = (event: KeyboardEvent) => { if (event.key === 'Escape') onClose(); };
    window.addEventListener('keydown', closeOnEscape);
    return () => window.removeEventListener('keydown', closeOnEscape);
  }, [onClose]);

  const continueOnWhatsApp = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const message = encodeURIComponent('Olá! Gostaria de receber mais esclarecimentos sobre o processo de adesão ao AvaliPed e saber como devo proceder.');
    window.location.href = `https://wa.me/${whatsappNumber}?text=${message}`;
  };

  return (
    <div className="enrollment-overlay" role="presentation" onMouseDown={(event) => { if (event.target === event.currentTarget) onClose(); }}>
      <section className="enrollment-dialog" role="dialog" aria-modal="true" aria-labelledby="enrollment-title">
        <button type="button" className="enrollment-close" onClick={onClose} aria-label="Fechar formulário"><X size={20} /></button>
        <div className="landing-kicker">Adesão ao AvaliPed</div>
        <h2 id="enrollment-title">Como aderir ao AvaliPed</h2>
        <p className="enrollment-welcome">Olá, seja bem-vindo(a) ao AvaliPed! O processo de adesão decorre em três etapas principais:</p>
        <div className="enrollment-steps">
          <article><b>1.º Cadastro do professor e da escola</b><p>Faça o cadastro no aplicativo com os seus dados e os da escola. Antes de iniciar o cadastro, leia também as etapas seguintes. Utilize um e-mail a que tenha acesso e defina uma palavra-passe própria e segura.</p></article>
          <article><b>2.º Proposta e pagamento</b><p>Depois de recebermos e verificarmos o cadastro, enviaremos uma proposta com o plano, o valor, o período de utilização e os dados oficiais para pagamento. Só efectue o pagamento depois de receber a proposta. Em seguida, envie o comprovativo nesta conversa. Confirmaremos o recebimento e emitiremos o recibo. Se pretende uma conta institucional para acompanhamento do corpo docente, informe que se trata de uma adesão institucional nesta conversa, ao enviar o comprovativo.</p></article>
          <article><b>3.º Envio das listas e preparação</b><p>Com o pagamento confirmado, envie as listas nominais das turmas em fotografia bem legível (evite listas manuscritas) ou em documento Excel, Word ou PDF. Inclua o número de ordem, o nome do aluno e o sexo. Não envie documentos de identificação, fotografias dos alunos, contactos, moradas ou dados de saúde. Informe também a classe e as disciplinas que lecciona; no Ensino Primário ou nas etapas, basta informar a classe. Depois, conferimos os dados e preparamos a escola, as turmas, as disciplinas e os alunos. A conta pode aparecer activa enquanto esta preparação decorre; isso não significa que o processo terminou.</p></article>
        </div>
        <aside className="enrollment-security"><b>Segurança e prevenção de burlas</b><ul><li>Não pague antes de receber a proposta e os dados oficiais da equipa AvaliPed.</li><li>Confirme que os dados de pagamento correspondem aos indicados na proposta.</li><li>Nunca partilhe a sua palavra-passe. A equipa não precisa dela para preparar a escola.</li><li>Utilize um e-mail a que tenha acesso e defina uma palavra-passe própria e segura.</li></ul></aside>
        <p className="enrollment-before-continue"><b>Antes de continuar:</b> leia todas as etapas. O contacto pelo WhatsApp serve para pedir orientação e esclarecer dúvidas; não confirma adesão nem compromisso de pagamento.</p>
        <form className="enrollment-form" onSubmit={continueOnWhatsApp}>
          <label className="enrollment-consent"><input type="checkbox" checked={hasRead} onChange={(event) => setHasRead(event.target.checked)} /> Li e compreendi as etapas e quero continuar a conversa pelo WhatsApp.</label>
          <div className="enrollment-actions">
            <a className="landing-button landing-button-primary" href="https://gestaoavaliativa.ai.studio/" target="_blank" rel="noreferrer"><GraduationCap size={18} /> Efectuar inscrição</a>
            <button type="submit" className="landing-button enrollment-whatsapp-button" disabled={!hasRead}><MessageCircle size={17} /> Mais esclarecimentos pelo WhatsApp <ArrowRight size={16} /></button>
          </div>
        </form>
      </section>
    </div>
  );
}

export function LandingPage() {
  const [enrollmentOpen, setEnrollmentOpen] = useState(false);
  const openEnrollment = () => setEnrollmentOpen(true);
  return (
    <main className="landing-page">
      <nav className="landing-nav"><a href="#inicio" className="landing-brand"><span className="landing-brand-mark"><GraduationCap size={22} /></span><span><strong>Avali</strong>Ped<small>Gestão avaliativa</small></span></a><WhatsAppLink className="landing-nav-login" onClick={openEnrollment}><MessageCircle size={15} /> Ligar pelo WhatsApp</WhatsAppLink></nav>

      <section id="inicio" className="landing-hero landing-container">
        <div className="landing-hero-copy">
          <div className="landing-eyebrow"><Sparkles size={15} /> Feito para a realidade das escolas angolanas</div>
          <h1>Menos papelada.<br /><span>Mais controlo.</span></h1>
          <p className="landing-hero-lead">O AvaliPed ajuda professores e responsáveis pedagógicos a organizar avaliações, turmas e documentos num só lugar.</p>
          <div className="landing-actions">
            <WhatsAppLink className="landing-button landing-button-primary" onClick={openEnrollment}><MessageCircle size={18} /> Quero conhecer o AvaliPed <ArrowRight size={17} /></WhatsAppLink>
            
          </div>
          <div className="landing-trust-row"><ShieldCheck size={17} /> Contexto autorizado <span /> <ClipboardCheck size={17} /> Documentos organizados <span /> <Users size={17} /> Apoio por WhatsApp</div>
          <div className="landing-coverage"><GraduationCap size={16} /><span><b>Ensino Primário</b> (inclui Pré-Escolar), <b>I Ciclo</b> e <b>II Ciclo</b></span></div>
        </div>
        <div className="landing-hero-visual" aria-label="Pré-visualização do painel do AvaliPed">
          <div className="landing-glow" />
          <div className="landing-dashboard">
            <div className="dashboard-top"><div className="dashboard-logo"><GraduationCap size={14} /></div><span>AvaliPed</span><div className="dashboard-avatar">MP</div></div>
            <div className="dashboard-welcome"><small>Bom dia, Maria</small><strong>O seu trabalho num só lugar.</strong></div>
            <div className="dashboard-stat-grid"><div><span>Turmas activas</span><strong>04</strong><small className="stat-positive">+2 este ano</small></div><div><span>Avaliações</span><strong>86%</strong><small className="stat-blue">Em andamento</small></div></div>
            <div className="dashboard-card"><div className="dashboard-card-heading"><span>As minhas turmas</span><small>Ver todas →</small></div><div className="dashboard-class"><span className="class-icon class-icon-blue"><FileSpreadsheet size={16} /></span><div><strong>6.ª Classe · Turma A</strong><small>Matemática · 28 alunos</small></div><b>92%</b></div><div className="dashboard-class"><span className="class-icon class-icon-green"><ClipboardCheck size={16} /></span><div><strong>5.ª Classe · Turma B</strong><small>Língua Portuguesa · 31 alunos</small></div><b>68%</b></div></div>
            <div className="dashboard-bottom"><BarChart3 size={17} /><span>O seu próximo documento está pronto para consultar.</span></div>
          </div>
        </div>
      </section>

      <section className="landing-proof-strip"><div className="landing-container landing-proof-inner"><span>Uma forma mais simples de trabalhar com</span><b>Turmas</b><b>Avaliações</b><b>Resultados</b><b>Documentos</b></div></section>

      <section id="ver-por-dentro" className="landing-section landing-product-section"><div className="landing-container"><div className="landing-section-heading"><div><div className="landing-kicker">Veja por dentro</div><h2>O professor reconhece<br /><em>o seu dia de trabalho.</em></h2></div><p>Do acompanhamento das turmas à emissão dos documentos, o AvaliPed foi pensado para ser usado no telemóvel, com botões claros e informação no contexto certo.</p></div><div className="landing-phone-grid"><div className="landing-phone-card"><div className="phone-label">Gestão Avaliativa</div><div className="landing-phone"><div className="phone-status">09:50 <span>4G&nbsp; ◉ 95%</span></div><div className="phone-header"><span className="phone-mark"><GraduationCap size={13} /></span><b>AvaliPed</b><small>☰</small></div><div className="phone-content"><small className="phone-kicker">ÁREA OPERACIONAL</small><h3>Gestão Avaliativa</h3><p>Aceda às operações de acompanhamento e avaliação dos alunos.</p><div className="phone-tile"><span className="phone-tile-icon"><Users size={17} /></span><b>Turmas</b><small>Consulte turmas, matrículas e listas nominais.</small><a href="#pre-venda">Gerir turmas →</a></div><div className="phone-tile"><span className="phone-tile-icon"><FileSpreadsheet size={17} /></span><b>Mini-pautas</b><small>Registe e consulte as avaliações trimestrais.</small><a href="#pre-venda">Abrir mini-pautas →</a></div></div><div className="phone-bottom"><b>▣ Gestão Avaliativa</b><span>⌂ Gestão Pedagógica</span></div></div></div><div className="landing-phone-card"><div className="phone-label">Gestão Pedagógica</div><div className="landing-phone"><div className="phone-status">09:50 <span>4G&nbsp; ◉ 95%</span></div><div className="phone-header"><span className="phone-mark"><GraduationCap size={13} /></span><b>AvaliPed</b><small>☰</small></div><div className="phone-content"><small className="phone-kicker">GESTÃO PEDAGÓGICA</small><h3>Pedagogia</h3><p>Planeamento, execução e organização do trabalho docente.</p><div className="phone-tile"><span className="phone-tile-icon"><ClipboardCheck size={17} /></span><b>Planificação Quinzenal</b><small>Elabore e acompanhe a planificação das turmas.</small><a href="#pre-venda">Gerir →</a></div><div className="phone-tile"><span className="phone-tile-icon"><BarChart3 size={17} /></span><b>Planos de Aula</b><small>Registe planos e emita documentos para impressão.</small><a href="#pre-venda">Gerir →</a></div></div><div className="phone-bottom"><span>▣ Gestão Avaliativa</span><b>⌂ Gestão Pedagógica</b></div></div></div><div className="landing-phone-card"><div className="phone-label">Documentos</div><div className="landing-phone"><div className="phone-status">09:51 <span>4G&nbsp; ◉ 95%</span></div><div className="phone-header"><span className="phone-mark"><GraduationCap size={13} /></span><b>AvaliPed</b><small>☰</small></div><div className="phone-content"><div className="phone-period">Período: <b>MT1 (1.º Trimestre)</b></div><div className="phone-document"><FileSpreadsheet size={17} /><b>Mini-Pauta</b><small>Pauta nominal do trimestre seleccionado.</small><strong>?&nbsp; Baixar PDF</strong></div><div className="phone-document"><FileSpreadsheet size={17} /><b>Mini-Pauta Consolidada</b><small>Agrega os três trimestres e a média final.</small><strong>?&nbsp; Baixar PDF</strong></div><div className="phone-document"><BarChart3 size={17} /><b>Estatística Trimestral</b><small>Quadro A4 com a estatística do período.</small><strong>?&nbsp; Baixar PDF</strong></div></div><div className="phone-bottom"><b>▣ Gestão Avaliativa</b><span>⌂ Gestão Pedagógica</span></div></div></div></div><div className="landing-demo-note"><ShieldCheck size={17} /><span><b>Demonstração com dados fictícios.</b> Os nomes dos alunos e a escola apresentados nesta página são apenas exemplos e não representam registos reais.</span></div></div></section>

      <section id="documentos" className="landing-section landing-section-soft"><div className="landing-container"><div className="landing-centered-heading"><div className="landing-kicker">Galeria de documentos</div><h2>Veja os documentos reais<br /><em>gerados pelo AvaliPed.</em></h2><p>Deslize com o dedo ou use as setas para ver os quatro modelos principais.</p></div><DocumentGallery /><div className="landing-demo-note"><ShieldCheck size={17} /><span><b>Exemplos fictícios e não oficiais.</b> Os nomes dos alunos, do professor e da escola são fictícios e servem apenas para demonstrar o formato dos documentos.</span></div></div></section>

      <section id="precos" className="landing-section landing-container"><div className="landing-centered-heading"><div className="landing-kicker">Pré-venda de fundadores</div><h2>Comece com um preço<br /><em>feito para começar.</em></h2><p>Oferta limitada para validar o primeiro grupo de professores e escolas.</p></div><div className="landing-price-grid"><article className="landing-price-card"><span>Professor Individual</span><strong>4.500 <small>Kz / ano</small></strong><del>Preço normal: 6.000 Kz / ano</del><div className="price-support-label">O que pode executar no app</div><ul><li><Check size={16} /> Escolher o ano letivo e o contexto escolar</li><li><Check size={16} /> Consultar as turmas e disciplinas atribuídas</li><li><Check size={16} /> Consultar as listas nominais dos alunos autorizados</li><li><Check size={16} /> Lançar e corrigir as notas das avaliações permitidas</li><li><Check size={16} /> Consultar os resultados por trimestre</li><li><Check size={16} /> Consultar o histórico de versões da mini-pauta</li><li><Check size={16} /> Finalizar a mini-pauta</li><li><Check size={16} /> Gerar e baixar os documentos oficiais</li><li><Check size={16} /> Lançar classificações qualitativas nas turmas de Iniciação</li><li><Check size={16} /> Criar e editar planificações quinzenais</li><li><Check size={16} /> Entregar as planificações</li><li><Check size={16} /> Registar e editar planos de aula e sumários</li><li><Check size={16} /> Imprimir a lista de planos de aula</li><li><Check size={16} /> Preencher e baixar o justificativo de faltas</li><li><Check size={16} /> Atualizar o contacto operacional</li><li><Check size={16} /> Consultar a ajuda e as perguntas frequentes</li></ul><div className="price-support-label">Suporte incluído</div><ul><li><Check size={16} /> Suporte normal por WhatsApp, em horário anunciado</li><li><Check size={16} /> Orientação inicial de utilização</li><li><Check size={16} /> Demonstração do fluxo de lançamento e documentos</li></ul><a href="#pre-venda" className="landing-price-button">Tenho interesse <ArrowRight size={16} /></a></article><article className="landing-price-card price-featured"><div className="price-badge">Supervisão institucional</div><span>Conta Institucional</span><strong>8.000,00 <small>Kz / ano</small></strong><del>Preço normal: 10.000,00 Kz / ano</del><div className="price-support-label">O que pode consultar no app</div><ul><li><Check size={16} /> Consultar a visão geral da escola autorizada</li><li><Check size={16} /> Consultar as turmas, alunos e matrículas</li><li><Check size={16} /> Consultar os docentes e as disciplinas atribuídas</li><li><Check size={16} /> Consultar as planificações e os planos de aula dos docentes</li><li><Check size={16} /> Acompanhar o estado das planificações entregues</li><li><Check size={16} /> Consultar as mini-pautas do trimestre</li><li><Check size={16} /> Consultar os resultados anuais e as aprovações</li><li><Check size={16} /> Consultar as estatísticas trimestrais e o relatório básico anual</li><li><Check size={16} /> Criar matrículas de novos alunos</li><li><Check size={16} /> Transferir alunos entre turmas</li><li><Check size={16} /> Imprimir as mini-pautas e estatísticas dos docentes da escola</li><li><Check size={16} /> Baixar os documentos disponíveis ao perfil</li><li><Check size={16} /> Consultar a ajuda e as perguntas frequentes</li></ul><div className="price-limits">Não altera as notas lançadas pelos docentes.</div><div className="price-support-label">Suporte incluído</div><ul><li><Check size={16} /> Onboarding da escola e configuração inicial do contexto</li><li><Check size={16} /> Formação colectiva de 60 a 90 minutos</li><li><Check size={16} /> Canal institucional de suporte por WhatsApp</li><li><Check size={16} /> Orientação de adopção durante o piloto</li></ul><a href="#pre-venda" className="landing-price-button">Pedir proposta <ArrowRight size={16} /></a></article></div><p className="landing-price-note">Os preços são anuais. A Conta Institucional tem valor fixo; as condições de renovação e o suporte incluído serão confirmados antes da adesão.</p></section>

      <section id="perguntas" className="landing-section landing-faq-section"><div className="landing-container landing-faq-layout"><div><div className="landing-kicker">Antes de começar</div><h2>Perguntas que<br /><em>fazem sentido.</em></h2><p>Quer uma resposta directa sobre a sua escola ou perfil</p><WhatsAppLink className="landing-text-link" onClick={openEnrollment}>Falar com a equipa <ArrowRight size={16} /></WhatsAppLink></div><div className="landing-faq-list"><details open><summary>O AvaliPed substitui as regras da escola</summary><p>Não. Organiza o trabalho dentro do contexto e das permissões autorizadas pela instituição.</p></details><details><summary>Posso testar antes de pagar</summary><p>A pré-venda inclui uma demonstração orientada e um processo de adesão acompanhado, com condições explicadas antes do pagamento.</p></details><details><summary>O preço é mensal</summary><p>Não. Os valores apresentados são anuais e o preço de renovação será informado no momento da adesão.</p></details><details><summary>Como recebo apoio</summary><p>O suporte normal é feito por WhatsApp, em horário anunciado, conforme o plano escolhido.</p></details></div></div></section>

      <section id="pre-venda" className="landing-cta"><div className="landing-container landing-cta-inner"><div><div className="landing-kicker landing-kicker-light">Primeiro grupo de fundadores</div><h2>Organize o seu trabalho<br />com mais clareza.</h2><p>Receba a demonstração e as condições completas da pré-venda.</p></div><WhatsAppLink className="landing-button landing-button-light" onClick={openEnrollment}><MessageCircle size={18} /> Quero receber a demonstração <ArrowRight size={17} /></WhatsAppLink></div></section>

      <footer className="landing-footer"><div className="landing-container landing-footer-inner"><a href="#inicio" className="landing-brand"><span className="landing-brand-mark"><GraduationCap size={20} /></span><span><strong>Avali</strong>Ped<small>Gestão avaliativa</small></span></a><p>Menos retrabalho. Mais controlo sobre o trabalho avaliativo.</p><div className="landing-footer-contact"><a href="mailto:avaliped@gmail.com">avaliped@gmail.com</a><WhatsAppLink onClick={openEnrollment}>WhatsApp: 972 587 167</WhatsAppLink><span>© {new Date().getFullYear()} AvaliPed · Angola</span></div></div></footer>
      {enrollmentOpen && <EnrollmentModal onClose={() => setEnrollmentOpen(false)} />}
    </main>
  );
}


