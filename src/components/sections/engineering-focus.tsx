import { Check } from "lucide-react";
import { personal } from "@/data/personal";
export function EngineeringFocus() {
  return (
    <section className="container section focus-section">
      <div>
        <p className="eyebrow">HOW I APPROACH THE WORK</p>
        <h2>Beyond writing code.</h2>
        <p>
          Understanding the system. Taking care of the details.
          <br />
          Building software that’s easier to work with.
        </p>
      </div>
      <ul>
        {personal.focus.map((item) => (
          <li key={item}>
            <Check size={16} />
            {item}
          </li>
        ))}
      </ul>
    </section>
  );
}
