let URL = null;
let accessToken = null;
let urgentBuys = [];
let productsInformation = [];
let top5ProductsStock = [];
let totalStock = 0;
let noOutOfStockProducts = 0;
let totalStockValue = 0;
let noPurchases = 0;
let totalPurchasesCost = 0;
let top5Suppliers = [];
let purchasesInformation = [];
let numSuppliers = 0;

const makeRequest = async (url, contentType, body) => {
  if (!URL) throw new Error('Need to setup url with getToken function.');

  let bodyData;

  if (contentType === 'application/json; charset=utf-8') {
    bodyData = JSON.stringify(body);
  } else {
    bodyData = body;
  }

  const headers = new Headers();
  headers.append('Content-Type', contentType);
  if (accessToken) {
    headers.append('Authorization', `Bearer ${accessToken}`);
  }

  const request = {
    method: 'POST',
    mode: 'cors',
    credentials: 'omit',
    headers,
    body: bodyData,
  };

  const response = await fetch(`${URL}/${url}`, request);

  if (response.ok) {
    return response.json();
  }
  // else
  throw new Error(response.statusText, response.status);
};

export const getToken = async (companyName, url) => {
  URL = url;

  console.log(`Connecting to primavera webapi in ${URL}`);

  const tokenRequestBody = {
    username: 'FEUP',
    password: 'qualquer1',
    company: companyName,
    instance: 'DEFAULT',
    grant_type: 'password',
    line: 'professional',
  };

  const bodyData = new URLSearchParams();

  Object.keys(tokenRequestBody).forEach((key) => {
    bodyData.append(key, tokenRequestBody[key]);
  });

  const response = await makeRequest('token', 'application/x-www-form-urlencoded', bodyData);

  console.log('Successfully connected to primavera webapi.');

  accessToken = response.access_token;

  return accessToken;
};

export const dbQuery = queryString => makeRequest('Administrador/Consulta', 'application/json; charset=utf-8', queryString);

/* Products Queries */
const queryUrgentBuys = () => dbQuery(
  'SELECT DISTINCT Artigo.Artigo, Artigo.Descricao, NecessidadesCompras.Quantidade FROM NecessidadesCompras INNER JOIN Artigo ON Artigo.Artigo = NecessidadesCompras.Artigo',
);

const queryProductsInformation = () => dbQuery(
  'SELECT DISTINCT Artigo.Artigo, Artigo.Descricao, V_INV_ValoresActuaisStock.Stock , ArtigoMoeda.PVP1 FROM Artigo INNER JOIN V_INV_ValoresActuaisStock ON Artigo.Artigo = V_INV_ValoresActuaisStock.Artigo INNER JOIN ArtigoMoeda ON Artigo.Artigo = ArtigoMoeda.Artigo',
);

const queryTop5ProductsStock = () => dbQuery(
  'SELECT TOP 5 Artigo.Artigo, Artigo.Descricao, V_INV_ValoresActuaisStock.Stock FROM Artigo INNER JOIN V_INV_ValoresActuaisStock ON Artigo.Artigo = V_INV_ValoresActuaisStock.Artigo ORDER BY V_INV_ValoresActuaisStock.Stock DESC',
);

const queryTotalStock = () => dbQuery(
  'SELECT SUM(V_INV_ValoresActuaisStock.Stock) AS TotalStock FROM V_INV_ValoresActuaisStock',
);

const queryNoOutOfStockProducts = () => dbQuery(
  'SELECT COUNT(Artigo) AS OutOfStockProducts FROM V_INV_ValoresActuaisStock WHERE Stock = 0',
);

const queryTotalStockValue = () => dbQuery('SELECT SUM(Artigo.STKActual * PCMedio) AS TotalStockCost FROM Artigo');

/* Purchases Queries */
const queryNoTotalPurchasesMade = () => dbQuery(
  "SELECT Count(CC1.Id) as TotalPurchases FROM CabecCompras as CC1 WHERE CC1.TipoDoc = 'VFA' ",
);

