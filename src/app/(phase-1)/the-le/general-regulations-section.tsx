import { regulationGroups } from './general-regulations';

function RegulationIcon({ kind }: { kind: (typeof regulationGroups)[number]['icon'] }) {
  return <svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" focusable="false">
    {kind === 'participation' ? <><rect x="3" y="5" width="18" height="16" rx="2" /><path d="M7 3v4m10-4v4M3 11h18m-13 5 2 2 5-5" /></> : kind === 'dossier' ? <><path d="M14 3H6a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9zM14 3v6h6M8 13h8m-8 4h5" /></> : <><path d="m12 3 8 3v6c0 5-8 9-8 9s-8-4-8-9V6z" /><path d="m8 12 3 3 5-6" /></>}
  </svg>;
}

export function GeneralRegulationsSection() {
  return <div className="rules-regulation-groups">{regulationGroups.map(group => <section key={group.id} className="rules-regulation-group" aria-labelledby={`regulation-${group.id}`}>
    <header className="rules-regulation-group-heading"><span className="rules-regulation-icon"><RegulationIcon kind={group.icon} /></span><h3 id={`regulation-${group.id}`}>{group.title}</h3></header>
    <ul className="rules-regulations">{group.items.map(item => <li key={item.title}>
      <h4>{item.title}</h4>
      <div className="rules-regulation-copy">
        {item.paragraphs?.map(paragraph => <p key={paragraph}>{paragraph}</p>)}
        {item.facts && <dl className="rules-regulation-facts">{item.facts.map(fact => <div key={fact.label}><dt>{fact.label}</dt><dd>{fact.value}</dd></div>)}</dl>}
      </div>
    </li>)}</ul>
  </section>)}</div>;
}
