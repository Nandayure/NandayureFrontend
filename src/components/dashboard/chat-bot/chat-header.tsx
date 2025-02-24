import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Ellipsis, Download, Minimize2, Maximize2 } from "lucide-react";
import Flag from "@/components/common/Flag";

interface ChatHeaderProps {
  isExpanded: boolean;
  onDownload: () => void;
  onToggleExpand: () => void;
}

export default function ChatHeader({ isExpanded, onDownload, onToggleExpand }: ChatHeaderProps) {
  return (
    <DialogHeader>
      <header className="flex flex-row items-center justify-between w-full">
        <div className="flex items-center gap-2">
          <Avatar className="w-12 h-12">
            <AvatarImage src="/placeholder.svg" alt="" aria-hidden="true" />
            <AvatarFallback>IA</AvatarFallback>
          </Avatar>
          <div className="flex flex-col">
            <DialogTitle>Nanda IA</DialogTitle>
          </div>
        </div>
        <nav aria-label="Opciones del chat" className="flex items-center gap-2">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" aria-label="Más opciones">
                <Ellipsis className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={onDownload}>
                <Download className="h-4 w-4 mr-2" />
                Descargar conversación
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          <Button
            variant="ghost"
            size="icon"
            aria-label={isExpanded ? "Minimizar chat" : "Expandir chat"}
            onClick={onToggleExpand}
          >
            {isExpanded ? (
              <Minimize2 className="h-4 w-4" />
            ) : (
              <Maximize2 className="h-4 w-4" />
            )}
          </Button>
        </nav>
      </header>
      <Flag />
    </DialogHeader>
  );
}