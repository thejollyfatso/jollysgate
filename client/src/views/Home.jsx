import AppTile from "../components/AppTile";

const APPS = [
  {
    id: "nf4lm",
    label: "No Food for Lazy Man",
    emoji: "🍽️",
    path: "/food",
  },
];

export default function Home() {
  return (
    <div style={styles.page}>
      <header style={styles.header}>
        <span style={styles.wordmark}>Jolly&apos;s Gate</span>
      </header>
      <main style={styles.grid}>
        {APPS.map((app) => (
          <AppTile key={app.id} {...app} />
        ))}
      </main>
    </div>
  );
}

const styles = {
  page: {
    minHeight: "100dvh",
    background: "var(--color-bg)",
    fontFamily:
      "-apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Helvetica, Arial",
    WebkitFontSmoothing: "antialiased",
  },
  header: {
    padding: "20px 20px 8px",
  },
  wordmark: {
    fontSize: "18px",
    fontWeight: "700",
    color: "#E8623A",
  },
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(140px, 1fr))",
    gap: "12px",
    padding: "16px 20px",
  },
};
