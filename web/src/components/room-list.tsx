import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { useRooms } from "../http/use-rooms";
import { dayjs } from "../lib/formatDate";
import { Badge } from "./ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./ui/card";

export function RoomList() {
  const { data, isLoading } = useRooms();

  return (
    <Card>
      <CardHeader>
        <CardTitle>Salas recentes</CardTitle>
        <CardDescription>Acesso às salas recentes</CardDescription>
      </CardHeader>

      <CardContent className="flex flex-col gap-3">
        {isLoading && <p className="text-xs">Carregando salas...</p>}
        {data?.map((room) => (
          <Link
            to={`/room/${room.id}`}
            key={room.id}
            className="flex items-center justify-between p-3 rounded-lg border hover:bg-accent"
          >
            <div className="flex-1">
              <h3 className="font-medium">{room.name}</h3>
              <span className="flex items-center gap-2 mt-1">
                <Badge variant="secondary" className="text-xs">
                  {dayjs(room.createdAt).toNow()}
                </Badge>
                <Badge variant="secondary" className="text-xs">
                  {room.questionCount} pergunta(s)
                </Badge>
              </span>
            </div>
            <span className="flex items-center gap-1 text-sm">
              Entrar
              <ArrowRight className="size-3" />
            </span>
          </Link>
        ))}
      </CardContent>
    </Card>
  );
}
