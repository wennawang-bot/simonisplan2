import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Trash2, Check, Square, Circle, Triangle, Hexagon, Zap } from 'lucide-react';

interface Todo {
  id: string;
  text: string;
  completed: boolean;
  colorIndex: number;
}

const MEMPHIS_COLORS = [
  'bg-memphis-yellow',
  'bg-memphis-pink',
  'bg-memphis-blue',
  'bg-memphis-green',
  'bg-memphis-purple'
];

export default function App() {
  const [todos, setTodos] = useState<Todo[]>(() => {
    if (typeof window !== 'undefined') {
      // Keep the same local storage key so we don't drop their data
      const saved = localStorage.getItem('super-kid-todos');
      return saved ? JSON.parse(saved) : [];
    }
    return [];
  });
  const [inputValue, setInputValue] = useState('');

  useEffect(() => {
    localStorage.setItem('super-kid-todos', JSON.stringify(todos));
  }, [todos]);

  const addTodo = (e?: React.FormEvent) => {
    e?.preventDefault();
    if (!inputValue.trim()) return;
    
    const newTodo: Todo = {
      id: Date.now().toString(),
      text: inputValue.trim(),
      completed: false,
      colorIndex: Math.floor(Math.random() * MEMPHIS_COLORS.length)
    };
    
    setTodos([newTodo, ...todos]);
    setInputValue('');
  };

  const toggleTodo = (id: string) => {
    setTodos(todos.map(todo => 
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    ));
  };

  const deleteTodo = (id: string) => {
    setTodos(todos.filter(todo => todo.id !== id));
  };

  const completedCount = todos.filter(t => t.completed).length;
  const progress = todos.length === 0 ? 0 : (completedCount / todos.length) * 100;

  return (
    <div className="min-h-screen p-6 md:p-10 flex flex-col items-center overflow-x-hidden relative">
      {/* Decorative Memphis Background Shapes */}
      <motion.div className="memphis-shape fixed top-20 left-10 text-memphis-pink z-0 opacity-80" style={{ animationDelay: '0s' }}>
        <Triangle fill="currentColor" size={80} strokeWidth={3} stroke="#1E1E24" />
      </motion.div>
      <motion.div className="memphis-shape fixed bottom-32 right-10 text-memphis-blue z-0 opacity-80" style={{ animationDelay: '1s' }}>
        <Circle fill="currentColor" size={60} strokeWidth={4} stroke="#1E1E24" />
      </motion.div>
      <motion.div className="memphis-shape fixed top-40 right-20 text-memphis-yellow z-0 opacity-80" style={{ animationDelay: '2.5s' }}>
        <Square fill="currentColor" size={70} strokeWidth={4} stroke="#1E1E24" className="rotate-12" />
      </motion.div>
      <motion.div className="memphis-shape fixed bottom-20 left-20 text-memphis-green z-0" style={{ animationDelay: '1.5s' }}>
        <Hexagon fill="currentColor" size={50} strokeWidth={4} stroke="#1E1E24" className="-rotate-12" />
      </motion.div>

      <motion.div 
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="w-full max-w-xl z-10"
      >
        <header className="mb-12 text-center relative">
          <motion.div
            animate={{ rotate: [-2, 2, -2] }}
            transition={{ repeat: Infinity, duration: 4 }}
            className="inline-block relative"
          >
            <div className="absolute inset-0 bg-memphis-blue memphis-border rounded-[32px] translate-x-3 translate-y-3 z-0"></div>
            <div className="relative bg-memphis-yellow memphis-border px-8 py-5 rounded-[32px] z-10">
              <h1 className="text-4xl md:text-5xl font-black text-memphis-dark tracking-tight flex items-center justify-center gap-3">
                <Zap size={40} className="fill-memphis-dark hidden sm:block" />
                Simon的任务表
                <Zap size={40} className="fill-memphis-dark hidden sm:block" />
              </h1>
            </div>
            <p className="text-xl font-bold bg-[#FFFDF7] inline-block px-4 py-1 memphis-border rounded-xl mt-6 relative z-10 rotate-2">
              Let's get things done! ✨
            </p>
          </motion.div>
        </header>

        {/* Level Progress Bar Container */}
        <div className="bg-white memphis-border p-6 mb-12 rounded-3xl relative">
          <div className="flex justify-between items-center mb-4 font-black text-lg">
            <span>任务进度!</span>
            <span>{completedCount} / {todos.length}</span>
          </div>
          
          <div className="h-8 w-full bg-[#FFFDF7] memphis-border rounded-xl overflow-hidden relative shadow-none">
            <motion.div 
              className="h-full bg-memphis-green border-r-4 border-memphis-dark relative overflow-hidden"
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={{ type: "spring", stiffness: 40 }}
            >
              {/* Stripe pattern for Memphis feel */}
              <div 
                className="absolute inset-0 opacity-20"
                style={{
                  backgroundImage: 'repeating-linear-gradient(45deg, transparent, transparent 10px, #000 10px, #000 20px)'
                }}
              />
            </motion.div>
          </div>
        </div>

        {/* Task Form */}
        <form onSubmit={addTodo} className="flex flex-col sm:flex-row gap-4 mb-12 relative z-20">
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="今天要做什么？"
            className="flex-1 px-6 py-5 rounded-2xl bg-white memphis-border outline-none focus:bg-memphis-yellow/10 font-bold text-xl placeholder:text-gray-400"
          />
          <button
            type="submit"
            className="bg-memphis-pink text-memphis-dark p-5 rounded-2xl memphis-border memphis-button flex items-center justify-center font-black text-xl gap-2"
          >
            <Plus size={32} strokeWidth={4} />
            <span className="sm:hidden">添加</span>
          </button>
        </form>

        {/* Task List */}
        <div className="space-y-6">
          <AnimatePresence mode="popLayout">
            {todos.length === 0 ? (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-center py-16 bg-white memphis-border rounded-3xl rotate-1"
              >
                <div className="text-6xl mb-4 font-black tracking-widest translate-x-2">🤷‍♂️</div>
                <p className="text-2xl font-black">今天还没有小任务哦！</p>
                <p className="font-bold text-gray-500 mt-2">快来添加一个吧！</p>
              </motion.div>
            ) : (
              todos.map((todo) => {
                const itemColor = MEMPHIS_COLORS[todo.colorIndex % MEMPHIS_COLORS.length];
                
                return (
                  <motion.div
                    key={todo.id}
                    layout
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    className={`flex items-center gap-4 p-5 rounded-2xl memphis-border transition-all ${
                      todo.completed ? 'bg-gray-100 opacity-60 scale-95' : 'bg-white hover:-translate-y-1'
                    }`}
                  >
                    <button
                      onClick={() => toggleTodo(todo.id)}
                      className={`flex-shrink-0 w-12 h-12 memphis-border rounded-xl memphis-button flex items-center justify-center bg-white ${
                        todo.completed ? 'bg-memphis-dark text-white' : 'hover:bg-gray-100'
                      }`}
                    >
                      {todo.completed && <Check size={28} strokeWidth={4} />}
                    </button>

                    <div className="flex-1 min-w-0">
                      <span className={`block text-2xl font-bold transition-all truncate ${
                        todo.completed ? 'text-gray-400 line-through decoration-4' : 'text-memphis-dark'
                      }`}>
                        {todo.text}
                      </span>
                    </div>

                    <button
                      onClick={() => deleteTodo(todo.id)}
                      className={`p-3 memphis-border rounded-xl memphis-button ${itemColor} transition-colors`}
                    >
                      <Trash2 size={24} strokeWidth={3} />
                    </button>
                  </motion.div>
                );
              })
            )}
          </AnimatePresence>
        </div>
      </motion.div>

      {/* Footer */}
      <footer className="mt-20 pb-10 text-center relative z-10 font-bold">
        <p className="bg-memphis-dark text-white inline-block px-6 py-2 rounded-full transform -rotate-2">
          KEEP IT FUN! 🎨
        </p>
      </footer>
    </div>
  );
}
