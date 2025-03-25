import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Ellipsis, Download, Minimize2, Maximize2, X } from 'lucide-react';
import Flag from "@/components/common/Flag";

interface ChatHeaderProps {
  isExpanded: boolean;
  onDownload: () => void;
  onToggleExpand: () => void;
  onClose: () => void;
}

export default function ChatHeader({ isExpanded, onDownload, onToggleExpand, onClose }: ChatHeaderProps) {
  return (
    <DialogHeader>
      <header className="flex flex-row items-center justify-between w-full">
        <div className="flex items-center gap-2">
          <Avatar className="w-12 h-12 p-1">
            <AvatarImage src="/NandaAI.svg" alt="" aria-hidden="true" />
            <AvatarFallback>IA</AvatarFallback>
          </Avatar>
          <div className="flex flex-col">
            <DialogTitle className="pt-2">Nanda IA</DialogTitle>
            <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
              <div className="w-2 h-2 rounded-full bg-green-500"></div>
              <span>Activa</span>
            </div>
          </div>
        </div>
        <nav aria-label="Opciones del chat" className="flex items-center gap-2">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" aria-label="Más opciones">
                <Ellipsis className="h-4 w-4 cursor-pointer" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="rounded-2xl">
              <DropdownMenuItem onClick={onDownload} className="cursor-pointer" >
                <Download className="h-4 w-4 mr-2" />
                Descargar conversación
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          <div className="hidden sm:block">
            <Button
              variant="ghost"
              size="icon"
              aria-label={isExpanded ? "Minimizar chat" : "Expandir chat"}
              onClick={onToggleExpand}
              className="cursor-pointer"
            >
              {isExpanded ? (
                <Minimize2 className="h-4 w-4" />
              ) : (
                <Maximize2 className="h-4 w-4" />
              )}
            </Button>
          </div>
          <div className="block sm:hidden">
            <Button
              variant={'ghost'}
              size={'icon'}
              aria-label="Cerrar chat"
              onClick={onClose}
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        </nav>
      </header>
      <Flag />
    </DialogHeader>
  );
}
