import { lazy, Suspense } from "react";

const NF4LM = lazy(() => import("nf4lm/App"));

export default function FoodApp() {
  return (
    <Suspense fallback={<LoadingScreen />}>
      <NF4LM />
    </Suspense>
  );
}

function LoadingScreen() {
  return (
    <div style={styles.loading}>
      <div style={styles.spinner} />
    </div>
  );
}

const styles = {
  loading: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    minHeight: "100dvh",
    background: "#FAF8F5",
  },
  spinner: {
    width: "32px",
    height: "32px",
    border: "3px solid #FBE9E3",
    borderTopColor: "#E8623A",
    borderRadius: "50%",
    animation: "spin 0.7s linear infinite",
  },
};
