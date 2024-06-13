export default function Eyes({ offsetX, offsetY, radius }) {
  return (
    <>
      <circle cx={-offsetX} cy={-offsetY} r={radius} />
      <circle cx={offsetX} cy={-offsetY} r={radius} />
    </>
  );
}
