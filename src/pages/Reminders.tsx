
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Bell, Plus, Calendar, CreditCard, Car, Clock } from "lucide-react";
import { toast } from "@/hooks/use-toast";

interface Reminder {
  id: string;
  title: string;
  type: "bill" | "appointment" | "parking" | "other";
  date: string;
  time: string;
  priority: "low" | "medium" | "high";
}

const Reminders = () => {
  const [reminders, setReminders] = useState<Reminder[]>([
    { id: "1", title: "Factura la electricitate", type: "bill", date: "2024-07-10", time: "09:00", priority: "high" },
    { id: "2", title: "Control medical", type: "appointment", date: "2024-07-08", time: "14:30", priority: "medium" },
    { id: "3", title: "Expirare parcare zona A", type: "parking", date: "2024-07-05", time: "18:00", priority: "high" },
  ]);

  const [newReminder, setNewReminder] = useState({
    title: "",
    type: "other" as const,
    date: "",
    time: "",
    priority: "medium" as const,
  });

  const addReminder = () => {
    if (newReminder.title && newReminder.date && newReminder.time) {
      const reminder: Reminder = {
        id: Date.now().toString(),
        ...newReminder,
      };
      setReminders([...reminders, reminder]);
      setNewReminder({ title: "", type: "other", date: "", time: "", priority: "medium" });
      toast({
        title: "Amintire adăugată!",
        description: `${newReminder.title} a fost adăugată în lista de amintiri.`,
      });
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "bill": return <CreditCard className="h-4 w-4" />;
      case "appointment": return <Calendar className="h-4 w-4" />;
      case "parking": return <Car className="h-4 w-4" />;
      default: return <Bell className="h-4 w-4" />;
    }
  };

  const getTypeLabel = (type: string) => {
    switch (type) {
      case "bill": return "Factură";
      case "appointment": return "Întâlnire";
      case "parking": return "Parcare";
      default: return "Altele";
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high": return "bg-red-100 text-red-800";
      case "medium": return "bg-yellow-100 text-yellow-800";
      case "low": return "bg-green-100 text-green-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const getPriorityLabel = (priority: string) => {
    switch (priority) {
      case "high": return "Urgent";
      case "medium": return "Normal";
      case "low": return "Scăzut";
      default: return "Normal";
    }
  };

  return (
    <div className="p-4 max-w-4xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2 flex items-center gap-2">
          <Bell className="h-8 w-8 text-green-600" />
          Amintiri Inteligente
        </h1>
        <p className="text-gray-600">Primește notificări pentru facturi, întâlniri și evenimente importante</p>
      </div>

      <Tabs defaultValue="active" className="space-y-4">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="active">Amintiri Active</TabsTrigger>
          <TabsTrigger value="add">Adaugă Amintire</TabsTrigger>
        </TabsList>

        <TabsContent value="active" className="space-y-4">
          {reminders.map((reminder) => (
            <Card key={reminder.id} className="hover:shadow-md transition-all duration-300">
              <CardContent className="p-4">
                <div className="flex items-start justify-between">
                  <div className="flex items-start space-x-3">
                    <div className="p-2 bg-gray-100 rounded-lg">
                      {getTypeIcon(reminder.type)}
                    </div>
                    <div>
                      <h3 className="font-medium mb-1">{reminder.title}</h3>
                      <div className="flex items-center gap-2 text-sm text-gray-500 mb-2">
                        <Clock className="h-4 w-4" />
                        {reminder.date} la {reminder.time}
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge variant="outline">
                          {getTypeIcon(reminder.type)}
                          <span className="ml-1">{getTypeLabel(reminder.type)}</span>
                        </Badge>
                        <Badge className={getPriorityColor(reminder.priority)}>
                          {getPriorityLabel(reminder.priority)}
                        </Badge>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </TabsContent>

        <TabsContent value="add" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Plus className="h-5 w-5" />
                Adaugă Amintire Nouă
              </CardTitle>
              <CardDescription>
                Creează o nouă amintire pentru evenimente importante
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="reminder-title">Titlul amintirii</Label>
                <Input
                  id="reminder-title"
                  placeholder="ex: Plata factură internet"
                  value={newReminder.title}
                  onChange={(e) => setNewReminder({...newReminder, title: e.target.value})}
                />
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="reminder-type">Tipul amintirii</Label>
                  <Select value={newReminder.type} onValueChange={(value: any) => setNewReminder({...newReminder, type: value})}>
                    <SelectTrigger>
                      <SelectValue placeholder="Selectează tipul" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="bill">Factură</SelectItem>
                      <SelectItem value="appointment">Întâlnire</SelectItem>
                      <SelectItem value="parking">Parcare</SelectItem>
                      <SelectItem value="other">Altele</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="reminder-priority">Prioritatea</Label>
                  <Select value={newReminder.priority} onValueChange={(value: any) => setNewReminder({...newReminder, priority: value})}>
                    <SelectTrigger>
                      <SelectValue placeholder="Selectează prioritatea" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="low">Scăzută</SelectItem>
                      <SelectItem value="medium">Normală</SelectItem>
                      <SelectItem value="high">Urgentă</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="reminder-date">Data</Label>
                  <Input
                    id="reminder-date"
                    type="date"
                    value={newReminder.date}
                    onChange={(e) => setNewReminder({...newReminder, date: e.target.value})}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="reminder-time">Ora</Label>
                  <Input
                    id="reminder-time"
                    type="time"
                    value={newReminder.time}
                    onChange={(e) => setNewReminder({...newReminder, time: e.target.value})}
                  />
                </div>
              </div>
              
              <Button onClick={addReminder} className="w-full">
                <Plus className="h-4 w-4 mr-2" />
                Adaugă Amintirea
              </Button>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Reminders;
