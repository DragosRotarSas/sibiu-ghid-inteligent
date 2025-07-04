
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Calendar, Plus, Clock, Repeat, Edit, Trash2 } from "lucide-react";
import { toast } from "@/hooks/use-toast";

interface Task {
  id: string;
  title: string;
  time: string;
  completed: boolean;
  recurring: boolean;
  days?: string[];
}

const Organizer = () => {
  const [tasks, setTasks] = useState<Task[]>([
    { id: "1", title: "Micul dejun", time: "08:00", completed: false, recurring: true, days: ["Luni", "Marți", "Miercuri", "Joi", "Vineri"] },
    { id: "2", title: "Ședința echipă", time: "10:00", completed: false, recurring: false },
    { id: "3", title: "Prânz", time: "13:00", completed: true, recurring: true, days: ["Luni", "Marți", "Miercuri", "Joi", "Vineri"] },
  ]);

  const [newTask, setNewTask] = useState({ title: "", time: "" });
  const [editingTask, setEditingTask] = useState<Task | null>(null);

  const addTask = () => {
    if (newTask.title && newTask.time) {
      const task: Task = {
        id: Date.now().toString(),
        title: newTask.title,
        time: newTask.time,
        completed: false,
        recurring: false,
      };
      setTasks([...tasks, task]);
      setNewTask({ title: "", time: "" });
      toast({
        title: "Activitate adăugată!",
        description: `${newTask.title} a fost adăugată în program.`,
      });
    }
  };

  const toggleTask = (id: string) => {
    setTasks(tasks.map(task => 
      task.id === id ? { ...task, completed: !task.completed } : task
    ));
  };

  const deleteTask = (id: string) => {
    const taskToDelete = tasks.find(task => task.id === id);
    setTasks(tasks.filter(task => task.id !== id));
    toast({
      title: "Activitate ștearsă!",
      description: `${taskToDelete?.title} a fost eliminată din program.`,
    });
  };

  const startEditTask = (task: Task) => {
    setEditingTask({ ...task });
  };

  const saveEditTask = () => {
    if (editingTask) {
      setTasks(tasks.map(task => 
        task.id === editingTask.id ? editingTask : task
      ));
      setEditingTask(null);
      toast({
        title: "Activitate actualizată!",
        description: `${editingTask.title} a fost modificată.`,
      });
    }
  };

  const completedTasks = tasks.filter(task => task.completed).length;
  const totalTasks = tasks.length;

  return (
    <div className="p-4 max-w-4xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2 flex items-center gap-2">
          <Calendar className="h-8 w-8 text-blue-600" />
          Organizator Personal
        </h1>
        <p className="text-gray-600">Planifică-ți ziua și gestionează rutinele zilnice</p>
      </div>

      {/* Progress Card */}
      <Card className="mb-6 bg-gradient-to-r from-blue-50 to-indigo-50">
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            Progresul de azi
            <Badge variant="secondary">{completedTasks}/{totalTasks}</Badge>
          </CardTitle>
          <CardDescription>
            Ai finalizat {completedTasks} din {totalTasks} activități
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="w-full bg-gray-200 rounded-full h-3">
            <div 
              className="bg-blue-600 h-3 rounded-full transition-all duration-500"
              style={{ width: `${totalTasks > 0 ? (completedTasks / totalTasks) * 100 : 0}%` }}
            ></div>
          </div>
        </CardContent>
      </Card>

      <Tabs defaultValue="today" className="space-y-4">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="today">Astăzi</TabsTrigger>
          <TabsTrigger value="add">Adaugă Activitate</TabsTrigger>
        </TabsList>

        <TabsContent value="today" className="space-y-4">
          {tasks.map((task) => (
            <Card key={task.id} className={`transition-all duration-300 ${task.completed ? 'opacity-75 bg-green-50' : 'hover:shadow-md'}`}>
              <CardContent className="p-4">
                <div className="flex items-center space-x-4">
                  <Checkbox
                    checked={task.completed}
                    onCheckedChange={() => toggleTask(task.id)}
                    className="h-5 w-5"
                  />
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className={`font-medium ${task.completed ? 'line-through text-gray-500' : ''}`}>
                        {task.title}
                      </h3>
                      {task.recurring && (
                        <Badge variant="outline" className="text-xs">
                          <Repeat className="h-3 w-3 mr-1" />
                          Recurent
                        </Badge>
                      )}
                    </div>
                    <div className="flex items-center text-sm text-gray-500">
                      <Clock className="h-4 w-4 mr-1" />
                      {task.time}
                      {task.days && (
                        <span className="ml-2">• {task.days.join(", ")}</span>
                      )}
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => startEditTask(task)}
                    >
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => deleteTask(task.id)}
                      className="text-red-600 hover:text-red-700"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
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
                Adaugă Activitate Nouă
              </CardTitle>
              <CardDescription>
                Creează o nouă activitate pentru programul tău zilnic
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="task-title">Numele activității</Label>
                <Input
                  id="task-title"
                  placeholder="ex: Întâlnire cu clientul"
                  value={newTask.title}
                  onChange={(e) => setNewTask({...newTask, title: e.target.value})}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="task-time">Ora</Label>
                <Input
                  id="task-time"
                  type="time"
                  value={newTask.time}
                  onChange={(e) => setNewTask({...newTask, time: e.target.value})}
                />
              </div>
              <Button onClick={addTask} className="w-full">
                <Plus className="h-4 w-4 mr-2" />
                Adaugă Activitatea
              </Button>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Edit Task Modal */}
      {editingTask && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <Card className="w-full max-w-md">
            <CardHeader>
              <CardTitle>Editează Activitatea</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="edit-title">Numele activității</Label>
                <Input
                  id="edit-title"
                  value={editingTask.title}
                  onChange={(e) => setEditingTask({...editingTask, title: e.target.value})}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="edit-time">Ora</Label>
                <Input
                  id="edit-time"
                  type="time"
                  value={editingTask.time}
                  onChange={(e) => setEditingTask({...editingTask, time: e.target.value})}
                />
              </div>
              <div className="flex gap-2">
                <Button onClick={saveEditTask} className="flex-1">
                  Salvează
                </Button>
                <Button variant="outline" onClick={() => setEditingTask(null)} className="flex-1">
                  Anulează
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
};

export default Organizer;
