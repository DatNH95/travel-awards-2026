import { getVotingDossier, type DossierEntry } from '@/data/voting-dossier';
import type { VotingProfile } from '@/data/voting';
import { assessmentPeriodLabel } from '@/app/(phase-1)/dang-ky-de-cu/registration-data';
import { UiIcon } from './ui-icon';

function Information({ entries }: { entries: DossierEntry[] }) {
  return <dl className="voting-dossier-facts">{entries.map(entry => {
    const icon = entry.label === 'Website' ? 'globe' : entry.label.startsWith('Fanpage/') ? 'facebook' : undefined;
    return <div key={entry.label}><dt className={icon ? 'voting-dossier-contact-label' : undefined}>{icon && <UiIcon name={icon} size={16} />}<span>{entry.label}</span></dt><dd>{entry.value}</dd></div>;
  })}</dl>;
}

function Narrative({ entries }: { entries: DossierEntry[] }) {
  return <div className="voting-dossier-narratives">{entries.map(entry => <section key={entry.label}><h3>{entry.label}</h3>{entry.value.split('\n\n').map(paragraph => <p key={paragraph}>{paragraph}</p>)}</section>)}</div>;
}

export function VotingDossier({ profile }: { profile: VotingProfile }) {
  const dossier = getVotingDossier(profile);
  return <div className="voting-detail-copy">
    <section className="voting-dossier-section" aria-labelledby="dossier-introduction">
      <h2 id="dossier-introduction" className="voting-dossier-introduction">Giới thiệu hồ sơ</h2>
      <p className="type-body-large">{dossier.intro}</p>
    </section>
    <section className="voting-dossier-section" aria-labelledby="dossier-information">
      <h2 id="dossier-information">Thông tin đơn vị / cá nhân</h2>
      <Information entries={dossier.common} />
      {dossier.destination && <Information entries={[dossier.destination]} />}
    </section>
    <section className="voting-dossier-section" aria-labelledby="dossier-nomination">
      <h2 id="dossier-nomination">Thông tin</h2>
      <Narrative entries={dossier.nomination} />
    </section>
    <section className="voting-dossier-section" aria-labelledby="dossier-professional">
      <h2 id="dossier-professional">Số liệu hoạt động</h2>
      <p className="voting-dossier-period type-body-small">{assessmentPeriodLabel}</p>
      {dossier.professional.length > 0 ? <><Narrative entries={dossier.professional} /><h3 className="voting-dossier-subheading">Dấu ấn nổi bật</h3><Narrative entries={dossier.narratives} /></> : <p>Hạng mục do Ban tổ chức đề cử, không có bộ trường đăng ký chuyên môn riêng.</p>}
    </section>
  </div>;
}
