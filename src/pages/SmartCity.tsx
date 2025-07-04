
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { MapPin, Camera, Calendar, AlertTriangle, Lightbulb, TreePine, Music } from "lucide-react";
import { toast } from "@/hooks/use-toast";

const SmartCity = () => {
  const [reportForm, setReportForm] = useState({
    category: "",
    description: "",
    location: "",
  });

  const [reports, setReports] = useState([
    { id: "1", category: "Gunoi", description: "Coșuri de gunoi pline pe Strada Ciresilor", status: "In progress", date: "2024-01-15" },
    { id: "2", category: "Iluminat", description: "Felinar defect în Parcul Sub Arini", status: "Resolved", date: "2024-01-14" },
    { id: "3", category: "Vandalizare", description: "Graffiti pe clădirea de la intersecție", status: "Reported", date: "2024-01-13" },
  ]);

  const [events] = useState([
    { id: "1", title: "Concert în Piața Mare", date: "2024-01-20", category: "Muzică", location: "Piața Mare" },
    { id: "2", title: "Târg de Crăciun", date: "2024-12-15", category: "Festival", location: "Centrul Vechi" },
    { id: "3", title: "Curățenie Comunitară", date: "2024-01-25", category: "Comunitate", location: "Parcul Sub Arini" },
  ]);

  const submitReport = () => {
    if (reportForm.category && reportForm.description && reportForm.location) {
      const newReport = {
        id: Date.now().toString(),
        category: reportForm.category,
        description: reportForm.description,
        status: "Reported",
        date: new Date().toISOString().split('T')[0],
      };
      
      setReports([newReport, ...reports]);
      setReportForm({ category: "", description: "", location: "" });
      
      toast({
        title: "✅ Raport trimis!",
        description: "Problema a fost raportată autorităților locale.",
      });
    } else {
      toast({
        title: "❌ Formular incomplet",
        description: "Te rog completează toate câmpurile.",
        variant: "destructive",
      });
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Reported": return "bg-yellow-100 text-yellow-800";
      case "In progress": return "bg-blue-100 text-blue-800";
      case "Resolved": return "bg-green-100 text-green-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case "Gunoi": return <TreePine className="h-4 w-4" />;
      case "Iluminat": return <Lightbulb className="h-4 w-4" />;
      case "Vandalizare": return <AlertTriangle className="h-4 w-4" />;
      case "Muzică": return <Music className="h-4 w-4" />;
      default: return <MapPin className="h-4 w-4" />;
    }
  };

  return (
    <div className="p-4 max-w-4xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2 flex items-center gap-2">
          <MapPin className="h-8 w-8 text-cyan-600" />
          Oraș Inteligent
        </h1>
        <p className="text-gray-600">Raportează probleme locale și descoperă evenimente din comunitate</p>
      </div>

      {/* Report Issues Section */}
      <Card className="mb-6">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <AlertTriangle className="h-6 w-6 text-orange-600" />
            Raportează o Problemă
          </CardTitle>
          <CardDescription>
            Ajută-ne să îmbunătățim orașul raportând probleme locale
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="category">Categoria problemei</Label>
            <Select value={reportForm.category} onValueChange={(value) => setReportForm({...reportForm, category: value})}>
              <SelectTrigger>
                <SelectValue placeholder="Selectează categoria" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Gunoi">🗑️ Gunoi necolectat</SelectItem>
                <SelectItem value="Iluminat">💡 Iluminat defect</SelectItem>
                <SelectItem value="Vandalizare">⚠️ Vandalizare</SelectItem>
                <SelectItem value="Infrastructura">🚧 Probleme infrastructură</SelectItem>
                <SelectItem value="Altele">📝 Altele</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="location">Locația</Label>
            <Input
              id="location"
              placeholder="Ex: Strada Mihai Viteazu, nr. 15"
              value={reportForm.location}
              onChange={(e) => setReportForm({...reportForm, location: e.target.value})}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Descrierea problemei</Label>
            <Textarea
              id="description"
              placeholder="Descrie problema în detaliu..."
              value={reportForm.description}
              onChange={(e) => setReportForm({...reportForm, description: e.target.value})}
              rows={3}
            />
          </div>

          <div className="flex gap-2">
            <Button onClick={submitReport} className="flex-1">
              📤 Trimite Raportul
            </Button>
            <Button variant="outline" className="flex items-center gap-2">
              <Camera className="h-4 w-4" />
              Adaugă Poză
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* My Reports */}
      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Rapoartele Mele</CardTitle>
          <CardDescription>Urmărește statusul problemelor raportate</CardDescription>
        </CardHeader>
        <CardContent className="space-y-3">
          {reports.map((report) => (
            <div key={report.id} className="p-3 border rounded-lg">
              <div className="flex items-start justify-between">
                <div className="flex items-start gap-3">
                  {getCategoryIcon(report.category)}
                  <div>
                    <p className="font-medium">{report.description}</p>
                    <p className="text-sm text-gray-600">Categoria: {report.category}</p>
                    <p className="text-sm text-gray-500">Data: {report.date}</p>
                  </div>
                </div>
                <Badge className={getStatusColor(report.status)}>
                  {report.status === "Reported" && "Raportat"}
                  {report.status === "In progress" && "În lucru"}
                  {report.status === "Resolved" && "Rezolvat"}
                </Badge>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Local Events */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calendar className="h-6 w-6 text-purple-600" />
            evenimente Locale
          </CardTitle>
          <CardDescription>
            Descoperă ce se întâmplă în comunitatea ta
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-3">
          {events.map((event) => (
            <div key={event.id} className="p-4 bg-gradient-to-r from-purple-50 to-pink-50 rounded-lg border">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  {getCategoryIcon(event.category)}
                  <div>
                    <h3 className="font-semibold">{event.title}</h3>
                    <p className="text-sm text-gray-600 flex items-center gap-1">
                      <Calendar className="h-3 w-3" />
                      {event.date} • {event.location}
                    </p>
                  </div>
                </div>
                <Badge variant="secondary">{event.category}</Badge>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
};

export default SmartCity;
