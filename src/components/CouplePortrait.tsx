import { wedding } from "@/data/wedding";

export default function CouplePortrait() {
  return (
    <section className="section portrait-section" aria-labelledby="portrait-heading">
      <div className="portrait-layout" data-reveal>
        <div className="portrait-copy">
          <p className="portrait-eyebrow">Two hearts. One beautiful beginning.</p>
          <h2 id="portrait-heading">Together is<br /><em>a beautiful place to be.</em></h2>
          <p>With happy hearts and our families by our side, we begin our forever. Your presence will make our celebration complete.</p>
          <p className="portrait-signature">{wedding.groom.english} &amp; {wedding.bride.english}</p>
          <span className="portrait-date">{wedding.dateLongEn}</span>
        </div>
        <div className="portrait-wrap">
          <figure className="portrait-frame">
            <img src={wedding.couplePhoto.src} alt={wedding.couplePhoto.alt} width="1199" height="1312" loading="lazy" />
            <figcaption><span>Our forever begins</span><strong>{wedding.groom.english} &amp; {wedding.bride.english}</strong></figcaption>
            {wedding.couplePhoto.isSample && <span className="portrait-sample">Sample couple photo</span>}
          </figure>
        </div>
      </div>
    </section>
  );
}
