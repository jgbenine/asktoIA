import { Link } from "react-router-dom";

export function CreateRoom() {
  return (
    <div>
      Room
      <Link to="/room" className="underline">
        Acessar sala
      </Link>
    </div>
  );
}
