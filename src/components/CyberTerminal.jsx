import React, { useState } from 'react';
import { Terminal as TerminalIcon, Send } from 'lucide-react';

export function CyberTerminal({ selectedChallenge, onSubmitFlag }) {
  const [logs, setLogs] = useState([
    { text: 'CYBER_OS v4.16.0 LTS (x86_64-pc-linux-gnu)', type: 'sys' },
    { text: 'Escribe "help" para ver la lista de comandos disponibles.', type: 'sys' }
  ]);
  const [inputCommand, setInputCommand] = useState('');

  const handleCommand = (e) => {
    e.preventDefault();
    if (!inputCommand.trim()) return;

    const cmd = inputCommand.trim();
    const parts = cmd.split(' ');
    const mainCmd = parts[0].toLowerCase();
    
    const newLogs = [...logs, { text: `$ ${cmd}`, type: 'user' }];

    switch (mainCmd) {
      case 'help':
        newLogs.push({ text: 'Comandos disponibles:\n  help        - Muestra ayuda\n  clear       - Limpia la pantalla\n  whoami      - Usuario actual\n  cat [flag]  - Enviar flag directamente\n  base64 -d   - Decodificar texto Base64\n  nmap        - Simular escaneo de puertos', type: 'res' });
        break;

      case 'clear':
        setLogs([]);
        setInputCommand('');
        return;

      case 'whoami':
        newLogs.push({ text: 'root@cyber-lab-node-01', type: 'res' });
        break;

      case 'base64':
        if (parts[1] === '-d' && parts[2]) {
          try {
            const decoded = atob(parts[2]);
            newLogs.push({ text: `Decodificado: ${decoded}`, type: 'success' });
          } catch {
            newLogs.push({ text: 'Error: Cadena Base64 no válida.', type: 'err' });
          }
        } else {
          newLogs.push({ text: 'Uso: base64 -d <cadena_base64>', type: 'err' });
        }
        break;

      case 'cat':
        if (parts[1] && selectedChallenge) {
          const result = onSubmitFlag(selectedChallenge.id, parts[1]);
          newLogs.push({ text: result.message, type: result.success ? 'success' : 'err' });
        } else {
          newLogs.push({ text: 'Uso: cat <FLAG_AQUI> (Asegúrate de seleccionar un reto activo)', type: 'err' });
        }
        break;

      default:
        newLogs.push({ text: `Comando no reconocido: ${mainCmd}. Escribe "help".`, type: 'err' });
    }

    setLogs(newLogs);
    setInputCommand('');
  };

  return (
    <div className="bg-slate-950 border border-slate-800 rounded-2xl overflow-hidden font-mono shadow-2xl">
      <div className="bg-slate-900 px-4 py-3 border-b border-slate-800 flex items-center justify-between text-xs text-slate-400">
        <div className="flex items-center gap-2">
          <TerminalIcon className="w-4 h-4 text-emerald-400" />
          <span>Interactive Shell</span>
        </div>
        {selectedChallenge && (
          <span className="text-emerald-400 bg-emerald-950 px-2 py-0.5 rounded border border-emerald-800">
            Reto Seleccionado: {selectedChallenge.title}
          </span>
        )}
      </div>

      <div className="p-4 h-80 overflow-y-auto space-y-2 text-xs">
        {logs.map((log, index) => (
          <div
            key={index}
            className={`whitespace-pre-wrap ${
              log.type === 'user' ? 'text-slate-200' :
              log.type === 'success' ? 'text-emerald-400' :
              log.type === 'err' ? 'text-rose-400' : 'text-slate-400'
            }`}
          >
            {log.text}
          </div>
        ))}
      </div>

      <form onSubmit={handleCommand} className="border-t border-slate-800 p-3 flex gap-2 bg-slate-900/50">
        <span className="text-emerald-400 font-bold text-sm">$</span>
        <input
          type="text"
          value={inputCommand}
          onChange={(e) => setInputCommand(e.target.value)}
          placeholder="Escribe un comando..."
          className="flex-1 bg-transparent text-xs text-slate-100 focus:outline-none font-mono"
        />
        <button type="submit" className="text-emerald-400 hover:text-emerald-300">
          <Send className="w-4 h-4" />
        </button>
      </form>
    </div>
  );
}