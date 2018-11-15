class Product {
    constructor(XMLElement){
        this.type = XMLElement.ProductType[0];
        this.code = XMLElement.ProductCode[0];
        this.description = XMLElement.ProductDescription[0];
        this.numberCode = XMLElement.ProductNumberCode[0];
        this.group = XMLElement.ProductGroup[0];
    }
}

export default Product;