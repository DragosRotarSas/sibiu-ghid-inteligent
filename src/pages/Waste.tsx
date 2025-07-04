
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { Trash2, Calendar, Bell, Recycle } from "lucide-react";
import { toast } from "@/hooks/use-toast";

const Waste = () => {
  const [wasteSchedule, setWasteSchedule] = useState([
    { id: "yellow", type: "Plastic (Galben)", days: ["Luni", "Joi"], color: "bg-yellow-100 border-yellow-300", enabled: true },
    { id: "brown", type: "Organic (Maro)", days: ["Marți", "Vineri"], color: "bg-amber-100 border-amber-300", enabled: true },
    { id: "blue", type: "Hârtie (Albastru)", days: ["Miercuri"], color: "bg-blue-100 border-blue-300", enabled: false },
    { id: "black", type: "Mixt (Negru)", days: ["Sâmbătă"], color: "bg-gray-100 border-gray-300", enabled: true },
  ]);

  const [todayReminders] = useState([
    { type: "Plastic (Galben)", time: "07:00", completed: false },
    { type: "Organic (Maro)", time: "07:00", completed: true },
  ]);

  const toggleWasteType = (id: string) => {
    setWasteSchedule(prev =>
      prev.map(waste =>
        waste.id === id ? { ...waste, enabled: !waste.enabled } : waste
      )
    );
    
    const wasteType = wasteSchedule.find(w => w.id === id);
    toast({
      title: wasteType?.enabled ? "❌ Memento dezactivat" : "✅ Memento activat",
      description: `Mementouri pentru ${wasteType?.type} ${wasteType?.enabled ? 'dezactivate' : 'activate'}.`,
    });
  };

  const getWasteIcon = (type: string) => {
    if (type.includes("Plastic")) return "♻️";
    if (type.includes("Organic")) return "🍃";
    if (type.includes("Hârtie")) return "📄";
    return "🗑️";
  };

  return (
    <div className="p-4 max-w-4xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2 flex items-center gap-2">
          <Trash2 className="h-8 w-8 text-green-600" />
          Gunoi Inteligent
        </h1>
        <p className="text-gray-600">Mementouri personalizate pentru colectarea gunoiului selectiv</p>
      </div>

      {/* Today's Reminders */}
      <Card className="mb-6 bg-gradient-to-r from-green-50 to-emerald-50">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Bell className="h-6 w-6 text-green-600" />
            Mementouri pentru Astăzi
          </CardTitle>
          <CardDescription>
            Verifică ce gunoi trebuie scos astăzi
          </CardDescription>
        </CardHeader>
        <CardContent>
          {todayReminders.length > 0 ? (
            <div className="space-y-3">
              {todayReminders.map((reminder, index) => (
                <div key={index} className={`p-3 rounded-lg border ${reminder.completed ? 'bg-green-100 border-green-300' : 'bg-orange-100 border-orange-300'}`}>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <span className="text-2xl">{getWasteIcon(reminder.type)}</span>
                      <div>
                        <p className="font-medium">{reminder.type}</p>
                        <p className="text-sm text-gray-600">Ora: {reminder.time}</p>
                      </div>
                    </div>
                    <Badge className={reminder.completed ? "bg-green-600" : "bg-orange-600"}>
                      {reminder.completed ? "✅ Scos" : "⏰ Pending"}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-500 text-center py-4">
              🎉 Nu ai gunoi de scos astăzi!
            </p>
          )}
        </CardContent>
      </Card>

      {/* Waste Schedule Configuration */}
      <Card className="mb-6">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calendar className="h-6 w-6 text-blue-600" />
            Configurare Program
          </CardTitle>
          <CardDescription>
            Activează/dezactivează mementouri pentru fiecare tip de gunoi
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {wasteSchedule.map((waste) => (
            <div key={waste.id} className={`p-4 rounded-lg border-2 ${waste.color} ${waste.enabled ? 'opacity-100' : 'opacity-50'}`}>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <Checkbox
                    checked={waste.enabled}
                    onCheckedChange={() => toggleWasteType(waste.id)}
                    className="h-5 w-5"
                  />
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">{getWasteIcon(waste.type)}</span>
                    <div>
                      <h3 className="font-semibold">{waste.type}</h3>
                      <p className="text-sm text-gray-600">
                        Zile: {waste.days.join(", ")}
                      </p>
                    </div>
                  </div>
                </div>
                <Badge variant={waste.enabled ? "default" : "secondary"}>
                  {waste.enabled ? "Activ" : "Inactiv"}
                </Badge>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Recycling Tips */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Recycle className="h-6 w-6 text-green-600" />
            Sfaturi pentru Reciclare
          </CardTitle>
          <CardDescription>
            Învață cum să reciclezi corect
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-3 bg-yellow-50 rounded-lg border border-yellow-200">
              <h4 className="font-semibold text-yellow-800 mb-2">♻️ Plastic (Galben)</h4>
              <p className="text-sm text-gray-700">Sticle PET, pungi, ambalaje plastic</p>
            </div>
            <div className="p-3 bg-amber-50 rounded-lg border border-amber-200">
              <h4 className="font-semibold text-amber-800 mb-2">🍃 Organic (Maro)</h4>
              <p className="text-sm text-gray-700">Resturi vegetale, coji de fructe</p>
            </div>
            <div className="p-3 bg-blue-50 rounded-lg border border-blue-200">
              <h4 className="font-semibold text-blue-800 mb-2">📄 Hârtie (Albastru)</h4>
              <p className="text-sm text-gray-700">Ziare, cărți, carton</p>
            </div>
            <div className="p-3 bg-gray-50 rounded-lg border border-gray-200">
              <h4 className="font-semibold text-gray-800 mb-2">🗑️ Mixt (Negru)</h4>
              <p className="text-sm text-gray-700">Tot ce nu se poate recicla</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Waste;
