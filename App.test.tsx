// src/App.tsx
import React from "react";
import "./App.css";

type Tile = { label: string; href: string; utm: string };

const tiles: Tile[] = [
  { label: "Speaker",    href: "https://example.com/speaker",    utm: "speaker" },
  { label: "Consulting", href: "https://example.com/consulting", utm: "consulting" },
  { label: "Coaching",   href: "https://example.com/coaching",   utm: "coaching" },
  { label: "Products",   href: "https://example.com/products",   utm: "products" },
];

const UTM = "?utm_source=home&utm_medium=tile&utm_campaign=profiles&utm_content=";

export default function App() {
  return (
    <main className="main">
      <section>
        <h1 className="title">Who’s watching?</h1>
        <ul className="grid">
          {tiles.map((t) => (
            <li className="card" key={t.label}>
              <a href={`${t.href}${UTM}${t.utm}`} rel="noopener noreferrer">
                <div className="avatar" aria-hidden="true">{t.label[0]}</div>
                <div className="label">{t.label}</div>
              </a>
            </li>
          ))}
        </ul>
        <p className="hint">These link to your GHL pages later. We’ll replace the example.com URLs.</p>
      </section>
    </main>
  );
}
