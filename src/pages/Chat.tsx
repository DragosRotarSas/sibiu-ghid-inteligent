
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { MessageCircle, Send, Bot, User } from "lucide-react";
import { toast } from "@/hooks/use-toast";

interface Message {
  id: string;
  content: string;
  sender: "user" | "bot";
  timestamp: Date;
}

const Chat = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      content: "Bună ziua! Sunt asistentul tău pentru rezervări. Te pot ajuta să faci rezervări la restaurante din Sibiu. Cum te pot ajuta astăzi?",
      sender: "bot",
      timestamp: new Date(Date.now() - 5000),
    },
  ]);
  
  const [inputMessage, setInputMessage] = useState("");

  const sendMessage = () => {
    if (!inputMessage.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      content: inputMessage,
      sender: "user",
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);

    // Simulate bot response
    setTimeout(() => {
      const botResponse = generateBotResponse(inputMessage);
      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: botResponse,
        sender: "bot",
        timestamp: new Date(),
      };
      setMessages(prev => [...prev, botMessage]);
    }, 1000);

    setInputMessage("");
  };

  const generateBotResponse = (userInput: string): string => {
    const input = userInput.toLowerCase();
    
    if (input.includes("rezervare") || input.includes("masa")) {
      return "Perfect! Pot să te ajut cu o rezervare. Pentru ce restaurant îți dorești să fac rezervarea? De câte persoane și pentru ce dată?";
    } else if (input.includes("restaurant")) {
      return "Îți recomand câteva restaurante populare din Sibiu: Restaurant Crama Sibiul Vechi, Vila Weidner, sau Restaurant Hermania. Pentru care dintre acestea ai vrea să fac o rezervare?";
    } else if (input.includes("persoane") || input.includes("oameni")) {
      return "Înțeles! Și pentru ce dată și oră ai nevoie de rezervare? Te rog să îmi spui data și ora preferată.";
    } else if (input.includes("data") || input.includes("când")) {
      return "Excelent! Am toate informațiile necesare. Voi contacta restaurantul pentru a confirma rezervarea și îți voi trimite o confirmare în curând. Dorești să adaug alte observații speciale?";
    } else if (input.includes("mulțumesc") || input.includes("mersi")) {
      return "Cu plăcere! Dacă mai ai nevoie de ajutor cu alte rezervări, sunt aici să te ajut. Să ai o zi frumoasă!";
    } else {
      return "Înțeleg. Pot să te ajut cu rezervări la restaurante din Sibiu. Îmi poți spune ce fel de restaurant cauți sau dacă ai deja unul în minte?";
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <div className="p-4 max-w-4xl mx-auto h-[calc(100vh-8rem)]">
      <div className="mb-6">
        <h1 className="text-3xl font-bold mb-2 flex items-center gap-2">
          <MessageCircle className="h-8 w-8 text-purple-600" />
          Rezervări prin Chat
        </h1>
        <p className="text-gray-600">Fă rezervări la restaurante prin conversație naturală</p>
      </div>

      <Card className="h-full flex flex-col">
        <CardHeader className="pb-4">
          <CardTitle className="text-lg">Chat cu Asistentul</CardTitle>
          <CardDescription>
            Spune-mi unde vrei să faci o rezervare și te voi ajuta
          </CardDescription>
        </CardHeader>
        
        <CardContent className="flex-1 flex flex-col p-0">
          <ScrollArea className="flex-1 p-4">
            <div className="space-y-4">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex items-start gap-3 ${
                    message.sender === "user" ? "flex-row-reverse" : ""
                  }`}
                >
                  <div className={`p-2 rounded-full ${
                    message.sender === "user" 
                      ? "bg-blue-100 text-blue-600" 
                      : "bg-gray-100 text-gray-600"
                  }`}>
                    {message.sender === "user" ? 
                      <User className="h-4 w-4" /> : 
                      <Bot className="h-4 w-4" />
                    }
                  </div>
                  <div className={`max-w-[80%] ${
                    message.sender === "user" ? "text-right" : ""
                  }`}>
                    <div className={`p-3 rounded-lg ${
                      message.sender === "user"
                        ? "bg-blue-600 text-white ml-auto"
                        : "bg-gray-100 text-gray-900"
                    }`}>
                      <p className="text-sm leading-relaxed">{message.content}</p>
                    </div>
                    <p className="text-xs text-gray-500 mt-1">
                      {message.timestamp.toLocaleTimeString("ro-RO", {
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </ScrollArea>
          
          <div className="p-4 border-t">
            <div className="flex gap-2">
              <Input
                placeholder="Scrie mesajul tău aici..."
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                onKeyPress={handleKeyPress}
                className="flex-1"
              />
              <Button onClick={sendMessage} disabled={!inputMessage.trim()}>
                <Send className="h-4 w-4" />
              </Button>
            </div>
            <p className="text-xs text-gray-500 mt-2">
              Apasă Enter pentru a trimite mesajul
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Chat;
