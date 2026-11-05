import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { projects, type Project } from "@/lib/projects";
import dimensions from "@/lib/media-dimensions.json";
import { Arrow } from "@/components/icons";
export function generateStaticParams() {
  return projects.map(({ slug }) => ({ slug }));
}
export const dynamicParams = false;
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const p = projects.find((p) => p.slug === slug);
  return p
    ? {
        title: p.subtitle,
        description: p.introduction,
        alternates: { canonical: `/work/${p.slug}` },
        openGraph: {
          title: p.subtitle,
          description: p.introduction,
          images: [p.cover],
        },
      }
    : {};
}
function ProjectImage({
  image,
  index,
  priority = false,
}: {
  image: Project["images"][number];
  index: number;
  priority?: boolean;
}) {
  const size = (
    dimensions as Record<string, { width: number; height: number }>
  )[image.src];
  return (
    <figure className="case-figure">
      <a
        href={image.src}
        target="_blank"
        rel="noreferrer"
        aria-label={`Open full image: ${image.alt}`}
      >
        <Image
          src={image.src}
          alt={image.alt}
          width={size.width}
          height={size.height}
          sizes="(max-width:700px) 88vw, 91vw"
          priority={priority}
        />
      </a>
      <figcaption>
        <span>
          {String(index + 1).padStart(2, "0")} / {image.alt}
        </span>
        <a href={image.src} target="_blank" rel="noreferrer">
          Full image ↗
        </a>
      </figcaption>
    </figure>
  );
}
export default async function ProjectPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const p = projects.find((p) => p.slug === slug);
  if (!p) notFound();
  const next = projects[(projects.indexOf(p) + 1) % projects.length];
  return (
    <main id="main" className="case-main">
      <div id="top" />
      <Link href="/#work" className="back-link">
        ← Selected work
      </Link>
      <div className="case-heading">
        <div className="case-meta">
          <p className="mono">
            {p.number} / {p.category} / {p.year}
          </p>
          <div className="tag-list">
            {p.tags.map((tag) => (
              <span key={tag}>{tag}</span>
            ))}
          </div>
        </div>
        <h1>{p.subtitle}</h1>
      </div>
      {p.video ? (
        <figure className="case-figure">
          <div className="case-video">
            <video
              controls
              playsInline
              preload="metadata"
              poster={p.cover}
              aria-label="4D-printing simulation showing a programmable textile changing form"
            >
              <source src={p.video} type="video/mp4" />
              Your browser does not support this video.{" "}
              <a href={p.video}>Download the simulation.</a>
            </video>
          </div>
          <figcaption>
            <span>4D-printing simulation · original project video</span>
            <a href={p.video}>Open video ↗</a>
          </figcaption>
        </figure>
      ) : (
        <ProjectImage image={p.images[0]} index={0} priority />
      )}
      <div className="case-intro">
        <aside className="case-credit">
          <p>{p.context}</p>
          <p>{p.credits}</p>
          {p.award && (
            <a
              className="case-award"
              href="https://www.3dpc.io/de/2017"
              target="_blank"
              rel="noreferrer"
            >
              ↗ {p.award}
            </a>
          )}
        </aside>
        <div className="case-body">
          <p>{p.introduction}</p>
          <p>{p.process}</p>
          {p.details && (
            <section
              className="project-details"
              aria-labelledby="details-title"
            >
              <h2 id="details-title" className="mono">
                {p.details.heading}
              </h2>
              <p>{p.details.body}</p>
              <a href={p.details.source.url} target="_blank" rel="noreferrer">
                {p.details.source.label} <Arrow diagonal />
              </a>
            </section>
          )}
        </div>
      </div>
      <div className="case-gallery">
        {p.images.slice(1).map((im, i) => (
          <ProjectImage key={im.src} image={im} index={i + 1} />
        ))}
      </div>
      <Link href={`/work/${next.slug}`} className="case-next">
        <div>
          <p className="mono">Next project</p>
          <h2>{next.subtitle}</h2>
        </div>
        <Arrow diagonal />
      </Link>
    </main>
  );
}
