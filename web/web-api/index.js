let URL = null;
let accessToken = null;
let urgentBuys = [];
let productsInformation = [];
let productsStock = [];
let totalStock = 0;
let noOutOfStockProducts = 0;
let totalStockValue = 0;

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

  accessToken = response.access_token;

  return accessToken;
};

export const dbQuery = queryString => makeRequest('Administrador/Consulta', 'application/json; charset=utf-8', queryString);

const queryUrgentBuys = () => dbQuery(
  'SELECT DISTINCT Artigo.Artigo, Artigo.Descricao, NecessidadesCompras.Quantidade FROM NecessidadesCompras INNER JOIN Artigo ON Artigo.Artigo = NecessidadesCompras.Artigo',
);

const queryProductsInformation = () => dbQuery(
  'SELECT DISTINCT Artigo.Artigo, Artigo.Descricao, V_INV_ValoresActuaisStock.Stock , ArtigoMoeda.PVP1 FROM Artigo INNER JOIN V_INV_ValoresActuaisStock ON Artigo.Artigo = V_INV_ValoresActuaisStock.Artigo INNER JOIN ArtigoMoeda ON Artigo.Artigo = ArtigoMoeda.Artigo',
);

const queryProductsStock = () => dbQuery(
  'SELECT DISTINCT Artigo.Artigo, Artigo.Descricao, V_INV_ValoresActuaisStock.Stock FROM Artigo INNER JOIN V_INV_ValoresActuaisStock ON Artigo.Artigo = V_INV_ValoresActuaisStock.Artigo',
);

const queryTotalStock = () => dbQuery('SELECT SUM(V_INV_ValoresActuaisStock.Stock) FROM V_INV_ValoresActuaisStock');

const queryNoOutOfStockProducts = () => dbQuery('SELECT COUNT(Artigo) FROM V_INV_ValoresActuaisStock WHERE Stock = 0');

const queryTotalStockValue = () => dbQuery(
  'SELECT SUM(ArtigoStock.Stock * ArtigoCusto.Custo) as TotalCost FROM(SELECT Artigo.Artigo AS Artigo, V_INV_ValoresActuaisStock.Stock AS Stock FROM Artigo INNER JOIN V_INV_ValoresActuaisStock ON Artigo.Artigo = V_INV_ValoresActuaisStock.Artigo) AS ArtigoStock, (SELECT AF.Artigo AS Artigo, AVG(AF.PrCustoUltimo) AS Custo FROM ArtigoFornecedor AF GROUP BY AF.Artigo) AS ArtigoCusto WHERE ArtigoStock.Artigo = ArtigoCusto.Artigo',
);

export const getUrgentBuys = () => urgentBuys;

export const getProductsInformation = () => productsInformation;

export const getProductsStock = () => productsStock;

export const getTotalStock = () => totalStock;

export const getTotalStockValue = () => totalStockValue;

export const loadDb = async () => {
  const productsInformationJson = await queryProductsInformation();
  productsInformation = productsInformationJson.DataSet.Table;

  const urgentBuysJson = await queryUrgentBuys();
  urgentBuys = urgentBuysJson.DataSet.Table;

  const productsStockJson = await queryProductsStock();
  productsStock = productsStockJson.DataSet.Table;

  const totalStockJson = await queryTotalStock();
  totalStock = totalStockJson.DataSet.Table[0].Column1;

  const noOutOfStockProductsJson = await queryNoOutOfStockProducts();
  noOutOfStockProducts = noOutOfStockProductsJson.DataSet.Table[0].Column1;

  const totalStockValueJson = await queryTotalStockValue();
  totalStockValue = totalStockValueJson.DataSet.Table[0].TotalCost;
};
