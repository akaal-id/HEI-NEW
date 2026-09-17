'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { Pencil, Trash2, ArrowUp, ArrowDown, Plus } from 'lucide-react';
import { EditorialInput, EditorialSelect } from '../components/ui/editorial-form';
import Button from '../components/Button/Button';
import type { HeroSlideRow, HeroSlideInput } from '../lib/heroSlides';
import styles from './AdminHeroDashboard.module.css';

const EMPTY_FORM: HeroSlideInput = {
  position: 0,
  type: 'image',
  src: '',
  alt: '',
  poster: '',
  duration: 12000,
  contentKey: '',
  eyebrow: '',
  eyebrowDateTime: '',
  title: '',
  date: '',
  location: '',
  buttonLabel: 'Register Now',
  buttonHref: '',
  buttonDisabled: false,
};

export default function AdminHeroDashboard() {
  const router = useRouter();
  const [slides, setSlides] = useState<HeroSlideRow[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState<HeroSlideInput>(EMPTY_FORM);
  const [isUploading, setIsUploading] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState('');

  const loadSlides = async () => {
    setIsLoading(true);
    const response = await fetch('/api/admin/hero-slides');
    if (response.status === 401) {
      router.push('/admin/login');
      return;
    }
    const data = await response.json();
    setSlides(data.slides || []);
    setIsLoading(false);
  };

  useEffect(() => {
    loadSlides();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const closeForm = () => {
    setIsFormOpen(false);
    setEditingId(null);
    setForm(EMPTY_FORM);
    setError('');
  };

  const startCreate = () => {
    setEditingId(null);
    setForm({ ...EMPTY_FORM, position: slides.length });
    setError('');
    setIsFormOpen(true);
  };

  const startEdit = (slide: HeroSlideRow) => {
    setEditingId(slide.id);
    setForm({
      position: slide.position,
      type: slide.type,
      src: slide.src,
      alt: slide.alt,
      poster: slide.poster || '',
      duration: slide.duration || 12000,
      contentKey: slide.content_key,
      eyebrow: slide.eyebrow,
      eyebrowDateTime: slide.eyebrow_date_time,
      title: slide.title,
      date: slide.date,
      location: slide.location,
      buttonLabel: slide.button_label,
      buttonHref: slide.button_href,
      buttonDisabled: slide.button_disabled,
    });
    setError('');
    setIsFormOpen(true);
  };

  const handleUpload = async (file: File) => {
    setIsUploading(true);
    setError('');
    try {
      const body = new FormData();
      body.append('file', file);
      const response = await fetch('/api/admin/hero-slides/upload', { method: 'POST', body });
      const data = await response.json();
      if (!response.ok) throw new Error(data.error || 'Upload failed');
      setForm((current) => ({ ...current, src: data.url }));
    } catch (uploadError) {
      setError(uploadError instanceof Error ? uploadError.message : 'Upload failed');
    } finally {
      setIsUploading(false);
    }
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!form.src) {
      setError('Please upload an image (or paste a URL) first.');
      return;
    }

    setIsSaving(true);
    setError('');
    try {
      const url = editingId ? `/api/admin/hero-slides/${editingId}` : '/api/admin/hero-slides';
      const method = editingId ? 'PUT' : 'POST';
      const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.error || 'Save failed');

      closeForm();
      await loadSlides();
    } catch (saveError) {
      setError(saveError instanceof Error ? saveError.message : 'Save failed');
    } finally {
      setIsSaving(false);
    }
  };

  const handleDelete = async (slide: HeroSlideRow) => {
    if (!confirm(`Delete "${slide.title}"?`)) return;
    await fetch(`/api/admin/hero-slides/${slide.id}`, { method: 'DELETE' });
    if (editingId === slide.id) {
      closeForm();
    }
    await loadSlides();
  };

  const handleReorder = async (index: number, direction: -1 | 1) => {
    const targetIndex = index + direction;
    if (targetIndex < 0 || targetIndex >= slides.length) return;

    const current = slides[index];
    const target = slides[targetIndex];

    await Promise.all([
      fetch(`/api/admin/hero-slides/${current.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(rowToInput(current, target.position)),
      }),
      fetch(`/api/admin/hero-slides/${target.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(rowToInput(target, current.position)),
      }),
    ]);
    await loadSlides();
  };

  return (
    <div className={styles.page}>
      <div className={styles.pageHeader}>
        <h1 className={styles.title}>Hero Carousel</h1>
        <p className={styles.subtitle}>Manage the slides shown on the homepage hero.</p>
      </div>

      <section className={styles.list}>
        {isLoading ? (
          <p>Loading…</p>
        ) : slides.length === 0 ? (
          <p>No slides yet — add your first one below.</p>
        ) : (
          slides.map((slide, index) => (
            <div key={slide.id} className={styles.row}>
              <div className={styles.thumb}>
                {slide.src && (
                  <Image src={slide.src} alt={slide.alt} fill sizes="96px" className={styles.thumbImage} />
                )}
              </div>
              <div className={styles.rowInfo}>
                <strong>{slide.title || '(untitled)'}</strong>
                <span>{slide.content_key}</span>
              </div>
              <div className={styles.rowActions}>
                <button type="button" onClick={() => handleReorder(index, -1)} disabled={index === 0} aria-label="Move up">
                  <ArrowUp size={16} />
                </button>
                <button
                  type="button"
                  onClick={() => handleReorder(index, 1)}
                  disabled={index === slides.length - 1}
                  aria-label="Move down"
                >
                  <ArrowDown size={16} />
                </button>
                <button type="button" onClick={() => startEdit(slide)} aria-label="Edit">
                  <Pencil size={16} />
                </button>
                <button type="button" onClick={() => handleDelete(slide)} aria-label="Delete">
                  <Trash2 size={16} />
                </button>
              </div>
            </div>
          ))
        )}

        {!isFormOpen && (
          <button type="button" className={styles.addButton} onClick={startCreate}>
            <Plus size={16} /> Add new slide
          </button>
        )}
      </section>

      {isFormOpen && (
        <form className={styles.form} onSubmit={handleSubmit}>
          <h2 className={styles.formTitle}>{editingId ? 'Edit slide' : 'New slide'}</h2>

          <div className={styles.uploadRow}>
            {form.src && (
              <div className={styles.uploadPreview}>
                <Image src={form.src} alt="" fill sizes="120px" className={styles.thumbImage} />
              </div>
            )}
            <div>
              <input
                type="file"
                accept="image/*,video/*"
                onChange={(event) => {
                  const file = event.target.files?.[0];
                  if (file) handleUpload(file);
                }}
              />
              {isUploading && <p className={styles.hint}>Uploading…</p>}
              <EditorialInput
                label="Image/video URL"
                tooltip="Auto-filled after upload — or paste a URL directly."
                value={form.src}
                onChange={(event) => setForm((f) => ({ ...f, src: event.target.value }))}
                required
              />
            </div>
          </div>

          <div className={styles.grid}>
            <EditorialSelect
              label="Type"
              value={form.type}
              onChange={(event) =>
                setForm((f) => ({ ...f, type: event.target.value as 'image' | 'video' }))
              }
              options={[
                { value: 'image', label: 'Image' },
                { value: 'video', label: 'Video' },
              ]}
            />

            <EditorialInput
              label="Alt text"
              value={form.alt}
              onChange={(event) => setForm((f) => ({ ...f, alt: event.target.value }))}
              required
            />

            {form.type === 'video' && (
              <EditorialInput
                label="Poster image URL"
                value={form.poster || ''}
                onChange={(event) => setForm((f) => ({ ...f, poster: event.target.value }))}
              />
            )}

            <EditorialInput
              label="Slide duration (ms)"
              type="number"
              value={form.duration ?? ''}
              onChange={(event) => setForm((f) => ({ ...f, duration: Number(event.target.value) }))}
            />

            <EditorialInput
              label="Content key"
              tooltip="Unique internal identifier for this slide."
              value={form.contentKey}
              onChange={(event) => setForm((f) => ({ ...f, contentKey: event.target.value }))}
              required
            />

            <EditorialInput
              label="Eyebrow"
              value={form.eyebrow}
              onChange={(event) => setForm((f) => ({ ...f, eyebrow: event.target.value }))}
            />

            <EditorialInput
              label="Eyebrow date/time"
              value={form.eyebrowDateTime}
              onChange={(event) => setForm((f) => ({ ...f, eyebrowDateTime: event.target.value }))}
            />

            <EditorialInput
              label="Title"
              value={form.title}
              onChange={(event) => setForm((f) => ({ ...f, title: event.target.value }))}
              required
            />

            <EditorialInput
              label="Date"
              value={form.date}
              onChange={(event) => setForm((f) => ({ ...f, date: event.target.value }))}
            />

            <EditorialInput
              label="Location"
              value={form.location}
              onChange={(event) => setForm((f) => ({ ...f, location: event.target.value }))}
            />

            <EditorialInput
              label="Button label"
              value={form.buttonLabel}
              onChange={(event) => setForm((f) => ({ ...f, buttonLabel: event.target.value }))}
            />

            <EditorialInput
              label="Button link"
              value={form.buttonHref}
              onChange={(event) => setForm((f) => ({ ...f, buttonHref: event.target.value }))}
            />
          </div>

          <label className={styles.checkboxRow}>
            <input
              type="checkbox"
              checked={form.buttonDisabled}
              onChange={(event) => setForm((f) => ({ ...f, buttonDisabled: event.target.checked }))}
            />
            Button disabled (shows &quot;coming soon&quot; state)
          </label>

          {error && <p className={styles.error}>{error}</p>}

          <div className={styles.formActions}>
            <Button type="submit" variant="primary" disabled={isSaving}>
              {isSaving ? 'Saving…' : editingId ? 'Save changes' : 'Add slide'}
            </Button>
            <Button type="button" variant="tertiary" onClick={closeForm}>
              Cancel
            </Button>
          </div>
        </form>
      )}
    </div>
  );
}

function rowToInput(row: HeroSlideRow, position: number): HeroSlideInput {
  return {
    position,
    type: row.type,
    src: row.src,
    alt: row.alt,
    poster: row.poster,
    duration: row.duration,
    contentKey: row.content_key,
    eyebrow: row.eyebrow,
    eyebrowDateTime: row.eyebrow_date_time,
    title: row.title,
    date: row.date,
    location: row.location,
    buttonLabel: row.button_label,
    buttonHref: row.button_href,
    buttonDisabled: row.button_disabled,
  };
}
