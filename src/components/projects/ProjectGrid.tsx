import { useState } from 'react';
import type { Project, ProjectCategory } from '../../data/projects';
import { categoryLabels } from '../../data/projects';

interface ProjectGridProps {
  projects: Project[];
  initialCategory?: string;
}

const ALL = 'all';

export default function ProjectGrid({ projects, initialCategory }: ProjectGridProps) {
  const [activeCategory, setActiveCategory] = useState<string>(initialCategory ?? ALL);

  const filtered = activeCategory === ALL
    ? projects
    : projects.filter((p) => p.category === activeCategory);

  const categories: { value: string; label: string }[] = [
    { value: ALL, label: 'Todos' },
    ...Object.entries(categoryLabels).map(([value, label]) => ({ value, label })),
  ];

  return (
    <div>
      {/* Filter tabs */}
      <div className="flex flex-wrap gap-2 mb-8" role="group" aria-label="Filtrar proyectos por categoría">
        {categories.map((cat) => (
          <button
            key={cat.value}
            onClick={() => setActiveCategory(cat.value)}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-forteza-green ${
              activeCategory === cat.value
                ? 'bg-forteza-green text-white'
                : 'bg-white border border-gray-200 text-gray-600 hover:border-forteza-green hover:text-forteza-green'
            }`}
            aria-pressed={activeCategory === cat.value}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {/* Grid */}
      {filtered.length === 0 ? (
        <p className="text-center text-gray-500 py-16">No hay proyectos en esta categoría aún.</p>
      ) : (
        <ul
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
          role="list"
          aria-live="polite"
          aria-label={`${filtered.length} proyecto${filtered.length !== 1 ? 's' : ''} encontrado${filtered.length !== 1 ? 's' : ''}`}
        >
          {filtered.map((project) => (
            <li key={project.slug}>
              <a
                href={`/proyectos/${project.slug}`}
                className="group block bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-shadow duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-forteza-green"
                aria-label={`Ver proyecto: ${project.name}`}
              >
                <div className="relative overflow-hidden h-52">
                  <img
                    src={project.image}
                    alt={`${project.name} — ${categoryLabels[project.category]} en ${project.zone}`}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    width={600}
                    height={400}
                    loading="lazy"
                  />
                  <span className="absolute top-3 left-3 bg-forteza-green text-white text-xs font-semibold px-2 py-1 rounded">
                    {categoryLabels[project.category]}
                  </span>
                </div>
                <div className="p-5">
                  <h3 className="font-semibold text-forteza-green text-lg group-hover:text-forteza-green-light transition-colors">
                    {project.name}
                  </h3>
                  <div className="flex flex-wrap items-center gap-x-3 gap-y-1 mt-2 text-sm text-gray-500">
                    <span className="flex items-center gap-1">
                      <svg className="w-4 h-4 text-forteza-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0zM15 11a3 3 0 11-6 0 3 3 0 016 0z"/>
                      </svg>
                      {project.zone}
                    </span>
                    <span aria-hidden="true">·</span>
                    <span>{project.area} m²</span>
                    <span aria-hidden="true">·</span>
                    <span>{project.year}</span>
                  </div>
                  <p className="text-gray-500 text-sm mt-3 line-clamp-2">{project.description}</p>
                </div>
              </a>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
