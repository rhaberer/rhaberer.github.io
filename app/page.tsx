import Link from "next/link";
import Image from "next/image";
import { Study } from "@/components/study";
import { ProjectIndex } from "@/components/project-index";
import { Arrow } from "@/components/icons";
import { site } from "@/lib/site";
export const metadata = { alternates: { canonical: "/" } };
export default function Home() {
  return (
    <main id="main">
      <section className="hero" id="top">
        <div className="hero-copy">
          <p className="eyebrow mono">Product design / 3D / Interactive</p>
          <h1>
            Ronny
            <br />
            Haberer.
          </h1>
          <a href="#work" className="text-link">
            Selected work{" "}
            <span className="circle-arrow">
              <Arrow />
            </span>
          </a>
        </div>
        <div className="hero-stage" id="playground">
          <Study />
        </div>
        <div className="hero-foot mono">
          <span>Objects. Systems. Experiments.</span>
          <a href="#work">Explore ↓</a>
        </div>
      </section>
      <section className="work-section" id="work" aria-labelledby="work-title">
        <div className="section-heading">
          <h2 id="work-title">Selected work</h2>
          <span className="mono muted">01—06 / Project archive</span>
        </div>
        <ProjectIndex />
      </section>
      <section
        id="about"
        className="about-section"
        aria-labelledby="about-title"
      >
        <div className="about-label">
          <h2 id="about-title" className="eyebrow mono">
            A little context
          </h2>
          <Image
            src="/imgs/3dpc_winner_2017.png"
            width={200}
            height={89}
            alt="Programmable Textiles — 3D Pioneers Challenge Winner 2017"
          />
        </div>
        <div className="about-copy">
          <p className="about-statement">
            Product design.
            <br />
            Computational thinking.
            <br />
            <span className="serif">Hands-on experiments.</span>
          </p>
          <div className="background-notes">
            <span>Bauhaus-Universität Weimar</span>
            <span>Pratt Institute, New York</span>
          </div>
          <Link
            className="award-link"
            href="https://www.3dpc.io/de/2017"
            target="_blank"
            rel="noreferrer"
          >
            Programmable Textiles · 3DPC Winner 2017 <Arrow diagonal />
          </Link>
        </div>
      </section>
      <section
        className="contact-section"
        id="contact"
        aria-labelledby="contact-title"
      >
        <p className="eyebrow mono">Contact</p>
        <div className="contact-heading">
          <h2 id="contact-title">
            What could we
            <br />
            <span className="serif">make possible?</span>
          </h2>
          <a
            className="contact-cta"
            href={`mailto:${site.email}`}
            aria-label="Say hello — email Ronny Haberer"
          >
            <span className="contact-arrow">
              <Arrow diagonal />
            </span>
            <span className="contact-cta-label mono">Say hello</span>
          </a>
        </div>
      </section>
    </main>
  );
}
