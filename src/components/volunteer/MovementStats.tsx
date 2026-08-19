export function MovementStats() {
  return (
    <section className="py-24 bg-[var(--color-primary-green)] text-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-4xl font-serif font-bold mb-12">Growing Together</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          <div><div className="text-4xl font-bold mb-2">12</div><div className="text-sm uppercase tracking-wider text-[var(--color-light-green)]">Constituencies</div></div>
          <div><div className="text-4xl font-bold mb-2">60</div><div className="text-sm uppercase tracking-wider text-[var(--color-light-green)]">Wards</div></div>
          <div><div className="text-4xl font-bold mb-2">240+</div><div className="text-sm uppercase tracking-wider text-[var(--color-light-green)]">Volunteers</div></div>
          <div><div className="text-4xl font-bold mb-2">18</div><div className="text-sm uppercase tracking-wider text-[var(--color-light-green)]">Activities</div></div>
        </div>
      </div>
    </section>
  );
}
