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

const parseGeneralLedgers = (generalLedgersXML) => {
  const generalLedgers = {};

  generalLedgersXML.forEach((generalLedgerXML) => {
    const generalLedger = new GeneralLedger(generalLedgerXML);
    generalLedgers[generalLedger.accountID] = generalLedger;
  });

  return generalLedgers;
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
    if (XMLElement.GeneralLedger) {
      this.generalLedger = parseGeneralLedgers(XMLElement.GeneralLedger);
    }
    this.suppliers = parseSuppliers(XMLElement.Supplier);
    this.taxTables = parseTaxTables(XMLElement.TaxTable);
  }
}

export default MasterFiles;
