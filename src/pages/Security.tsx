
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Shield, AlertTriangle, Heart, Pill, Phone, MapPin, Clock } from "lucide-react";
import { toast } from "@/hooks/use-toast";

const Security = () => {
  const [sosActive, setSosActive] = useState(false);
  const [medicationReminders, setMedicationReminders] = useState([
    { id: "1", name: "Aspirină", time: "08:00", taken: false },
    { id: "2", name: "Vitamina D", time: "12:00", taken: true },
    { id: "3", name: "Tensiune", time: "18:00", taken: false },
  ]);

  const activateSOS = () => {
    setSosActive(true);
    toast({
      title: "🚨 SOS Activat!",
      description: "Contactele de urgență au fost notificate. Ajutorul este în drum!",
      variant: "destructive",
    });
    
    // Simulate deactivation after 30 seconds
    setTimeout(() => {
      setSosActive(false);
    }, 30000);
  };

  const takeMedication = (id: string) => {
    setMedicationReminders(prev => 
      prev.map(med => 
        med.id === id ? { ...med, taken: true } : med
      )
    );
    toast({
      title: "✅ Medicament luat!",
      description: "Confirmarea a fost înregistrată.",
    });
  };

  return (
    <div className="p-4 max-w-4xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2 flex items-center gap-2">
          <Shield className="h-8 w-8 text-red-600" />
          Securitate Seniori
        </h1>
        <p className="text-gray-600">Siguranță și monitorizare pentru persoanele în vârstă</p>
      </div>

      {/* SOS Emergency Button */}
      <Card className="mb-6 border-red-200">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-red-700">
            <AlertTriangle className="h-6 w-6" />
            Buton de Urgență SOS
          </CardTitle>
          <CardDescription>
            În caz de urgență, apasă butonul pentru a alerta contactele de urgență
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {sosActive ? (
            <Alert className="border-red-500 bg-red-50">
              <AlertTriangle className="h-4 w-4" />
              <AlertDescription className="text-red-800 font-medium">
                🚨 SOS ACTIV! Contactele de urgență au fost notificate cu locația ta.
                Ajutorul va sosi în curând.
              </AlertDescription>
            </Alert>
          ) : (
            <Button 
              onClick={activateSOS}
              className="w-full h-16 text-xl bg-red-600 hover:bg-red-700"
              size="lg"
            >
              🚨 APASĂ PENTRU URGENȚĂ
            </Button>
          )}
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <Phone className="h-4 w-4" />
              Contacte notificate: Familie, Vecini
            </div>
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <MapPin className="h-4 w-4" />
              Locația este partajată automat
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Activity Monitoring */}
      <Card className="mb-6">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Heart className="h-6 w-6 text-green-600" />
            Monitorizare Activitate Zilnică
          </CardTitle>
          <CardDescription>
            Urmărirea rutinelor zilnice pentru detectarea anomaliilor
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
              <span>Activitate de dimineață</span>
              <Badge variant="default" className="bg-green-600">Normal</Badge>
            </div>
            <div className="flex items-center justify-between p-3 bg-yellow-50 rounded-lg">
              <span>Mișcare la prânz</span>
              <Badge variant="secondary" className="bg-yellow-600 text-white">Redusă</Badge>
            </div>
            <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
              <span>Ultima activitate</span>
              <Badge variant="default" className="bg-green-600">Acum 15 min</Badge>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Medication Reminders */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Pill className="h-6 w-6 text-blue-600" />
            Mementouri Medicamente
          </CardTitle>
          <CardDescription>
            Confirmă administrarea medicamentelor la orele programate
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {medicationReminders.map((med) => (
            <div key={med.id} className={`p-4 rounded-lg border ${med.taken ? 'bg-green-50 border-green-200' : 'bg-orange-50 border-orange-200'}`}>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Clock className="h-5 w-5 text-gray-500" />
                  <div>
                    <p className="font-medium">{med.name}</p>
                    <p className="text-sm text-gray-600">Ora: {med.time}</p>
                  </div>
                </div>
                {med.taken ? (
                  <Badge className="bg-green-600">✅ Luat</Badge>
                ) : (
                  <Button 
                    onClick={() => takeMedication(med.id)}
                    size="sm"
                    className="bg-blue-600 hover:bg-blue-700"
                  >
                    Confirmă
                  </Button>
                )}
              </div>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
};

export default Security;
