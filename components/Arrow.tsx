type ArrowDirection = "up-right" | "right";

export function Arrow({ direction = "up-right" }: { direction?: ArrowDirection }) {
  return <span aria-hidden="true" className={`arrow arrow-${direction}`} />;
}
