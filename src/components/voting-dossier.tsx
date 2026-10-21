import { getVotingDossier, type DossierEntry } from '@/data/voting-dossier';
import type { VotingProfile } from '@/data/voting';
import { UiIcon } from './ui-icon';
import { AnimatedStatistic } from './animated-statistic';

function Information({ entries }: { entries: DossierEntry[] }) {
  const labels: Record<string, string> = { 'Tên đơn vị/tổ chức/cá nhân': 'Đơn vị / cá nhân', 'Loại hình đơn vị': 'Loại hình', 'Địa chỉ': 'Địa điểm', 'Fanpage/Kênh truyền thông chính thức': 'Fanpage', 'Cơ quan/đơn vị đại diện đề cử': 'Đơn vị đại diện' };
  return <dl className="voting-dossier-facts">{entries.map(entry => {
    const icon = entry.label === 'Website' ? 'globe' : entry.label.startsWith('Fanpage/') ? 'facebook' : undefined;
    let url: URL | undefined;
    if (icon) { try { const parsed = new URL(entry.value); if (['https:', 'http:'].includes(parsed.protocol)) url = parsed; } catch { /* Plain text remains valid contact content. */ } }
    const displayValue = url ? `${url.hostname.replace(/^www\./, '')}${icon === 'facebook' ? url.pathname.replace(/\/$/, '') : ''}` : entry.value;
    const isPublicUrl = url && !/(^|\.)example\.(com|org|net)$/.test(url.hostname);
    return <div key={entry.label}><dt className={icon ? 'voting-dossier-contact-label' : undefined}>{icon && <UiIcon name={icon} size={16} />}<span>{labels[entry.label] ?? entry.label}</span></dt><dd>{isPublicUrl && url ? <a href={url.href} target="_blank" rel="noopener noreferrer">{displayValue}<UiIcon name="arrow-up-right" size={14} /></a> : displayValue}</dd></div>;
  })}</dl>;
}

function Narrative({ entries, variant = 'default' }: { entries: DossierEntry[]; variant?: 'default' | 'metrics' }) {
  return <div className={`voting-dossier-narratives${variant === 'metrics' ? ' voting-dossier-narratives--metrics' : ''}`}>{entries.map(entry => <section key={entry.label}><h3>{entry.label}</h3><div className="voting-dossier-paragraphs">{entry.value.split('\n\n').map(paragraph => <p key={paragraph}>{paragraph}</p>)}</div></section>)}</div>;
}

export function VotingDossier({ profile }: { profile: VotingProfile }) {
  const dossier = getVotingDossier(profile);
  return <div className="voting-detail-copy">
    <section className="voting-dossier-section" aria-labelledby="dossier-introduction">
      <h2 id="dossier-introduction" className="voting-dossier-introduction">Giới thiệu</h2>
      <p className="type-body-large">{dossier.intro}</p>
      {dossier.highlights.length > 0 && <div className="voting-dossier-highlights"><dl aria-label="Số liệu nổi bật">{dossier.highlights.map(item => <div key={item.label}><dt>{item.label}</dt><dd><AnimatedStatistic key={item.value} value={item.value} /></dd></div>)}</dl></div>}
    </section>
    <section className="voting-dossier-section" aria-labelledby="dossier-information">
      <h2 id="dossier-information">Thông tin đơn vị / cá nhân</h2>
      <Information entries={[...dossier.common, ...(dossier.destination ? [dossier.destination] : [])]} />
    </section>
    <section className="voting-dossier-section" aria-labelledby="dossier-nomination">
      <h2 id="dossier-nomination">Thông tin</h2>
      <Narrative entries={dossier.nomination.map((entry, index) => ({ ...entry, label: index === 0 ? 'Thành tích trong năm' : 'Điểm khác biệt' }))} />
    </section>
    {dossier.professional.length > 0 && <section className="voting-dossier-section" aria-labelledby="dossier-professional">
      <h2 id="dossier-professional">Số liệu hoạt động</h2>
      <Narrative entries={dossier.professional} variant="metrics" />
    </section>}
    {dossier.narratives.length > 0 && <section className="voting-dossier-section voting-dossier-signatures" aria-labelledby="dossier-signatures">
      <h2 id="dossier-signatures">Dấu ấn nổi bật</h2>
      <Narrative entries={dossier.narratives} />
    </section>}
  </div>;
}
