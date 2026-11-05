"use client";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { projects, categories } from "@/lib/projects";
import { Arrow } from "./icons";
import { event } from "@/lib/events";
export function ProjectIndex() {
  const [filter, setFilter] = useState<string>("All");
  const visible = projects.filter(
    (p) => filter === "All" || p.category === filter,
  );
  return (
    <>
      <div className="work-toolbar">
        <p className="mono">
          Project index <span className="muted">/ 2016—archive</span>
        </p>
        <div className="filters" aria-label="Filter projects">
          {categories.map((c) => (
            <button
              key={c}
              aria-pressed={filter === c}
              onClick={() => {
                setFilter(c);
                event("project_filter", { category: c });
              }}
            >
              {c}
              {c === "All" && (
                <sup>{projects.length.toString().padStart(2, "0")}</sup>
              )}
            </button>
          ))}
        </div>
      </div>
      <p className="sr-only" role="status">
        {visible.length} {visible.length === 1 ? "project" : "projects"} shown
      </p>
      <div className="project-grid">
        {visible.map((p) => (
          <article className={`project-card project-${p.slug}`} key={p.slug}>
            <Link
              href={`/work/${p.slug}`}
              onClick={() => event("project_open", { project: p.slug })}
              className="project-link"
            >
              <div className="project-image">
                <Image
                  src={p.cover}
                  alt={
                    p.images.find((image) => image.src === p.cover)?.alt ||
                    p.subtitle
                  }
                  fill
                  sizes="(max-width: 700px) 100vw, 50vw"
                  loading={p.number === "01" ? "eager" : "lazy"}
                />
                <span className="image-label mono">
                  {p.number} / {p.category}
                </span>
                {p.award && (
                  <span className="award-label">↗ 3DPC Winner 2017</span>
                )}
                <span
                  className="project-open"
                  aria-label={`View ${p.subtitle}`}
                >
                  <Arrow diagonal />
                </span>
              </div>
              <div className="project-info">
                <div>
                  <h3>{p.subtitle}</h3>
                  <p>{p.tags.slice(0, 2).join(" / ")}</p>
                </div>
                <span className="mono muted">{p.year}</span>
              </div>
            </Link>
          </article>
        ))}
      </div>
    </>
  );
}
