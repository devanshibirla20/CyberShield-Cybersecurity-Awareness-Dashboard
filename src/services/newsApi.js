import axios from 'axios'

const client = axios.create({
  baseURL: 'https://gnews.io/api/v4',
  timeout: 12000,
})

client.interceptors.request.use(cfg => {
  cfg.params = { ...cfg.params, apikey: import.meta.env.VITE_GNEWS_API_KEY, lang: 'en' }
  return cfg
})

client.interceptors.response.use(
  r => r,
  err => Promise.reject(new Error(err.response?.data?.errors?.[0] ?? err.message ?? 'Network error'))
)

export async function fetchCyberNews(query = 'cybersecurity', max = 10) {
  const { data } = await client.get('/search', { params: { q: query, max, sortby: 'publishedAt' } })
  return data.articles ?? []
}

/* ── 10 rich mock articles ─────────────────────────────────── */
export const MOCK_ARTICLES = [
  {
    title: 'LockBit 3.0 Ransomware Resurfaces With Upgraded Encryption Engine',
    description: 'The ransomware gang responsible for dozens of major attacks in 2023 has returned with a new variant featuring improved encryption and faster deployment across enterprise networks.',
    url: 'https://www.bleepingcomputer.com/news/security/lockbit-ransomware-gang/',
    image: 'https://picsum.photos/seed/lockbit30/800/450',
    publishedAt: new Date(Date.now() - 1800000).toISOString(),
    source: { name: 'BleepingComputer' },
  },
  {
    title: 'Microsoft 365 Phishing Campaign Bypasses Multi-Factor Authentication',
    description: 'Security researchers at Proofpoint discovered a large-scale phishing operation using adversary-in-the-middle attacks to steal session cookies and bypass MFA on Microsoft 365 accounts.',
    url: 'https://www.proofpoint.com/us/blog',
    image: 'https://picsum.photos/seed/phishing365/800/450',
    publishedAt: new Date(Date.now() - 7200000).toISOString(),
    source: { name: 'Proofpoint Blog' },
  },
  {
    title: 'AT&T Data Breach Exposes Call Records of Nearly All Customers',
    description: 'Telecom giant AT&T confirmed a massive data breach in which call and text metadata for nearly all of its wireless customers was stolen from a third-party cloud platform.',
    url: 'https://therecord.media/att-data-breach/',
    image: 'https://picsum.photos/seed/attbreach/800/450',
    publishedAt: new Date(Date.now() - 10800000).toISOString(),
    source: { name: 'The Record' },
  },
  {
    title: 'New Infostealer Malware "Lumma" Sold as Malware-as-a-Service on Dark Web',
    description: 'Cybersecurity firm ESET identified a sophisticated infostealer trojan being sold via dark web forums, capable of extracting browser cookies, crypto wallet keys, and VPN credentials.',
    url: 'https://www.eset.com/us/about/newsroom/',
    image: 'https://picsum.photos/seed/lumma/800/450',
    publishedAt: new Date(Date.now() - 18000000).toISOString(),
    source: { name: 'ESET Research' },
  },
  {
    title: 'Critical Zero-Day in Ivanti VPN Exploited by Chinese State Hackers',
    description: 'Two critical zero-day vulnerabilities in Ivanti Connect Secure VPN are being actively exploited by a Chinese espionage group to deploy custom malware on government networks worldwide.',
    url: 'https://www.mandiant.com/resources/blog',
    image: 'https://picsum.photos/seed/ivanti/800/450',
    publishedAt: new Date(Date.now() - 28800000).toISOString(),
    source: { name: 'Mandiant' },
  },
  {
    title: 'Conti Successor "Black Basta" Hits 300+ Organizations Worldwide',
    description: 'The Black Basta ransomware group, believed to be a rebranded Conti operation, has successfully attacked over 300 organizations across healthcare, finance, and manufacturing sectors.',
    url: 'https://www.crowdstrike.com/blog/',
    image: 'https://picsum.photos/seed/blackbasta/800/450',
    publishedAt: new Date(Date.now() - 43200000).toISOString(),
    source: { name: 'CrowdStrike' },
  },
  {
    title: 'FBI Dismantles Qakbot Botnet Used to Deploy Ransomware',
    description: 'The FBI announced Operation Duck Hunt, successfully taking down the Qakbot botnet infrastructure that had infected over 700,000 computers and facilitated ransomware attacks globally.',
    url: 'https://www.fbi.gov/news/stories',
    image: 'https://picsum.photos/seed/fbiop/800/450',
    publishedAt: new Date(Date.now() - 86400000).toISOString(),
    source: { name: 'FBI Newsroom' },
  },
  {
    title: 'Healthcare Giant Change Healthcare Confirms 100M Record Data Breach',
    description: 'UnitedHealth Group subsidiary Change Healthcare confirmed that a data breach in the February 2024 ransomware attack exposed sensitive personal and medical data of 100 million Americans.',
    url: 'https://www.securityweek.com/health-care/',
    image: 'https://picsum.photos/seed/health/800/450',
    publishedAt: new Date(Date.now() - 172800000).toISOString(),
    source: { name: 'SecurityWeek' },
  },
  {
    title: 'Spear Phishing Emails Targeting CFOs Now Use AI-Generated Voice Clones',
    description: 'Threat actors are combining spear phishing emails with AI-generated voice cloning calls to impersonate CEOs and pressure CFOs into approving fraudulent wire transfers in sophisticated BEC campaigns.',
    url: 'https://www.darkreading.com/threat-intelligence/',
    image: 'https://picsum.photos/seed/aiphishing/800/450',
    publishedAt: new Date(Date.now() - 216000000).toISOString(),
    source: { name: 'Dark Reading' },
  },
  {
    title: 'Supply Chain Attack via Malicious PyPI Packages Hits 600 Developers',
    description: 'Researchers uncovered a coordinated supply chain attack where 27 typosquatted PyPI packages deployed a rootkit targeting developer machines to steal source code and AWS credentials.',
    url: 'https://www.checkmarx.com/blog/',
    image: 'https://picsum.photos/seed/pypi/800/450',
    publishedAt: new Date(Date.now() - 259200000).toISOString(),
    source: { name: 'Checkmarx Research' },
  },
]
