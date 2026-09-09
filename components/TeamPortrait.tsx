import Image from "next/image";
export default function TeamPortrait({
  person,
  priority = false,
}: {
  person: "rian" | "silvester";
  priority?: boolean;
}) {
  const member =
    person === "rian"
      ? { src: "/images/rians.png", width: 651, height: 1029, name: "Rian" }
      : {
          src: "/images/adi.png",
          width: 1200,
          height: 1973,
          name: "Silvester",
        };
  return (
    <div className="ac-portrait">
      <Image
        src={member.src}
        alt={member.name + " ? AGGRE CAPITAL"}
        width={member.width}
        height={member.height}
        sizes="(max-width: 700px) 90vw, 440px"
        priority={priority}
      />
    </div>
  );
}
