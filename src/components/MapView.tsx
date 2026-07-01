"use client";

import { useEffect, useRef, useState } from "react";
import { Project, projects } from "@/data/projects";

const SECTOR_COLORS: Record<string, string> = {
  "Energy & Power": "#00d4aa",
  "Energy & Petrochemicals": "#00d4aa",
  "Mining & Minerals": "#f59e0b",
  "Transport & Infrastructure": "#4d7cff",
  "Water & Agriculture": "#38bdf8",
  "Technology & Telecommunications": "#8b5cf6",
  "Urban Development": "#8b5cf6",
  "Manufacturing & Industrial": "#f472b6",
  "Petrochemicals": "#00d4aa",
  "Automotive": "#f472b6",
  "Healthcare": "#ef4444",
  "Aerospace & Defense": "#6366f1",
};

function getPinColor(sector: string): string {
  return SECTOR_COLORS[sector] || "#00d4aa";
}

interface MapViewProps {
  onSelectProject: (project: Project) => void;
  onClose: () => void;
}

export default function MapView({ onSelectProject, onClose }: MapViewProps) {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<L.Map | null>(null);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    if (!mapRef.current || mapInstanceRef.current) return;

    let cancelled = false;

    (async () => {
      const L = (await import("leaflet")).default;

      if (cancelled || !mapRef.current) return;

      const map = L.map(mapRef.current, {
        center: [2, 20],
        zoom: 3,
        minZoom: 3,
        maxZoom: 12,
        zoomControl: false,
        attributionControl: false,
      });

      mapInstanceRef.current = map;

      L.control.zoom({ position: "bottomleft" }).addTo(map);

      L.tileLayer(
        "https://{s}.basemaps.cartocdn.com/dark_nolabels/{z}/{x}/{y}{r}.png",
        { maxZoom: 19 }
      ).addTo(map);

      L.tileLayer(
        "https://{s}.basemaps.cartocdn.com/dark_only_labels/{z}/{x}/{y}{r}.png",
        { maxZoom: 19, pane: "overlayPane" }
      ).addTo(map);

      for (const project of projects) {
        if (!project.coordinates) continue;

        const color = getPinColor(project.sector);

        const icon = L.divIcon({
          className: "sv-map-pin",
          html: `
            <div style="
              width: 14px; height: 14px;
              background: ${color};
              border: 2px solid rgba(255,255,255,0.9);
              border-radius: 50%;
              box-shadow: 0 0 8px ${color}88, 0 0 20px ${color}44;
              cursor: pointer;
              transition: transform 0.2s, box-shadow 0.2s;
            " onmouseenter="this.style.transform='scale(1.5)';this.style.boxShadow='0 0 16px ${color}, 0 0 32px ${color}66'"
               onmouseleave="this.style.transform='scale(1)';this.style.boxShadow='0 0 8px ${color}88, 0 0 20px ${color}44'"
            ></div>
          `,
          iconSize: [14, 14],
          iconAnchor: [7, 7],
        });

        const marker = L.marker(project.coordinates, { icon }).addTo(map);

        const tooltipContent = `
          <div style="
            background: rgba(10,10,18,0.95);
            backdrop-filter: blur(16px);
            border: 1px solid rgba(255,255,255,0.12);
            border-radius: 12px;
            padding: 12px 14px;
            min-width: 200px;
            max-width: 280px;
            font-family: 'Inter', system-ui, sans-serif;
          ">
            <div style="font-weight: 700; color: #f0f0f8; font-size: 13px; margin-bottom: 6px; line-height: 1.3;">
              ${project.name}
            </div>
            <div style="color: rgba(240,240,248,0.5); font-size: 11px; margin-bottom: 4px;">
              ${project.region}, ${project.country}
            </div>
            <div style="display: flex; align-items: center; gap: 6px; margin-bottom: 8px;">
              <span style="
                font-size: 10px;
                font-weight: 600;
                text-transform: uppercase;
                letter-spacing: 0.05em;
                background: ${color}22;
                color: ${color};
                padding: 2px 8px;
                border-radius: 999px;
              ">${project.sector}</span>
            </div>
            <button
              data-project-id="${project.id}"
              class="sv-map-link-btn"
              style="
                display: flex;
                align-items: center;
                gap: 6px;
                background: ${color}22;
                border: 1px solid ${color}44;
                color: ${color};
                padding: 6px 12px;
                border-radius: 8px;
                font-size: 11px;
                font-weight: 600;
                cursor: pointer;
                width: 100%;
                justify-content: center;
                transition: background 0.2s;
              "
              onmouseenter="this.style.background='${color}44'"
              onmouseleave="this.style.background='${color}22'"
            >
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                <path d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"/>
              </svg>
              View Project
            </button>
          </div>
        `;

        marker.bindPopup(tooltipContent, {
          closeButton: false,
          className: "sv-map-popup",
          offset: [0, -4],
        });
      }

      map.getContainer().addEventListener("click", (e) => {
        const btn = (e.target as HTMLElement).closest(
          ".sv-map-link-btn"
        ) as HTMLElement | null;
        if (!btn) return;
        const id = btn.getAttribute("data-project-id");
        if (!id) return;
        const project = projects.find((p) => p.id === id);
        if (project) {
          onSelectProject(project);
        }
      });

      setTimeout(() => setLoaded(true), 300);
    })();

    return () => {
      cancelled = true;
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }
    };
  }, [onSelectProject]);

  return (
    <div
      className="fixed inset-0 z-[60] flex items-center justify-center p-4 sm:p-8"
      style={{ background: "rgba(0,0,0,0.6)", backdropFilter: "blur(8px)" }}
    >
      <div
        className={`relative w-full max-w-6xl h-[85vh] rounded-2xl overflow-hidden border border-white/10 transition-all duration-500 ${
          loaded ? "opacity-100 scale-100" : "opacity-0 scale-95"
        }`}
        style={{ background: "rgba(10,10,18,0.95)" }}
      >
        <div className="absolute top-0 left-0 right-0 z-[1000] flex items-center justify-between px-5 py-3 border-b border-white/10"
          style={{ background: "rgba(10,10,18,0.9)", backdropFilter: "blur(12px)" }}
        >
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-sv-accent/20 border border-sv-accent/30 flex items-center justify-center">
              <svg className="w-4 h-4 text-sv-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
            </div>
            <div>
              <h3 className="font-[family-name:var(--font-space-grotesk)] text-sm font-bold text-sv-text">
                Project Map
              </h3>
              <p className="text-[10px] text-sv-text-muted">
                {projects.length} projects across Africa
              </p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="hidden sm:flex items-center gap-3 text-[10px] text-sv-text-muted">
              {Object.entries(
                projects.reduce((acc, p) => {
                  const color = getPinColor(p.sector);
                  const label = p.sector.includes("Energy") ? "Energy" :
                    p.sector.includes("Mining") ? "Mining" :
                    p.sector.includes("Transport") ? "Transport" :
                    p.sector.includes("Water") ? "Water" :
                    p.sector.includes("Tech") || p.sector.includes("Urban") ? "Tech" : "Industry";
                  acc[label] = color;
                  return acc;
                }, {} as Record<string, string>)
              ).map(([label, color]) => (
                <span key={label} className="flex items-center gap-1.5">
                  <span
                    className="w-2 h-2 rounded-full"
                    style={{ background: color as string }}
                  />
                  {label}
                </span>
              ))}
            </div>

            <button
              onClick={onClose}
              className="w-8 h-8 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-sv-text-muted hover:text-sv-text hover:bg-white/10 transition-all cursor-pointer"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>

        <div ref={mapRef} className="w-full h-full" />
      </div>
    </div>
  );
}
