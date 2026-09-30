import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Modal from '../components/Modal.jsx';
import { Button, Chip, PageTitle, StatCard, StatusChip, Table, Td, Card } from '../components/ui.jsx';
import { useStore } from '../store.jsx';
import { t } from '../i18n.js';
import { PLANS, needsAttention, partner, earnings } from '../data/demo.js';

const inputClass =
  'h-10 w-full rounded-lg border border-outline-variant bg-surface-container-lowest px-space-md font-body-sm text-body-sm text-on-surface focus:outline-none focus:border-primary-container';

function AddClinicModal({ onClose }) {
  const { addClinic } = useStore();
  const [name, setName] = useState('');
  const [location, setLocation] = useState('');
  const [plan, setPlan] = useState('basic');

  const submit = (e) => {
    e.preventDefault();
    addClinic({ name: name.trim(), location: location.trim() });
    onClose();
  };

  return (
    <Modal title="Add clinic" onClose={onClose}>
      <form onSubmit={submit} className="flex flex-col gap-space-md">
        <label className="flex flex-col gap-space-xs font-label-lg text-label-lg text-on-surface-variant">
          Clinic name
          <input required value={name} onChange={(e) => setName(e.target.value)} className={inputClass} />
        </label>
        <label className="flex flex-col gap-space-xs font-label-lg text-label-lg text-on-surface-variant">
          Location
          <input required value={location} onChange={(e) => setLocation(e.target.value)} className={inputClass} />
        </label>
        <label className="flex flex-col gap-space-xs font-label-lg text-label-lg text-on-surface-variant">
          Plan
          <select value={plan} onChange={(e) => setPlan(e.target.value)} className={inputClass}>
            {Object.entries(PLANS).map(([id, p]) => (
              <option key={id} value={id}>{`${p.label} Rs ${p.price.toLocaleString('en-IN')}`}</option>
            ))}
          </select>
        </label>
        <div className="flex justify-end gap-space-sm">
          <Button variant="ghost" onClick={onClose}>Cancel</Button>
          <Button type="submit">Add clinic</Button>
        </div>
      </form>
    </Modal>
  );
}

export default function PartnerDashboard() {
  const { lang, clinics } = useStore();
  const navigate = useNavigate();
  const [adding, setAdding] = useState(false);

  return (
    <>
      <div className="flex items-start justify-between gap-space-md">
        <PageTitle chip={<Chip tone="teal" icon="lock">Metadata only. No patient files are visible here.</Chip>}>
          {t('clinics', lang)}
        </PageTitle>
        <Button icon="add" onClick={() => setAdding(true)}>Add clinic</Button>
      </div>

      <div className="grid grid-cols-3 gap-space-lg mb-space-lg">
        <StatCard label="Clinics" value={partner.clinicCount} icon="local_hospital" />
        <StatCard label="Needs attention" value={needsAttention} icon="warning" />
        <StatCard label="Earnings this month" value={`Rs ${earnings.thisMonth.toLocaleString('en-IN')}`} icon="currency_rupee" />
      </div>

      <Card className="!p-space-md">
        <Table
          head={[
            { label: 'Clinic', className: 'w-[32%]' },
            { label: 'Location', className: 'w-[14%]' },
            { label: 'Health score', className: 'w-[14%] text-right' },
            { label: 'Status', className: 'w-[24%]' },
            { label: '', className: 'w-[16%]' },
          ]}
        >
          {clinics.map((c) => (
            <tr key={c.id} className={c.status === 'awaiting' ? '' : 'hover:bg-surface-container-low cursor-pointer'}
              onClick={() => c.status !== 'awaiting' && navigate(`/partner/clinic/${c.id}`)}>
              <Td className="font-semibold">{c.name}</Td>
              <Td>{c.location}</Td>
              <Td className="text-right tabular-nums">{c.score ?? '-'}</Td>
              <Td><StatusChip status={c.status} /></Td>
              <Td className="text-right">
                <Button variant="secondary" small disabled={c.status === 'awaiting'}
                  onClick={(e) => { e.stopPropagation(); navigate(`/partner/clinic/${c.id}`); }}>
                  Open
                </Button>
              </Td>
            </tr>
          ))}
        </Table>
      </Card>

      {adding && <AddClinicModal onClose={() => setAdding(false)} />}
    </>
  );
}
