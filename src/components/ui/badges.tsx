export function Badges({ items }: { items: string[] }) {
  return (
    <div className="badges">
      {items.map((item) => (
        <span className="badge" key={item}>
          {item}
        </span>
      ))}
    </div>
  );
}
