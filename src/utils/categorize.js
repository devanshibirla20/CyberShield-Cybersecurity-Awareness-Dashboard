const RULES = {
  Ransomware:    ['ransomware','ransom','lockbit','ryuk','conti','darkside','revil','blackcat','encrypt files','decryption key'],
  Phishing:      ['phishing','spear phishing','smishing','vishing','whaling','credential harvest','spoofed','fake login','business email compromise','bec'],
  'Data Breach': ['data breach','data leak','leaked','exposed records','stolen data','password dump','pii','gdpr','identity theft','personal data','million records','sensitive data'],
  Malware:       ['malware','trojan','virus','worm','spyware','rootkit','keylogger','botnet','backdoor',' rat ','infostealer','zero-day','0-day','exploit','payload','shellcode'],
}

export const ALL_CATEGORIES = ['All','Ransomware','Phishing','Data Breach','Malware','General']

export function categorizeArticle(article) {
  const text = `${article.title ?? ''} ${article.description ?? ''}`.toLowerCase()
  for (const [cat, kws] of Object.entries(RULES)) {
    if (kws.some(k => text.includes(k))) return cat
  }
  return 'General'
}

export function getCategoryColor(cat) {
  return {
    Ransomware:    'bg-red-500/20 text-red-400 border-red-500/30',
    Phishing:      'bg-yellow-500/20 text-yellow-400 border-yellow-500/30',
    'Data Breach': 'bg-orange-500/20 text-orange-400 border-orange-500/30',
    Malware:       'bg-purple-500/20 text-purple-400 border-purple-500/30',
    General:       'bg-green-500/20 text-green-400 border-green-500/30',
  }[cat] ?? 'bg-green-500/20 text-green-400 border-green-500/30'
}

export function getCategoryIcon(cat) {
  return { Ransomware:'🔒', Phishing:'🎣', 'Data Breach':'💧', Malware:'🦠', General:'🛡️' }[cat] ?? '🛡️'
}

export function getCategoryChartColor(cat) {
  return { Ransomware:'#ef4444', Phishing:'#eab308', 'Data Breach':'#f97316', Malware:'#a855f7', General:'#22c55e' }[cat] ?? '#22c55e'
}
