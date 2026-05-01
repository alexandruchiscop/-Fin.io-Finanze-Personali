// ============================================================
// SEED DATA GENERATOR - Dati fittizi per test
// ============================================================

function generateMockTransactions(count = 30) {
  const now = new Date();
  const currentYear = now.getFullYear();
  const currentMonth = now.getMonth();
  
  const categories = ['food', 'housing', 'transport', 'health', 'entertainment', 'utilities', 'shopping', 'other'];
  const incomeCategories = ['salary', 'freelance', 'invest', 'bonus', 'other_in'];
  
  const descriptions = {
    food: ['Supermercato', 'Pasticceria', 'Panetteria', 'Macelleria', 'Pescheria', 'Fruttivendolo'],
    housing: ['Affitto', 'Manutenzione', 'Mobili', 'Elettrodomestici', 'Condominio', 'Giardiniere'],
    transport: ['Benzina', 'Autobus', 'Taxi', 'Manutenzione auto', 'Parcheggio', 'Pedaggio'],
    health: ['Farmacia', 'Medico base', 'Dentista', 'Oculista', 'Analisi', 'Fisioterapia'],
    entertainment: ['Cinema', 'Teatro', 'Concerto', 'Netflix', 'Spotify', 'Videogioco', 'Libro'],
    utilities: ['Luce', 'Gas', 'Acqua', 'Internet', 'Telefono', 'Rifiuti'],
    shopping: ['Abbigliamento', 'Scarpe', 'Elettronica', 'Casalinghi', 'Sport', 'Gioielleria'],
    other: ['Varie', 'Tasse', 'Regali', 'Spese impreviste', 'Assicurazione']
  };
  
  const incomeDescriptions = {
    salary: ['Stipendio mensile', 'Stipendio extra', 'Tredicesima', 'Quattordicesima'],
    freelance: ['Progetto web', 'Consulenza', 'Lavoro freelance', 'Collaborazione'],
    invest: ['Dividendi', 'Plusvalenza', 'Interessi', 'Cedole'],
    bonus: ['Bonus produzione', 'Premio', 'Rimborso spese', 'Cashback'],
    other_in: ['Vendita oggetti', 'Rimborso', 'Premio', 'Regalo']
  };
  
  const results = [];
  let id = 1;
  
  // Genera transazioni distribuite negli ultimi 6 mesi
  for (let i = 0; i < count; i++) {
    // 75% expense, 25% income (più realistico)
    const isExpense = Math.random() < 0.75;
    const type = isExpense ? 'expense' : 'income';
    
    // Data random negli ultimi 6 mesi
    const monthsBack = Math.floor(Math.random() * 6);
    const targetDate = new Date(currentYear, currentMonth - monthsBack, 1);
    const daysInMonth = new Date(targetDate.getFullYear(), targetDate.getMonth() + 1, 0).getDate();
    const randomDay = Math.floor(Math.random() * daysInMonth) + 1;
    const date = new Date(targetDate.getFullYear(), targetDate.getMonth(), randomDay);
    
    let category, amount, description;
    
    if (isExpense) {
      category = categories[Math.floor(Math.random() * categories.length)];
      const descList = descriptions[category];
      description = descList[Math.floor(Math.random() * descList.length)];
      // Importi realistici per categoria
      const amountRanges = {
        food: [15, 30, 45, 60, 80, 100, 120],
        housing: [340, 500, 600, 800, 150, 200, 300],
        transport: [15, 25, 35, 45, 55, 70, 90],
        health: [12, 25, 40, 55, 70, 100, 150],
        entertainment: [8, 15, 25, 35, 50, 70, 100],
        utilities: [35, 45, 60, 80, 100, 120, 150],
        shopping: [25, 45, 70, 100, 130, 180, 250],
        other: [10, 20, 35, 50, 75, 100, 200]
      };
      const range = amountRanges[category] || [20, 50, 100];
      amount = range[Math.floor(Math.random() * range.length)];
      // Aggiungi decimali occasionalmente
      if (Math.random() > 0.7) {
        amount += Math.round(Math.random() * 90) / 100;
      }
    } else {
      category = incomeCategories[Math.floor(Math.random() * incomeCategories.length)];
      const descList = incomeDescriptions[category];
      description = descList[Math.floor(Math.random() * descList.length)];
      // Importi realistici per entrate
      const incomeRanges = {
        salary: [1800, 2000, 2200, 2500, 2800, 3000, 3500],
        freelance: [150, 300, 500, 750, 1000, 1500, 2000],
        invest: [25, 50, 100, 150, 200, 300, 500],
        bonus: [50, 100, 200, 300, 500, 750, 1000],
        other_in: [20, 40, 60, 100, 150, 200, 300]
      };
      const range = incomeRanges[category];
      amount = range[Math.floor(Math.random() * range.length)];
    }
    
    // Aggiungi nota opzionale
    const notes = ['', 'Pagato con carta', 'Contanti', 'Bolletta pagata', 'Ricevuta #' + Math.floor(Math.random() * 1000)];
    const note = Math.random() > 0.8 ? notes[Math.floor(Math.random() * notes.length)] : '';
    
    results.push({
      id: String(id++),
      date: date.toISOString().slice(0, 10),
      type: type,
      amount: amount,
      category: category,
      description: description,
      note: note,
      createdAt: Date.now(),
    });
  }
  
  // Ordina per data (più recenti prima)
  results.sort((a, b) => new Date(b.date) - new Date(a.date));
  
  return results;
}

