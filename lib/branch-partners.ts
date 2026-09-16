// Partner selection and all-branch representation supplied by AGGRE CAPITAL.
// Official names and website links checked on 16 September 2026.
export const branchPartners = [
  {
    id: "tata-karya-indonesia",
    name: "BPR Tata Karya Indonesia",
    legalName: "PT Bank Perekonomian Rakyat Tata Karya Indonesia",
    website: "https://www.banktki.com/",
    domain: "banktki.com",
    aliases: ["BPR TKI", "Bank Tata Karya Indonesia", "PT BPR Tata Karya Indonesia"],
  },
  {
    id: "bank-kertiawan",
    name: "BPR Bank Kertiawan",
    legalName: "PT Bank Perekonomian Rakyat Bank Kertiawan",
    website: "https://bankkertiawan.com/",
    domain: "bankkertiawan.com",
    aliases: ["Bank Kertiawan", "PT BPR Bank Kertiawan"],
  },
  {
    id: "bank-vima",
    name: "Bank Vima",
    legalName: "PT BPR Adhierresa",
    website: "https://bankvima.com/",
    domain: "bankvima.com",
    aliases: ["BPR Vima", "BPR Adhierresa"],
  },
  {
    id: "satyadhana-artha",
    name: "BPR Satyadhana Artha",
    legalName: "PT BPR Satyadhana Artha",
    website: "https://bprsatyadhanaartha.com/",
    domain: "bprsatyadhanaartha.com",
    aliases: ["Bank Satyadhana Artha"],
  },
] as const;

const normalizeName = (name: string) => name.toLowerCase().replace(/[^a-z0-9]/g, "");
const branchPartnerNames = new Set(
  branchPartners.flatMap(partner => [partner.name, partner.legalName, ...partner.aliases].map(normalizeName)),
);

export function isBranchPartner(name: string): boolean {
  return branchPartnerNames.has(normalizeName(name));
}
