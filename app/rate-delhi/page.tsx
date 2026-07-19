import type { Metadata } from "next";
import "./rate-delhi.css";

export const metadata: Metadata = {
  title: "Website Services — Rate Card",
};

export default function PricingDelhiPage() {
  return (
    <>
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link
        href="https://fonts.googleapis.com/css2?family=Archivo:wght@500;700;900&family=IBM+Plex+Sans:wght@400;500;600&family=IBM+Plex+Mono:wght@500;600&display=swap"
        rel="stylesheet"
      />
      <div className="pricing-delhi">
        <div className="sheet">
          <header>
            <div className="eyebrow">Rate Card · Avilash · +91-9971433949 · Delhi · 2026</div>
            <h1>
              Website Development <span className="amp">&amp;</span> Hosting
            </h1>
            <p className="sub">
              Custom-built, fast, mobile-ready websites for local businesses — designed, developed, hosted and
              maintained by one dedicated engineer.
            </p>
          </header>

          <div className="sec">
            <h2>Build your website</h2>
          </div>
          <div className="row">
            <div className="what">
              <strong>Starter website</strong>
              <span>Pages, photo gallery, contact &amp; WhatsApp, Google Maps — no database or admin panel</span>
            </div>
            <div className="price">
              from ₹10,000<small>one-time</small>
            </div>
          </div>
          <div className="row">
            <div className="what">
              <strong>Advanced website</strong>
              <span>Database, APIs, admin dashboard, online menus, booking &amp; custom features</span>
            </div>
            <div className="price">
              ₹15,000 up to ₹2,00,000<small>priced by effort</small>
            </div>
          </div>
          <div className="row">
            <div className="what">
              <strong>Domain name</strong>
              <span>Registered in your business&apos;s name — I handle setup and renewals for you</span>
            </div>
            <div className="price">
              at cost<small>billed to business</small>
            </div>
          </div>

          <div className="sec">
            <h2>Hosting &amp; maintenance</h2>
          </div>
          <div className="row">
            <div className="what">
              <strong>Static website</strong>
              <span>Pages, gallery, contact, WhatsApp/Maps — no login, no backend</span>
            </div>
            <div className="price">
              ₹25,000 / year<small>Deployment, Uptime, Server Maintainance</small>
            </div>
          </div>
          <div className="row">
            <div className="what">
              <strong>Website with admin panel</strong>
              <span>You can log in and update your own menu, products or content — data kept safely on the server</span>
            </div>
            <div className="price">
              ₹35,000 – ₹45,000 / year<small>Deployment, Uptime, Server Maintainance</small>
            </div>
          </div>
          <div className="row">
            <div className="what">
              <strong>Website with payment integration</strong>
              <span>Customers can pay or book online — highest tier of monitoring &amp; support</span>
            </div>
            <div className="price">
              ₹45,000 – ₹60,000 / year<small>Deployment, Uptime, Server Maintainancee</small>
            </div>
          </div>
          <div
            className="steps"
            aria-label="Yearly hosting fee, increasing 2500 rupees each year(10% of Year 1), linear not compounding"
          >
            <div className="step">
              <b>₹25,000</b>
              <i>Year 1</i>
            </div>
            <div className="step">
              <b>₹27,500</b>
              <i>Year 2</i>
            </div>
            <div className="step">
              <b>₹30,000</b>
              <i>Year 3</i>
            </div>
          </div>
          <p className="escnote">
            Shown for the static tier: hosting increases by a flat ₹2,500 (10% of Year 1) every year — simple,
            predictable, linear, never compounding. The same flat increase applies to every tier.
          </p>

          <div className="sec">
            <h2>Changes after launch</h2>
          </div>
          <div className="row">
            <div className="what">
              <strong>Minor edits &amp; updates</strong>
              <span>Text, menu, photos, timings — delivered in 3–5 days</span>
            </div>
            <div className="price">
              ₹1,000<small>per request</small>
            </div>
          </div>
          <div className="row">
            <div className="what">
              <strong>Major features</strong>
              <span>Scoped &amp; quoted separately — delivered within 1 month</span>
            </div>
            <div className="price">
              ₹5,000 – ₹1,00,000<small>by complexity</small>
            </div>
          </div>

          <div className="sec">
            <h2>Need changes urgently?</h2>
          </div>
          <div className="grid">
            <div className="card hot">
              <div className="hrs">
                8<em> hrs</em>
              </div>
              <div className="fee">+ ₹20,000</div>
            </div>
            <div className="card">
              <div className="hrs">
                12<em> hrs</em>
              </div>
              <div className="fee">+ ₹10,000</div>
            </div>
            <div className="card">
              <div className="hrs">
                24<em> hrs</em>
              </div>
              <div className="fee">+ ₹6,000</div>
            </div>
            <div className="card">
              <div className="hrs">
                48<em> hrs</em>
              </div>
              <div className="fee">+ ₹4,000</div>
            </div>
          </div>
          <p className="urgnote">
            Urgent surcharge applies on top of the edit or feature charge, subject to feasibility. Hours to be
            calucated for working hours only.
          </p>

          <div className="terms">
            <p>
              <b>Hosting is billed upfront</b> — monthly at ₹2,500 or yearly at ₹25,000.
            </p>
            <p>
              <b>Domain costs are paid by the business</b>; management is included free.
            </p>
            <p>
              <b>Major features are quoted before work begins</b> — you approve the price first.
            </p>
            <p>
              <b>One point of contact</b> for everything: build, hosting, edits and support.
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
