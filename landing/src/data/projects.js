// Dados mockados - projetos e negativos

export const projects = [
  { key: "vila-nova", name: "Condomínio Vila Nova", city: "São Paulo - SP", status: "green" },
  { key: "jardim-aguas", name: "Residencial Jardim das Águas", city: "Curitiba - PR", status: "green" },
  { key: "horizonte-park", name: "Horizonte Park", city: "Campinas - SP", status: "green" },
  { key: "monte-verde", name: "Monte Verde Residences", city: "Belo Horizonte - MG", status: "red" },
  { key: "praia-azul", name: "Praia Azul Condominium", city: "Florianópolis - SC", status: "green" },
  { key: "solar-vale", name: "Solar do Vale", city: "Vitória - ES", status: "green" },
  { key: "parque-palmeiras", name: "Parque das Palmeiras", city: "Rio de Janeiro - RJ", status: "yellow" },
  { key: "bella-vista", name: "Bella Vista Towers", city: "Porto Alegre - RS", status: "green" },
  { key: "residencial-aurora", name: "Residencial Aurora", city: "Fortaleza - CE", status: "red" },
  { key: "realmint-garden", name: "RealMint Garden", city: "São José dos Campos - SP", status: "green" },
  { key: "porto-verde", name: "Porto Verde Homes", city: "Santos - SP", status: "green" },
  { key: "alto-da-serra", name: "Alto da Serra Residences", city: "Petrópolis - RJ", status: "green" },
];

export const projectNegatives = {
  "parque-palmeiras": [
    { id: "T1-110", type: "amarelo", text: "Atraso na atualização de manutenção — última sync há 36h" },
    { id: "T1-204", type: "amarelo", text: "Pendente confirmação de taxa de registro (cartório)" },
  ],
  "residencial-aurora": [
    { id: "Torre A-302", type: "vermelho", text: "houve mudança na escritura" },
    { id: "Torre A-901", type: "vermelho", text: "houve mudança na escritura" },
  ],
  "monte-verde": [
    { id: "Torre B-204", type: "vermelho", text: "houve mudança na escritura" },
    { id: "Torre A-303", type: "vermelho", text: "houve mudança na escritura" },
  ],
  "vila-nova": [
    { id: "T2-104", type: "amarelo", text: "Atraso na atualização (48h)" },
    { id: "T3-302", type: "vermelho", text: "houve mudança na escritura" },
  ],
};