function generateMockBudgets() {
  return {
    food: Math.floor(Math.random() * 150) + 200,      // 200-350
    housing: Math.floor(Math.random() * 200) + 500,   // 500-700
    transport: Math.floor(Math.random() * 50) + 60,   // 60-110
    health: Math.floor(Math.random() * 80) + 80,      // 80-160
    entertainment: Math.floor(Math.random() * 70) + 50, // 50-120
    utilities: Math.floor(Math.random() * 50) + 70,   // 70-120
    shopping: Math.floor(Math.random() * 100) + 100,  // 100-200
    other: Math.floor(Math.random() * 80) + 50,       // 50-130
  };
}

// Funzione per aggiungere dati fittizi mantenendo quelli esistenti
function appendMockTransactions(count = 20) {
  const existing = getTransactions();
  const newTransactions = generateMockTransactions(count);
  
  // Trova il massimo ID esistente
  let maxId = 0;
  existing.forEach(t => {
    const numId = parseInt(t.id);
    if (!isNaN(numId) && numId > maxId) maxId = numId;
  });
  
  // Riassegna ID incrementali
  newTransactions.forEach((tx, idx) => {
    tx.id = String(maxId + idx + 1);
  });
  
  // Aggiungi nuove transazioni all'inizio
  const allTransactions = [...newTransactions, ...existing];
  
  // Salva
  localStorage.setItem(KEY_TX, JSON.stringify(allTransactions));
  _transactions = allTransactions;
  
  return newTransactions.length;
}

// Funzione per RESETTARE TUTTO e caricare SOLO dati fittizi
function resetAndLoadMockData() {
  if (confirm('⚠️ ATTENZIONE: Questa operazione cancellerà TUTTI i dati esistenti (transazioni e budget) e li sostituirà con dati di test. Sei sicuro?')) {
    const newTransactions = generateMockTransactions(45);
    const newBudgets = generateMockBudgets();
    
    // Salva
    localStorage.setItem(KEY_TX, JSON.stringify(newTransactions));
    localStorage.setItem(KEY_BUDGETS, JSON.stringify(newBudgets));
    
    // Aggiorna variabili globali
    _transactions = newTransactions;
    _budgets = newBudgets;
    
    // Resetta i colori ai default
    _categoryColors = { ...DEFAULT_CATEGORY_COLORS };
    saveCategoryColors();
    
    // Aggiorna UI
    refreshAllViews();
    if (state.view !== 'dashboard') renderDashboard();
    
    showToast(`✅ Caricati ${newTransactions.length} dati di test!`, 'success');
    return true;
  }
  return false;
}

// Funzione per aggiungere dati senza cancellare (solo transazioni)
function addMockTransactions(count = 15) {
  const added = appendMockTransactions(count);
  refreshAllViews();
  if (state.view !== 'dashboard') renderDashboard();
  showToast(`✅ Aggiunte ${added} transazioni di test`, 'success');
}