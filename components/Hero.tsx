export function Hero() {
  return (
    <section className="hero section-shell" id="top">
      <div className="hero-kicker">
        <span className="status-dot" /> Full-stack developer &amp; product-minded builder
        <span className="kicker-place">Kathmandu, Nepal · open to work</span>
      </div>
      <h1>Full-stack<br /><em>developer.</em></h1>
      <div className="hero-bottom">
        <p className="hero-intro">JavaScript, TypeScript, Python, and production experience across web, mobile, and backend systems.</p>
        <a className="scroll-cue" href="#work"><span>View work</span><span className="scroll-line" /></a>
      </div>
      <div className="hero-orbit" aria-hidden="true">
        <div className="orbit-wave orbit-wave-one" /><div className="orbit-wave orbit-wave-two" /><div className="orbit-wave orbit-wave-three" />
        <div className="orbit-ring orbit-ring-one" /><div className="orbit-ring orbit-ring-two" />
        <div className="orbit-core">✦</div>
      </div>
    </section>
  );
}
