
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar, Bell, MessageCircle, Map } from "lucide-react";
import { Link } from "react-router-dom";

const Index = () => {
  const features = [
    {
      icon: Calendar,
      title: "Organizator Personal",
      description: "Planifică-ți ziua și gestionează rutinele zilnice cu ușurință",
      link: "/organizer",
      color: "text-blue-600",
    },
    {
      icon: Bell,
      title: "Amintiri Inteligente", 
      description: "Primește notificări pentru facturi, întâlniri și evenimente importante",
      link: "/reminders",
      color: "text-green-600",
    },
    {
      icon: MessageCircle,
      title: "Rezervări prin Chat",
      description: "Fă rezervări la restaurante prin conversație naturală",
      link: "/chat",
      color: "text-purple-600",
    },
    {
      icon: Map,
      title: "Harta Sibiului",
      description: "Explorează orașul cu harta interactivă și puncte de interes",
      link: "/map", 
      color: "text-orange-600",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Hero Section */}
      <section className="px-4 py-12 md:py-20">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6 animate-fade-in">
            🤖 Asistentul Tău Personal
          </h1>
          <p className="text-xl md:text-2xl text-gray-600 mb-8 max-w-2xl mx-auto animate-fade-in">
            Organizează-ți viața zilnică cu ajutorul inteligenței artificiale. 
            Totul în română, special pentru tine.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in">
            <Button size="lg" asChild className="text-lg px-8 py-6">
              <Link to="/organizer">Începe Acum</Link>
            </Button>
            <Button size="lg" variant="outline" asChild className="text-lg px-8 py-6">
              <Link to="/chat">Încearcă Chat-ul</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="px-4 py-12">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-900">
            Funcționalități Principale
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {features.map((feature, index) => (
              <Card key={feature.title} className="hover:shadow-lg transition-all duration-300 hover:scale-105 animate-fade-in" style={{ animationDelay: `${index * 0.1}s` }}>
                <CardHeader>
                  <div className="flex items-center gap-4">
                    <feature.icon className={`h-8 w-8 ${feature.color}`} />
                    <CardTitle className="text-xl">{feature.title}</CardTitle>
                  </div>
                  <CardDescription className="text-base">
                    {feature.description}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Button asChild className="w-full">
                    <Link to={feature.link}>Explorează →</Link>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="px-4 py-12 bg-white/50">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-8 text-gray-900">
            De ce să alegi Asistentul Tău Personal?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="animate-fade-in">
              <div className="text-4xl mb-4">🇷🇴</div>
              <h3 className="text-xl font-semibold mb-2">100% în Română</h3>
              <p className="text-gray-600">Înțelege perfect limba română și contextul local</p>
            </div>
            <div className="animate-fade-in" style={{ animationDelay: '0.1s' }}>
              <div className="text-4xl mb-4">📱</div>
              <h3 className="text-xl font-semibold mb-2">Mobile-First</h3>
              <p className="text-gray-600">Optimizat pentru telefoane și tablete</p>
            </div>
            <div className="animate-fade-in" style={{ animationDelay: '0.2s' }}>
              <div className="text-4xl mb-4">☁️</div>
              <h3 className="text-xl font-semibold mb-2">Azure Powered</h3>
              <p className="text-gray-600">Tehnologie Microsoft de încredere</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Index;
