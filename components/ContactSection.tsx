import { Arrow } from "./Arrow";

export function ContactSection() {
  return (
    <section className="contact section-shell" id="contact">
      <div className="contact-top"><p className="eyebrow">Contact</p><span className="contact-availability"><span className="status-dot" /> Open to work</span></div>
      <h2>Let&apos;s work<br /><em>together.</em></h2>
      <a className="big-email" href="mailto:nishanpoudel1999@gmail.com">nishanpoudel1999@gmail.com <Arrow /></a>
      <a className="phone-link" href="tel:+9779847010250">+977 9847010250</a>
      <div className="footer-row"><span>© 2026 Nishan Poudel · Kathmandu</span><div><a href="#top">Back to top ↑</a><a href="https://github.com/nishanthanos7" target="_blank" rel="noreferrer">GitHub ↗</a><a href="https://www.linkedin.com/in/nishan-poudel-dev/" target="_blank" rel="noreferrer">LinkedIn ↗</a></div></div>
    </section>
  );
}