const queryNoTotalPurchasesReversed = () => dbQuery(
  "SELECT Count(CabecCompras.Id) as TotalReversals FROM CabecCompras WHERE CabecCompras.TipoDoc = 'VNC'",
);

const queryTotalPurchasesCost = () => dbQuery(
  "SELECT SUM(CabecCompras.TotalMerc) as TotalPurchasesCost FROM CabecCompras WHERE CabecCompras.TipoDoc = 'VFA' OR CabecCompras.TipoDoc='VNC' ",
);

const queryTop5Suppliers = () => dbQuery(
  "SELECT TOP 5 F.Nome, SUM(CabecCompras.TotalMerc) TotalCompras FROM CabecCompras INNER JOIN CabecComprasStatus ON CabecComprasStatus.IdCabecCompras = CabecCompras.Id INNER JOIN Fornecedores F ON CabecCompras.Entidade = F.Fornecedor WHERE CabecCompras.TipoDoc = 'VFA' OR CabecCompras.TipoDoc = 'VNC' GROUP BY CabecCompras.Entidade, F.Nome ORDER BY TotalCompras ASC",
);

const queryPurchasesInformation = () => dbQuery(
  "SELECT CabecCompras.DataDoc, CabecCompras.TotalMerc TotalCompras FROM CabecCompras INNER JOIN CabecComprasStatus ON CabecComprasStatus.IdCabecCompras = CabecCompras.Id WHERE CabecCompras.TipoDoc = 'VFA' OR CabecCompras.TipoDoc = 'VNC'",
);

const queryNumSuppliers = () => dbQuery('SELECT count(Fornecedor) as noSuppliers FROM Fornecedores');

/* Products */
export const getUrgentBuys = () => urgentBuys;

export const getProductsInformation = () => productsInformation;

export const getTop5ProductsStock = () => top5ProductsStock;

export const getTotalStock = () => totalStock;

export const getTotalStockValue = () => totalStockValue;

export const getNoOutOfStockProfucts = () => noOutOfStockProducts;

/* Purchases */

export const getNoPurchases = () => noPurchases;

export const getTotalPurchasesCost = () => totalPurchasesCost;

export const getTop5Suppliers = () => top5Suppliers;

export const getPurchasesInformation = () => purchasesInformation;

export const getNumSuppliers = () => numSuppliers;

export const loadDb = async () => {
  /* Products */
  const urgentBuysJson = await queryUrgentBuys();
  urgentBuys = urgentBuysJson.DataSet.Table;

  const productsInformationJson = await queryProductsInformation();
  productsInformation = productsInformationJson.DataSet.Table;

  const top5ProductsStockJson = await queryTop5ProductsStock();
  top5ProductsStock = top5ProductsStockJson.DataSet.Table;

  const totalStockJson = await queryTotalStock();
  totalStock = totalStockJson.DataSet.Table[0].TotalStock;

  const totalStockValueJson = await queryTotalStockValue();
  totalStockValue = totalStockValueJson.DataSet.Table[0].TotalStockCost;

  const noOutOfStockProductsJson = await queryNoOutOfStockProducts();
  noOutOfStockProducts = noOutOfStockProductsJson.DataSet.Table[0].OutOfStockProducts;

  /* Purchases */
  const noPurchasesJson = await queryNoTotalPurchasesMade();
  const noPurchasesReversedJson = await queryNoTotalPurchasesReversed();
  noPurchases = noPurchasesJson.DataSet.Table[0].TotalPurchases
    - noPurchasesReversedJson.DataSet.Table[0].TotalReversals;

  const totalPurchasesCostJson = await queryTotalPurchasesCost();
  totalPurchasesCost = totalPurchasesCostJson.DataSet.Table[0].TotalPurchasesCost;

  const top5SuppliersJson = await queryTop5Suppliers();
  top5Suppliers = top5SuppliersJson.DataSet.Table;

  const purchasesInformationJson = await queryPurchasesInformation();
  purchasesInformation = purchasesInformationJson.DataSet.Table;

  const numSuppliersJson = await queryNumSuppliers();
  numSuppliers = numSuppliersJson.DataSet.Table[0].noSuppliers;
};
