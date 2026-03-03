import { MessageSquare, Send, Search } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { useState } from "react";

const conversations = [
  { id: "1", nom: "M. Dupont", dernier: "Bonjour, le robinet de la cuisine fuit.", date: "Il y a 2h", nonLu: true },
  { id: "2", nom: "Mme Martin", dernier: "J'ai envoyé le virement ce matin.", date: "Hier", nonLu: false },
  { id: "3", nom: "Agence Renov'", dernier: "Devis joint pour les travaux.", date: "Il y a 3j", nonLu: true },
];

const MessagesPage = () => {
  const [selected, setSelected] = useState(conversations[0]);

  return (
    <div className="space-y-6">
      <div>
        <h2 className="font-display text-2xl font-bold text-foreground">Messagerie</h2>
        <p className="text-muted-foreground">Communiquez avec vos contacts</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 h-[calc(100vh-220px)]">
        <Card className="glass-card border-border/50 lg:col-span-1 flex flex-col">
          <CardHeader className="pb-3">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input placeholder="Rechercher..." className="pl-9" />
            </div>
          </CardHeader>
          <CardContent className="flex-1 overflow-y-auto space-y-1 p-3">
            {conversations.map((c) => (
              <div
                key={c.id}
                onClick={() => setSelected(c)}
                className={`flex items-center gap-3 p-3 rounded-lg cursor-pointer transition-colors ${selected.id === c.id ? "bg-primary/10" : "hover:bg-muted/50"}`}
              >
                <Avatar className="h-10 w-10">
                  <AvatarFallback className="bg-primary/10 text-primary text-sm">{c.nom[0]}{c.nom.split(" ")[1]?.[0]}</AvatarFallback>
                </Avatar>
                <div className="flex-1 min-w-0">
                  <div className="flex justify-between">
                    <p className={`text-sm ${c.nonLu ? "font-semibold text-foreground" : "text-foreground"}`}>{c.nom}</p>
                    <span className="text-xs text-muted-foreground">{c.date}</span>
                  </div>
                  <p className="text-xs text-muted-foreground truncate">{c.dernier}</p>
                </div>
                {c.nonLu && <div className="h-2 w-2 rounded-full bg-primary flex-shrink-0" />}
              </div>
            ))}
          </CardContent>
        </Card>

        <Card className="glass-card border-border/50 lg:col-span-2 flex flex-col">
          <CardHeader className="border-b border-border pb-3">
            <CardTitle className="text-lg flex items-center gap-2">
              <MessageSquare className="h-5 w-5 text-primary" />{selected.nom}
            </CardTitle>
          </CardHeader>
          <CardContent className="flex-1 flex flex-col p-4">
            <div className="flex-1 flex items-center justify-center text-muted-foreground text-sm">
              Début de la conversation avec {selected.nom}
            </div>
            <div className="flex gap-2 pt-3 border-t border-border">
              <Input placeholder="Écrire un message..." className="flex-1" />
              <Button size="icon"><Send className="h-4 w-4" /></Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default MessagesPage;
