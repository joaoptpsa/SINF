import Customer from './customer';
import Supplier from './supplier';
import Product from './product';
import GeneralLedger from './generalLedger';
import Tax from '../tax';

const parseTaxTables = (XMLTaxTable) => {
  const taxTable = [];

  XMLTaxTable[0].TaxTableEntry.forEach((taxTableEntryXML) => {
    const tax = new Tax(taxTableEntryXML);
    taxTable.push(tax);
  });

  return taxTable;
};

//  Parse customers
const parseCustomers = (customersXML) => {
  const costumers = {};

  customersXML.forEach((customerXML) => {
    const costumer = new Customer(customerXML);
    costumers[costumer.customerID] = costumer;
  });

  return costumers;
};

const parseProducts = (productsXML) => {
  const products = {};

  productsXML.forEach((productXML) => {
    const product = new Product(productXML);
    products[product.code] = product;
  });

  return products;
};

const parseGeneralLedgersAccounts = (generalLedgersAccountsXML) => {
  const generalLedgersAccounts = {};
  generalLedgersAccounts.TaxonomyReference = generalLedgersAccountsXML.TaxonomyReference[0];

  generalLedgersAccountsXML.Account.forEach((generalLedgerAccountXML) => {
    const generalLedger = new GeneralLedger(generalLedgerAccountXML);
    generalLedgersAccounts[generalLedger.accountID] = generalLedger;
  });

  return generalLedgersAccounts;
};

const parseSuppliers = (suppliersXML) => {
  const suppliers = {};

  suppliersXML.forEach((supplierXML) => {
    const supplier = new Supplier(supplierXML);
    suppliers[supplier.id] = supplier;
  });

  return suppliers;
};

class MasterFiles {
  constructor(XMLElement) {
    this.costumers = parseCustomers(XMLElement.Customer);
    this.products = parseProducts(XMLElement.Product);
    this.generalLedgerAccounts = parseGeneralLedgersAccounts(XMLElement.GeneralLedgerAccounts[0]);
    this.suppliers = parseSuppliers(XMLElement.Supplier);
    this.taxTables = parseTaxTables(XMLElement.TaxTable);
  }
}

export default MasterFiles;
