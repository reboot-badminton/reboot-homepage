import { Role } from "@/firebase";

const roleToColor = new Map([
  [Role.ADMIN, '#1b31bf'],
  [Role.MANAGER, '#32a852'],
  [Role.BANNED, '#4a4a4a'],
]);

function Badge(badge: {
  text: string,
  color: string,
}) {
  return (
    <span className="text-xs px-1 py-[2px] mr-1 rounded text-white/95" style={{
      backgroundColor: badge.color,
    }}>
      {badge.text}
    </span>
  );
}

export default function RoleBadge({ role }: { role: Role }) {
  if (role === Role.MEMBER || role == Role.NONE) return <></>;
  return <Badge text={Role[role]} color={roleToColor.get(role)!} />;
}