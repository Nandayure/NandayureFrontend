import { useEffect } from "react";
import confetti from "canvas-confetti";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardTitle } from "@/components/ui/card";
import Image from "next/image";
interface BirthdayEffectProps {
  name: string;
  onComplete?: () => void;
}
export default function BirthdayEffect({ name, onComplete }: BirthdayEffectProps) {
  useEffect(() => {
    setTimeout(() => {
      console.log("Ejecutando confetti...");
      const duration = 3 * 1000;
      const end = Date.now() + duration;
      const runConfetti = () => {
        confetti({
          particleCount: 5,
          angle: 60,
          spread: 55,
          origin: { x: 0 },
          colors: ["#ff0000", "#00ff00", "#0000ff", "#ffff00", "#ff00ff"],
        });
        confetti({
          particleCount: 5,
          angle: 120,
          spread: 55,
          origin: { x: 1 },
          colors: ["#ff0000", "#00ff00", "#0000ff", "#ffff00", "#ff00ff"],
        });
        if (Date.now() < end) {
          setTimeout(runConfetti, 300); // Menos llamadas por segundo
        }
      };
      runConfetti();
    }, 500);
  }, []);
  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black/50">
      <Card className="w-full max-w-md mx-auto animate-bounce-slow">
        <CardContent className="p-6 text-center">
          <Image src="/cake-image.jpg" alt="Pastel de cumpleaños" width={200} height={200} className="mx-auto rounded-lg shadow-lg" />
        </CardContent>
        <CardTitle className="text-center text-2xl flex flex-col items-center justify-center gap-2">
          <span>¡Feliz Cumpleaños, {name}!</span>
        </CardTitle>
        <CardFooter className="flex justify-center pb-6">
          <Button onClick={onComplete}>Gracias</Button>
        </CardFooter>
      </Card>
    </div>
  );
}
